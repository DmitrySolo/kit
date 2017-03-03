//sideBar Script
$('.menu-hamburger__partsWrap').click(function () {
    $('.sideBar').animate({
        left: "0"
    }, 400);
});
$('.icon--close').click(function () {
    $('.sideBar').animate({
        left: "-100%"
    }, 200);
});