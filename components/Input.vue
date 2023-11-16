<template>
  <div class="flex items-start space-x-4">
    <div class="min-w-0 flex-1">
      <div class="relative">
        <div
          class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
        >
          <label for="comment" class="sr-only">Input Your Answer</label>
          <textarea
            rows="2"
            v-model="comment"
            id="comment"
            class="block w-full px-2 resize-none border-0 bg-transparent py-1.5 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Input Your Answer..."
          />

          <div class="py-2" aria-hidden="true">
            <div class="h-9" />
          </div>
        </div>

        <div
          class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2"
        >
          <div class="flex items-center space-x-5"></div>
          <div class="flex-shrink-0">
            <div class="tooltip" data-tip="Post Your Answer">
              <button
                class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="handleSubmit"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(["sendOpenAPIData"]);
const comment = ref("");

async function handleSubmit() {
  const words = comment.value.split(/\s+/);
  // console.log("words:", words, "length:", words.length);
  if (words.length > 100) {
    alert("Cannot exceed 100 words");
    return;
  }
  if(words.length === 1 && words[0] === "") {
    alert("Please input your answer");
    return;
  }

  const modal = document.getElementById("my_modal_1");
  if (modal && modal.showModal) {
    modal.showModal();
  }
  try {
    const query = encodeURIComponent(comment.value);
    const { data } = await useFetch(`/api/openai?message=${query}`);
    const result = reactive({
      request: comment.value,
      response: data.value.response,
    });
    emit("sendOpenAPIData", result);
  } catch (error) {
    console.log(error);
  }
}
</script>
