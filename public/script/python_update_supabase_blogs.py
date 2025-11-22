import json
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
import os
from tqdm import tqdm


# ----------------------------------------------------------
# 1. 配置你的 Supabase
# ----------------------------------------------------------
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# 初始化 Supabase 客户端
supabase: Client = create_client(url, key)

# ----------------------------------------------------------
# 2. 读取合并后的 JSON 文件
# ----------------------------------------------------------
with open("gutenberg_metadata_by_id.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 转成列表形式，方便批量操作
records = []
for gid, item in data.items():
    records.append({
        "id": int(gid),
        "title": item.get("title"),
        "authors": [{"name":item.get("author"),"avatar":"/static/images/avatar/2.jpg"}] if item.get("author") else None,
        "description": item.get("subjects")
    })

print("待更新记录数量：", len(records))
print(records[0])

# ----------------------------------------------------------
# 3. 按 500 条分批更新
# ----------------------------------------------------------
BATCH_SIZE = 1

for i in tqdm(range(69902, len(records), BATCH_SIZE), desc="Updating Supabase"):
    batch = records[i:i + BATCH_SIZE]

    # 批量逐条 update（只更新已有的 id）
    for row in batch:
        supabase.table("blogs").update({
            "title": row["title"],
            "authors": row["authors"],
            "description": row["description"],
        }).eq("id", row["id"]).execute()


print("🎉 全部更新完毕！")

