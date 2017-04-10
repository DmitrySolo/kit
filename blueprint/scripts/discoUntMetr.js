//discountMetr Script

// Init Vars
var  maxScale = 20000,
    currCartSize = $('.testCart').text().replace(/[^0-9$.,]/g, ''),

    scale = $('.discountMetr__scale_inner');
console.log(currCartSize);
// Get Percentage on change

var percent =  (currCartSize / maxScale) * 100 + '%';

scale.css('width',percent);

// Activ Anim ,toggle css