from supabase import create_client,Client
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



supabase = create_client(url, key)



START_ID = 8247
END_ID = 100000
BATCH = 1  # 每批 50 条，避免超时

for batch_start in tqdm(range(START_ID, END_ID + 1, BATCH), desc="Clearing slug"):
    batch_ids = list(range(batch_start, min(batch_start + BATCH, END_ID + 1)))
    supabase.table("blogs").update({"slug": None}).in_("id", batch_ids).execute()
