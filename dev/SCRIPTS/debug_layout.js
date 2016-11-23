/**
 * Created by Sol on 16.10.2016.
 */
$(function(){
    var elements = ['ul','h1,h2,h3,h4,h5,h6','li','.container','.block'];

    $.each(elements, function( index, elem ) {
        var mt = $(elem).css('margin-top');
        var ml = $(elem).css('margin-left');
        var mb = $(elem).css('margin-bottom');
        var mr = $(elem).css('margin-right');
        $(elem).parent().css("position","relative");
        if(mb !='0px')
        $(elem).after( "<span style='bottom: 0; left: 45%;' class='debug-margins'>&#x2193;"+mb+"</span>" ).css("position","relative");
        if(ml !='0px')
        $(elem).after( "<span style='bottom: 50%; left: 0%;' class='debug-margins'>&#x2190;"+ml+"</span>" ).css("position","relative");
        if(mt !='0px')
        $(elem).after( "<span style='top: 0%; left: 45%;' class='debug-margins'>&#x2191;"+mt+"</span>" ).css("position","relative");
        if(mr !='0px')
        $(elem).after( "<span style='top: 50%; right: 0%;' class='debug-margins'>"+mr+"&#x2192;</span>" ).css("position","relative");

    })



    }
);
