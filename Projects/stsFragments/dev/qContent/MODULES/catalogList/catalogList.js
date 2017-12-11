/**
* MODULE: catalogList script
*/

(function(){
	var selectorIdPrefix = 'js_showSub',
	selectorsArr = document.querySelectorAll('.catalogList__categoryItem'),
	targetsArr = document.querySelectorAll('.catalogList__SublistItem'),
	lastTarget = false,
	target,
	selectedBy,
	gogo;   

 
	for(var i = 0; i<selectorsArr.length; i++ ){ 
        
		selectorsArr[i].addEventListener('mouseenter',function (e) {
			var _this = this;
			   
		    gogo = setTimeout(function(){

				    var showNum = _this.getAttribute('id').split('__')[1];
				    target = document.getElementById('js_sub__'+showNum);
					
					if(target){
						if(lastTarget){
							lastTarget.style.display = 'none';
							}
							target.style.display = 'block';
							lastTarget = target;
							
						}


		}, 300);

   

		})

		selectorsArr[i].addEventListener('mouseleave',function (e) {
			clearTimeout(gogo);
		})
	} 
	for(var i = 0; i<targetsArr.length; i++ ){
	    
	    targetsArr[i].addEventListener('mouseenter',function (e) {
            var selectNum = this.getAttribute('id').split('__')[1];
		     selectedBy = document.getElementById('js_showSub__'+selectNum);
	            selectedBy.classList.add('catalogList__categoryItem--hovered');
	    });
	    targetsArr[i].addEventListener('mouseleave',function (e) {
	        selectedBy.classList.remove('catalogList__categoryItem--hovered');
	        //this.style.display = 'none';
	    });
	}
}());
