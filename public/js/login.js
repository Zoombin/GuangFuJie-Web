$(function(){
    PNotify.prototype.options.styling = "bootstrap3";
    var $loginBtn = $('#login-btn');
    $loginBtn.on('click', function(e) {
        e.stopPropagation();
        var $btn = $(this);
        $btn.prop('disabled', true);
        // 检查空值
        var $name = $('#name');
        var $psd = $('#psd');

        var userName = $name.val();
        var password = $psd.val();

        if ($.trim(userName) === '' || $.trim(password) === '') {
            new PNotify({
                title: '登录警告',
                text: '用户名或密码不能为空'
            });
            $btn.prop('disabled', false);
            return false;
        }
        $.ajax({
            url: '/api/user/signin',
            type: 'POST',
            data: {
                userName: userName,
                password: password
            },
            success: function(response) {
                if (response.success) {
                    console.log('cc');
                    window.location.href = '/admin';
                } else {
                    new PNotify({
                        title: '登录警告',
                        text: response.msg
                    });
                }
            },
            error: function(a, b, c) {
                console.log(a, b, c);
                new PNotify({
                    title: '错误',
                    text: '服务器错误，请联系管理员',
                    type: 'error'
                });
            },
            complete: function() {
                $btn.prop('disabled', false);
            }
        });
    });
});