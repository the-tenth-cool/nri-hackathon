import random
import requests
import logging
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from config import Config

# ロギングの設定
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 必要に応じて特定のドメインに制限
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# プロンプトのフォーマット
PROMPT_FORMAT = """
### instructions
- あなたは、日本の各都道府県のグルメのおすすめを提供します。
- 以下の情報を元に、各都道府県のグルメのおすすめを提供してください。

### data
- 都道府県：{prefecture_name}
- ジャンル：{food_genre_name}
- {prefecture_name}の有名グルメ：{gourmet}

### Note
- この文章は、日本の各都道府県のグルメのおすすめを提供するためのものです。
- 上記のdataのグルメは必ずしも使う必要はありません。
- 指定された都道府県とジャンルに関連するグルメのおすすめを提供してください。
- 指定された都道府県とジャンルにの両方に関連するグルメのおすすめを提供してください。
- 指定された都道府県とジャンルのいずれかに関連しないグルメのおすすめを提供しないでください。
- おすすめは2文ほど、50文字以内で提供してください。
- ユーザにとって有益な情報を提供してください。

"""

# グローバル変数の初期化
saved_card_ids = {}  # {card_id: count}
saved_available_card_ids = set()

# カードモデルの定義
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
    image_name: str = "" # デフォルト値
    user_description: str = "" # デフォルト値

def fetch_kintone_data() -> List[dict]:
    """
    Kintoneからデータを取得し、整形して返す。
    """
    api_token_1 = Config.KINTONE_API_KEY_1
    domain = Config.KINTONE_DOMAIN
    base_url = f'https://{domain}.cybozu.com/k/v1/records.json'
    app_id = 1

    # クエリパラメータ
    params = {
        'app': app_id,
        "query": "数値_1 >= 1 limit 500"
    }

    # リクエストヘッダー
    headers = {
        'X-Cybozu-API-Token': api_token_1
    }

    # GETリクエストの送信
    response = requests.get(base_url, headers=headers, params=params)

    if response.status_code == 200:
        records = response.json().get('records', [])
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

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
            "description": "Generated from Kintone data",
            "image_name": "",
            "user_description": "",
        }
        for record in records
    ]
    return demo_data

# デモデータの取得
demo_data = fetch_kintone_data()

def generate_text(gourmet: str, card: dict) -> str:
    """
    ChatGPTを使用して文章を生成する。
    """
    logging.info("generate_text")
    logging.info(gourmet)
    logging.info(card)

    prompt = PROMPT_FORMAT.format(
        prefecture_name=card["prefecture_name"],
        food_genre_name=card["food_genre_name"],
        gourmet=gourmet
    )
    logging.info(prompt)

    api_openai = Config.OPENAI_API_KEY
    client = OpenAI(api_key=api_openai)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt},
        ],
    )
    logging.info(response)
    return response.choices[0].message.content

def fetch_rag_kintone_data(prefecture_name: str) -> List[dict]:
    """
    指定された都道府県のグルメデータをKintoneから取得する。
    """
    logging.info(prefecture_name)
    api_token_2 = Config.KINTONE_API_KEY_2
    domain = Config.KINTONE_DOMAIN
    base_url = f'https://{domain}.cybozu.com/k/v1/records.json'

    # クエリパラメータ
    params_rag = {
        'app': 2,
        "query": f"文字列__1行_ = \"{prefecture_name}\""
    }

    # リクエストヘッダー
    headers = {
        'X-Cybozu-API-Token': api_token_2
    }

    # GETリクエストの送信
    response = requests.get(base_url, headers=headers, params=params_rag)

    if response.status_code == 200:
        records = response.json().get('records', [])
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    # データの整形
    rag_data = [
        {
            "prefecture_name": record["文字列__1行_"]["value"],
            "name": record["文字列__1行__0"]["value"],
            "description": record["文字列__1行__1"]["value"],
        }
        for record in records
    ]

    return rag_data

def determine_card_color(count: int) -> str:
    """
    カードの保有枚数に応じてカード色を決定する。
    """
    if count >= 10:
        return "gold"
    elif count >= 5:
        return "silver"
    elif count >= 2:
        return "blue"
    else:
        return "green"

def ensure_card_limit():
    """
    カードの保有枚数が10枚を超えた場合、ランダムに削除して10枚に制限する。
    """
    while len(saved_card_ids) > 10:
        card_id_to_remove = random.choice(list(saved_card_ids.keys()))
        if saved_card_ids[card_id_to_remove] > 1:
            saved_card_ids[card_id_to_remove] -= 1
        else:
            del saved_card_ids[card_id_to_remove]

# 訪れた地域を保存（IDのみを受け取る）
@app.post("/cards")
def save_card(card_id: str, image_name: str, user_description: str):
    if card_id not in saved_available_card_ids:
        raise HTTPException(status_code=400, detail="Card is not available")

    if card_id in saved_card_ids:
        saved_card_ids[card_id] += 1
    else:
        saved_card_ids[card_id] = 1

    # 使用可能カードから削除
    saved_available_card_ids.remove(card_id)

    # 10枚を超えた場合の処理
    ensure_card_limit()

    # カード情報を更新
    for saved_card in demo_data:
        if saved_card["card_id"] == card_id:
            saved_card["card_color"] = determine_card_color(saved_card_ids[card_id])
            saved_card["image_name"] = image_name
            saved_card["user_description"] = user_description
            break

    return {
        "card_id": card_id,
        "count": saved_card_ids[card_id],
        "color": determine_card_color(saved_card_ids[card_id]),
        "image_name": image_name,
        "user_description": user_description
    }

# 訪れた地域の一覧を取得
@app.get("/cards", response_model=List[Card])
def get_cards():
    saved_cards = [
        {**card,
         "count": saved_card_ids[card["card_id"]],}
        for card in demo_data if card["card_id"] in saved_card_ids
    ]
    print(saved_cards)
    return saved_cards

# 使用可能なカードの一覧を取得
@app.get("/available_cards", response_model=List[Card])
def get_available_cards():
    saved_cards = [card for card in demo_data if card["card_id"] in saved_available_card_ids]
    return saved_cards

# 訪れた地域の詳細を取得
@app.get("/cards/{card_id}", response_model=Card)
def get_card_details(card_id: str):
    for card in demo_data:
        if card["card_id"] == card_id:
            count = saved_card_ids.get(card_id, 0)
            return {
                **card,
                "count": count,
                "card_color": determine_card_color(count)
            }
    raise HTTPException(status_code=404, detail="Card not found")

@app.get("/draw_cards", response_model=List[Card])
def draw_cards():
    if not demo_data:
        raise HTTPException(status_code=404, detail="No cards available")

    # 同じ都道府県のカードを引かないように選択
    available_prefectures = set(
        card["prefecture_id"] for card in demo_data if card["card_id"] not in saved_available_card_ids
    )
    drawed_cards = []

    while len(drawed_cards) < 3 and available_prefectures:
        card = random.choice(demo_data)

        # 同じ都道府県のカードが既に選択済みか、available_cardsに存在するかをチェック
        if card["prefecture_id"] in available_prefectures and card["card_id"] not in saved_available_card_ids:
            drawed_cards.append(card)
            available_prefectures.remove(card["prefecture_id"])
            saved_available_card_ids.add(card["card_id"])

            # グルメデータを取得
            rag_data = fetch_rag_kintone_data(card["prefecture_name"])
            logging.info(rag_data)

            gourmet = ""
            for rag in rag_data:
                gourmet += f"{rag['name']}：{rag['description']}\n"

            # 生成した文章を追加
            description = generate_text(gourmet, card)

            card["description"] = description
            logging.info(card)

    # available_cardが10枚を超えた場合の処理
    while len(saved_available_card_ids) > 10:
        card_id_to_remove = random.choice(list(saved_available_card_ids))
        saved_available_card_ids.remove(card_id_to_remove)

    return drawed_cards

# カードを削除するエンドポイント
@app.delete("/delete_card/{card_id}")
def delete_card(card_id: str):
    if card_id in saved_card_ids:
        del saved_card_ids[card_id]
    elif card_id in saved_available_card_ids:
        saved_available_card_ids.remove(card_id)
    else:
        return {"message": "Card not found. No action taken."}

    return {"message": f"Card {card_id} deleted successfully"}
