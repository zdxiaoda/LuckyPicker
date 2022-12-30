function music() {
  var audio = document.getElementById("MUYU");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
//打开名单
//判断为Windows还是Linux
if (navigator.appVersion.indexOf("Win") != -1) {
  var listaddress = "/AppData/Roaming/random-roll-call-system";
}
if (navigator.appVersion.indexOf("Linux") != -1) {
  var listaddress = "/.random-roll-call-system";
}
function edittxt() {
  const { shell } = require("electron");
  shell.openPath(require("os").homedir() + listaddress + "/list.txt");
}
function speaker() {
  function speak(sentence) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    window.speechSynthesis.speak(utterance);
  }
  speak(document.getElementById("name").innerHTML, "utf-8");
}
//通过子窗口打开帮助/关于
function open_help() {
  window.open("./help.html", "_blank", "top=500,left=200,frame=false");
}
function open_about() {
  window.open(
    "./about.html",
    "_blank",
    "top=500,left=200,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
  );
}
function start_orc() {
  window.open(
    "./orc.html",
    "_blank",
    "top=500,left=200,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
  );
}
