<template>
  <div class="container mx-auto p-8">
    <div v-if="card" class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/2 flex justify-center items-center">
        <div
          class="bg-white h-[70vh] aspect-[3/4] flex-none rounded shadow-xl border-4"
          :class="[frameColor]"
        >
          <div class="h-full w-full flex flex-col justify-end p-2">
            <div
              class="border-2 h-full w-full flex-grow content-center"
              :class="[frameColor]"
            >
              <img
                :src="imagePreview || getImage(card)"
                :alt="imagePreview ? 'アップロードされた画像' : 'カード画像'"
                class="object-contain max-w-48 max-h-48 justify-self-center"
              />
            </div>
            <p class="text-center text-base font-semibold mt-1">{{ card.prefecture_name }}</p>
            <p class="text-center text-lg font-bold">{{ card.food_genre_name }}</p>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">画像アップロード</div>
            <p class="text-gray-500 mb-4">JPG, PNG, GIF (最大 5MB)</p>
            <label class="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out cursor-pointer">
              画像を選択
              <input type="file" @input="handleFileInput" class="hidden" @change="onFileChange" accept="image/*">
            </label>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden mt-4">
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">説明</div>
            <UTextarea
              v-model="description"
              placeholder="カードの説明を入力してください"
              class="w-full"
              :rows="4"
            />
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <div class="flex flex-col items-center mt-6">
            <button 
              @click="startAIJudgment" 
              class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
              :disabled="isJudging || !imagePreview"
              :class="{ 'opacity-50 cursor-not-allowed': !imagePreview }"
            >
              カードを登録
            </button>
            <p v-if="!imagePreview" class="text-red-500 mt-2">画像をアップロードしてください</p>
            <p v-if="imagePreview" class="mt-2">※位置情報を使用します。</p>
            <div v-if="isJudging" class="mt-4 w-64">
              <p class="text-center mb-2">AI判定中...</p>
              <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${progress}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-2xl font-bold text-red-500">指定されたIDのカードは存在しません。</p>
      <button 
        @click="goBack" 
        class="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
      >
        戻る
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute();
const router = useRouter();
const { handleFileInput, files } = useFileStorage()

const toast = useToast()
const { findOneById } = useAvailableCard()
const { register } = useCollectionCard();
const { getFrameColorByType } = useColor();
const { getImage } = useImage();

const id = String(params["id"]);
const card = await findOneById(id);
const isJudging = ref(false);
const progress = ref(0);

const imagePreview = ref<string | null>(null);
const frameColor = computed(() => imagePreview.value ? getFrameColorByType("collection") : getFrameColorByType("available"));

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const description = ref('');

const startAIJudgment = () => {
  isJudging.value = true;
  progress.value = 0;
  
  const interval = setInterval(() => {
    progress.value += 33.33;
    if (progress.value >= 99.99) {
      clearInterval(interval);
      setTimeout(() => {
        isJudging.value = false;
        registerCard();
      }, 300);
    }
  }, 1000);
};

const submit = async () => {
  const fileName = await $fetch('/api/images', {
    method: 'POST',
    body: {
      files: files.value
    }
  })
  return fileName[0];
}

const registerCard = async () => {
  const fileName = await submit();
  const optionalData = {
    imagePath: fileName,
    description: description.value
  }
  register(id, optionalData);
  toast.add({
    title: "コレクション完了！",
    description: "トップページに戻ります。",
    timeout: 2000,
    callback: () => {
      router.push("/")
    },
  })
}

const goBack = () => {
  router.push("/")
}
</script>
<style scoped>
</style>
