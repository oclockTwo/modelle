<template>
  <!-- Open the modal using ID.showModal() method -->
  <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <div v-if="isLoading" class="text-center mt-8">
        <p class="font-bold text-lg mb-6">
          It's almost done... It's almost done... Don't rush it
        </p>
        <span class="loading loading-spinner loading-lg"></span>
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

<style scoped></style>
