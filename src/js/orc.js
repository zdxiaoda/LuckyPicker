const fs = require("fs");
const dragWrapper = document.getElementById("put_pic_here");
//添加拖拽事件监听器
dragWrapper.addEventListener("drop", (e) => {
  //阻止默认行为
  e.preventDefault();
  const files = e.dataTransfer.files;

  if (files && files.length > 0) {
    const pic_url = files[0].path;
    //识别图片
    Tesseract.recognize(pic_url, {
      lang: "chi_sim",
    }).then(function (result) {
      //修改text_result的文字
      document.getElementById("text_result").innerHTML = result.text;
    });
  }
});

dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});
