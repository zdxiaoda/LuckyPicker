function music() {
    var audio = document.getElementById('MUYU');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
//打开名单
//判断为Windows还是Linux
if (navigator.appVersion.indexOf("Win") != -1) {
	console.log("Windows");
	var listaddress = '/AppData/Local/random-roll-call-system';
}
if (navigator.appVersion.indexOf("Linux") != -1) {
	console.log("Linux");
	var listaddress = '/random-roll-call-system';
}
function edittxt() {
    const { shell } = require('electron')
    shell.openPath(require('os').homedir() + listaddress + '/list.txt')
    console.log('准备打开名单！')

}
function speaker() {
    const { exec } = require('child_process');
    const iconv = require('iconv-lite');
    if (navigator.appVersion.indexOf("Win") != -1) {
        console.log("判断为Windows，可以文字转语音");
        exec(`powershell.exe Add-Type -AssemblyName System.speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Rate = 2; $speak.Speak([Console]::In.ReadLine()); exit`).stdin.end(iconv.encode(document.getElementById('name').innerHTML, 'gbk'));
    }
    if (navigator.appVersion.indexOf("Linux") != -1) {
        console.log("判断为Linux，不可以文字转语音");
        mdui.dialog({
            title: '提示',
            content: 'Linux用户暂时不支持该功能',
            buttons: [
              {
                text: '取消'
              },
              {
                text: '确认',
                onClick: function(inst){
                  mdui.alert('点击确认按钮的回调');
                }
              }
            ]
          });
    }
}