<template>
  <!-- Open the modal using ID.showModal() method -->
  <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <div v-if="isLoading" class="text-center mt-8">
        <p class="font-bold text-lg mb-6">
          It's almost done... It's almost done... Don't rush it
        </p>
        <!-- <span class="loading loading-spinner loading-lg"></span> -->
        <div class="loader"></div>
        <p class="text-6xl mt-6">🫣</p>
        <p class="text-sm mt -4">
          Warm tips: the more output content will be slower, usually about 10s
          can be completed. If it takes too long to finish, you can re-post it.
        </p>
      </div>
      <div class="text-center">
        <div v-if="isCorrect === 1">
          <p class="font-bold text-lg mb-6">Congratulations! You're amazing</p>
          <p class="text-6xl">🥳</p>
          <p class="text-center">You can go to the next question.</p>
          <p class="font-bold mt-6">Output: {{ output }}</p>
        </div>
        <div v-if="isCorrect === 2">
          <p class="font-bold text-lg mb-6">Oh no! Just a little bit</p>
          <p class="text-6xl">🥺</p>
          <p class="text-center">
            Please check that your post and outputs meet the requirements.
          </p>
          <p class="font-bold mt-6">Output: {{ output }}</p>
          <p class="font-bold mt-6" v-if="explanation.length > 0">
            Explanation: {{ explanation }}
          </p>
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button @click="$emit('reset')" class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
defineProps(["isLoading", "isCorrect", "output", "explanation"]);
defineEmits(["reset"]);
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 35px;
  height: 80px;
  margin: 0 auto;
  position: relative;
}
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  padding: 3px 5px;
  border-top: 1px solid #bbb6aa;
  border-bottom: 4px solid #bbb6aa;
  background: 
    linear-gradient(#612329 0 0) bottom no-repeat content-box, 
    #e4e0d7;
  mix-blend-mode: darken;
  animation: l1 1.5s infinite linear;
}
.loader:before {
  content: "";
  position: absolute;
  inset: -18px calc(50% - 2px) 8px;
  background: #eb6b3e;   
  transform-origin: bottom;
  transform: rotate(8deg);
}
@keyframes l1 {
 0%   {background-size: 100% 100%}
 100% {background-size: 100% 5%}
}
</style>
