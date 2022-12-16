console.log('即将检测更新。。。');
//获取当前版本号
var local_version = require("../package.json");
console.log(local_version);
//获取最新版本号
var url = "https://cdn.zhangda.xyz/random-roll-call-system/version.json"
var request = new XMLHttpRequest();
request.open("get", url);
request.send(null);/*不发送数据到服务器*/
request.onload = function () {/*XHR对象获取到返回信息后执行*/
    if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
        var cloud_version = JSON.parse(request.responseText);
        for (var i = 0; i < cloud_version.length; i++) {
            console.log(cloud_version[i].name);
        }
        console.log(cloud_version);
        //比较版本号
        if (local_version.version < cloud_version.latest_version) {
            console.log('有新版本，即将弹出窗口。。。');
            window.open('./showupdate.html', '_blank', 'width=521,height=325,frame=false')
        } else {
            console.log('已是最新版本');
        }
    }
    else {
        console.log('连接服务器失败');
    }
}
