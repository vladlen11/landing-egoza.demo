/*
// = sources/jquery.js
// = sources/pagination.js
// = sources/action.js
// = sources/bootstrap.js
// = sources/slick.js
// = sources/slick-activate.js
// = sources/menuHover.js
// = sources/menuLinkClick.js
// = sources/jquery.magnific-popup.js
*/
@@include('sources/jquery.min.js')


    // alert('kuku');


$(document).ready(function() {

    var $hero = $('.hero');

    var $phone = $('.phone-banner');

    $(window).scroll(function() {
        // console.log($hero[0].offsetHeight, '$hero');
        if ($(window).scrollTop() >= $hero[0].offsetHeight) {
            $phone.addClass('fixed');
        } else {
            $phone.removeClass('fixed');
        }
    });

    $("#footer_logo").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#hero").offset().top
        }, 2000);
    });
});