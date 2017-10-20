/**
* MODULE: flyPageFragment script
*/

var func = function(){
    return true;
}

$('.toOrder.active').on('mousedown',function () {
    if(!$(this).hasClass('succes')){
        $(this).removeClass('active')
    
    if(func()){
        $(this).addClass('succes').text('В заявке').wrap('<a href="/index.html"></a>');
    }else{
        $(this).text('Ошибка');
        $(this).addClass('active');
    }
    
    }
    
})