/**
* MODULE: productImageSlider script
*/
;
var pImgs = $('.productImageSlider__image','.productImageSlider');

var rNav = '<span class="icon-to-right notEdit"></span>';
var lNav = '<span class="icon-to-left notEdit"></span>';
var owl =$('.productImageSlider__imageList').owlCarousel(
        {
            "items":1, 
            "lazyLoad":false,
            "autoplay":false,
            "dots":true,
            "nav":true,
            "center":true,
            "itemElement":"li",
            "navText":[lNav,rNav],
            "dotsClass":"productImageSlider__dots",
            "dotClass":"productImageSlider__dot notEdit"

            
        }
    ); 
    
pImgs.on('click',function () {
    //var i = pImgs.index(this);
   // owl.trigger('to.owl.carousel',i);
    // 
   
    $('#js-productImageSlider').appendTo('.productImageSlider__fullWindow')
     $('.productImageSlider__fullWindow').show();
     owl.trigger('refresh.owl.carousel');
})
$('.icon--slider-close').on('click',function () {
    $('#js-productImageSlider').prependTo('.productImageSlider__content')
      owl.trigger('refresh.owl.carousel');
  
    $('.productImageSlider__fullWindow').hide();
     owl.trigger('refresh.owl.carousel');
})

$('.productImageSlider__dot').each(function(index,value){
    console.log($(pImgs[index]).attr('src'),'BBBBBB');
   $(value).css('backgroundImage','url('+$(pImgs[index]).attr('src')+')');  
})









