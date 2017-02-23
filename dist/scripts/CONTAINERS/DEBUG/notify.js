$('*').click(function () {
    $(this).notify(this.className);
    event.stopPropagation();
})
