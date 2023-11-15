<template>
  <!-- Open the modal using ID.showModal() method -->
  <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <div v-if="isLoading" class="text-center mt-8">
        <h3 class="font-bold text-lg mb-6">It's almost done... It's almost done... Don't rush it</h3>
        <span class="loading loading-spinner loading-lg"></span>
        <p class="text-6xl mt-6">🫣</p>
      </div>
      <div class="text-center">
        <div v-if="isCorrect === 1">
          <h3 class="font-bold text-lg mb-6">Congratulations! You're amazing</h3>
          <p class="text-6xl">🥳</p>
          <p class="text-center">You can go to the next question.</p>
          <p class="font-bold mt-6">Output: {{ output }}</p>
        </div>
        <div v-if="isCorrect === 2">
          <h3 class="font-bold text-lg mb-6">Oh no! Just a little bit</h3>
          <p class="text-6xl">🥺</p>
          <p class="text-center">Please check that your post and outputs meet the requirements.</p>
          <p class="font-bold mt-6">Output: {{ output }}</p>
          <p class="font-bold mt-6" v-if="explanation.length > 0">Explanation: {{ explanation }}</p>
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

<style scoped></style>
