//owlGoodsSlider Script
var items = ($(window).width() > 900)? ($(window).width() > 1400)? 5: 4: 3;

$(".owlGoodsSlider").owlCarousel({
    "items" : items || 25,
    "margin": 5,
    "nav" : true,
    "dots" : false,
    "lazyLoad": true
});
$('.oveX-header').css('backgroundColor','#444386');
console.log('tu3');
console.log('te3');
console.log('test1');
console.log('test4');