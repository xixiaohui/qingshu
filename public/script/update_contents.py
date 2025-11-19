from supabase import create_client, Client
import glob
from dotenv import load_dotenv
import os

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(url, key)

# 获取所有 md 文件
files = glob.glob("content_files/*.md")

for file in files:
    blog_id = int(file.split("/")[-1].replace(".md", ""))

    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    print(f"Updating id={blog_id} ...")

    supabase.table("blogs").update({"content": content}).eq("id", blog_id).execute()

print("全部 content 更新完成。")
