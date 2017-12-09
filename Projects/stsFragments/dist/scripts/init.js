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

    
    
}())

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

// Element: b1 script.

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
