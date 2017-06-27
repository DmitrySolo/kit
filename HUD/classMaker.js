$('.classMaker').draggable()
$('#saveClass').on('click',function () {
    var elCName = '';
    var block = $('input[name="block"]').val(),
        element = $('input[name="element"]').val(),
        modifier = $('input[name="modifier"]').val(),
        optional = $('input[name="optionalClass"]').val();
        prefix = 'ta';
    if (block.length > 1){
        elCName +=  prefix+'-'+block;
    }
    if (element.length > 1){
        elCName +='__'+element;
    }
    if (modifier.length > 1) {
        elCName +='--'+modifier;
    }
    console.log(elCName)
    frameEl('.debugElement').addClass(elCName);



})