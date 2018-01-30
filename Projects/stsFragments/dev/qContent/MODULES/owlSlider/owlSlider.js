//owlSlider Script

   var owl = $(".ove-mainSlider").owlCarousel(
        {
            "items":1, 
            "lazyLoad":true,
            "autoplay":true,
            //"dots":true
        }
    );
   // var activeSlider = document.querySelector('.owlSlider .owl-item.active');
   var slidersTitles = $('.sliderTitles__item');
    owl.on('changed.owl.carousel', function(event) {
       console.log(event.item.index);
       //owl.trigger('to.owl.carousel',[event.item.index+1,200]);
       $(slidersTitles.removeClass('active').get(event.item.index)).addClass('active');
            
    })
    slidersTitles.on('click',function(){
       owl.trigger('to.owl.carousel',[slidersTitles.index( this ),200]); 
    })