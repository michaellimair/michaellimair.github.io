var hdg=[];
window.addEventListener("load",pushHeading);
function pushHeading() {
  var thd = document.getElementById("cart").querySelector("thead").querySelectorAll("th");
  for(var i=0;i<thd.length;i++) {
    hdg.push(thd[i].id);
  }
}
