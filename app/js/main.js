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


    $('.contact-carousel').slick({
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
    $('#map-carousel').slick({
        rows: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    rows: 1,
                    dots: true,
                }
            },

        ]

    });
    $('#product-images').slick({
        rows: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
    });

    $('.addresses .easy-close').click(function () {
        $(this).parent().addClass('hidden')
        console.log('sdfsdf')
    });


    $('.select2').select2({
        dropdownAutoWidth: true,
        width: 'style'
    });
    //mask
    jQuery.fn.putCursorAtEnd = function () {
        return this.each(function () {
            var $el = $(this),
                el = this;
            if (!$el.is(":focus")) {
                $el.focus();
            }
            if (el.setSelectionRange) {
                var len = $el.val().length * 2;
                setTimeout(function () {
                    el.setSelectionRange(len, len);
                }, 1);

            } else {
                $el.val($el.val());
            }
            this.scrollTop = 999999;
        });
    };
    $("[name=phone], [name=telephone]").mask("+7 (000) 000-00-00");
    $('[name=phone]').focus(function () {
        if ($(this).val() == '') {
            $(this).putCursorAtEnd().val('+7 (').putCursorAtEnd();
        }
    })
    $('[name=phone]').focusout(function () {
        if ($(this).val() == '+7 (') {
            $(this).val('');
        }
    });
    //mask

    $('.mobile-filter-btn, #apply-filter').click(function () {
        $('#filterpro_box').toggleClass('open');
        $('body').toggleClass('easy-blocked')
    })
    $('.product-tabs .btns a').click(function () {
    
        $(this).parents('.product-tabs').find('.active').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.product-tabs').find($(this).attr('href')).addClass('active')
    return false;
    })
    $('.product-tabs .btns a:first').trigger('click')

})

/// for filter, nead remove
if ($("#slider-range").length) {
    $("#slider-range").slider({ values: [0, 10000] });
    $("#slider-range").slider({
        range: true, min: 0, max: 1000, values: [0, 10000], stop: function (a, b) {

        }, slide: function (a, b) {
            $("#min_price").val(b.values[0]);
            $("#max_price").val(b.values[1])
        }
    });
    $("#min_price").val($("#slider-range").slider("values", 0));
    $("#max_price").val($("#slider-range").slider("values", 1))


    $("#slider-range1").slider({ values: [0, 10000] });
    $("#slider-range1").slider({
        range: true, min: 0, max: 1000, values: [0, 10000], stop: function (a, b) {

        }, slide: function (a, b) {
            $("#min_price1").val(b.values[0]);
            $("#max_price1").val(b.values[1])
        }
    });
    $("#min_price1").val($("#slider-range1").slider("values", 0));
    $("#max_price1").val($("#slider-range1").slider("values", 1))



    $("#slider-range3").slider({ values: [0, 10000] });
    $("#slider-range3").slider({
        range: true, min: 0, max: 1000, values: [0, 10000], stop: function (a, b) {

        }, slide: function (a, b) {
            $("#min_price3").val(b.values[0]);
            $("#max_price3").val(b.values[1])
        }
    });
    $("#min_price3").val($("#slider-range3").slider("values", 0));
    $("#max_price3").val($("#slider-range3").slider("values", 1))



    $("#slider-range2").slider({ values: [0, 10000] });
    $("#slider-range2").slider({
        range: true, min: 0, max: 1000, values: [0, 10000], stop: function (a, b) {

        }, slide: function (a, b) {
            $("#min_price2").val(b.values[0]);
            $("#max_price2").val(b.values[1])
        }
    });
    $("#min_price2").val($("#slider-range2").slider("values", 0));
    $("#max_price2").val($("#slider-range2").slider("values", 1))



    $(".option_box .option_name").click(function () {
        $(this).siblings(".collapsible").toggle();
        $(this).toggleClass("hided")
    });

    $('.mobile_filter_btn').click(function () {
        $(this).parent().toggleClass('open')

    })
}

function fastOrder(product_name, product_id) {
    $('#fast-order #product_name').html(product_name);
    $('#fast-order [name=product_name]').val(product_name);
    $('#fast-order [name=product_id]').val(product_id);

    easybox.open({
        href: '#fast-order'
    })

}

