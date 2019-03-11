var str = window.location.search;
var q = str.substring(1);

function getValue(s,name) {
  var qstr = s.split("&");
  for (var i=0;i<qstr.length;i++) {
    var qspl = qstr[i].split("=");
    if (qspl[0] == name) {
      return qspl[1];
    }
  }
}
