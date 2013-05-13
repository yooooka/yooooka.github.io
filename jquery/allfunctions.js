
jQuery.noConflict()( function($) {
var j$ = jQuery;

// Slider Menu 	
window.onload = function () {
    var container = $('div.sliderGallery');
    var ul = $('ul', container);
    
    var itemsWidth = ul.innerWidth() - container.outerWidth();
    $('.slider', container).slider({
        min: 0,
        max: itemsWidth,
        handle: '.handle',
        stop: function (event, ui) {
            ul.animate({'left' : ui.value * -1}, 500);
        },
        slide: function (event, ui) {
            ul.css('left', ui.value * -1);
        }
    });
};
// Rounded corner for IE 

$(function(){
$(".rounded").corner("6px")
});

});

// Next and Previous navi Websites

function nextPg(step) {
  var str = window.location.href;
  if(pNum = str.match(/(\d+)\.shtml/i)){
    pNum = pNum[1] * 1 + step+'';
	if ((pNum< 1) || (pNum > 44)) { pNum = "0"+45; }
	 else { pNum = "000".substr(0, 3-pNum.length)+pNum; }
      window.location = str.replace(/\d+\.shtml/i, pNum+'.shtml');   
  }
} 

// Next and Previous navi Graphics and others

function nextPgG(step) {
  var str = window.location.href;
  if(pNum = str.match(/(\d+)\.shtml/i)){
    pNum = pNum[1] * 1 + step+'';
	if ((pNum< 1) || (pNum > 27)) { pNum = "0"+28; }
	 else { pNum = "000".substr(0, 3-pNum.length)+pNum; }
      window.location = str.replace(/\d+\.shtml/i, pNum+'.shtml');   
  }
} 


//function nextPg(step) {
//  var str = window.location.href;
//  if(pNum = str.match(/(\d+)\.shtml/i)){
//    pNum = pNum[1] * 1 + step+'';
//    if(pNum>0){
//      pNum = "000".substr(0, 3-pNum.length)+pNum; }  
//      window.location = str.replace(/\d+\.shtml/i, pNum+'.shtml');
// }
//} 
