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
        if(scrolled > 1900){
            $("#js-up").css('display','block');
        }else{
            $("#js-up").css('display','none');
        }
        
    }else{
         topBar.classList.remove('topBar--fixed');
    }

    
} 