<template>
  <!-- <Header /> -->
  <main
    class="h-screen overflow-auto font-Josefin-sans mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
  >
    <div class="flex justify-between bg-gray-200 rounded-md items-center mt-4">
      <div></div>
      <h1 class="text-4xl text-center py-2">
        Model<span class="text-green-400">Le</span> AI
      </h1>
      <div class="pr-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-9 h-9"
          @click="openIntroduction"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </div>
    </div>

    <Introduction />
    <Modal
      :is-loading="isLoading"
      @reset="reset()"
      :is-correct="isCorrect"
      :output="output"
      :explanation="explanation"
    />
    <div class="mt-4 mx-auto max-w-2xl">
      <div class="card max-w-2xl bg-base-900 shadow-xl">
        <figure class="h-80">
          <img src="/images/ideogram.jpeg" alt="modelle" class="bg-cover" />
        </figure>
        <div class="card-body">
          <h2 class="text-center text-2xl">Chapter{{ x + 1 }}</h2>
          <p class="text-2xl text-center mt-2">
            Question{{ x + 1 }}-{{ y + 1 }}:
          </p>
          <p class="sm:text-sm md:text-xl text-center mt-2 h-24 overflow-auto">
            {{ questions[x].value[y + 1].en }}
          </p>
          <Input @sendOpenAPIData="getOpenAPIData" />
        </div>
        <div class="flex justify-between px-4 pb-4">
          <div v-if="x === 0 && y === 0">
            <div class="tooltip" data-tip="Not as before">
              <button class="btn btn-warning" disabled="disabled">prev</button>
            </div>
          </div>
          <div v-else>
            <button class="btn btn-warning" @click="prev">prev</button>
          </div>
          <a href="https://www.buymeacoffee.com/blini" target="_blank"
            ><img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style="height: 50px !important; width: 217px !important"
          /></a>
          <div v-if="!isNext">
            <div class="tooltip" data-tip="Please complete this question first">
              <button class="btn btn-success" disabled="disabled">next</button>
            </div>
          </div>
          <div v-else>
            <button class="btn btn-success" @click="next">next</button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
  <Faq />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import checkFunctionMaps from "/composables/check";
const { data: chapter1 } = await useAsyncData(async () => {
  const content = await queryContent("/question").findOne();
  return content;
});
const { data: cheapter2 } = await useAsyncData(async () => {
  const content = await queryContent("/question/chapter2").findOne();
  return content;
});
const { data: cheapter3 } = await useAsyncData(async () => {
  const content = await queryContent("/question/chapter3").findOne();
  return content;
});
const { data: cheapter4 } = await useAsyncData(async () => {
  const content = await queryContent("/question/chapter4").findOne();
  return content;
});
const { data: cheapter5 } = await useAsyncData(async () => {
  const content = await queryContent("/question/chapter5").findOne();
  return content;
});

const questions = reactive([]);
function init() {
  questions.push(chapter1);
  questions.push(cheapter2);
  questions.push(cheapter3);
  questions.push(cheapter4);
  questions.push(cheapter5);
}
init();

const x = ref(0);
const y = ref(0);

const isLoading = ref(true);
const isCorrect = ref(0);
const output = ref("");
const explanation = ref("");
const isNext = ref(true);
function reset() {
  isLoading.value = true;
  isCorrect.value = 0;
  output.value = "";
  explanation.value = "";
}

function next() {
  const xnumber = questions.length;
  const ynumber = questions[x.value].value["number"];
  if (x.value < xnumber - 1) {
    if (y.value < ynumber - 1) {
      y.value += 1;
    } else {
      x.value += 1;
      y.value = 0;
    }
  } else {
    if (y.value < ynumber - 1) {
      y.value += 1;
    }
  }

  // if(x.value > currentX || (x.value === currentX && y.value > currentY)) {
  //   isNext.value = false;
  // } else {
  //   isNext.value = true;
  // }
}

function prev() {
  const xnumber = questions.length;
  const ynumber = questions[x.value].value["number"];
  if (x.value > 0) {
    if (y.value > 0) {
      y.value -= 1;
    } else {
      x.value -= 1;
      y.value = questions[x.value].value["number"] - 1;
    }
  } else {
    if (y.value > 0) {
      y.value -= 1;
    }
  }

  isNext.value = true;
}

// 用来判断能否进入下一题
let currentX = x.value;
let currentY = y.value;

function getOpenAPIData(data) {
  console.log(data);
  isLoading.value = false;
  output.value = data.response;

  // 进行输入和输出校验
  const key = String(x.value + 1) + String(y.value + 1);
  const func = checkFunctionMaps.get(key);

  const result = func(data.request, data.response);
  explanation.value = result[1];

  if (result[0]) {
    isCorrect.value = 1;
    isNext.value = true;
    currentX = x.value;
    currentY = y.value;
  } else {
    isCorrect.value = 2;
  }
}

function openIntroduction() {
  const modal = document.getElementById("my_modal_2");
  if (modal && modal.showModal) {
    modal.showModal();
  }
}

useHead({
  title: "ModelLe AI Games - ChatGPT Dialog Puzzle Game",
  meta: [
    {
      name: "description",
      content:
        "A very interesting dialog mode puzzle game that uses the chatgpt model",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://modelleai.com",
    },
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
});
</script>

<style scoped>
.font-Josefin-sans {
  font-family: "Josefin Sans", sans-serif;
}
</style>
