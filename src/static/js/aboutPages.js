const { shell } = require("electron");

function openExternalLink(link) {
  shell.openExternal(link);
}

function mdui_git() {
  openExternalLink("https://github.com/zdhxiong/mdui");
}

function mdui_License() {
  openExternalLink("https://github.com/zdhxiong/mdui/blob/v1/LICENSE");
}

function requirejs_git() {
  openExternalLink("https://github.com/requirejs/requirejs/");
}

function requirejs_License() {
  openExternalLink(
    "https://github.com/requirejs/requirejs/blob/master/LICENSE"
  );
}

function vue_git() {
  openExternalLink("https://github.com/vuejs/vue");
}

function vue_License() {
  openExternalLink("https://github.com/vuejs/vue/blob/main/LICENSE");
}

function jQuery_git() {
  openExternalLink("https://github.com/jquery/jquery");
}

function jQuery_License() {
  openExternalLink("https://github.com/jquery/jquery/blob/main/LICENSE.txt");
}

function electron_git() {
  openExternalLink("https://github.com/electron/electron");
}

function electron_License() {
  openExternalLink("https://github.com/electron/electron/blob/main/LICENSE");
}

function electron_forge_git() {
  openExternalLink("https://github.com/electron-userland/electron-forge");
}

function electron_forge_License() {
  openExternalLink(
    "https://github.com/electron-userland/electron-forge/blob/master/LICENSE"
  );
}

function zdxiaoda() {
  openExternalLink("https://www.xiaoda.fun/");
}

function random() {
  openExternalLink("https://github.com/zdxiaoda/LuckyPicker");
}

function vwo50() {
  openExternalLink("https://vwo50.xiaoda.fun");
}
