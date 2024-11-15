import { type AvailableCard } from "~/interfaces/card";

export const useAvailableCard = () => {
  const origin = useRuntimeConfig().public.apiOrigin;
  const url = "/available_cards";

  const cssClassOfFrameColor = "border-gray-200";

  const findAll = async (): Promise<AvailableCard[]> => {
    const { data } = await useFetch<AvailableCard[]>(origin + url);
    if (data.value === null) {
      throw new Error("Available Cardを取得できませんでした。")
    }
    return data.value;
  }

  const findOneById = async (id: string): Promise<AvailableCard | null> => {
    // TODO: /available_cardsが出来たら実装変更
    const cards = await findAll();
    const card = cards.find((c) => c.card_id === id);
    return card || null;
  }

  return {
    cssClassOfFrameColor,
    findAll,
    findOneById,
  }
}
