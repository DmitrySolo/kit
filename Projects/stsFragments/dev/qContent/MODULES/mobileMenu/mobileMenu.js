/**
* MODULE: mobileMenu script
*/
;  $(document).ready(function() {
   $("#mobileMenu").mmenu({
         "extensions": [
            
             "position-front",
         ],
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
     (function( $ ) {
         var _PLUGIN_ = 'mmenu';
         $[ _PLUGIN_ ].i18n({
            'Search': 'Искать',
            'Menu':'Каталог' 
         });
      })( jQuery );
   
   
			