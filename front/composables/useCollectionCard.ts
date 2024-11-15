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

  const cssClassOfFrameColor = "border-yellow-200";

  const findAll = async (): Promise<CollectionCard[]> => {
    const { data } = await useFetch<CollectionCard[]>(`${origin}/${url}`);
    if (data.value === null) {
      throw new Error("Collection Cardを取得できませんでした。")
    }
    return data.value;
  } 

  const findOneById = async (id: string): Promise<CollectionCard | null> => {
    const { data } = await useFetch<CollectionCard>(`${origin}/${url}/${id}`);
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
    cssClassOfFrameColor,
    findAll,
    findOneById,
    register,
  }
}
