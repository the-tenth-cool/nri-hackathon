const cards = [
  {
    "card_id": "1",
    "prefecture_id": "01",
    "prefecture_name": "北海道",
    "region_id": "01",
    "region_name": "北海道",
    "food_genre_id": "001",
    "food_genre_name": "魚",
    "card_color": "#FF5733",
    "description": "北海道の新鮮な海鮮丼。"
  },
  {
    "card_id": "2",
    "prefecture_id": "13",
    "prefecture_name": "東京都",
    "region_id": "02",
    "region_name": "関東",
    "food_genre_id": "002",
    "food_genre_name": "肉",
    "card_color": "#33FF57",
    "description": "東京の絶品焼肉。"
  },
  {
    "card_id": "3",
    "prefecture_id": "23",
    "prefecture_name": "愛知県",
    "region_id": "03",
    "region_name": "中部",
    "food_genre_id": "003",
    "food_genre_name": "野菜",
    "card_color": "#3357FF",
    "description": "愛知県産の新鮮野菜を使ったサラダ。"
  },
  {
    "card_id": "4",
    "prefecture_id": "27",
    "prefecture_name": "大阪府",
    "region_id": "04",
    "region_name": "近畿",
    "food_genre_id": "002",
    "food_genre_name": "肉",
    "card_color": "#FF33A8",
    "description": "大阪の名物たこ焼き。"
  },
  {
    "card_id": "5",
    "prefecture_id": "34",
    "prefecture_name": "広島県",
    "region_id": "05",
    "region_name": "中国",
    "food_genre_id": "001",
    "food_genre_name": "魚",
    "card_color": "#A833FF",
    "description": "広島の牡蠣料理。"
  },
  {
    "card_id": "6",
    "prefecture_id": "40",
    "prefecture_name": "福岡県",
    "region_id": "06",
    "region_name": "九州",
    "food_genre_id": "002",
    "food_genre_name": "肉",
    "card_color": "#FF8333",
    "description": "福岡の博多ラーメン。"
  },
  {
    "card_id": "7",
    "prefecture_id": "12",
    "prefecture_name": "千葉県",
    "region_id": "02",
    "region_name": "関東",
    "food_genre_id": "001",
    "food_genre_name": "魚",
    "card_color": "#33FFB2",
    "description": "千葉県の新鮮なイワシ料理。"
  },
  {
    "card_id": "8",
    "prefecture_id": "46",
    "prefecture_name": "鹿児島県",
    "region_id": "06",
    "region_name": "九州",
    "food_genre_id": "002",
    "food_genre_name": "肉",
    "card_color": "#FFB233",
    "description": "鹿児島の黒豚しゃぶしゃぶ。"
  },
  {
    "card_id": "9",
    "prefecture_id": "04",
    "prefecture_name": "宮城県",
    "region_id": "01",
    "region_name": "東北",
    "food_genre_id": "001",
    "food_genre_name": "魚",
    "card_color": "#FF33FF",
    "description": "宮城県の笹かまぼこ。"
  },
  {
    "card_id": "10",
    "prefecture_id": "11",
    "prefecture_name": "埼玉県",
    "region_id": "02",
    "region_name": "関東",
    "food_genre_id": "003",
    "food_genre_name": "野菜",
    "card_color": "#B233FF",
    "description": "埼玉県のネギを使った料理。"
  }
]

export const getCards = () => {
  return cards;
}

export const getCardsById = (id: number) => {
  return cards[id];
}
