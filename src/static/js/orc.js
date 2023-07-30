const dragWrapper = document.getElementById("put_pic_here");

// 添加拖拽事件监听器
dragWrapper.addEventListener("drop", handleDrop);

dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});

async function handleDrop(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const pic_url = URL.createObjectURL(files[0]);

    // 识别图片
    const {
      data: { text },
    } = await Tesseract.recognize(pic_url, "chi_sim");

    // 修改 text_result 的文字
    document.getElementById("text_result").innerHTML = text;
  }
}
