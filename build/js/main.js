$(function () {
    // $('.colorbox').colorbox({ rel: 'data-gal' });
    $('.btn_top').click(function () {
        $(this).parents('.top').toggleClass('open_top')
    })
    $('.btn_categories').click(function () {
        $(this).parents('header').toggleClass('open_catalog')
    })


    $(document).click(function (e) {
        if ($("header .open_top").length) {
            if ($(e.target).closest('header .top').length == 0) {
                $('header .top').removeClass('open_top')
            }
        }

        if ($("header.open_catalog").length) {
            if ($(e.target).closest('header').length == 0) {
                $('header').removeClass('open_catalog')
            }
        }
    });


    $('.photos').slick({
        rows: 2,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    rows: 2,
                    dots: true,
                }
            },
            {
                breakpoint: 560,
                settings: {
                    dots: true,
                }
            }
        ]

    });
})
