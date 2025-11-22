import pandas as pd
import json

# 输入 CSV 文件名（请换成你自己的）
CSV_PATH = "pg_catalog.csv"

# 输出 JSON 文件名
OUTPUT_JSON = "gutenberg_metadata_by_id.json"

# 读取 CSV
df = pd.read_csv(CSV_PATH, dtype=str).fillna("")

# 自动识别字段
id_col = next(
    (
        c
        for c in df.columns
        if (
            'gutenberg' in c.lower() and 'id' in c.lower()
        ) or c.lower() in ["text#", "textid", "text_id"]
    ),
    None
)
title_col = next((c for c in df.columns if 'title' in c.lower()), None)
author_col = next((c for c in df.columns if 'author' in c.lower()), None)
subjects_col = next((c for c in df.columns if 'subject' in c.lower() or "bookshelf" in c.lower()), None)

print(f"使用字段: ID={id_col}, Title={title_col}, Author={author_col}, Subjects={subjects_col}")

# 构造字典
result = {}

for _, row in df.iterrows():
    gid = row[id_col].strip()
    if not gid:
        continue

    result[gid] = {
        "title": row[title_col].strip(),
        "author": row[author_col].strip(),
        "subjects": row[subjects_col].strip(),
    }

# 保存 JSON
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"完成！JSON 已保存为：{OUTPUT_JSON}")
print(f"总计 {len(result):,} 条记录")
