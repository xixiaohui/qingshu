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

JSON_FILE = "blogs_data.json"  # 你的 JSON 文件名
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
            # print(response.data)
            return True
        except Exception as e:
            print(f"❌ 插入失败，第 {attempt+1} 次尝试：", e)
            time.sleep(2)

    print("⛔ 多次尝试仍失败，跳过这一批")
    return False


def test_insert_batch():

    with open(JSON_FILE, "r", encoding="utf-8") as f:
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

        # print(batch)
        success = insert_batch(batch)

        if not success:
            print(f"⚠ 第 {i+1} 批插入失败，暂停后继续")
            time.sleep(3)
            continue  # 不崩溃，继续下一批

        time.sleep(1)  # 避免 Supabase 限流

    print("🎉 全部插入完成")


# test_insert_batch()

content = """
## 原文
How do I love thee? Let me count the ways.
I love thee to the depth and breadth and height
My soul can reach, when feeling out of sight
For the ends of Being and ideal Grace.
I love thee to the level of every day's
Most quiet need, by sun and candle-light.
I love thee freely, as men strive for Right;
I love thee purely, as they turn from Praise.
I love thee with the passion put to use
In my old griefs, and with my childhood’s faith.
I love thee with a love I seemed to lose
With my lost saints,—I love thee with the breath,
Smiles, tears, of all my life!—and, if God choose,
I shall but love thee better after death.

## 译文
我怎样爱你？让我细数爱的方式。
我爱你，深及灵魂的高度与广度与深度，
那是灵魂在寻觅存在与恩典极限时所能触及的地方。
我爱你，如每日宁静的需求般自然，
在阳光下，也在烛光中。
我自由地爱你，如人们追求正义；
我纯洁地爱你，如他们远离虚荣。
我爱你，用尽我旧日悲痛的热情，
以及童年的信仰。
我爱你，用那份曾因失去圣徒而消逝的爱，
以我一生的呼吸、微笑与泪水爱你！
若上帝允许，
我将在死后更深地爱你。
"""

def test_update():

    response = (
        supabase.table(TABLE).update({"content": content}).eq("id", 101051).execute()
    )

# test_update()

CONTENT_DIR = "contents"   # 你的 txt 文件夹


def read_content_from_file(file_path):
    """读取 content 文件"""
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def update_content(id, content):
    """更新 supabase 指定 id 的 content 字段"""
    try:
        supabase.table(TABLE).update({
            "content": content
        }).eq("id", id).execute()
        print(f"✔ 更新成功 ID={id}")
    except Exception as e:
        print(f"❌ 更新失败 ID={id} 错误：{e}")

def test_update_from_content_dir():
    files = os.listdir(CONTENT_DIR)
    txt_files = [f for f in files if f.endswith(".txt")]

    print(f"发现 {len(txt_files)} 个内容文件")

    for filename in txt_files:
        # 文件名例如 "2157.txt"
        id_str = filename.replace(".txt", "")
        if not id_str.isdigit():
            print(f"跳过无效文件：{filename}")
            continue

        id = int(id_str)
        file_path = os.path.join(CONTENT_DIR, filename)

        # 读取内容
        content = read_content_from_file(file_path)

        # 更新到 supabase
        update_content(id, content)

    print("🎉 全部完成！")

# test_update_from_content_dir()