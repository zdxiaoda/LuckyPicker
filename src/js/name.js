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
          $(document).keydown((event) => {});
        },
      });
    });
  });
}
