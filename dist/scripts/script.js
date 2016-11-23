$(function () {
    var sassToJsDataEl = $('.sassTojs-data');
    var sassToJsData = sassToJsDataEl.sassToJs();
    sassToJsDataEl.html(JSON.stringify(sassToJsData));

    //////////////////////////////ANIMATION
   if(sassToJsData.animationData.length != 0) {
       $.each(sassToJsData.animationData, function(index, value){
           $(value.trigger).click(function(){
               if(value.trigger == value.target) {$(this).toggleClass(value.changer.slice(1));
               }
               else{$(value.target).toggleClass(value.changer.slice(1));}
           })
       })

   }
   //////////////////////////////////////OTHER......
})