var MenuOpen=false;
var pageww = 0;
var pagehh = 0;
var menuSec = 0.8;

function pageinit(){
  pageww = $(document).width()
  pagehh = $(document).height()
}
function checkMenu(){
  var menu_w = $(".mobile_darkbg").width()
  if(MenuOpen){
    MenuOpen=false
    closeMenu(menu_w)
  }else{
    MenuOpen=true
    openMenu()
  }
}
function openMenu(){
  showMask()
  var menu = $(".mobile_darkbg")
  TweenLite.to(menu, menuSec, { ease: Power2.easeOut, right: 0 });
}
function closeMenu(_ww){
  hideMask()
  var menu = $(".mobile_darkbg")
  var pos = _ww*(-1)
  TweenLite.to(menu, menuSec, { ease: Power2.easeOut, right: pos });
}
function showMask(){
  var mask = $(".pagemask")
  mask.css("display","block")
  mask.css("opacity",0)
  TweenLite.to(mask, menuSec, { ease: Power2.easeOut, autoAlpha: 100 });
}
function hideMask(){
  var mask = $(".pagemask")
  TweenLite.to(mask, menuSec, { ease: Power2.easeOut, autoAlpha: 0 });
}
