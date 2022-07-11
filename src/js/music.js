function music() {
    var audio = document.getElementById('MUYU');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
//打开名单
function edittxt() {
    const { shell } = require('electron')
    shell.openPath(require('os').homedir() + '/AppData/Local/random-roll-call-system/list.txt')
    console.log('准备打开名单！')

}
function speaker() {
    const { exec } = require('child_process');
    const iconv = require('iconv-lite');
    exec(`powershell.exe Add-Type -AssemblyName System.speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Rate = 2; $speak.Speak([Console]::In.ReadLine()); exit`).stdin.end(iconv.encode(document.getElementById('name').innerHTML, 'gbk'));
}
//控制台输出当前用户目录

console.log(require('os').homedir());
