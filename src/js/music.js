function music() {
    var audio = document.getElementById('MUYU');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
function edittxt() {
    console.log("准备打开编辑名单");
    const iconv = require('iconv-lite');
    require('child_process')('powershell.exe  cd ~ ; cd ".\AppData\Local\Random roll call\";./list.txt');
}
function speaker() {
    const { exec } = require('child_process');
    const iconv = require('iconv-lite');
    exec(`powershell.exe Add-Type -AssemblyName System.speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Rate = 2; $speak.Speak([Console]::In.ReadLine()); exit`).stdin.end(iconv.encode(document.getElementById('name').innerHTML, 'gbk'));
}
