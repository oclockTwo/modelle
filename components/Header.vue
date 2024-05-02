<template>
  <div class="flex justify-between bg-gray-200 rounded-md items-center mt-0">
    <div class="w-1/3 px-2">
      <!-- <div class="dropdown dropdown-hover pl-4">
        <label tabindex="0" class="btn btn-primary btn-sm m-1">Lang</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li @click="changeLanuage('en')" class="text-md">
            <a>english</a>
          </li>
          <li @click="changeLanuage('zh')" class="text-md">
            <a>中文简体</a>
          </li>
        </ul>
      </div> -->
      <SwitchToggle />
    </div>
    <h1 class="text-4xl text-center py-2">
      Model<span class="text-green-400">Le</span> AI
    </h1>
    <div class="pr-8 w-1/3 flex justify-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-9 h-9"
        @click="openIntroduction2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>

      <!-- <a
        href="https://forms.gle/QztDnd9b7ZTgP3pa7"
        target="_blank"
        rel="noreferrer"
        class="cursor-pointer pl-6"
      >
        <div class="tooltip" data-tip="Submit your question">
          <img
            src="/images/icons/submit.jpg"
            alt="twitter"
            class="block w-8 max-w-full h-8 align-middle"
          /></div
      ></a> -->
    </div>
  </div>
</template>

<script setup>
function openIntroduction2() {
  const modal = document.getElementById("my_modal_2");
  console.log("modal:", modal);
  if (modal && modal.showModal) {
    modal.showModal();
  }
}

const lang = ref("en");
function changeLanuage(langString) {
  lang.value = langString;
}
</script>

<style scoped></style>
