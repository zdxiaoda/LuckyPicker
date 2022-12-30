//获取当前版本号
var local_version = require("../package.json");
//获取最新版本号
var url = "https://cdn.zhangda.xyz/random-roll-call-system/version.json";
var request = new XMLHttpRequest();
request.open("get", url);
request.send(null);
request.onload = function () {
  if (request.status == 200) {
    var cloud_version = JSON.parse(request.responseText);
    for (var i = 0; i < cloud_version.length; i++) {}
    //比较版本号
    if (local_version.version < cloud_version.latest_version) {
      window.open(
        "./showupdate.html",
        "_blank",
        "width=521,height=325,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
      );
    } else {
    }
  } else {
  }
};
