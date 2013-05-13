$(function () {

  /* fancy box*/
  $("a.[rel=lm], a.[rel=am], a.[rel=em]").fancybox();
  $("a.group").filter(':not(.notfancy)').fancybox();

  var $tabs = $('#btns li');
  var $panes = $('a.group');

  /* toggle*/

  $tabs.click(function(e) {
    var $that = $(this);
    var activeIndex = $that.index();
    $that.toggleClass('active').siblings().removeClass('active');
    
    $('a.group')
      .eq(activeIndex)
      .siblings('a.group')
      .children('img')
      .removeClass('active')
      .animate({ top: "hide", opacity: "hide"}, "slow");

    $('a.group img')
      .toggleClass('active')
      .eq(activeIndex)
      .animate({top: "toggle", opacity: "toggle"}, "slow");
  });

  $(window).keyup(function(e){
    var activeIndex = $tabs.filter('.active').index();
    var fancyIsVisbible = $('#fancybox-content').is(":visible");
    if (e.keyCode == 32) {
      // advance slides
      if (fancyIsVisbible || activeIndex===-1 || $panes.eq(activeIndex).hasClass('notfancy')) {
        var offset = Math.max(0, $tabs.filter('.active').offset().left - 150);
        $('html, body').animate({scrollLeft: offset}, 2000);

        $('#fancybox-overlay').trigger('click');
        $tabs.eq((activeIndex+1) % $tabs.length).trigger('click');
      } else {
        $panes.eq(activeIndex).trigger('click');
      }
    } else if (e.keyCode == 27 && activeIndex >= 0) {
      // backup slides
      if (fancyIsVisbible) {
        $('#fancybox-overlay').trigger('click');
      } else {
        var offset = Math.max(0, $tabs.filter('.active').offset().left - 150);
        $('html, body').animate({scrollLeft: offset}, 2000);

        $tabs.eq(activeIndex-1).trigger('click');
        $panes.eq(activeIndex-1).trigger('click');
      }
    }
  });
});
