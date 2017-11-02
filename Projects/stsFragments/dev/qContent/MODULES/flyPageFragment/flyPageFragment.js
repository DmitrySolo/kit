/**
* MODULE: flyPageFragment script
*/

var func = function(){
	return true;
};
var onload = function(){
	return true;
};

$('.toOrder.active').on('mousedown',function () {
	if(!$(this).hasClass('succes')){
		$(this).removeClass('active');
	if(onload()){
		$(this).html('<svg width="50px"  height="50px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;">'+
			'<circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#ffb175" stroke-width="12" r="18" stroke-dasharray="84.82300164692441 30.274333882308138" transform="rotate(186 50 50)">'+
			'<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>'+
			'</circle> </svg>');

		return
	}
	if(func()){
		$(this).addClass('succes').text('В заявке').wrap('<a href="/index.html"></a>');
	}else{
		$(this).text('Ошибка');
		$(this).addClass('active');
	}

	}

})