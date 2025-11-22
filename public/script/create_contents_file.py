import json
import os


def main():
    # 输入文件: blogs_index.json
    with open("blogs_index.json", "r", encoding="utf-8") as f:
        items = json.load(f)

    os.makedirs("content_files", exist_ok=True)

    index = 0
    for item in items:
        print(index)
        blog_id = item["id"]
        title = item["title"]

        # ↓↓↓ 在这里你可以写自动爬取逻辑，把真实内容填进去 ↓↓↓
        content = f"""# {title}

    这里写抓取后的内容...
    """
        with open(f"content_files/{blog_id}.md", "w", encoding="utf-8") as f:
            f.write(content)

        if index > 3:
            break
        index += 1

    print("全部 content 文件已生成。")


# main()
