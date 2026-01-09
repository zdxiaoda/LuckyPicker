const { shell } = require("electron");

function openExternalLink(link) {
  shell.openExternal(link);
}
