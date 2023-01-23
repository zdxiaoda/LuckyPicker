//判断为Windows还是Linux
if (navigator.appVersion.indexOf("Win") != -1) {
  var listaddress = "/AppData/Roaming/random-roll-call-system";
}
if (navigator.appVersion.indexOf("Linux") != -1) {
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
        "%E8%AF%B7%E4%BF%AE%E6%94%B9%E9%BB%98%E8%AE%A4%E5%90%8D%E5%8D%95%0A%E5%88%98%E4%B8%80%0A%E9%99%88%E4%BA%8C%0A%E5%BC%A0%E4%B8%89%0A%E6%9D%8E%E5%9B%9B%0A%E7%8E%8B%E4%BA%94%0A%E8%B5%B5%E5%85%AD%0A%E5%AD%99%E4%B8%83%0A%E5%91%A8%E5%85%AB%0A%E5%90%B4%E4%B9%9D%0A%E9%83%91%E5%8D%81"
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
  /**读取TXT */
  // 读取上一级目录文件
  var path = require("os").homedir() + listaddress + "/list.txt";
  var fs = require("fs");
  fs.readFile(path, "utf8", function (the_list, txt) {
    if (the_list) {
      console.error(the_list);
      return;
    }

    /**载入点名 */
    requirejs(["vue"], function (a) {
      begin_name = new a({
        el: "#begin_name",
        data: {
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
          the_show_name: "快好了。。。",
          //布尔值，表示是否正在进行点名。
          is_call_start: true,
          //数字，表示点名速度（毫秒）。
          call_speed: 50,
        },
        watch: {
          name_text: function () {
            var g = $.trim(this.name_text),
              f = [],
              b = g.split(this.separator);
            var e = b.length;
            for (var d = 0; d < e; d++) {
              var c = $.trim(b[d]);
              if ("" !== c) {
                f.push(c);
              }
            }
            this.all_name = f;
            this.the_not_called_name = this.all_name;
          },
        },
        methods: {
          //切换点名的状态，如果正在进行点名，则停止；如果停止了，则继续进行点名.
          switch_call_status: function () {
            var b = this;
            if (this.is_call_start) {
              this.is_call_start = false;
              setTimeout(function () {
                b.the_called_name = [b.the_show_name].concat(b.the_called_name);
                if (!b.name_repeat) {
                  for (var c = 0; c < b.the_not_called_name.length; c++) {
                    if (b.the_not_called_name[c] === b.the_show_name) {
                      b.the_not_called_name.splice(c, 1);
                      break;
                    }
                  }
                }
              }, b.call_speed);
            } else {
              this.is_call_start = true;
              this.scrollName();
            }
          },
          scrollName: function () {
            var b = this;
            setTimeout(function () {
              var c = Math.floor(Math.random() * b.the_not_called_name.length);
              b.the_show_name = b.the_not_called_name[c];
              if (b.is_call_start) {
                b.scrollName();
              }
            }, b.call_speed);
          },
          call_start: function () {
            var b = this;
            this.name_text = txt.toString();
            this.is_call_start = true;
            this.the_called_name = [];
            setTimeout(function () {
              b.scrollName();
            }, 100);
          },
        },
        mounted: function () {
          var b = this;
          this.call_start();
          $(document).keydown(function (d) {});
        },
      });
    });
  });
}
