//控制音乐播放
function music() {
  const audio = document.getElementById("mokugyo");
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
  window.open("./subpage/help.html", "_blank", "top=500,frame=false");
}
function open_about() {
  window.open(
    "./subpage/about.html",
    "_blank",
    "top=500,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
  );
}
function start_orc() {
  window.open(
    "./subpage/orc.html",
    "_blank",
    "top=500,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
  );
}
//切换全屏状态
function enterFullScreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  }
}

function exitFullScreen() {
  var doc = document;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen();
  }
}
//判断为Windows还是Linux
if (process.platform == "win32") {
  var listaddress = "/AppData/Roaming/random-roll-call-system";
}
if (process.platform == "linux") {
  var listaddress = "/.random-roll-call-system";
}
/**判断文件夹是否存在 */
var folder = require("os").homedir() + listaddress;
var fs = require("fs");
fs.access(folder, fs.constants.F_OK, (the_list) => {
  if (the_list) {
    //创建文件夹
    var fs = require("fs");
    fs.mkdirSync(require("os").homedir() + listaddress);
  } else {
  }
});
/**判断并自动生成list.txt */
var file = require("os").homedir() + listaddress + "/list.txt";
var fs = require("fs");
fs.access(file, fs.constants.F_OK, (the_list) => {
  if (the_list) {
    createList();
    //创建文件
    function createList() {
      const content = decodeURIComponent(
        "%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C%EF%BC%81"
      );
      fs.writeFile(
        require("os").homedir() + listaddress + "/list.txt",
        content,
        (the_list) => {
          if (the_list) {
            console.error(the_list);
            return;
          }
          //文件写入成功。
          start();
        }
      );
    }
  } else {
    start();
  }
});

function start() {
  const path = require("path");
  const fs = require("fs");

  /**读取TXT */
  const filePath = path.join(require("os").homedir(), listaddress, "list.txt");
  fs.readFile(filePath, "utf8", function (err, txt) {
    if (err) {
      console.error(err);
      return;
    }

    /**载入点名 */
    requirejs(["vue"], function (Vue) {
      const begin_name = new Vue({
        el: "#begin_name",
        data() {
          return {
            //布尔值，表示是否允许重复的点名。默认为true
            name_repeat: true,
            //字符串，表示输入的点名字符串。默认为空
            name_text: "",
            //字符串，表示将 name_text 分割成单独的名字的分隔符。
            separator: "\n",
            //数组，表示 name_text 中所有单独的名字。默认为空数组
            all_name: [],
            //数组，表示已经被点过的名字。
            the_called_name: [],
            //数组，表示还没有被点过的名字。
            the_not_called_name: [],
            //字符串，表示当前正在展示的名字。
            the_show_name: "",
            //布尔值，表示是否正在进行点名。
            is_call_start: true,
            //数字，表示点名速度（毫秒）。
            call_speed: 50,
          };
        },
        watch: {
          name_text() {
            const trimmedText = this.name_text.trim();
            const names = trimmedText
              .split(this.separator)
              .map((name) => name.trim())
              .filter((name) => name !== "");
            this.all_name = names;
            this.the_not_called_name = names;
          },
        },
        methods: {
          switch_call_status() {
            if (this.is_call_start) {
              this.is_call_start = false;
              setTimeout(() => {
                this.the_called_name = [this.the_show_name].concat(
                  this.the_called_name
                );
                if (!this.name_repeat) {
                  const index = this.the_not_called_name.indexOf(
                    this.the_show_name
                  );
                  if (index !== -1) {
                    this.the_not_called_name.splice(index, 1);
                  }
                }
              }, this.call_speed);
            } else {
              this.is_call_start = true;
              this.scrollName();
            }
          },
          scrollName() {
            setTimeout(() => {
              const index = Math.floor(
                Math.random() * this.the_not_called_name.length
              );
              this.the_show_name = this.the_not_called_name[index];
              if (this.is_call_start) {
                this.scrollName();
              }
            }, this.call_speed);
          },
          call_start() {
            this.name_text = txt;
            this.is_call_start = true;
            this.the_called_name = [];
            setTimeout(() => {
              this.scrollName();
            }, 100);
          },
        },
        mounted() {
          this.call_start();
        },
      });
    });
  });
}
//请求一言API替换colorful-text文本
function get_hitokoto() {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "https://v1.hitokoto.cn/?c=a&c=b&c=c&c=d&c=e&c=f&c=g");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      document.getElementById("colorful-text").innerHTML = data.hitokoto;
    } else {
      document.getElementById("colorful-text").innerHTML = "你所热爱的，就是你的生活。";
    }
  };
  xhr.send();
}
get_hitokoto();
