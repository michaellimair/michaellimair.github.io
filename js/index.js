function videoChange() {
  var v=0;
  var jsvideo = document.getElementById("promo-vid").querySelector("video");
  /* Code for Changing Video */
  jsvideo.onended = function() {chg();};
  function chg() {
    v=1-v;
    var vsrc = jsvideo.querySelector("source");
    switch(v) {
      case 0:
        vsrc.src = "http://courses.cs.cityu.edu.hk/cs2204/chocolate.mp4";
        break;
      case 1:
        vsrc.src = "http://courses.cs.cityu.edu.hk/cs2204/cakemaking-s.mp4";
        break;
    }
    setTimeout(function() {jsvideo.load();},5000);
  }
}

function nutritionChange() {
  // Code for Nutrition Slideshow
  var parseData = JSON.parse(JSON.stringify(initMenu()));
  var mn=0;
  var x = document.querySelector("tbody").querySelectorAll("tr");
  var wid = document.querySelector("thead").querySelectorAll("th");
  function changeMenu(n) {
    document.getElementById("cakeInfo").querySelector("img").src = parseData[n].imagefile;
    document.getElementById("cakeInfo").querySelector("h3").innerHTML = parseData[n].description;
    var nInfo = JSON.parse(JSON.stringify(parseData[n].nutrition));
    var sum=0;
    var hdg=[];
    for(var count=0;count<wid.length;count++) {
      hdg.push(wid[count].id);
    }
    for (var a=0;a<x.length;a++) {
      var y = x[a].querySelectorAll("td");
      for (var i=0;i<y.length;i++) {
        y[i].innerHTML = nInfo[a][hdg[i]];
      }
      for (i=0;i<y.length;i++) {
        if (!isNaN(y[i].innerHTML)) {
          sum += parseInt(y[i].innerHTML);
        }
      }
    }
    document.querySelector("tfoot").getElementsByTagName("td")[1].innerHTML = sum;
    mn++;
    if (mn==parseData.length) {
      mn = 0;
    }
  }
  changeMenu(0);
  setInterval(function(){changeMenu(mn);}, 3000);
}
