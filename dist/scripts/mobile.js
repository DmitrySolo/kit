//sideBar Script
$('.icon-menu__button').click(function () {
    $('.sideBar').animate({
        left: "0"
    }, 400);
});
$('.icon--close').click(function () {
    $('.sideBar').animate({
        left: "-100%"
    }, 200);
});