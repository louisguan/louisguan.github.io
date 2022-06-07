$(document).bind('mousemove', function(e){
    $('.circle').css({
       top: e.pageY + 20,
      "margin-left": e.pageX + 20
    });
});
document.body.style.cursor = 'none';