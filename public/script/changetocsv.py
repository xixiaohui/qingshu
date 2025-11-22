import json
import pandas as pd

# 假设你的 JSON 数据保存为 blogs_full.json
with open("poems_10000.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 转 DataFrame
df = pd.DataFrame(data)

# authors 字段保留为 JSON 字符串
df['authors'] = df['authors'].apply(lambda x: json.dumps(x, ensure_ascii=False))

# 保存 CSV，UTF-8 带 BOM，避免中文乱码
df.to_csv("blogs_full.csv", index=False, encoding="utf-8-sig")
