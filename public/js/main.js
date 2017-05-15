$(function() {
    PNotify.prototype.options.styling = "bootstrap3";
    $('.m-banner').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        speed: 1000,
        autoplay: true,
        appendDots: '.m-banner-dots-wrap',
        dotsClass: 'm-banner-dots'
    });

    $('.m-team-slick').slick({
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        slide: '.m-team-slick-item',
        prevArrow: '.m-team-slick-prev',
        nextArrow: '.m-team-slick-next'
    });

    // contactus 表单处理;
    // new PNotify({
    //             title: '获取数据警告',
    //             text: res.msg
    //         });
    var $contactForm = $('form.m-contactus-form');
    var $name = $contactForm.find('input[name="name"]');
    var $address = $contactForm.find('input[name="address"]');
    var $tel = $contactForm.find('input[name="tel"]');
    var $area = $contactForm.find('input[name="area"]');
    var $msg = $contactForm.find('textarea[name="msg"]');
    $('#contactus-btn').on('click', function(e) {
        e.stopPropagation();
        var $btn = $(this);
        $btn.prop('disabled', true);
        $.ajax({
            url: '/contactus/insert',
            type: 'POST',
            dataType: 'json',
            data: {
                name: $name.val() || '',
                tel: $tel.val() || '',
                address: $address.val() || '',
                area: $area.val() || '',
                msg: $msg.val() || ''
            },
            success: function(response) {
                if (response.success) {
                    new PNotify({
                        title: '预约成功',
                        text: '客服会马上与您联系，请耐心等候',
                        type: 'success'
                    });
                    $name.val('');
                    $tel.val('');
                    $address.val('');
                    $area.val('');
                    $msg.val('');
                } else {
                    new PNotify({
                        title: '预约失败',
                        text: '服务器繁忙，请稍后再试'
                    });
                }
            },
            complete: function() {
                $btn.prop('disabled', false);
            }
        });
    });
});