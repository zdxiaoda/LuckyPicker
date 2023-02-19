const fs = require("fs");
const dragWrapper = document.getElementById("put_pic_here");

// 添加拖拽事件监听器
dragWrapper.addEventListener("drop", handleDrop);

dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});

function handleDrop(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const pic_url = files[0].path;
    // 识别图片
    Tesseract.recognize(pic_url, {
      lang: "chi_sim",
    }).then(updateResult);
  }
}

function updateResult(result) {
  // 修改 text_result 的文字
  document.getElementById("text_result").innerHTML = result.text;
}
