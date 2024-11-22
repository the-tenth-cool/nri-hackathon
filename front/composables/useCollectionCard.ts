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

  const findAll = async (): Promise<CollectionCard[]> => {
    const { data } = await useFetch<CollectionCard[]>(`${origin}/${url}`);
    if (data.value === null) {
      throw new Error("Collection Cardを取得できませんでした。")
    }
    data.value.forEach((card) => {
      card.type = "collection";
      console.log(card);
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
    const { data, status, error } = await useFetch<PostResult>(`${origin}/${url}`, {
      method: "POST",
      query: {
        card_id: id,
        image_name: optionalData.imagePath,
        user_description: optionalData.description
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
