//sideBar Script
$('.menu-hamburger__partsWrap').click(function () {
    $('.sideBar').animate({
        left: "0"
    }, 400);
});
$('.sideBar__closer').click(function () {
    $('.sideBar').animate({
        left: "-100%"
    }, 200);
});