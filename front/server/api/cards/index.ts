import { getCards } from "~/utils/getCards"

export default defineEventHandler(() => {
  return getCards();
})
