//owlGoodsSlider Script
var items = ($(window).width() > 900)? ($(window).width() > 1400)? 5: 4: 3;

$(".owlGoodsSlider").owlCarousel({
    "items" : items || 25,
    "margin": 5,
    "nav" : true,
    "dots" : false,
    "lazyLoad": true
});
$('.oveX-header').css('backgroundColor','#ff523e');
console.log('tu3');
console.log('te3');