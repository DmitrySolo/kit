//FORM VALIDATE

var validate = function () {

    var valid = true;
    var name=document.forms["subscribe"]["name"].value;
    var email=document.forms["subscribe"]["email"].value;
    if (! validator.isAlpha(name)){
        console.log('noname');
        if (valid) valid =false;
        $('#js_val_name').html('Введите имя!').css('color','red')
    }else{$('#js_val_name').html('')}
    if (! validator.isEmail(email)){
        console.log('NOMAIL');
        if (valid) valid =false;
        $('#js_val_email').html('Неверный адрес!').css('color','red')
    }else{{$('#js_val_email').html('')}}
    return valid
}