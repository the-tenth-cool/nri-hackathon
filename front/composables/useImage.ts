import type { Card } from "~/interfaces/card";

export const useImage = () => {
  const foodImageMap = new Map<string, string>([
    ["1", "fish_nodoguro.png"],
    ["2", "food_niku_gyuniku_steak.png"],
    ["3", "vegetable.png"],
    ["4", "fruits_basket.png"],
    ["5", "valentinesday_itachoco2.png"],
    ["6", "food_gohan_hakumai.png"],
    ["7", "vegetable_daizu.png"],
    ["8", "drink_chabashira.png"],
    ["9", "drink_nihonsyu.png"],
    ["10", "cheese_camembert.png"],
    ["11", "food_zei2_kakou.png"],
    ["12", "food_sushi_unidon.png"],
    ["13", "food_udon_kake.png"],
    ["14", "tsukemono.png"],
    ["15", "egg_ware_white.png"],
  ]);

  const getNodoImage = (): string => {
    return `/img/noimage.png`;
  }

  const getFoodImageById = (id: string): string => {
    const imageName = foodImageMap.get(id);
    if (!imageName) {
      return getNodoImage();
    }
    return `/img/foods/${imageName}`;
  }

  const getImage = (card: Card) => {
    return card.type === "available" ? getFoodImageById(card.food_genre_id) : getNodoImage();
  }

  return {
    getNodoImage,
    getFoodImageById,
    getImage,
  }
}
