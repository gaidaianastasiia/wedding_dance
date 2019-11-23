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


    $('.services__slider').slick({
        mobileFirst: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        autoplay: true,
        infinite: true,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 992,
            settings: 'unslick'
          }
        ]
    });
});
