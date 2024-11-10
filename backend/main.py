import requests
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import random
from config import Config

app = FastAPI()

# Kintoneの設定
api_token = Config.KINTONE_API_KEY
domain = Config.KINTONE_DOMAIN  
base_url = f'https://{domain}.cybozu.com/k/v1/records.json'
app_id = 1

# クエリパラメータ
params = {
    'app': app_id
}

# リクエストヘッダー
headers = {
    'X-Cybozu-API-Token': api_token
}

# GETリクエストの送信
response = requests.get(base_url, headers=headers, params=params)

if response.status_code == 200:
    records = response.json().get('records', [])
else:
    raise HTTPException(status_code=response.status_code, detail=response.text)

# データを整形して保存
class Card(BaseModel):
    card_id: str
    prefecture_id: str
    prefecture_name: str
    region_id: str
    region_name: str
    food_genre_id: str
    food_genre_name: str
    card_color: str = "blue"  # デフォルト値
    description: str = "No description"  # デフォルト値

# デモデータに整形
demo_data = [
    {
        "card_id": record["$id"]["value"],
        "prefecture_id": record["数値"]["value"],
        "prefecture_name": record["ドロップダウン"]["value"],
        "region_id": record["数値_0"]["value"],
        "region_name": record["ラジオボタン"]["value"],
        "food_genre_id": record["数値_1"]["value"],
        "food_genre_name": record["ドロップダウン_0"]["value"],
        "card_color": "blue",
        "description": "Generated from Kintone data"
    }
    for record in records
]

print(demo_data)

# グローバル変数で保存されたカードのIDを管理
saved_card_ids = set()

# グローバル変数で保存されたカードのIDを管理
saved_available_card_ids = set()

class Card(BaseModel):
    card_id: str
    prefecture_id: str
    prefecture_name: str
    region_id: str
    region_name: str
    food_genre_id: str
    food_genre_name: str
    card_color: str
    description: str

# 訪れた地域を保存（IDのみを受け取る）
@app.post("/cards")
def save_card(card_id: str):
    # 使用可能なカードIDが存在しない場合は使用できないことを返す
    if card_id not in saved_available_card_ids:
        raise HTTPException(status_code=400, detail="Card is not available")
    
    # グローバル変数にカードIDを追加
    saved_card_ids.add(card_id)

    # 使用済みのカードIDを削除
    saved_available_card_ids.remove(card_id)

    return {"card_id": card_id}

# 訪れた地域の一覧を取得
@app.get("/cards", response_model=List[Card])
def get_cards():
    # グローバル変数に保存されているIDのカードを返す
    saved_cards = [card for card in demo_data if card["card_id"] in saved_card_ids]
    return saved_cards

# 使用可能なカードの一覧を取得
@app.get("/available_cards", response_model=List[Card])
def get_cards():
    # グローバル変数に保存されているIDのカードを返す
    saved_cards = [card for card in demo_data if card["card_id"] in saved_available_card_ids]
    return saved_cards


# 訪れた地域の詳細を取得
@app.get("/cards/{card_id}", response_model=Card)
def get_card_details(card_id: str):
    for card in demo_data:
        if card["card_id"] == card_id:
            return card
    raise HTTPException(status_code=404, detail="Card not found")

# ランダムに3枚のカードを引く
@app.get("/draw_cards", response_model=List[Card])
def draw_cards():
    if not demo_data:
        raise HTTPException(status_code=404, detail="No cards available")
    
    drawed_cards = random.sample(demo_data, min(3, len(demo_data)))

    # 引いたカードを使用済みとして保存
    for card in drawed_cards:
        saved_available_card_ids.add(card["card_id"])

    # サンプルサイズをデータの長さと比較して調整
    return drawed_cards