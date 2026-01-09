const dragWrapper = document.getElementById("put_pic_here");
const fileInput = document.getElementById("file_input");

// 添加拖拽事件监听器
dragWrapper.addEventListener("drop", handleDrop);

dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// 点击上传
dragWrapper.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    recognizeImage(files[0]);
  }
});

async function handleDrop(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    recognizeImage(files[0]);
  }
}

async function recognizeImage(file) {
  const pic_url = URL.createObjectURL(file);

  // 识别图片
  const {
    data: { text },
  } = await Tesseract.recognize(pic_url, "chi_sim");

  // 修改 text_result 的文字
  document.getElementById("text_result").innerHTML = text;
}
