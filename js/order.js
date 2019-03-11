if (str!== "") {window.addEventListener("load", insertData);}
function insertData() {
  document.getElementById("orderData").telNo.value = getValue(q,"telNo");
  document.getElementById("orderData").pickupDate.value = decodeURIComponent(getValue(q,"pickupDate"));
  var radV = getValue(q,"method");
  var rad = document["orf"]["method"];
  for (var i=0;i<rad.length;i++) {
    if (rad[i].value == radV) {
      rad[i].checked = true;
    }
  }
  orderUpdater();
}

function orderUpdater() {
  var id = document.getElementById("telNo").value;
  document.getElementsByClassName("orderID")[0].innerHTML = id;
}

var description;
function qtyPrompt() {
  var cakes = document.querySelectorAll(".cakeContainer");
  for (var i=0;i<cakes.length;i++) {
    cakes[i].onclick = tempDesc;
  }
}

function tempDesc() {
  description = this.querySelector("img").title;
  askQty();
}

var qty;
function askQty() {
  qty = prompt("Thank you for selecting " + description + ". How many cake(s) would you like to order?");
  qtyCheck();
  function qtyCheck() {
    switch(true) {
      case (isNaN(qty)): //number check
        askQty();
        break;
      case (qty=="" || qty==null || qty=='0'): //no input or null
        alert("Invalid order quantity.");
        break;
      default: //correct
        updateTable();
    }
  }
}

var total = 0; //for sum later
function updateTable() {
  var tbl = document.getElementById("cart"); //table
  var bod = tbl.querySelector("tbody"); //table body
  var wid = tbl.querySelector("thead").querySelectorAll("th").length; //amount of columns
  /* insert row */
  var addRow = bod.insertRow();
  for (var i=0;i<wid;i++) {
    addRow.insertCell();
    addRow.cells[i].innerHTML = this[hdg[i]];
    if (!isNaN(addRow.cells[i].innerHTML)) {
      total += parseInt(addRow.cells[i].innerHTML);
    }
  }
  document.getElementById("orderTotal").innerHTML = total;
}

function checkData() {
  var error = "";
  var oid = document.getElementById("orderData").telNo.value;
  var pdt = document.getElementById("orderData").pickupDate.value;
  return errorCheck();
  function errorCheck() {
    if(oid.trim()=="") {
      error += "<p>Your inputted order number is not valid.</p>";
    }
    if(pdt.trim()=="") {
      error += "<p>Your inputted pick up date is not valid.</p>";
    }
    if(document.getElementById('cart').querySelector('tbody').innerHTML.trim() == '') {
      error += "<p>You have not made a valid order.</p>";
    }
    if(error!==""){
      document.getElementById("errorDivDynamic").innerHTML = error;
      document.getElementById("errorDiv").style.display = "block";
      document.querySelector(".dimPage").style.display = "block";
      document.getElementById("mainContainer").style.opacity = "0.1";
      document.querySelector(".dimPage").addEventListener("click",function() {
        this.style.display = "none";
        document.getElementById("mainContainer").style.opacity = "1";
        document.getElementById("errorDiv").style.display = "none";});
      return false;
    } else {saveInfo();}
  }
}

var storage = window.localStorage;
function saveInfo() {
  var x = document.getElementById("cart").querySelector("tbody").querySelectorAll("tr");
  var ord = [];
  for(var i=0;i<x.length;i++) {
    var info = x[i].querySelectorAll("td");
    var json_out = {};
    for (var n=0;n<info.length;n++) {
      var valPair = info[n].innerHTML;
      json_out[hdg[n]] = valPair;
    }
    ord.push(json_out);
    storage.setItem("items", JSON.stringify(ord));
  }
}

function menuHover() {
    for (i=0; i<document.querySelectorAll('.cakeContainer-img img').length; i++) {
        document.querySelectorAll('.cakeContainer-img img')[i].onmouseover = function () {
            this.style.filter = "blur(1px) grayscale(50%)";
        };
        document.querySelectorAll('.cakeContainer-img img')[i].onmouseout = function () {
            this.style.filter = "blur(0px) grayscale(0%)";
        };
    }
}
