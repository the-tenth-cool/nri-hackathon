import { type CollectionCard } from "~/interfaces/card";

type PostResult = PostOK | PostNG;

interface PostOK {
  card_id: string;
};

interface PostNG {
  detail: string;
}

export const useCollectionCard = () => {
  const origin = useRuntimeConfig().public.apiOrigin;
  const url = "cards";

  const frameColor = "border-amber-300";

  const getFrameColor = () => {
    return frameColor;
  }
  
  const findAll = async (): Promise<CollectionCard[]> => {
    const { data } = await useFetch<CollectionCard[]>(`${origin}/${url}`);
    if (data.value === null) {
      throw new Error("Collection Cardを取得できませんでした。")
    }
    data.value.forEach((card) => {
      card.type = "collection";
    });
    return data.value;
  } 

  const findOneById = async (id: string): Promise<CollectionCard | null> => {
    const { data } = await useFetch<CollectionCard>(`${origin}/${url}/${id}`);
    if (data.value !== null) {
      data.value.type = "collection";
    }
    return data.value
  }

  const register = async (id: string): Promise<boolean> => {
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
    getFrameColor,
    findAll,
    findOneById,
    register,
  }
}
