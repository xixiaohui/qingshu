import json

def generate_poems(n=10000):
    data = []

    for i in range(10001, n + 1):
        item = {
            "img": f"https://picsum.photos/id/152/800/450",
            "tag": "Love,表白专栏",
            "title": f"Sonnet Simulation {i}",
            "description": f"Sonnet Simulation {i} — William Shakespeare (Simulated)",
            "authors": [
                {
                    "name": "William Shakespeare",
                    "avatar": f"/static/images/avatar/1.jpg"
                }
            ],
            "content": (
                "## Original (English)\n"
                f"Shall I compare thee to a gentle dawn {i}?\n"
                f"Thou art the whisper where my heart is drawn {i}.\n"
                f"Winds may scatter petals in the restless air {i},\n"
                f"But your light stays, calm and fair {i}.\n\n"

                "## 中文译文\n"
                f"我可否把你比作温柔的黎明 {i}？\n"
                f"你是心所向往的轻声呼应 {i}。\n"
                f"纵然风吹落不安的花瓣 {i}，\n"
                f"你的光依旧温暖而明亮 {i}。\n\n"

                "## 赏析\n"
                f"此模拟诗歌第 {i} 首，以日光与花为喻，表达永恒与心动的结合。"
            )
        }

        data.append(item)

    # 写入文件
    with open("poems_10000.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"生成完成，共 {n} 条，文件已保存为 poems_10000.json")

# 运行函数
# generate_poems(100000)
