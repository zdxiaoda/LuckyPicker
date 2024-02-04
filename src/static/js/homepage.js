/**定义当前系统参数 */
if (process.platform == "win32") {
  var listaddress = "/AppData/Roaming/LuckyPicker";
  var system = "Windows";
}
if (process.platform == "linux") {
  var listaddress = "/.LuckyPicker";
  var system = "Linux";
}
/** 控制音乐播放 */
function music() {
  const audio = document.getElementById("mokugyo");
  audio.paused ? audio.play() : audio.pause();
}
/** 编辑名单 */
function edittxt() {
  const { shell } = require("electron");
  shell.openPath(require("os").homedir() + listaddress + "/NameList.txt");
  //检测文件更改后刷新页面
  var fs = require("fs");
  fs.watchFile(
    require("os").homedir() + listaddress + "/NameList.txt",
    (curr, prev) => {
      location.reload();
    }
  );
}
/** 语音合成 */
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
/** 打开帮助/关于页面 */
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
/** 打开ORC */
function start_orc() {
  window.open(
    "./subpage/orc.html",
    "_blank",
    "top=500,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
  );
}
/** 进入全屏 */
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
/** 退出全屏 */
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

/** 检查NameList.txt是否存在 */
function checkList() {
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
  /**判断并自动生成NameList.txt */
  var file = require("os").homedir() + listaddress + "/NameList.txt";
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
          require("os").homedir() + listaddress + "/NameList.txt",
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
}
checkList();
/** 开始点名 */
function start() {
  const path = require("path");
  const fs = require("fs");

  /**读取TXT */
  const filePath = path.join(
    require("os").homedir(),
    listaddress,
    "NameList.txt"
  );
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
            the_show_name: "😀",
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
          // 定义switch_call_status函数，用于切换呼叫状态并执行相应操作
          switch_call_status() {
            // 如果呼叫已经开始（is_call_start为true）
            if (this.is_call_start) {
              // 将呼叫状态设置为false，表示呼叫结束
              this.is_call_start = false;

              // 设置定时器，在call_speed毫秒后执行异步操作
              setTimeout(() => {
                // 将当前显示的姓名（the_show_name）添加到已呼叫的姓名列表（the_called_name）中
                this.the_called_name = [this.the_show_name].concat(
                  this.the_called_name
                );

                // 如果不允许姓名重复（name_repeat为false）
                if (!this.name_repeat) {
                  // 获取当前显示姓名在未呼叫姓名列表（the_not_called_name）中的索引
                  const index = this.the_not_called_name.indexOf(
                    this.the_show_name
                  );

                  // 如果当前显示姓名存在于未呼叫姓名列表中，则从该列表中删除
                  if (index !== -1) {
                    this.the_not_called_name.splice(index, 1);
                  }
                }
              }, this.call_speed);
            } else {
              // 如果呼叫尚未开始，则将呼叫状态设置为true，表示呼叫开始
              this.is_call_start = true;

              // 调用scrollName函数，可能与滚动显示姓名相关
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
/** 获取一言 */
function get_hitokoto() {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "https://v1.hitokoto.cn/?c=a&c=b&c=c&c=d&c=e&c=f&c=g");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      document.getElementById("colorful-text").innerHTML = data.hitokoto;
      //colorful-text-from 为出处
      document.getElementById("colorful-text-from").innerHTML =
        "——" + data.from;
    } else {
      document.getElementById("colorful-text").innerHTML =
        "你所热爱的，就是你的生活。";
      document.getElementById("colorful-text-from").innerHTML = "陈睿";
    }
  };
  xhr.send();
}
get_hitokoto();
