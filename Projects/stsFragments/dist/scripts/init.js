/**
 * MODULE: accordion script
 */ 
(function(){
    var acc = document.getElementsByClassName("accordion");
    var i;

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

/**
* MODULE: catalog script
*/

(function(){

    var catHeader = document.getElementsByClassName('catalog__by'),
    catChoiser = document.querySelector('#js-CatChoiser'),
    brandChoiser = document.querySelector('#js-BrandChoiser'),
    catShadow = document.querySelector('#js_catShadow'),
    brands = document.querySelector('#js_brands'),
    categories = document.querySelector('#js_categories'),
    topBar = document.querySelector('.topBar'),
    catalogLists = document.querySelectorAll('.catalogList__SublistItem'),
    hideMenu = function(){
        categories.style.display = 'none';
        categories.style.opacity = '0'; 
        brands.style.display = 'none';
        brands.style.opacity = '0';
        catShadow.style.display = 'none';
        catShadow.style.opacity = '0';
        
        for(var i=0; i<catHeader.length; i++){
        catHeader[i].classList.remove('catalog__by--hovered');
         }
         
         for(var i=0; i<catalogLists.length; i++){
        catalogLists[i].style.display = 'none';
         }
    };



    for(var i=0; i<catHeader.length; i++){
        catHeader[i].addEventListener('mouseover',function (e) { 
            catShadow.style.display = 'block';
            catShadow.style.opacity = '1';
        });
        catHeader[i].addEventListener('mouseout',function (e) { 
            if(!categories.contains(e.relatedTarget) && 
                !brands.contains(e.relatedTarget)&&
                !this.contains(e.relatedTarget)){
                e.stopPropagation();
                hideMenu();
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
       if(!this.contains(e.relatedTarget)){
                hideMenu();
            };
    })
    brands.addEventListener('mouseout',function (e) {
       if(!this.contains(e.relatedTarget)){
                hideMenu();
            };
       
    })

    
    
}());

/**
* MODULE: catalogList script
*/

(function(){
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


		}, 300);

   

		})

		selectorsArr[i].addEventListener('mouseleave',function (e) {
			clearTimeout(gogo);
		})
	} 
	for(var i = 0; i<targetsArr.length; i++ ){
	    
	    targetsArr[i].addEventListener('mouseenter',function (e) {
            var selectNum = this.getAttribute('id').split('__')[1];
		     selectedBy = document.getElementById('js_showSub__'+selectNum);
	            selectedBy.classList.add('catalogList__categoryItem--hovered');
	    });
	    targetsArr[i].addEventListener('mouseleave',function (e) {
	        selectedBy.classList.remove('catalogList__categoryItem--hovered');
	        //this.style.display = 'none';
	    });
	}
}());

/**
* MODULE: flyPageFragment script
*/

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
		$(this).html('<svg width="50px"  height="50px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;">'+
			'<circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#ffb175" stroke-width="12" r="18" stroke-dasharray="84.82300164692441 30.274333882308138" transform="rotate(186 50 50)">'+
			'<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>'+
			'</circle> </svg>');

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
/**
* MODULE: module1 script
*/

//owlSlider Script

    $(".ove-mainSlider").owlCarousel(
        {
            "items":1, 
            "lazyLoad":true,
            "autoplay":true,
            "dots":true
        }
    );

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
                this.classList.add('modalWindow--hide');
            })

        })
    }
    
    for(var i = 0; i < closers.length; i++){
        closers[i].addEventListener('click',function () {
            this.parentElement.parentElement.classList.add('modalWindow--hide');
        })
    }

}()); 