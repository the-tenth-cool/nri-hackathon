import { ServerFile } from "nuxt-file-storage"

export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: ServerFile[] }>(event)
  const fileNames: string[] = [];

  for ( const file of files ) {
    const fileName = await storeFileLocally(file, 8, '/collections')
    fileNames.push(fileName);
  }
  return fileNames;
})
