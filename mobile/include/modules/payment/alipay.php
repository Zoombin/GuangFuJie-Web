<?php

/**
 * ECSHOP 支付宝插件
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: douqinghua $
 * $Id: alipay.php 17217 2011-01-19 06:29:08Z douqinghua $
 */
if (! defined('IN_ECTOUCH')) {
    die('Hacking attempt');
}

$payment_lang = ROOT_PATH . 'lang/' . $GLOBALS['_CFG']['lang'] . '/payment/alipay.php';

if (file_exists($payment_lang)) {
    global $_LANG;
    
    include_once ($payment_lang);
}

/* 模块的基本信息 */
if (isset($set_modules) && $set_modules == TRUE) {
    $i = isset($modules) ? count($modules) : 0;
    
    /* 代码 */
    $modules[$i]['code'] = basename(__FILE__, '.php');
    
    /* 描述对应的语言项 */
    $modules[$i]['desc'] = 'alipay_desc';
    
    /* 是否支持货到付款 */
    $modules[$i]['is_cod'] = '0';
    
    /* 是否支持在线支付 */
    $modules[$i]['is_online'] = '1';
    
    /* 作者 */
    $modules[$i]['author'] = 'ECSHOP TEAM';
    
    /* 网址 */
    $modules[$i]['website'] = 'http://www.alipay.com';
    
    /* 版本号 */
    $modules[$i]['version'] = '1.0.2';
    
    /* 配置信息 */
    $modules[$i]['config'] = array(
        array(
            'name' => 'alipay_account',
            'type' => 'text',
            'value' => ''
        ),
        array(
            'name' => 'alipay_key',
            'type' => 'text',
            'value' => ''
        ),
        array(
            'name' => 'alipay_partner',
            'type' => 'text',
            'value' => ''
        ),
        array(
            'name' => 'alipay_pay_method',
            'type' => 'select',
            'value' => ''
        )
    );
    
    return;
}

/**
 * 类
 */
class alipay
{

    /**
     * 生成支付代码
     * 
     * @param array $order
     *            订单信息
     * @param array $payment
     *            支付方式信息
     */
    function get_code($order, $payment)
    {
        if (! defined('EC_CHARSET')) {
            $charset = 'utf-8';
        } else {
            $charset = EC_CHARSET;
        }
        
        $real_method = $payment['alipay_pay_method'];
        
        switch ($real_method) {
            case '0':
                $service = 'trade_create_by_buyer';
                break;
            case '1':
                $service = 'create_partner_trade_by_buyer';
                break;
            case '2':
                $service = 'create_direct_pay_by_user';
                break;
        }
        $gateway = 'http://wappaygw.alipay.com/service/rest.htm?';
        // 请求业务数据
        $req_data = '<direct_trade_create_req>' . 
            '<subject>' . $order['order_sn'] . '</subject>' . 
            '<out_trade_no>' . $order['order_sn'] . 'O' .  $order['log_id'] . '</out_trade_no>' . 
            '<total_fee>' . $order['order_amount'] . '</total_fee>' . 
            '<seller_account_name>' . $payment['alipay_account'] . '</seller_account_name>' . 
            '<call_back_url>' . return_url(basename(__FILE__, '.php'), array('type'=>0)) . '</call_back_url>' . 
            '<notify_url>' . 'http://guangfujie.zoombin.com/mobile/respond.php?code=alipay' . '</notify_url>' . 
            '<out_user>' . $order['consignee'] . '</out_user>' . 
            '<merchant_url>http://guangfujie.zoombin.com/mobile/respond.php</merchant_url>' . 
            '<pay_expire>3600</pay_expire>' . 
        '</direct_trade_create_req>';
        $parameter = array(
            'service' => 'alipay.wap.trade.create.direct', // 接口名称
            'format' => 'xml', // 请求参数格式
            'v' => '2.0', // 接口版本号
            'partner' => $payment['alipay_partner'], // 合作者身份ID
            'req_id' => $order['order_sn'] . $order['log_id'], // 请求号，唯一
            'sec_id' => 'MD5', // 签名方式
            'req_data' => $req_data, // 请求业务数据
            "_input_charset" => $charset
        );
        ksort($parameter);
        reset($parameter);
        $param = '';
        $sign = '';
        
        foreach ($parameter as $key => $val) {
            $param .= "$key=" . urlencode($val) . "&";
            $sign .= "$key=$val&";
        }
        
        $param = substr($param, 0, - 1);
        $sign = substr($sign, 0, - 1) . $payment['alipay_key'];
        // 请求授权接口
        $result = $this->curlPost($gateway, $param . '&sign=' . md5($sign));
        $result = urldecode($result); // URL转码
        $result_array = explode('&', $result); // 根据 & 符号拆分
        // 重构数组
        $new_result_array = $temp_item = array();
        if (is_array($result_array)) {
            foreach ($result_array as $vo) {
                $temp_item = explode('=', $vo, 2); // 根据 & 符号拆分
                $new_result_array[$temp_item[0]] = $temp_item[1];
            }
        }
        $xml = simplexml_load_string($new_result_array['res_data']);
        $request_token = (array) $xml->request_token;
        // 请求交易接口
        $parameter = array(
            'service' => 'alipay.wap.auth.authAndExecute', // 接口名称
            'format' => 'xml', // 请求参数格式
            'v' => $new_result_array['v'], // 接口版本号
            'partner' => $new_result_array['partner'], // 合作者身份ID
            'sec_id' => $new_result_array['sec_id'],
            'req_data' => '<auth_and_execute_req><request_token>' . $request_token[0] . '</request_token></auth_and_execute_req>',
            'request_token' => $request_token[0],
            '_input_charset' => $charset
        );
        ksort($parameter);
        reset($parameter);
        $param = '';
        $sign = '';
        
        foreach ($parameter as $key => $val) {
            $param .= "$key=" . urlencode($val) . "&";
            $sign .= "$key=$val&";
        }
        
        $param = substr($param, 0, - 1);
        $sign = substr($sign, 0, - 1) . $payment['alipay_key'];        
        $button = '<div style="text-align:center"><input class="btn btn-warning btn-lg" type="button" onclick="window.open(\'' . $gateway . $param . '&sign=' . md5($sign) . '\')" value="' . $GLOBALS['_LANG']['pay_button'] . '" /></div>';
        
        return $button;
    }
    function curlPost($url, $post_data = array(), $timeout = 5, $header = "", $data_type = "") {
        if (empty($url) || empty($post_data) || empty($timeout))
            return false;
        if (!preg_match('/^(http|https)/is', $url))
            $url = "http://" . $url;
        $header = empty($header) ? '' : $header;
        //支持json数据数据提交
        if($data_type == 'json'){
            $post_string = json_encode($post_data);
        }else if(is_array($post_data)){
            $post_string = http_build_query($post_data, '', '&');
        }else {
        	$post_string = $post_data;
        }  
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_string);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array($header)); //模拟的header头
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
    /**
     * 响应操作
     */
    function respond()
    {
        if (! empty($_POST)) {
            foreach ($_POST as $key => $data) {
                $_GET[$key] = $data;
            }
        }
        $payment = get_payment($_GET['code']);
        $seller_email = rawurldecode($_GET['seller_email']);
        $out_trade_no = explode('O', $_GET['out_trade_no']);
        $log_id = $out_trade_no[1];
        $order_sn = str_replace($_GET['subject'], '', $_GET['out_trade_no']);
        $order_sn = trim($order_sn);
        
        /* 检查数字签名是否正确 */
        ksort($_GET);
        reset($_GET);
        
        $sign = '';
        foreach ($_GET as $key => $val) {
            if ($key != 'sign' && $key != 'sign_type' && $key != 'code') {
                $sign .= "$key=$val&";
            }
        }
        
        $sign = substr($sign, 0, - 1) . $payment['alipay_key'];
        // $sign = substr($sign, 0, -1) . ALIPAY_AUTH;
        if (md5($sign) != $_GET['sign']) {
            return false;
        }
        
        /* 检查支付的金额是否相符 */
        if (! check_money($order_sn, $_GET['total_fee'])) {
            return false;
        }
        
        if ($_GET['trade_status'] == 'WAIT_SELLER_SEND_GOODS') {
            /* 改变订单状态 */
            order_paid($order_sn, 2);
            
            return true;
        } elseif ($_GET['trade_status'] == 'TRADE_FINISHED') {
            /* 改变订单状态 */
            order_paid($order_sn);
            
            return true;
        } elseif ($_GET['trade_status'] == 'TRADE_SUCCESS') {
            /* 改变订单状态 */
            order_paid($order_sn, 2);
            
            return true;
        } else {
            return false;
        }
    }
}
?>