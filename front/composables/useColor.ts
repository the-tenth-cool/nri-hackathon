import type { Card } from "~/interfaces/card"

export const useColor = () => {
  const getFrameColorByType = (type: string) => {
    switch (type) {
      case "available":
        return "border-blue-300";
      case "collection":
        return "border-amber-300";
      default:
        throw new Error("不明なカードタイプです。");
    }
  }

  const getFrameColorByCard = (card: Card) => {
    return getFrameColorByType(card.type);
  }

  return {
    getFrameColorByType,
    getFrameColorByCard,
  }
}
