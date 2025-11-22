# pip install datasets

import json
import time
from datasets import load_dataset
from tqdm import tqdm
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# ----------------------------------------------------------
# 读取parquet写入txt
# ----------------------------------------------------------
def run():
    # 直接在线读取（不需要先下载）
    # dataset = load_dataset("your_username/your_dataset_name", split="train")

    # 或者你已经下载到本地
    dataset = load_dataset(
        "parquet", data_files="train-00000-of-00001-fa9fb9e1f16eed7e.parquet", split="train"
    )

    print(dataset[0])      # 第一首诗
    print(len(dataset))    # 总共多少条，通常就是 3085117


    poems = {}

    for item in tqdm(dataset):
        gid = item["gutenberg_id"]
        line = item["line"].strip() if item["line"] else ""
        if gid not in poems:
            poems[gid] = []
        if line:  # 过滤空行
            poems[gid].append(line)


    # 保存成完整诗（每首之间空三行）
    with open("【完整版】52800首英文情诗.txt", "w", encoding="utf-8") as f:
        for gid in sorted(poems.keys()):
            f.write("\n\n=== Gutenberg ID: " + str(gid) + " ===\n")
            f.write("\n".join(poems[gid]))
            f.write("\n\n\n")

    print("大功告成！完整 52800 首诗已保存到当前目录")

# run()



# ----------------------------------------------------------
# 1. 配置你的 Supabase
# ----------------------------------------------------------
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# 初始化 Supabase 客户端
supabase: Client = create_client(url, key)


# ----------------------------------------------------------
# 2. 读取parquet
# ----------------------------------------------------------
def read_parquet_write_json():
    # 或者你已经下载到本地
    dataset = load_dataset(
        "parquet", data_files="train-00000-of-00001-fa9fb9e1f16eed7e.parquet", split="train"
    )

    print(dataset[0])      # 第一首诗
    print(len(dataset))    # 总共多少条，通常就是 3085117

    poems = {}

    for item in tqdm(dataset):
        gid = item["gutenberg_id"]
        line = item["line"].strip() if item["line"] else ""
        if gid not in poems:
            poems[gid] = []
        if line:  # 过滤空行
            poems[gid].append(line)

    # 保存成 JSON
    with open("poems_1191.json", "w", encoding="utf-8") as f:
        json.dump(poems, f, ensure_ascii=False, indent=2)


    poem_list = []
    for gid in sorted(poems.keys()):
        poem_list.append({
            "gutenberg_id": gid,
            "lines": poems[gid]
        })

    with open("poems_1191_list.json", "w", encoding="utf-8") as f:
        json.dump(poem_list, f, ensure_ascii=False, indent=2)




def update_supabase_blogs_content():
    #读取 poems_1191_list.json
    with open("poems_1191_list.json","r",encoding="utf-8") as f:
        poems = json.load(f)

    print("共读取 JSON 诗歌" ,len(poems))

    batch =[]
    BATCH_SIZE = 100 #建议 100 条一批

    for item in tqdm(poems):
        gid = item['gutenberg_id']
        lines = item["lines"]

        content = "\n".join(lines)

        # 构造待更新对象
        batch.append({
            "id": gid,
            "content": content
        })

        # 批量执行
        if len(batch) >= BATCH_SIZE:
            _update_batch(batch)
            batch = []
        # 处理最后不足一批的部分
    if batch:
        _update_batch(batch)

def _update_batch(batch):
    """批量更新 blogs.content"""
    # Supabase 没有 bulk update，只能逐条 update
    for row in batch:
        gid = row["id"]
        content = row["content"]

        supabase.table("blogs").update({"content": content}).eq("id", gid).execute()

    # 给数据库一点缓冲时间
    time.sleep(0.2)

# update_supabase_blogs_content()


# ----------------------------------------------------------
# 提取所有id
# ----------------------------------------------------------
def read_parquet_write_id_json():
    # 或者你已经下载到本地
    dataset = load_dataset(
        "parquet", data_files="../../../DATA/QS/train-00000-of-00001-fa9fb9e1f16eed7e.parquet", split="train"
    )

    print(dataset[0])      # 第一首诗
    print(len(dataset))    # 总共多少条，通常就是 3085117

    # 用列表保存所有 gid
    gutenberg_ids = []

    for item in tqdm(dataset):
        gid = item["gutenberg_id"]
        gutenberg_ids.append(gid)

    # 去重并排序（可选）
    unique_ids = sorted(list(set(gutenberg_ids)))

    # 存到 JSON 文件
    with open("gutenberg_ids.json", "w", encoding="utf-8") as f:
        json.dump(gutenberg_ids, f, ensure_ascii=False, indent=2)

# read_parquet_write_id_json()

def read_ids():
    # 1️⃣ 读取原始 JSON
    with open("gutenberg_ids.json", "r", encoding="utf-8") as f:
        ids = json.load(f)

    # 2️⃣ 去重并排序（可选）
    unique_ids = sorted(list(set(ids)))

    # 3️⃣ 保存为新的 JSON 文件
    with open("gutenberg_ids_unique.json", "w", encoding="utf-8") as f:
        json.dump(unique_ids, f, ensure_ascii=False, indent=2)

    print(f"原始数量: {len(ids)}, 去重后数量: {len(unique_ids)}")

# read_ids()

def read_unique_ids():
    # 1️⃣ 读取原始 JSON
    with open("gutenberg_ids_unique.json", "r", encoding="utf-8") as f:
        ids = json.load(f)

    for blog_id in tqdm(ids,desc="Updating tags"):
        res = supabase.table("blogs").select("tag").eq("id",blog_id).single().execute()

        if not res.data:
            continue

        old_tag = res.data.get("tag") or ""
        # 拼接新 tag
        if old_tag.strip() == "":
            new_tag = "gutenberg"
        else:
            new_tag = old_tag + ",gutenberg"

        # 写回 Supabase
        supabase.table("blogs").update({"tag": new_tag}).eq("id", blog_id).execute()


read_unique_ids()