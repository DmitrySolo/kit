//discountMetr Script

// Init Vars
 var  maxScale = 20000,
     currCartSize = $('.testCart').text(),
     scale = $('.discountMetr__scale_inner');

// Get Percentage on change

var percent =  (currCartSize / maxScale) * 100 + '%';

    console.log(percent);

// Activ Anim ,toggle css


