$(document).ready(function () {
    $("#toggle").click(function () {
        $(this).toggleClass("open");
        $("#nav").toggleClass("opened");
    });

    $('.nav__link').click(function () {
        if ($('#toggle').hasClass('open')) {
            $('#toggle').removeClass('open');
        }
    });

    $('.nav__link').click(function () {
        if ($('#nav').hasClass('opened')) {
            $('#nav').removeClass('opened');
        }
    });

    if (window.innerWidth >= 992) {
        $('.services__items').removeClass('services__slider');
        console.log('work');
    } else {
        $('.services__slider').slick({
            fade: true,
            autoplaySpeed: 3000,
            arrows: false,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: false,
            autoplay: true,
        });
    }
});