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
