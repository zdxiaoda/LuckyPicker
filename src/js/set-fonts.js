const newLocal = newFunction();

function newFunction() {
    return window.onload = function () {
        var oPtxt = document.getElementById("name");
        var oBtn1 = document.getElementById("add-fonts");
        var oBtn2 = document.getElementById("remove-fonts");
        var num = 150; /*定义一个初始变量*/
        oBtn1.onclick = () => {
            num++;
            oPtxt.style.fontSize = `${10 + num}px`;
        };
        oBtn2.onclick = () => {
            num--;
            oPtxt.style.fontSize = `${10 + num}px`;
        };
    };
}
