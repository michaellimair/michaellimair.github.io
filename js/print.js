document.addEventListener("touchstart", function(){}, true);

function insertData() {
  document.querySelector(".orderID").innerHTML = getValue(q,"telNo");
  document.querySelector(".pickupDate").innerHTML = decodeURIComponent(getValue(q,"pickupDate"));
  var rad = getValue(q,"method");
  var met = document.querySelector(".method");
  switch (rad) {
    case ("Delivery"):
      met.innerHTML = "Delivery";
      break;
    case ("pickUp"):
      met.innerHTML = "Pick Up";
      break;
  }
}

//event listener
window.addEventListener("load", updateTable);
var storage = window.localStorage;

function updateTable() {
  var tbl = document.querySelector("table");
  var bod = tbl.querySelector("tbody"); //table body
  var wid = tbl.querySelector("thead").querySelectorAll("th").length; //amount of columns
  /* insert row */
  var items = JSON.parse(storage.getItem("items"));
  if (items==null) {return false;}
  var cakeName, qt, pr;
  var parseData = JSON.parse(JSON.stringify(initMenu()));
  var totalq = 0;
  var totalp = 0;
  for (var n=0;n<items.length;n++) {
    cakeName = items[n].description;
    qt = items[n].qty;
    var addRow = bod.insertRow();
    for (var count=0;count<parseData.length;count++) {
      if (cakeName==parseData[count].description) {
        pr = parseInt(parseData[count].price) * parseInt(qt);
        break;
      }
    }
    for (var i=0;i<wid;i++) {
      addRow.insertCell();
      addRow.cells[i].innerHTML = eval(hdg[i]);
      if (hdg[i]=="qt") {
        totalq += parseInt(addRow.cells[i].innerHTML);
      }
      if (hdg[i]=="pr") {
        totalp += parseInt(addRow.cells[i].innerHTML);
      }
    }
  }
  document.getElementById("total_qty").innerHTML = totalq;
  document.getElementById("total_price").innerHTML = totalp;
}

//event listener
window.addEventListener("load", function() {
  document.getElementById("clr").addEventListener("click",clearAndRedir);
});

function clearAndRedir() {
  storage.clear();
  window.location.href = "index.html";
}
