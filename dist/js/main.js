$(document).ready(function(){$("#toggle").click(function(){$(this).toggleClass("open"),$("#nav").toggleClass("opened")}),$(".nav__link").click(function(){$("#toggle").hasClass("open")&&$("#toggle").removeClass("open")}),$(".nav__link").click(function(){$("#nav").hasClass("opened")&&$("#nav").removeClass("opened")}),$(".services__slider").slick({mobileFirst:!0,autoplaySpeed:3e3,arrows:!1,dots:!0,pauseOnFocus:!1,pauseOnHover:!1,autoplay:!0,infinite:!0,variableWidth:!0,responsive:[{breakpoint:992,settings:"unslick"}]})});