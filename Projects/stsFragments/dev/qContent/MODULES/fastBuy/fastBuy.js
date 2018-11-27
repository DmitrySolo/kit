/**
 * MODULE: fastBuy script
 */
var fb_content = {
    img: {
        from: $('.productImageSlider__image'),
        to: $('.fastBuy__prodImage')
    },

    fb_char: {
        from: $('.productChar__content'),
        to: $('.fastBuy__productChar')
    },
    price: {
        from: $('.priceAndStock'),
        to: $('.fastBuy__price')
    },
    stock: {
        text:true,
        from: $('h1.page__title').text(),
        to: $('.fastBuy__label strong')
    },
    title: {
        value:true,
        from: $('.geoTarget__city'),
        to: $('input[name="city_name"]')
    }
}


$('#fastBuy__trigger').on('click', function () {
    $('#js_modall__fastBuy').removeClass('modalWindow--hide');
    
    if(!$('.fastBuy__prodImage img').length ){
             $.each(fb_content, function (index, element) {
        if(element.hasOwnProperty('value')){
             element.to.val(element.from.text());
        }else if(element.hasOwnProperty('text')){
          element.to.text(element.from);
        }else
        element.from.clone().appendTo(element.to);

    })
    }


})


    