<template>
  <div :class="mainColor">
    <div class="flex flex-col max-w-2xl h-screen mx-auto">
      <Header />

      <div class="py-4 mx-auto mt-4">
        <h2
          class="font-Josefin-sans inline-block p-4 text-4xl font-bold text-center text-white break-words bg-blue-700 rounded-lg"
          style="transform: rotate(5deg); line-height: 0.8"
        >
          Effortlessly Understand AI
        </h2>
      </div>

      <!-- 展示区 -->
      <div class="my-auto">
        <div class="card w-full bg-neutral text-neutral-content shadow-xl">
          <div class="card-body">
            <img
              class="w-1/2 mx-auto"
              src="/images/sticker.png"
              alt="modelle ai"
            />
            <!-- <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div> -->
          </div>
        </div>
      </div>

      <div class="mt-auto">
        <p
          class="flex justify-center items-center text-3xl rounded-full shadow-lg bg-slate-200 w-16 h-16 p-2 mx-auto"
        >
          {{ remainTimes }}
        </p>
        <div class="flex justify-center gap-1 my-3 h-14" ref="lettersDOM">
          <div
            v-for="(letter, index) of inputWords"
            :key="index"
            class="input-letter-style"
            :class="{
              animate__animated: isAnimate,
              animate__rotateIn: isAnimate,
              animate__slow: isAnimate,
            }"
          >
            {{ letter }}
          </div>
        </div>
        <!-- 键盘区 -->
        <div class="flex flex-col justify-center items-center gap-1 mb-6">
          <div class="flex gap-1">
            <button
              v-for="(letter, index) of keyboard[0]"
              :key="index"
              :class="letter.styleClass"
              @click="addLetter(letter.key)"
            >
              {{ letter.key }}
            </button>
          </div>
          <div class="flex gap-1 mx-6">
            <button
              v-for="(letter, index) of keyboard[1]"
              :key="index"
              :class="letter.styleClass"
              @click="addLetter(letter.key)"
            >
              {{ letter.key }}
            </button>
          </div>
          <div class="flex gap-1">
            <button class="enter-button-style" @click="enterLetter">
              <svg
                t="1701192169733"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6752"
                id="mx_n_1701192169734"
                width="32"
                height="32"
              >
                <path
                  d="M804.248575 157.915589l0 431.250908L393.361461 589.166497 393.361461 407.414013l-265.620613 227.143277 265.620613 227.01741L393.361461 679.95013l456.278931 0c25.086351 0 45.391816-20.36277 45.391816-45.39284L895.032208 157.915589 804.248575 157.915589 804.248575 157.915589zM804.248575 157.915589"
                  fill="#2c2c2c"
                  p-id="6753"
                ></path>
              </svg>
            </button>
            <button
              v-for="(letter, index) of keyboard[2]"
              :key="index"
              :class="letter.styleClass"
              @click="addLetter(letter.key)"
            >
              {{ letter.key }}
            </button>
            <button class="delete-button-style" @click="deleteLetter">
              <svg
                t="1701192077094"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5287"
                width="32"
                height="32"
              >
                <path
                  d="M874.666667 202.666667H360.533333c-21.333333 0-40.533333 8.533333-55.466666 23.466666l-217.6 234.666667c-25.6 27.733333-25.6 72.533333 0 100.266667l217.6 234.666666c14.933333 14.933333 34.133333 23.466667 55.466666 23.466667H874.666667c40.533333 0 74.666667-34.133333 74.666666-74.666667V277.333333c0-40.533333-34.133333-74.666667-74.666666-74.666666z m10.666666 544c0 6.4-4.266667 10.666667-10.666666 10.666666H360.533333c-2.133333 0-6.4-2.133333-8.533333-4.266666l-217.6-234.666667c-4.266667-4.266667-4.266667-10.666667 0-14.933333l217.6-234.666667c2.133333-2.133333 4.266667-4.266667 8.533333-4.266667H874.666667c6.4 0 10.666667 4.266667 10.666666 10.666667V746.666667z"
                  fill="#2c2c2c"
                  p-id="5288"
                ></path>
                <path
                  d="M684.8 403.2c-12.8-12.8-32-12.8-44.8 0l-64 64-61.866667-61.866667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l61.866667 61.866667-61.866667 61.866667c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l61.866666-61.866667L640 618.666667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L620.8 512l61.866667-61.866667c12.8-12.8 12.8-34.133333 2.133333-46.933333z"
                  fill="#2c2c2c"
                  p-id="5289"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <MainIntroduction />
    <MainModal :is-correct="isCorrect" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import "animate.css";
import { storeToRefs } from "pinia";

// 设置背景颜色
const mainColor = ref("bg-main");
const store = useColorThemeStore();
const { dark } = storeToRefs(store);
watch(dark, (value) => {
  console.log("value:", value);
  if (value) {
    mainColor.value = "bg-main-dark";
  } else {
    mainColor.value = "bg-main";
  }
});

const remainTimes = ref(5);
const answer = "COLOR";
const isCorrect = ref(0);

const inputWords = reactive([]);
const lettersDOM = ref(null);
const isAnimate = ref(false);

function addLetter(letter) {
  if (remainTimes.value <= 0) {
    return;
  }

  // isAnimate.value = false;
  if (inputWords.length >= 10) {
    return;
  }
  inputWords.push(letter);
}

function enterLetter() {
  // TODO 检查这个单词是否存在

  if (remainTimes.value <= 0) {
    return;
  }
  remainTimes.value -= 1;

  const word = inputWords.join("");
  // isAnimate.value = true;
  console.log("word:", word, "answer:", answer);
  if (word === answer) {
    isCorrect.value = 1;
    openIntroduction();
  } else {
    isCorrect.value = 2;
    openIntroduction();
  }

  inputWords.length = 0;

  setTimeout(() => {
    if (!lettersDOM.value) {
      return;
    }
    for (let i = 0; i < lettersDOM.value.children.length; i++) {
      // if (answer.includes(lettersDOM.value.children[i].innerText)) {
      //   lettersDOM.value.children[i].className = "input-letter-correct-style";
      // } else {
      //   lettersDOM.value.children[i].className = "input-letter-error-style";
      // }
    }
    // setKeyboardStyle();
  }, 1200);
}

function openIntroduction() {
  const modal = document.getElementById("my_modal_3");
  if (modal && modal.showModal) {
    modal.showModal();
  }
}

function setKeyboardStyle() {
  for (let i = 0; i < keyboard.length; i++) {
    for (let j = 0; j < keyboard[i].length; j++) {
      if (
        inputWords.includes(keyboard[i][j].key) &&
        answer.includes(keyboard[i][j].key)
      ) {
        keyboard[i][j].styleClass = "keyboard-correct-style";
      } else if (
        inputWords.includes(keyboard[i][j].key) &&
        !answer.includes(keyboard[i][j].key)
      ) {
        keyboard[i][j].styleClass = "keyboard-error-style";
      }
    }
  }
}

function deleteLetter() {
  inputWords.pop();
}

const keyboard = reactive([
  [
    { key: "Q", styleClass: "keyboard-original-style" },
    { key: "W", styleClass: "keyboard-original-style" },
    { key: "E", styleClass: "keyboard-original-style" },
    { key: "R", styleClass: "keyboard-original-style" },
    { key: "T", styleClass: "keyboard-original-style" },
    { key: "Y", styleClass: "keyboard-original-style" },
    { key: "U", styleClass: "keyboard-original-style" },
    { key: "I", styleClass: "keyboard-original-style" },
    { key: "O", styleClass: "keyboard-original-style" },
    { key: "P", styleClass: "keyboard-original-style" },
  ],
  [
    { key: "A", styleClass: "keyboard-original-style" },
    { key: "S", styleClass: "keyboard-original-style" },
    { key: "D", styleClass: "keyboard-original-style" },
    { key: "F", styleClass: "keyboard-original-style" },
    { key: "G", styleClass: "keyboard-original-style" },
    { key: "H", styleClass: "keyboard-original-style" },
    { key: "J", styleClass: "keyboard-original-style" },
    { key: "K", styleClass: "keyboard-original-style" },
    { key: "L", styleClass: "keyboard-original-style" },
  ],
  [
    { key: "Z", styleClass: "keyboard-original-style" },
    { key: "X", styleClass: "keyboard-original-style" },
    { key: "C", styleClass: "keyboard-original-style" },
    { key: "V", styleClass: "keyboard-original-style" },
    { key: "B", styleClass: "keyboard-original-style" },
    { key: "N", styleClass: "keyboard-original-style" },
    { key: "M", styleClass: "keyboard-original-style" },
  ],
]);
</script>

<style scoped>
.font-Josefin-sans {
  font-family: "Josefin Sans", sans-serif;
}
.keyboard-original-style {
  @apply flex h-14 w-[46px] items-center justify-center rounded border-2 border-solid border-slate-200 text-lg font-bold cursor-pointer select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400;
}
.keyboard-correct-style {
  @apply flex h-14 w-[46px] items-center justify-center rounded border-2 border-solid border-slate-200 text-lg font-bold cursor-pointer select-none bg-orange-500;
}
.keyboard-error-style {
  @apply flex h-14 w-[46px] items-center justify-center rounded border-2 border-solid border-slate-200 text-lg font-bold cursor-pointer select-none bg-gray-500;
}
.enter-button-style {
  @apply w-[65.4px] h-14 flex justify-center items-center rounded mx-0.5 text-sm font-black cursor-pointer select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400;
}
.delete-button-style {
  @apply w-[65.4px] h-14 flex justify-center items-center rounded mx-0.5 text-sm font-black cursor-pointer select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400;
}
.input-letter-style {
  /* @apply uppercase h-14 w-[46px] flex justify-center items-center rounded border-2 border-solid border-slate-200 text-lg font-bold bg-slate-200; */
  @apply flex h-14 w-14 items-center justify-center rounded border-2 border-solid border-slate-200 bg-white text-2xl font-bold leading-10;
}
.input-letter-error-style {
  @apply flex h-14 w-14 items-center justify-center rounded border-2 border-solid border-slate-200 bg-gray-500 text-2xl font-bold leading-10;
}
.input-letter-correct-style {
  @apply flex h-14 w-14 items-center justify-center rounded border-2 border-solid border-slate-200 bg-orange-500 text-2xl font-bold leading-10;
}
</style>
