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
function Edit_Text() {
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
    speak(document.getElementById("DisplayedName").innerHTML, "utf-8");
  }
  //Linux系统 调用espeak
  if (system == "Linux") {
    const { exec } = require("child_process");
    exec(
      "espeak -v zh " + document.getElementById("DisplayedName").innerHTML,
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
/** 定义toggleFullScreen函数，用于切换全屏状态*/
function toggleFullScreen() {
  // 获取当前文档显示的元素（兼容各种浏览器）
  let elem = document.documentElement;
  if (
    !document.fullscreenElement && // 标准模式
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // 兼容Firefox、Chrome、Safari和IE11
    // 当前非全屏状态时，尝试进入全屏
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    // 当前全屏状态时，退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
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
      const NameAPP = new Vue({
        el: "#NameAPP",
        data() {
          return {
            //布尔值，表示是否允许重复的点名。默认为true
            allowNameRepetition: true,
            //字符串，表示输入的点名字符串。默认为空
            inputNamesString: "",
            //字符串，表示将 inputNamesString 分割成单独的名字的分隔符。
            nameSeparator: "\n",
            //数组，表示 inputNamesString 中所有单独的名字。默认为空数组
            allIndividualNames: [],
            //数组，表示已经被点过的名字。
            calledNamesList: [],
            //数组，表示还没有被点过的名字。
            notCalledNamesList: [],
            //字符串，表示当前正在展示的名字。
            currentDisplayedName: "😀",
            //布尔值，表示是否正在进行点名。
            isCallingInProgress: true,
            //数字，表示点名速度（毫秒）。
            callIntervalSpeed: 50,
          };
        },
        watch: {
          inputNamesString() {
            const trimmedText = this.inputNamesString.trim();
            const names = trimmedText
              .split(this.nameSeparator)
              .map((name) => name.trim())
              .filter((name) => name !== "");
            this.allIndividualNames = names;
            this.notCalledNamesList = names;
          },
        },
        methods: {
          // 定义switch_call_status函数，用于切换点名状态并执行相应操作
          switch_call_status() {
            // 获取按钮元素
            const callButton = document.getElementById(
              "Large_Callout_Button_container"
            );
            //获取Fab_Button元素
            const fabButton = document.getElementById("Fab_Button");
            // 如果点名已经开始（isCallingInProgress为true）
            if (this.isCallingInProgress) {
              // 将点名状态设置为false，表示点名结束
              this.isCallingInProgress = false;
              //将按钮恢复为开始点名按钮
              callButton.innerHTML = "开始点名";
              const fabButton = document.getElementById("Fab_Button");
              fabButton.icon = "play_arrow";
              //修改颜色
              callButton.variant = "filled";
              fabButton.variant = "primary";
              // 设置定时器，在callIntervalSpeed毫秒后执行异步操作
              setTimeout(() => {
                // 将当前显示的姓名（currentDisplayedName）添加到已点名的姓名列表（calledNamesList）中
                this.calledNamesList = [this.currentDisplayedName].concat(
                  this.calledNamesList
                );

                // 如果不允许姓名重复（allowNameRepetition为false）
                if (!this.allowNameRepetition) {
                  // 获取当前显示姓名在未点名姓名列表（notCalledNamesList）中的索引
                  const index = this.notCalledNamesList.indexOf(
                    this.currentDisplayedName
                  );

                  // 如果当前显示姓名存在于未点名姓名列表中，则从该列表中删除
                  if (index !== -1) {
                    this.notCalledNamesList.splice(index, 1);
                  }
                }
              }, this.callIntervalSpeed);
            } else {
              // 如果点名尚未开始，则将点名状态设置为true，表示点名开始
              this.isCallingInProgress = true;
              //将按钮恢复为结束点名按钮
              callButton.innerHTML = "结束点名";
              const fabButton = document.getElementById("Fab_Button");
              fabButton.icon = "pause";
              //修改颜色
              callButton.variant = "filled";
              fabButton.variant = "primary";
              // 调用scrollName函数，可能与滚动显示姓名相关
              this.scrollName();
            }
          },
          scrollName() {
            setTimeout(() => {
              const index = Math.floor(
                Math.random() * this.notCalledNamesList.length
              );
              this.currentDisplayedName = this.notCalledNamesList[index];
              if (this.isCallingInProgress) {
                this.scrollName();
              }
            }, this.callIntervalSpeed);
          },
          call_start() {
            this.inputNamesString = txt;
            this.isCallingInProgress = true;
            this.calledNamesList = [];
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
      document.getElementById("OneText").innerHTML = data.hitokoto;
      //OneText_From 为出处
      document.getElementById("OneText_From").innerHTML = "——" + data.from;
    } else {
      document.getElementById("OneText").innerHTML =
        "你所热爱的，就是你的生活。";
      document.getElementById("OneText_From").innerHTML = "陈睿";
    }
  };
  xhr.send();
}
get_hitokoto();
