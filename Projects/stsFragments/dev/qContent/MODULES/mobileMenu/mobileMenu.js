/**
* MODULE: mobileMenu script
*/
;  $(document).ready(function() {
   $("#mobileMenu").mmenu({
         "extensions": [
            "fullscreen",
             "position-front",
         ],
          "navbars": [
            {
               "content": [
                  "searchfield"
               ]
            },
            {
               
               "content": [
                  "close"
               ]
            }
         ]
      }, {
         // configuration
         offCanvas: {
            pageSelector: "#js-wrapper",
           
         }
      });
      var API = $("#mobileMenu").data( "mmenu" );
        $("#mm-button").click(function() {
         API.open();
      });
   });
   
   
			