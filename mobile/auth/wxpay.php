<?php
session_start();
if(isset($_GET['orderName'])){
    $_SESSION['order']['orderName'] = $_GET['orderName'];
}
if(isset($_GET['orderName'])){
    $_SESSION['order']['out_trade_no'] = $_GET['orderid'];
}
if(isset($_GET['price'])){
    $_SESSION['order']['total_fee'] = $_GET['price'];
}
if(isset($_GET['appid2'])){
    $_SESSION['order']['appid'] = $_GET['appid2'];
}
if(isset($_GET['appkey2'])){
    $_SESSION['order']['appkey'] =$_GET['appkey2'];
}
if(isset($_GET['partner2'])){
    $_SESSION['order']['partner'] =$_GET['partner2'];
}
if(isset($_GET['partnerKey2'])){
    $_SESSION['order']['partnerKey'] =$_GET['partnerKey2'];
}
$payment_class = ROOT_PATH . 'WxPayPubHelper/WxPayPubHelper.php';

if (file_exists($payment_class)){
    require_once $payment_class;
}
//使用jsapi接口
$jsApi = new JsApi_pub();

//=========步骤1：网页授权获取用户openid============
//通过code获得openid
if (!isset($_GET['code']))
{
    //触发微信返回code码
    $url = $jsApi->createOauthUrlForCode(WxPayConf_pub::JS_API_CALL_URL);
    Header("Location: $url");
}else
{
    //获取code码，以获取openid
    $code = $_GET['code'];
    $jsApi->setCode($code);
    $openid = $jsApi->getOpenId();
}
//=========步骤2：使用统一支付接口，获取prepay_id============
//使用统一支付接口
$unifiedOrder = new UnifiedOrder_pub();

//设置统一支付接口参数
//设置必填参数
//appid已填,商户无需重复填写
//mch_id已填,商户无需重复填写
//noncestr已填,商户无需重复填写
//spbill_create_ip已填,商户无需重复填写
//sign已填,商户无需重复填写
$unifiedOrder->setParameter("openid","$openid");//商品描述
$unifiedOrder->setParameter("body","贡献一分钱");//商品描述
//自定义订单号，此处仅作举例
$timeStamp = time();
$out_trade_no = WxPayConf_pub::APPID."$timeStamp";
$unifiedOrder->setParameter("out_trade_no",$_SESSION['order']['out_trade_no']);//商户订单号
$unifiedOrder->setParameter("total_fee", $_SESSION['order']['total_fee']);//总金额
$unifiedOrder->setParameter("notify_url",WxPayConf_pub::NOTIFY_URL);//通知地址
$unifiedOrder->setParameter("trade_type","JSAPI");//交易类型
$prepay_id = $unifiedOrder->getPrepayId();
//=========步骤3：使用jsapi调起支付============
$jsApi->setPrepayId($prepay_id);

$jsApiParameters = $jsApi->getParameters();  
?>
<script type="text/javascript">

		//调用微信JS api 支付
		function jsApiCall()
		{
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				<?php echo $jsApiParameters; ?>,
				function(res){
					WeixinJSBridge.log(res.err_msg);
					//alert(res.err_code+res.err_desc+res.err_msg);
				}
			);
		}

		function callpay()
		{
			if (typeof WeixinJSBridge == "undefined"){
			    if( document.addEventListener ){
			        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			    }else if (document.attachEvent){
			        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
			        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			    }
			}else{
			    jsApiCall();
			}
		}
		callpay();
	</script>