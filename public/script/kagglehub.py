# 文件名: extract_love_poems_with_metadata.py
# 新增：作者 + 标题 + 更清晰的分隔符

import json
import gzip
import requests
from tqdm import tqdm
import os
import re



# 1. 下载与解压（同之前）
url = "https://huggingface.co/datasets/biglam/gutenberg-poetry-corpus/resolve/main/gutenberg-poetry-v001.ndjson.gz"
filename = "gutenberg-poetry-v001.ndjson.gz"
extracted = "gutenberg-poetry-v001.ndjson"

if not os.path.exists(filename):
    print("正在下载（约130MB）...")
    r = requests.get(url, stream=True)
    with open(filename, "wb") as f:
        for chunk in tqdm(r.iter_content(chunk_size=1024 * 1024)):
            f.write(chunk)

if not os.path.exists(extracted):
    print("正在解压...")
    with gzip.open(filename, "rb") as f_in, open(extracted, "wb") as f_out:
        f_out.writelines(f_in)

# 2. 关键词（可继续加）
love_keywords = [
    "love",
    "beloved",
    "heart",
    "kiss",
    "rose",
    "darling",
    "passion",
    "soul",
    "embrace",
    "lips",
    "desire",
    "adoration",
    "yearning",
    "forever",
    "eternal",
    "sweetheart",
    "lover",
    "affection",
    "cherish",
    "dear",
    "my love",
    "thou lov",
]
pattern = re.compile(
    "|".join(r"\b" + re.escape(k) + r"\b" for k in love_keywords), re.IGNORECASE
)

# 3. 存储结构： gid → {'title': ..., 'author': ..., 'lines': [...]}
print("开始读取并过滤（带标题作者）...")
poems_with_meta = {}

with open(extracted, encoding="utf-8") as f:
    for line in tqdm(f, total=3_085_117):
        try:
            data = json.loads(line.strip())
            text = data["s"].strip()
            gid = data["gid"]

            # 第一次出现这个 gid 时，记录标题和作者（后续行会重复相同信息，取第一次即可）
            if gid not in poems_with_meta:
                poems_with_meta[gid] = {
                    "title": data.get("title", "Unknown Title").strip(),
                    "author": data.get("author", "Unknown Author").strip(),
                    "lines": [],
                }

            if pattern.search(text):
                poems_with_meta[gid]["lines"].append(text)

        except (json.JSONDecodeError, KeyError):
            continue

# 4. 二次过滤：至少出现 2 个关键词才保留整首诗
final_poems = {}
for gid, info in poems_with_meta.items():
    if not info["lines"]:  # 没匹配到关键词的直接跳过
        continue
    full_text = " ".join(info["lines"]).lower()
    if len(pattern.findall(full_text)) >= 2:  # 可改成 >=1 获得更多
        final_poems[gid] = info

print(f"过滤完成！共提取到 {len(final_poems):,} 首带作者标题的高相关英文情诗")

# 5. 保存（超级好看易读的格式）
output_file = "gutenberg_love_poems_with_author_title.txt"
with open(output_file, "w", encoding="utf-8") as out:
    for gid in sorted(final_poems.keys(), key=int):
        poem = final_poems[gid]
        out.write(f"=== Poem ID: {gid} ===\n")
        out.write(f"Title: {poem['title']}\n")
        out.write(f"Author: {poem['author']}\n")
        out.write("-" * 50 + "\n")
        out.write("\n".join(poem["lines"]))
        out.write("\n\n\n")  # 三空行分隔，阅读体验极佳

print(f"已保存到：{output_file}")
print(
    "里面会有 Shakespeare、Elizabeth Barrett Browning、Christina Rossetti、Lord Byron 等一大票经典情诗，带完整作者和标题！"
)
