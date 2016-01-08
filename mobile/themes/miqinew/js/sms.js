function trim(str) {
	if(str)
		return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
	else
		return '';
}

//register
function getverifycode1() {
	var mobile = trim($('#mobile_phone').val());
	if(mobile == '') {
		alert("- 手机号码 不能为空！");
		$('#mobile_phone').focus();
		return;
	}
	// Ajax.call('sms.php?step=getverifycode1&r=' + Math.random(), 'mobile=' + mobile, getverifycode1Response, 'POST', 'JSON');
	$.ajax({
		type: "POST",
		url: "sms.php?step=getverifycode1&r=" + Math.random(),
		data: "mobile="+mobile,
		dataType: "json",
		async: false,
		success: function(result){
			alert(result.message);
		}
	});
}

//bind phone
function getverifycode2() {
	var mobile = trim($('#mobile_phone').val());
	if(mobile == '') {
		alert("手机号不能为空！");
		$("#mobile_phone").focus();
		return;
	}
	Ajax.call('sms.php?step=getverifycode2&r=' + Math.random(), 'mobile=' + mobile, getverifycode2Response, 'POST', 'JSON');
}

//forget password
function sendSms(){
	var mobile = $('#mobile_phone').val();
	if(mobile == '') {
		alert("手机号不能为空！");
		$("#mobile_phone").focus();
		return;
	}
	$.post("sms.php?step=forgetPwd", { "mobile": mobile },function(result){
		alert(result.message);
	}, "json");
}

function getverifycode1Response(result) {
	alert(result.message);
}

function getverifycode2Response(result) {
	alert(result.message);
}

function register2(){
	var status = true;
	var mobile = $('#mobile_phone').val();
	var mobile_pwd = $('#mobile_pwd').val();
	var mobile_code = $('#mobile_code').val();
	if(mobile.length == ''){
		alert('请填写手机号码');
		return false;
	}
	if(mobile_pwd.length == ''){
		alert('请填写登录密码');
		return false;
	}
	if(mobile_pwd.length < 6){
		alert('密码至少6位');
		return false;
	}
	if(mobile_code.length == ''){
		alert('请填写手机验证码');
		return false;
	}
	// if(!$("#agreement").attr("checked")){
	// 	alert('请阅读用户协议并同意');
	// 	return false;
	// }
	// $.ajax({
	// 	type: "POST",
	// 	url: "sms.php?act=check",
	// 	data: "mobile="+mobile+"&mobile_code="+mobile_code+"&flag=register",
	// 	dataType: "json",
	// 	async: false,
	// 	success: function(result){
	// 		if (result.code!=2){
	// 			alert(result.msg);
	// 			status = false;
	// 		}
	// 	}
	// });
	// return status;
}

function submitForget(){
	var status = true;
	var mobile = $('#mobile_phone').val();
    var mobile_code = $('#mobile_code').val();
	if(mobile.length == ''){
		alert('请填写手机号码');
		return false;
	}
	if(mobile_code.length == ''){
		alert('请填写手机验证码');
		return false;
	}
	// $.ajax({
	// 	type: "POST",
	// 	url: "sms.php?act=check",
	// 	data: "mobile="+mobile+"&mobile_code="+mobile_code,
	// 	dataType: "json",
	// 	async: false,
	// 	success: function(result){
	// 		if (result.code!=2){
	// 			alert(result.msg);
	// 			status = false;
	// 		}
	// 	}
	// });
	// return status;
}