// Element: dashBoardElement script.

 $(document).ready(      
     function () {
          $('#js-switchShopState').on('change',function(){
            if( $(this).is(':checked') ) {
                $('.mop_row').hide()
                qntSetCookie('shopState','true', 1000)
            }else{
               $('.mop_row').show()
               qntSetCookie('shopState','', -1)
            }
 })
     }
     )
