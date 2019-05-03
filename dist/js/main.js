var MenuOpen=false;
var pageww = 0;
var pagehh = 0;
var menuSec = 0.8;
var nowtop = 0
var scrolltemp = 0
var traffic_bg_h = 0
var panh = 0
var traffic_offset = 0
var dis_min = 0
var dis_max = 0
var pcmin = 0
var pcmax = 30
var pcsub = pcmax-pcmin
var ogdis_min = 0
var ogdis_max = 0

function pageinit(){
  pageww = $(document).width()
  pagehh = $(document).height()
  TweenLite.to($(".index_sidelabel"), 0.5, { ease: Power2.easeOut, width: 45 });
  $(".index_sidelabel").hover(function() {
    TweenLite.to($(".index_sidelabel"), 0.5, { ease: Power2.easeOut, width: 120 })
  },function(){
    TweenLite.to($(".index_sidelabel"), 0.5, { ease: Power2.easeOut, width: 45 })
  })
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
function initIndexTraffic(){
  traffic_bg_h = $(".traffic_wrapper").height()
  panh = Math.round(traffic_bg_h*0.2)
  traffic_offset = $(".traffic_wrapper").offset().top;
  dis_min = traffic_offset-traffic_bg_h
  dis_max = traffic_offset+traffic_bg_h
  console.log("traffic_bg_h:"+traffic_bg_h);
  console.log("panh:"+panh);
  console.log("dis_min:"+dis_min);
  console.log("dis_max:"+dis_max);
}
function checkIndexAnim(){
  var ww = $(window).width()
  if(ww<=768){
    return
  }
  //console.log("nowtop:"+nowtop)
  var sub = scrolltemp - nowtop
  nowtop = $(window).scrollTop()
  if(nowtop>=dis_min && nowtop<=dis_max){
      var dis = nowtop-dis_min
      var pc = Math.round(dis/panh*100)/100
      var move_dis = traffic_bg_h*pc
      var move_top = 10+pc
      var pcdis = pcmin+(pcsub*pc)
      var pos = "center "+pcdis+"%"
      TweenMax.to($(".traffic_bg"), 0.5, {backgroundPosition:pos, ease:Power1.easeOut});
    }else if(nowtop<dis_min){
      var pos = "center "+pcmin+"%"
      TweenMax.to($(".traffic_bg"), 0, {backgroundPosition:pos, ease:Power1.easeOut});
    }else if(nowtop>dis_max){
      var pos = "center "+pcmax+"%"
      TweenMax.to($(".traffic_bg"), 0, {backgroundPosition:pos, ease:Power1.easeOut});
    }
  scrolltemp = nowtop
}
function initOrganizers(){


}
function checkOrganAnim(){

  scrolltemp = nowtop
}

function checkSideLabel(){
  nowtop = $(window).scrollTop()
  //console.log("nowtop:"+nowtop)
  var side_now = $(".index_sidelabel").offset().top;
  //console.log("side_now:"+side_now)
  var pos = nowtop+($(window).height()*0.6)
  TweenMax.to($(".index_sidelabel"), 1, {top:pos, ease:Power1.easeOut});
}
