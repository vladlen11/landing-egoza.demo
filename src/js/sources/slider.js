
$(document).ready(function () {

    var slider, slide;
    var current_slide = 0;

    function slider(slider) {
        slide = $(slider + ' ' + '.slide');
        slide_num = slide.length-1;
        var el;
        el = '<div class="slide_nav prev"><img src="img/icon/prev.svg" alt=""></div>';
        el = '<div class="slide_nav next"><img src="img/icon/next.svg" alt=""></div>';

        $(slider).append(el);

        $(slider + ' ' + '.prev').on('click', function () {
            --current_slide;
            if (current_slide < 0) {
                current_slide = slide_num
            }
            show_slide(slider, current_slide);
        });
        $(slider + ' ' + '.next').on('click', function () {
            ++current_slide;
            if (current_slide > slide_num) {
                current_slide = 0
            }
            show_slide(slider, current_slide);
        });

    }

    function show_slide(slider, current_slide) {
        slide = $(slider + ' ' + '.slide');
        slide.hide();
        slide.eq(current_slide).show();
    }

    show_slide('#slider', 2);

    slider('#slider');

});