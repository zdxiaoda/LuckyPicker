//拖拽读取
// File对象 实例
const fs = require("fs");
//获取div对象
const dragWrapper = document.getElementById("put_pic_here");
//添加拖拽事件监听器
dragWrapper.addEventListener("drop", (e) => {
  //阻止默认行为
  e.preventDefault();
  //获取文件列表
  const files = e.dataTransfer.files;

  if (files && files.length > 0) {
    //获取文件路径
    const pic_url = files[0].path;
    console.log("图片地址:", pic_url);
    //识别图片
    Tesseract.recognize(pic_url, {
      lang: "chi_sim",
    }).then(function (result) {
      console.log(result);
      //修改text_result的文字
      document.getElementById("text_result").innerHTML = result.text;
    });
  }
});

//阻止拖拽结束事件默认行为
dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});
