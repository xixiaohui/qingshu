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

supabase: Client = create_client(url, key)


def fetch_all_ids_titles():
    page_size = 1000  # Supabase 一次最多 1000
    total_data = []
    offset = 0

    while True:
        print(f"Fetching offset = {offset}")
        response = (
            supabase.table("blogs")
            .select("id, title")
            .range(offset, offset + page_size - 1)
            .execute()
        )

        data = response.data
        if not data:
            break

        total_data.extend(data)
        offset += page_size

    return total_data


if __name__ == "__main__":
    result = fetch_all_ids_titles()

    with open("blogs_index.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print("已成功导出 blogs_index.json，总数量：", len(result))
