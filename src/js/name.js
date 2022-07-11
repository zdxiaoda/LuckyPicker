/**判断文件夹是否存在 */
console.log('判断文件夹是否存在')
var folder = require('os').homedir() + '/AppData/Local/random-roll-call-system';
var fs = require('fs');
fs.access(folder, fs.constants.F_OK, (err) => {
	console.log(`${folder} ${err ? '不存在' : '存在'}`);
	if (err) {
		console.log("开始生成")
		//创建文件夹
		var fs = require('fs')
		fs.mkdirSync(require('os').homedir() + '/AppData/Local/random-roll-call-system');

	} else {
		console.log("判断结束")
	}

});
/**判断并自动生成list.txt */
console.log('判断list是否存在')
var file = require('os').homedir() + '/AppData/Local/random-roll-call-system/list.txt';
var fs = require('fs');
fs.access(file, fs.constants.F_OK, (err) => {
	console.log(`${file} ${err ? '不存在' : '存在'}`);
	if (err) {
		console.log("开始生成")
		createList()
		//创建文件
		function createList() {
			const content = decodeURIComponent("%E8%AF%B7%E4%BF%AE%E6%94%B9%E9%BB%98%E8%AE%A4%E5%90%8D%E5%8D%95%0A%E5%88%98%E4%B8%80%0A%E9%99%88%E4%BA%8C%0A%E5%BC%A0%E4%B8%89%0A%E6%9D%8E%E5%9B%9B%0A%E7%8E%8B%E4%BA%94%0A%E8%B5%B5%E5%85%AD%0A%E5%AD%99%E4%B8%83%0A%E5%91%A8%E5%85%AB%0A%E5%90%B4%E4%B9%9D%0A%E9%83%91%E5%8D%81");
			fs.writeFile(require('os').homedir() + '/AppData/Local/random-roll-call-system/list.txt', content, err => {
				if (err) {
					console.error(err)
					return
				}
				//文件写入成功。
				start()
			})
		}

	} else {
		console.log("判断结束，准备启动点名！")
		start()
	}

});


function start() {
	/**读取TXT */
	// 读取上一级目录文件
	var path = (require('os').homedir() + '/AppData/Local/random-roll-call-system/list.txt');

	// 使用Node.js的API读取文件
	var fs = require('fs');
	fs.readFile(path, 'utf8', function (err, txt) {
		if (err) {
			console.error(err);
			return;
		}

		console.log("名单：" + txt);


		/**载入点名 */
		requirejs(["vue"], function (a) {
			begin_name = new a({
				el: "#begin_name",
				data: {
					isRepeat: true,
					nameStr: "",
					separator: "\n",
					nameArr: [],
					askedArr: [],
					askArr: [],
					currentName: "快好了。。。",
					scrollStatus: true,
					detailStatus: true,
					speed: 50,
					fontWeight: 600,
				},
				watch: {

					nameStr: function () {
						var g = $.trim(this.nameStr),
							f = [],
							b = g.split(this.separator);
						var e = b.length;
						for (var d = 0; d < e; d++) {
							var c = $.trim(b[d]);
							if ("" !== c) {
								f.push(c)
							}
						}
						this.nameArr = f;
						this.askArr = this.nameArr
					}
				},
				methods: {

					toggleAsk: function () {
						var b = this;
						if (this.scrollStatus) {
							this.scrollStatus = false;
							setTimeout(function () {
								b.askedArr = [b.currentName].concat(b.askedArr);
								if (!b.isRepeat) {
									for (var c = 0; c < b.askArr.length; c++) {
										if (b.askArr[c] === b.currentName) {
											b.askArr.splice(c, 1);
											break
										}
									}
								}
							}, b.speed)
						} else {
							this.scrollStatus = true;
							this.scrollName()
						}
					},
					scrollName: function () {
						var b = this;
						setTimeout(function () {
							var c = Math.floor(Math.random() * b.askArr.length);
							b.currentName = b.askArr[c];
							if (b.scrollStatus) {
								b.scrollName()
							}
						}, b.speed)
					},


					showDemo: function () {
						var b = this;
						this.nameStr = txt.toString();
						this.scrollStatus = true;
						this.askedArr = [];
						setTimeout(function () {
							b.scrollName()
						}, 100)
					}
				},


				mounted: function () {
					var b = this;
					this.showDemo();
					$(document).keydown(function (d) {
					});

				}
			})
		});

	});
}