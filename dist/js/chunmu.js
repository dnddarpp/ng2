var nowfloor = ""
var nowarea = ""
var area_ary=[]
var clean_event = [28000,36000,42000,56000]
var food_event = [4000,6000,8000,10000]
var ary_event = []
ary_event["1f"] = {"P+Q":[130000,164000,40000,40000],"P":[65000,82000,20000,20000],"Q":[65000,82000,20000,20000]}
ary_event["4f"] = {"R+S":[130000,164000,40000,40000],"R":[65000,82000,20000,20000],"S":[65000,82000,20000,20000]}
ary_event["7f"] = {"701全室":[92500,120250]}
var kitchen_price = "100000";
var ap1 = 0
var ap2 = 0
var ap3 = 0
var ap4 = 0
var st1 = 0
var ed1 = 0
var st2 = 0
var ed2 = 0
var st3 = 0
var ed3 = 0
var step_num = 0
$( document ).ready(function() {
  init()
  $(".cjoin").click(function(){
    var ttall = 0
    $(".ttnum").each(function(){
      var tmp = $(this).data("num")
      console.log("tmp:"+tmp);
      ttall+=Number(tmp)
    })
    //檢查使用幾個區域
    $(".ttt").each(function(){
      var area = $(this).data("area")
      if(area.indexOf("+")>=0){
        var tmp = area.split("+")
        for(var i=0;i<tmp.length;i++){
          area_ary.push(tmp[i])
        }
      }else{
        area_ary.push(area.toString())
      }
    })
    area_ary.sort()
    area_ary = jQuery.unique(area_ary)
    //console.log("area_ary:"+area_ary);
    //場地清潔費
    var clean1 = Number(clean_event[area_ary.length])
    if($('input[type=radio][name=food]').val()=="1"){
      //餐會清潔費
      clean1 += Number(food_event[area_ary.length])
    }
    if($('input[type=radio][name=kitchen]').val()=="1"){
      //廚房使用費
      clean1 += Number(kitchen_price)
    }
    console.log("clean1:"+clean1);
    var p1 = ttall
    var p2 = Math.round(p1*0.05)
    var p3 = p1+p2
    var p4 = clean1
    var p5 = Math.round(p3*0.4)
    var p6 = Math.round(p3*0.6)
    var p7 = Math.round(p3*0.2)
    if(p7<400000){
      p7 = 400000
    }
    $("#v1").html("$"+addCommas(p1))
    $("#v2").html("$"+addCommas(p2))
    $("#v3").html("$"+addCommas(p3))
    $("#v4").html("$"+addCommas(p4))
    $("#v5").html("$"+addCommas(p5))
    $("#v6").html("$"+addCommas(p6))
    $("#v7").html("$"+addCommas(p7))
    $(".finaltotal").show()
  })
  $('input[type=radio][name=food]').change(function() {
    if($(this).val()=="1"){
      $(".pkitchen").show()
    }else{
      $(".pkitchen").hide()
    }
  })
  $('input[type=radio][name=floor]').change(function() {
    var id = $(this).val()
    nowfloor = id
    initArea(id)
  })
  $(".mdi-delete").click(function(){
    var tt = $(this).data("tt")
    console.log("tt:"+tt);
  })
  //進場
  $("#ab1").click(function(){
    if($("#datepicker1").val()==""){
      alert("請選擇進場日期")
      return
    }
    if($("#st1").val()==""){
      alert("請選擇進場開始時間")
      return
    }
    if($("#ed1").val()==""){
      alert("請選擇進場結束時間")
      return
    }
    if(Number($("#st1").val())>=Number($("#ed1").val())){
      alert("進場開始時間必需大於結束時間")
      return
    }
    addStep1($("tbody.step1"))
  })
  $("#ab2").click(function(){
    if($("#datepicker2").val()==""){
      alert("請選擇進場日期")
      return
    }
    /*if($("#datepicker2").val()<$("#datepicker1").val()){
      alert("請選活動日期必需大於或等於進場日期")
      return
    }*/
    if($("#st2").val()==""){
      alert("請選擇活動開始時間")
      return
    }
    if($("#ed2").val()==""){
      alert("請選擇活動結束時間")
      return
    }
    if(Number($("#st2").val())>=Number($("#ed2").val())){
      alert("活動結束時間必需大於開始時間")
      return
    }
    addStep2()
  })
  $("#ab3").click(function(){
    if($("#datepicker3").val()==""){
      alert("請選擇進場日期")
      return
    }
    if($("#st3").val()==""){
      alert("請選擇進場開始時間")
      return
    }
    if($("#ed3").val()==""){
      alert("請選擇進場結束時間")
      return
    }
    if(Number($("#st3").val())>=Number($("#ed3").val())){
      alert("撒場開始時間必需大於結束時間")
      return
    }
    addStep1($("tbody.step3"))
  })
  $("#ad1").click(function(){
    $("tbody.step1").html("")
  })
  $("#ad2").click(function(){
    $("tbody.step2").html("")
  })
  $("#ad3").click(function(){
    $("tbody.step3").html("")
  })
  initArea("1f")
})
function init(){
  $( "#datepicker1" ).datepicker({ minDate: 0, dateFormat: "yy-mm-dd", onSelect: function(dateText, inst) {
    var date = new Date(dateText);
    daynum1 = date.getUTCDay()
    console.log("daynum1:"+daynum1);
  } })
  $( "#datepicker2" ).datepicker({ minDate: 0, dateFormat: "yy-mm-dd", onSelect: function(dateText, inst) {
    var date = new Date(dateText);
    daynum2 = date.getUTCDay()
    console.log("daynum2:"+daynum2);
  } })
  $( "#datepicker3" ).datepicker({ minDate: 0, dateFormat: "yy-mm-dd", onSelect: function(dateText, inst) {
    var date = new Date(dateText);
    daynum3 = date.getUTCDay()
    console.log("daynum3:"+daynum3);
  } })

}
function addStep1(_obj){
  var str_table = ""
  st1 = Number($("#st1").val())
  ed1 = Number($("#ed1").val())
  console.log("nowarea:"+nowarea);
  var diff = 7
  //如果進場時間早於7點的話
  if(st1<diff && ed1<=diff){
    //如果開始和結束都在7點以前
    pp = ap3
    step_num++;
    tmp1 = ed1-st1
    var total1 = pp*tmp1
    console.log("tmp1:"+tmp1);
    console.log("total1:"+total1);
    step_num++;
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+$( "#datepicker1").val()+"</td>"
    str_table +="<td>0"+st1+":00-0"+ed1+":00</td>"
    str_table +="<td>00:00-07:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp1+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total1+"\">$"+addCommas(total1)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\" ></i></td>"
    str_table +="</tr>"
  }else if(st1<diff && ed1>diff){
    //如果進場小於7點，而結束大於7點
    //拆成兩組
    pp = ap3
    step_num++;
    tmp1 = diff-st1
    var total1 = pp*tmp1
    console.log("tmp1:"+tmp1);
    console.log("total1:"+total1);
    step_num++;
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+$( "#datepicker1").val()+"</td>"
    str_table +="<td>"+(('0' + st1).slice(-2))+":00-07:00</td>"
    str_table +="<td>00:00-07:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp1+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total1+"\">$"+addCommas(total1)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\" ></i></td>"
    str_table +="</tr>"

    pp = ap4
    step_num++;
    tmp2 = ed1-diff
    var total2 = pp*tmp2
    console.log("tmp2:"+tmp2);
    console.log("total2:"+total2);
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+$( "#datepicker1").val()+"</td>"
    str_table +="<td>07:00-"+(('0' + ed1).slice(-2))+":00</td>"
    str_table +="<td>07:00-24:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp2+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total2+"\">$"+addCommas(total2)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\"></i></td>"
    str_table +="</tr>"
  }else{
    //如果開始和結束時間都大於7點
    pp = ap4
    step_num++;
    tmp2 = ed1-st1
    var total2 = pp*tmp2
    console.log("tmp2:"+tmp2);
    console.log("total2:"+total2);
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+$( "#datepicker1").val()+"</td>"
    str_table +="<td>"+(('0' + st1).slice(-2))+":00-"+(('0' + ed1).slice(-2))+":00</td>"
    str_table +="<td>07:00-24:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp2+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total2+"\">$"+addCommas(total2)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\" ></i></td>"
    str_table +="</tr>"
  }

  _obj.append(str_table)
  var ttall = 0
  $(".ttnum").each(function(){
    var tmp = $(this).data("num")
    console.log("tmp:"+tmp);
    ttall+=Number(tmp)
  })
  console.log("ttall:"+ttall);
  initDelete()
}
function addStep2(){
  var date = $( "#datepicker1").val()
  var str_table = ""
  var holiday = ""
  st1 = Number($("#st2").val())
  ed1 = Number($("#ed2").val())
  var diff = 18
  if(daynum2>=6){
    ap1 *=1.2
    ap2 *=1.2
    date += "(假日)"
  }
  //如果進場時間早於7點的話
  if(st1<diff && ed1<=diff){
    //如果開始和結束都在7點以前
    pp = ap1
    step_num++;
    tmp1 = ed1-st1
    var total1 = pp*tmp1
    console.log("tmp1:"+tmp1);
    console.log("total1:"+total1);
    step_num++;
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+date+"</td>"
    str_table +="<td>"+(('0' + st1).slice(-2))+":00-"+(('0' + ed1).slice(-2))+":00</td>"
    str_table +="<td>07:00-18:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp1+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total1+"\">$"+addCommas(total1)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\" ></i></td>"
    str_table +="</tr>"
  }else if(st1<diff && ed1>diff){
    //如果進場小於18點，而結束大於18點
    //拆成兩組
    pp = ap1
    step_num++;
    tmp1 = diff-st1
    var total1 = pp*tmp1
    console.log("tmp1:"+tmp1);
    console.log("total1:"+total1);
    step_num++;
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+date+"</td>"
    str_table +="<td>"+(('0' + st1).slice(-2))+":00-18:00</td>"
    str_table +="<td>07:00-18:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp1+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total1+"\">$"+addCommas(total1)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\" ></i></td>"
    str_table +="</tr>"

    pp = ap2
    step_num++;
    tmp2 = ed1-diff
    var total2 = pp*tmp2
    console.log("tmp2:"+tmp2);
    console.log("total2:"+total2);
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+date+"</td>"
    str_table +="<td>18:00-"+(('0' + ed1).slice(-2))+":00</td>"
    str_table +="<td>18:00-23:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp2+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total2+"\">$"+addCommas(total2)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\"></i></td>"
    str_table +="</tr>"
  }else{
    //如果開始和結束時間都大於7點
    pp = ap2
    step_num++;
    tmp2 = ed1-st1
    var total2 = pp*tmp2
    console.log("tmp2:"+tmp2);
    console.log("total2:"+total2);
    str_table +="<tr data-tt='"+step_num+"' data-area='"+nowarea+"' class='ttt'>"
    str_table +="<td>"+date+"</td>"
    str_table +="<td>"+(('0' + st1).slice(-2))+":00-"+(('0' + ed1).slice(-2))+":00</td>"
    str_table +="<td>18:00-23:00</td>"
    str_table +="<td>"+addCommas(pp)+"</td>"
    str_table +="<td>"+tmp2+"</td>"
    str_table +="<td class=\"ttnum\" data-num=\""+total2+"\">$"+addCommas(total2)+"</td>"
    str_table +="<td><i class=\"mdi mdi-delete godelete\" ></i></td>"
    str_table +="</tr>"
  }

  $("tbody.step2").append(str_table)
  var ttall = 0
  $(".ttnum").each(function(){
    var tmp = $(this).data("num")
    console.log("tmp:"+tmp);
    ttall+=Number(tmp)
  })
  console.log("ttall:"+ttall);
  initDelete()
}
function initTime1(){
  var str = '<option value="">==請選擇==</option>'
  for(var i=0;i<=24;i++){
    var time = ('0' + i).slice(-2)+":00"
    str += '<option value="'+i+'">'+time+'</option>'
  }
  return str
}
function initTime2(){
  var str = '<option value="">==請選擇==</option>'
  for(var i=7;i<=23;i++){
    var time = ('0' + i).slice(-2)+":00"
    str += '<option value="'+i+'">'+time+'</option>'
  }
  return str
}
function initArea(id){
  nowfloor = id
  var ary = ary_event[id]
  var str_inp=""
  var count = 0
  for(var i in ary){
    if(count==0){
        nowarea = i
        str_inp+='<span class="event_inp"><input name="ffarea" type="radio" value="'+i+'" checked />'+i+'</span>'
        ap1 =ary_event[id][i][0]
        ap2 =ary_event[id][i][1]
        ap3 =ary_event[id][i][2]
        ap4 =ary_event[id][i][3]
    }else{
        str_inp+='<span class="event_inp"><input name="ffarea" type="radio" value="'+i+'" />'+i+'</span>'
    }
    count++
  }
  switch(id){
    case "1f":
    case "4f":
      $("#st1").html(initTime1())
      $("#ed1").html(initTime1())
      $("#st2").html(initTime2())
      $("#ed2").html(initTime2())
      $("#st3").html(initTime1())
      $("#ed3").html(initTime1())
    break
    case "7f":
    break
  }
  $(".ffarea").html(str_inp)
  $('input[type=radio][name=ffarea]').change(function() {
    var aid = $(this).val()
    nowarea = aid
    console.log("aid:"+aid);
    console.log("nowfloor:"+nowfloor);
    switch(nowfloor){
      case "1f":
      case "4f":
      ap1 =ary_event[nowfloor][aid][0]
      ap2 =ary_event[nowfloor][aid][1]
      ap3 =ary_event[nowfloor][aid][2]
      ap4 =ary_event[nowfloor][aid][3]


      console.log("ap1:"+ap1);
      break
      case "701全室":
      console.log("!!!!701全室");
      break
    }
  })
}
function initDelete(){
  console.log("initDelete");
  $(".godelete").click(function(){
    $(this).parent().parent().remove()
  })
}
function goDelete(_id){
  console.log("goDelete:"+_id);
}
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
