/**
* MODULE: catalogList script
*/

(function(){
    
    var catHeader = document.getElementsByClassName('catalog__by'),
    catChoiser = document.querySelector('#js-CatChoiser'),
    brandChoiser = document.querySelector('#js-BrandChoiser'),
    catShadow = document.querySelector('#js_catShadow'),
    brands = document.querySelector('#js_brands'),
    categories = document.querySelector('#js_categories'),
    topBar = document.querySelector('.topBar'),
    catalogLists = document.querySelectorAll('.catalogList__categorySublist'),
    targetsArr = document.querySelectorAll('.catalogList__SublistItem'),
    hideMenu = function(){
        console.log('hide')
        categories.style.display = 'none';
        categories.style.opacity = '0'; 
        brands.style.display = 'none';
        brands.style.opacity = '0';
        if(catShadow){
            catShadow.style.display = 'none';
            catShadow.style.opacity = '0';
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
       if(!e.relatedTarget.classList.contains('catalogList__SublistItem') && !this.contains(e.relatedTarget)){
                hideMenu();
            };
    })
    brands.addEventListener('mouseout',function (e) {
       if(!this.contains(e.relatedTarget)){
                hideMenu();
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
              hideMenu();
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
    catShadow = document.querySelector('#js_catShadow');
 
	for(var i = 0; i<selectorsArr.length; i++ ){ 
        
		selectorsArr[i].addEventListener('mouseenter',function (e) {
			var _this = this;
		//	catShadow.style.display = 'block';
         //   catShadow.style.opacity = '1';
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
              hideMenu()
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
	           
       if( !e.relatedTarget.classList.contains('catalogList__categoryItem')){
               this.style.display = 'none';
            };
       
	    });
	}
}());
