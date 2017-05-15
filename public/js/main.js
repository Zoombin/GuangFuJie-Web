$(function() {
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
});