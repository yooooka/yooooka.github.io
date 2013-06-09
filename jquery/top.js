// Top thumbnails
$(function() {
    // OPACITY OF BUTTON SET TO 0%
    $("#topthumb_web li img, #topthumb_go li img").css("opacity","0");
    // ON MOUSE OVER
    $("#topthumb_web li img, #topthumb_go li img").hover(function () {
        // SET OPACITY TO 100%
        $(this).stop().animate({opacity: 1.0}, "normal");
    },
    // ON MOUSE OUT
    function () {
        // SET OPACITY BACK TO 00%
        $(this).stop().animate({opacity: 0}, "normal");
    });
});
