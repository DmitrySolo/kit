/**
 * MODULE: accordion script
 */ 
(function(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    var switcher = $('#mobFilSwitcher');
    var filter = $('#filter')    
    switcher.on('click',function(){
        filter.toggle();
        $(this).toggleClass('active');
        if($(this).children('span').text() == 'Подобрать по фильтру') $(this).children('span').text('Закрыть фильтр');
        else $(this).children('span').text('Подобрать по фильтру');
    })
    
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");
            // console.log()
            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block" || !this.classList.contains('active')) {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

    //checkboxCount
    var filterCheckArr = $('.productFilter__checkbox');
    var filterLink = $("<a class='productFilterRes__link icon-eye'></a>");
    filterCheckArr.each(function(){
        $(this).on('change',function(){
        var sib = $(this).closest('.accordion__checkBox');
        var count =$('input[type=checkbox]',sib).filter(':checked').length;
        var display = (count == 0)? 'none':'inline-block';
       
        var target = sib.parent('.accordion__panel').prev('.accordion').addClass('accordion--choice').children('.accordion__checkMarker').css('display',display).html(count);
        sib.parent('.accordion__panel').find('.productFilterRes__ctn').append(filterLink.text('Смотреть (5439)'));
        if(count == 0) sib.parent('.accordion__panel').prev('.accordion').removeClass('accordion--choice');
           
    
        });

    });



}());


$(".catalog__by").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
/**
* MODULE: catalogList script
*/

(function(){
    
    var catHeader = document.getElementsByClassName('catalog__by'),
    catalogBody = document.querySelector('.catalogList__content'),
    catChoiser = document.querySelector('#js-CatChoiser'),
    brandChoiser = document.querySelector('#js-BrandChoiser'),
    catShadow = document.querySelector('#js_catShadow'),
    brands = document.querySelector('#js_brands'),
    categories = document.querySelector('#js_categories'),
    topBar = document.querySelector('.topBar'),
    catalogLists = document.querySelectorAll('.catalogList__categorySublist'),
    targetsArr = document.querySelectorAll('.catalogList__SublistItem'),
    hideMenu = function(triggreredBy){
        $('.catalogList__SublistItem:visible').hide();
        $('.catalog__by--brand').removeClass('catalog__by--hovered');
         console.log(triggreredBy)
        console.log('hide');
        categories.style.display = 'none';
        categories.style.opacity = '0'; 
        brands.style.display = 'none';
        brands.style.opacity = '0';
        if(catShadow){
            catShadow.style.display = 'none';
            catShadow.style.opacity = '0';
        }
         
    };
    
    
    catShadow.addEventListener('mouseover',function (e) {
     hideMenu();   
    })  


    for(var i=0; i<catHeader.length; i++){
        catHeader[i].addEventListener('mouseover',function (e) { 
            if( ! $(this).hasClass('catalog__by--category') &&
            $('.catalogList__content').hasClass('catalogList--onMain')){
                catShadow.style.display = 'block';
                catShadow.style.opacity = '1';
            }else if(!$('.catalogList__content').hasClass('catalogList--onMain')){
                catShadow.style.display = 'block';
                catShadow.style.opacity = '1';
            }
            
        });
        catHeader[i].addEventListener('mouseout',function (e) {
            console.log('opa');
            if(!catalogBody.contains(e.relatedTarget) && 
                !brands.contains(e.relatedTarget)&&
                !this.contains(e.relatedTarget)){
                e.stopPropagation();
                hideMenu('header');
            };
        });
    }
    
    brandChoiser.addEventListener('mouseover',function (e) {
        categories.style.display = 'none';
        categories.style.opacity = '0';
        this.classList.add('catalog__by--hovered');
        catChoiser.classList.remove('catalog__by--hovered');
        brands.style.display = 'block';
        brands.style.opacity = '1';
    })
    
    catChoiser.addEventListener('mouseover',function (e) {
        brands.style.display = 'none';
        brands.style.opacity = '0';
        this.classList.add('catalog__by--hovered');
        brandChoiser.classList.remove('catalog__by--hovered');
        categories.style.display = 'block';
        categories.style.opacity = '1';
    })
    
    
    categories.addEventListener('mouseout',function (e) {
       if(!e.relatedTarget.classList.contains('catalogList__SublistItem') && !this.contains(e.relatedTarget)){
                hideMenu('categories');
            };
    })
    brands.addEventListener('mouseout',function (e) {
       if(!this.contains(e.relatedTarget)){
                hideMenu('brands');
            };
       
    })
    	for(var i = 0; i<targetsArr.length; i++ ){
	    
	    targetsArr[i].addEventListener('mouseenter',function (e) {
	        console.log('sfdsfds3')
            var selectNum = this.getAttribute('id').split('__')[1];
		     selectedBy = document.getElementById('js_showSub__'+selectNum);
	            selectedBy.classList.add('catalogList__categoryItem--hovered');
	    });
	    targetsArr[i].addEventListener('mouseleave',function (e) {
	        selectedBy.classList.remove('catalogList__categoryItem--hovered');
	           
       if( !e.relatedTarget.classList.contains('catalogList__categoryItem')){
              hideMenu('subCat');
            };
       
	    });
	}
    
	var selectorIdPrefix = 'js_showSub',
	selectorsArr = document.querySelectorAll('.catalogList__categoryItem'),
	targetsArr = document.querySelectorAll('.catalogList__SublistItem'),
	lastTarget = false,
	target,
	selectedBy,  
	gogo;       
 
 
	for(var i = 0; i<selectorsArr.length; i++ ){ 
        
		selectorsArr[i].addEventListener('mouseenter',function (e) {
			var _this = this;
			catShadow.style.display = 'block';
            catShadow.style.opacity = '1';
         console.log('dffs!!@');
		    gogo = setTimeout(function(){

				    var showNum = _this.getAttribute('id').split('__')[1];
				    target = document.getElementById('js_sub__'+showNum);
					
					if(target){
						if(lastTarget){
							lastTarget.style.display = 'none';
							}
							target.style.display = 'block';
							lastTarget = target;
							
						}


		}, 200);

   

		})

		selectorsArr[i].addEventListener('mouseleave',function (e) {
		    console.log('dsfg4')
			clearTimeout(gogo);
			if( !e.relatedTarget.classList.contains('catalogList__SublistItem')){
             // hideMenu('139')    
            };
			
		}) 
	} 
	for(var i = 0; i<targetsArr.length; i++ ){
	    
	    targetsArr[i].addEventListener('mouseenter',function (e) {
	        console.log('sfdsfds3')
            var selectNum = this.getAttribute('id').split('__')[1];
		     selectedBy = document.getElementById('js_showSub__'+selectNum);
	            selectedBy.classList.add('catalogList__categoryItem--hovered');
	    });
	    targetsArr[i].addEventListener('mouseleave',function (e) {
	        console.log('out from sub')
	        selectedBy.classList.remove('catalogList__categoryItem--hovered');
	           
    //   if( !e.relatedTarget.classList.contains('catalogList__categoryItem')){
    //           this.style.display = 'none';
    //         };
       
	    });
	}
}());

/**
* MODULE: flyPageFragment script
*/


/**
* MODULE: mobileMenu script
*/
;  $(document).ready(function() {
   $("#mobileMenu").mmenu({
         "extensions": [
            "fullscreen",
             "position-front",
         ],
          "navbars": [
            {
               "content": [
                  "searchfield"
               ]
            },
            {
               
               "content": [
                  "close"
               ]
            }
         ]
      }, {
         // configuration
         offCanvas: {
            pageSelector: "#js-wrapper",
           
         }
      });
      var API = $("#mobileMenu").data( "mmenu" );
        $("#mm-button").click(function() {
         API.open();
      });
   });
   
   
			
/**
* MODULE: module1 script
*/

/**
* MODULE: order script
*/
  
qntTab($('.trig_del_cont'),$('.order__points'),'radio--selected');
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
/**
* MODULE: productImageSlider script
*/
;
var pImgs = $('.productImageSlider__image','.productImageSlider');

var rNav = '<span class="icon-to-right notEdit"></span>';
var lNav = '<span class="icon-to-left notEdit"></span>';
$('.productImageSlider__imageList').owlCarousel(
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
   
    //$('#js-productImageSlider').appendTo('.productImageSlider__fullWindow')
     $('.productImageSlider__fullWindow').show();
    // owl.trigger('refresh.owl.carousel');
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










/**
* MODULE: productInline script
*
*/

var quantitySelectorArr = document.getElementsByClassName('productInline__quantitySelector');
for(var i=0;i<quantitySelectorArr.length;i++){
    quantitySelectorArr[i].addEventListener('focus',function () {
        this.select();
    },false)
}

/**
* MODULE: topBar script
*/

    var header = document.querySelector('.mainHeader'),
    headerHeight = header.offsetHeight,
    topBar = document.querySelector('.topBar__wrapper');

window.onscroll = function(e){

    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
 
    if(scrolled > 126){
        header.style.height = headerHeight+'px';
        topBar.classList.add('topBar--fixed');
        
    }else{
         topBar.classList.remove('topBar--fixed');
    }

    
} 
// Element: b1 script.

// Element: slider script.
;$("#sl_id_1,#sl_id_2").ionRangeSlider();
// Element: toOrder script.
var func = function(){
	return true;
};
var onload = function(){
	return true;
};

$('.toOrder.active').on('mousedown',function () {
	if(!$(this).hasClass('succes')){
		$(this).removeClass('active');
	if(onload()){
		$(this).html('<img src="source/images/dotsLoader.svg" />');

		return
	}
	if(func()){
		$(this).addClass('succes').text('В заявке').wrap('<a href="/index.html"></a>');
	}else{
		$(this).text('Ошибка');
		$(this).addClass('active');
	}

	}

})
// Element: dashBoardElement script.

 $(document).ready(      
     function () {
          $('#js-switchShopState').on('change',function(){
            if( $(this).is(':checked') ) {
                $('.mop_row').hide()
                qntSetCookie('shopState','true', 1000)
            }else{
               $('.mop_row').show()
               qntSetCookie('shopState','', -1)
            }
 })
     }
     )

// modalWindows

;(function(){  

    var modalTriggers = document.querySelectorAll('.js_modal_trigger'),
        closers = document.querySelectorAll('.modalWindow__close'),
        targetNum,
        target;

    for (var i = 0; i < modalTriggers.length; i++){

        modalTriggers[i].addEventListener('mousedown',function(){

            targetNum = this.getAttribute('id').split('__')[1];

            target = document.getElementById('js_modall__'+targetNum);
            target.classList.remove('modalWindow--hide');
            target.addEventListener('click',function () {
               // this.classList.add('modalWindow--hide');
            })

        })
    }
    
    for(var i = 0; i < closers.length; i++){
        closers[i].addEventListener('click',function () {
            this.parentElement.parentElement.classList.add('modalWindow--hide');
        })
    }

}()); 
// subProductInfo script
;
qntTab($('.subProductInfo__tabber-item'),$('.subProductInfo__tabContent'),'subProductInfo__tabber-item--active');  