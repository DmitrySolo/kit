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
