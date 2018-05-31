// Element: upButton script.

$("#js-up").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;  
});