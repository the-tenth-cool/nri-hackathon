/**
 * 食材やお土産のカード
 */
export interface Card {
  /**
   * ID
   */
  card_id: string;

  /**
   * 都道府県ID
   */
  prefecture_id: string;

  /**
   * 都道府県名
   */
  prefecture_name: string;

  /**
   * 地方ID
   */
  region_id: string;

  /**
   * 地方名
   */
  region_name: string;

  /**
   * 食材ジャンルID
   */
  food_genre_id: string;

  /**
   * 食材ジャンル名
   */
  food_genre_name: string;

  /**
   * カードの色
   */
  card_color: string;

  /**
   * 説明
   */
  description: string;

  /**
   * タイプ
   */
  type: "available" | "collection";

  /**
   * コレクション後の画像のパス
   */
  imageName?: string;
}

/**
 * 取得済みのカード
 */
export interface CollectionCard extends Card {};

/**
 * 仮取得したカード
 */
export interface AvailableCard extends Card {};
