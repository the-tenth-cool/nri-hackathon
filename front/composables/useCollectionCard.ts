import { type CollectionCard } from "~/interfaces/card";
import { useState } from '#app';

type PostResult = PostOK | PostNG;

interface PostOK {
  card_id: string;
};

interface PostNG {
  detail: string;
}

interface OptionalData {
  imagePath: string;
  description: string;
}

export const useCollectionCard = () => {
  const origin = useRuntimeConfig().public.apiOrigin;
  const url = "cards";
  const optionalDataMap = useState<Map<string, OptionalData>>('optionalDataMap', () => new Map());

  const findAll = async (): Promise<CollectionCard[]> => {
    const { data } = await useFetch<CollectionCard[]>(`${origin}/${url}`);
    if (data.value === null) {
      throw new Error("Collection Cardを取得できませんでした。")
    }
    data.value.forEach((card) => {
      const optionalData = optionalDataMap.value.get(card.card_id);
      if (optionalData) {
        card.imagePath = optionalData.imagePath;
        card.description = optionalData.description;
      }
      card.type = "collection";
    });
    return data.value;
  } 

  // 未使用
  const findOneById = async (id: string): Promise<CollectionCard | null> => {
    const { data } = await useFetch<CollectionCard>(`${origin}/${url}/${id}`);
    if (data.value !== null) {
      data.value.type = "collection";
    }
    return data.value
  }

  const register = async (id: string, optionalData: OptionalData): Promise<boolean> => {
    optionalDataMap.value.set(id, optionalData);
    const { data, status, error } = await useFetch<PostResult>(`${origin}/${url}`, {
      method: "POST",
      query: {
        card_id: id,
      } // backendの仕様上queryで送る
    })
    console.log(data, status);
    return !error;
  }

  return {
    findAll,
    findOneById,
    register,
  }
}
