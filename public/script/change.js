const fs = require("fs");
const path = "./blogs.json";

// 读取 JSON 文件
const raw = fs.readFileSync(path, "utf-8");
const data = JSON.parse(raw);

// 替换 img URL，随机插入数字
const newData = data.map(item => {
  if (item.img) {
    // 匹配 https://picsum.photos/宽/高
    item.img = item.img.replace(
      /https:\/\/picsum\.photos\/(\d+\/\d+)/,
      () => {
        const randomId = Math.floor(Math.random() * 100); // 生成 0~9999 随机数
        return `https://picsum.photos/id/${randomId}/800/450`;
      }
    );
  }
  return item;
});

// 写回文件
fs.writeFileSync(path, JSON.stringify(newData, null, 2), "utf-8");
console.log("随机 ID 替换完成！");
