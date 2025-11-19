import math
import time
import requests
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import json

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# print(url)
# print(key)

supabase: Client = create_client(url, key)

JSON_FILE = "blogs_data.json"      # 你的 JSON 文件名
TABLE = "blogs"  # 表名换成你的
BATCH_SIZE = 200  # 每次处理 200 条，可根据负载调整


def fetch_love_content(source_url):
    """你的情书抓取逻辑，输入一条 URL，返回抓取到的正文文本"""
    try:
        resp = requests.get(source_url, timeout=10)
        resp.raise_for_status()
        # TODO: 你自己解析正文
        return resp.text
    except Exception as e:
        print("抓取失败:", source_url, e)
        return None


def update_row(id, content):
    """更新 Supabase 的内容字段"""
    return (
        supabase.table(TABLE)
        .update({"content": content, "is_valid": True})
        .eq("id", id)
        .execute()
    )


def process_batch(offset):
    """处理一批 200 条"""
    print(f"开始处理 offset={offset}")

    data = (
        supabase.table(TABLE)
        .select("*")
        .order("id")
        .range(offset, offset + BATCH_SIZE - 1)
        .execute()
    )

    rows = data.data
    if not rows:
        print("没有更多数据")
        return False

    for row in rows:
        id = row["id"]
        source_url = row["source_url"]

        print(f"→ 抓取 ID={id} URL={source_url}")

        content = fetch_love_content(source_url)
        if content:
            update_row(id, content)
            print(f"✔ 更新成功 ID={id}")
        else:
            print(f"✘ 抓取失败 ID={id}")

        time.sleep(0.5)  # 防止爬虫被封

    return True


def main():
    offset = 0
    while True:
        has_more = process_batch(offset)
        if not has_more:
            break
        offset += BATCH_SIZE
        time.sleep(2)  # 避免 Supabase RLS 或限流

    print("全部处理完成")


# if __name__ == "__main__":
#     main()


def count():

    # response = supabase.table(TABLE).select("*", count="exact").execute()
    # print(response.count)

    response = supabase.table(TABLE).select("*").limit(10).execute()

    print(response.data)

# count()


def insert_batch(batch, retry=3):
    """插入一批数据到 Supabase（带重试）"""
    for attempt in range(retry):
        try:
            response = supabase.table(TABLE).insert(batch).execute()
            print(f"✔ 插入成功：{len(batch)} 条,")
            print(response.data)
            return True
        except Exception as e:
            print(f"❌ 插入失败，第 {attempt+1} 次尝试：", e)
            time.sleep(2)

    print("⛔ 多次尝试仍失败，跳过这一批")
    return False

def test_insert_batch():

    with open(JSON_FILE,"r",encoding="utf-8") as f:
        data = json.load(f)

    total = len(data)
    # print(data)
    total_batches = math.ceil(total / BATCH_SIZE)

    print(f"总共 {total} 条记录，将分 {total_batches} 批插入")

    for i in range(total_batches):
        start = i * BATCH_SIZE
        end = start + BATCH_SIZE
        batch = data[start:end]

        print(f"→ 正在插入第 {i+1}/{total_batches} 批 ({len(batch)} 条)")

        print(batch)
        success = insert_batch(batch)
    
        if not success:
            print(f"⚠ 第 {i+1} 批插入失败，暂停后继续")
            time.sleep(3)
            continue  # 不崩溃，继续下一批

        time.sleep(1)  # 避免 Supabase 限流

    print("🎉 全部插入完成")

test_insert_batch()