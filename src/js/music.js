function music() {
  const audio = document.getElementById("MUYU");
  audio.paused ? audio.play() : audio.pause();
}

//打开名单
//判断为Windows还是Linux
if (process.platform == "win32") {
  var listaddress = "/AppData/Roaming/random-roll-call-system";
  var system = "Windows";
}
if (process.platform == "linux") {
  var listaddress = "/.random-roll-call-system";
  var system = "Linux";
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
  //Windows系统 直接调用系统自带的语音合成
  if (system == "Windows") {
    speak(document.getElementById("name").innerHTML, "utf-8");
  }
  //Linux系统 调用espeak
  if (system == "Linux") {
    const { exec } = require("child_process");
    exec(
      "espeak -v zh " + document.getElementById("name").innerHTML,
      (err, stdout) => {
        if (err) {
          //弹出错误信息
          console.error(err);
          var error_dialog = confirm(
            "语音合成失败，请安装espeak\n点击“确定”将会打开终端，你可以使用当前系统拥有包管理器安装espeak。"
          );
          if (error_dialog == true) {
            //打开终端
            const { exec } = require("child_process");
            exec("gnome-terminal");
          }
          return;
        }
      }
    );
  }
}
//通过子窗口打开帮助/关于
function open_help() {
  window.open("./help.html", "_blank", "top=500,frame=false");
}
function open_about() {
  window.open(
    "./about.html",
    "_blank",
    "top=500,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
  );
}
function start_orc() {
  window.open(
    "./orc.html",
    "_blank",
    "top=500,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
  );
}
