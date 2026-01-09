const fs = require("fs");
const os = require("os");
const path = require("path");

let listaddress = "";
// Determine system and path similar to homepage.js
if (process.platform == "win32") {
  listaddress = "/AppData/Roaming/LuckyPicker";
} else if (process.platform == "linux") {
  listaddress = "/.LuckyPicker";
}

const filePath = path.join(os.homedir(), listaddress, "NameList.txt");
const snackbar = document.getElementById("snackbar");

function showMessage(msg) {
  if (snackbar) {
    snackbar.innerHTML = msg;
    snackbar.open = true;
  } else {
    alert(msg);
  }
}

function loadFile() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read file:", err);
      // If file doesn't exist, it might be fine (empty)
      if (err.code === "ENOENT") {
        showMessage("文件不存在，保存时将创建");
      } else {
        showMessage("读取文件失败: " + err.message);
      }
      return;
    }
    document.getElementById("nameContent").value = data;
  });
}

function saveFile() {
  const content = document.getElementById("nameContent").value;
  // Check if directory exists first, mimicking checkList in homepage.js slightly
  // but fs.writeFile usually requires dir existence.
  // homepage.js handles dir creation on startup, so it should be fine.

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Failed to save file:", err);
      showMessage("保存失败: " + err.message);
      return;
    }
    showMessage("保存成功");
  });
}

function importFile() {
  document.getElementById("fileInput").click();
}

function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("nameContent").value = e.target.result;
    showMessage("已导入文件: " + file.name);
  };
  reader.onerror = function () {
    showMessage("导入失败");
  };
  reader.readAsText(file);

  event.target.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  loadFile();
});
