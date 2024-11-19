# 起動方法
1. 仮想環境を作成し、`requirements.txt` に記載されたライブラリをインストールします。
2. 以下のコマンドを実行してアプリケーションを起動します。

    ```bash
    uvicorn main:app --reload
    ```

# API 仕様書

## 1. 訪れた地域を保存

### エンドポイント
`POST /cards`

### 概要
指定されたカードIDを訪れた地域として保存します。

### リクエスト形式
- Content-Type: `application/json`

### リクエストパラメータ
| パラメータ | 型    | 必須 | 説明                     |
|------------|-------|------|--------------------------|
| `card_id`  | string | はい  | 保存するカードのID         |

### レスポンス
- **200 OK**  
  指定されたカードが保存された場合。
  ```
  {
    "card_id": "123",
    "count": 1,
    "color": "blue"
  }
  ```
- **400 Bad Request**  
  指定されたカードIDが利用できない場合。
  ```
  {
    "detail": "Card is not available"
  }
  ```
---

## 2. 訪れた地域の一覧を取得

### エンドポイント
`GET /cards`

### 概要
保存された訪問済みのカード情報を一覧で取得します。

### リクエストパラメータ
なし

### レスポンス
- **200 OK**  
  訪問済みのカード一覧。
  ```
  [
    {
      "card_id": "123",
      "prefecture_id": "01",
      "prefecture_name": "Hokkaido",
      "region_id": "1",
      "region_name": "North",
      "food_genre_id": "5",
      "food_genre_name": "Ramen",
      "card_color": "blue",
      "description": "Generated from Kintone data",
      "count": 1
    }
  ]
  ```
---

## 3. 使用可能なカードの一覧を取得

### エンドポイント
`GET /available_cards`

### 概要
使用可能なカード情報を一覧で取得します。

### リクエストパラメータ
なし

### レスポンス
- **200 OK**  
  使用可能なカード一覧。
  ```
  [
    {
      "card_id": "456",
      "prefecture_id": "02",
      "prefecture_name": "Aomori",
      "region_id": "2",
      "region_name": "North",
      "food_genre_id": "3",
      "food_genre_name": "Sushi",
      "card_color": "blue",
      "description": "Generated from Kintone data"
    }
  ]
  ```
---

## 4. 訪れた地域の詳細を取得

### エンドポイント
`GET /cards/{card_id}`

### 概要
指定したカードIDの詳細情報を取得します。

### リクエストパラメータ
| パラメータ  | 型    | 必須 | 説明                   |
|-------------|-------|------|------------------------|
| `card_id`   | string | はい  | 取得するカードのID       |

### レスポンス
- **200 OK**  
  指定されたカードの詳細情報。
  ```
  {
    "card_id": "123",
    "prefecture_id": "01",
    "prefecture_name": "Hokkaido",
    "region_id": "1",
    "region_name": "North",
    "food_genre_id": "5",
    "food_genre_name": "Ramen",
    "card_color": "blue",
    "description": "Generated from Kintone data",
    "count": 1
  }
  ```
- **404 Not Found**  
  カードが見つからない場合。
  ```
  {
    "detail": "Card not found"
  }
  ```
---

## 5. ランダムに3枚のカードを引く

### エンドポイント
`GET /draw_cards`

### 概要
利用可能なカードからランダムに3枚を引きます。

### リクエストパラメータ
なし

### レスポンス
- **200 OK**  
  ランダムに引かれたカード一覧。
  ```
  [
    {
      "card_id": "789",
      "prefecture_id": "03",
      "prefecture_name": "Iwate",
      "region_id": "3",
      "region_name": "North",
      "food_genre_id": "4",
      "food_genre_name": "Soba",
      "card_color": "blue",
      "description": "Recommended soba dishes in Iwate."
    }
  ]
  ```
- **404 Not Found**  
  カードが利用可能でない場合。
  ```
  {
    "detail": "No cards available"
  }
  ```
---

## 6. カードを削除

### エンドポイント
`DELETE /delete_card/{card_id}`

### 概要
指定したカードIDを削除します。

### リクエストパラメータ
| パラメータ  | 型    | 必須 | 説明                     |
|-------------|-------|------|--------------------------|
| `card_id`   | string | はい  | 削除するカードのID         |

### レスポンス
- **200 OK**  
  削除が成功した場合。
  ```
  {
    "message": "Card 123 deleted successfully"
  }
  ```
- **404 Not Found**  
  カードが見つからない場合。
  ```
  {
    "message": "Card not found. No action taken."
  }
  ```