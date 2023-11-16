<template>
  <div>
    <!-- Open the modal using ID.showModal() method -->
    <!-- <button class="btn" onclick="my_modal_2.showModal()">open modal</button> -->
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <h2 class="font-bold text-lg text-center">How to play?</h2>
        <p class="py-4">
          It's a puzzle game that talks to AI large language models:<br>
          <br>
          1. First, read the questions carefully and understand the requirements
          (sometimes it's the questions you don't understand that keep you from
          passing). <br>
          <br>
          2. Post your answer, your answer is the input of the large
          language model. <br>
          <br>
          3. Wait for some time (we would like to output the
          result immediately, but this is determined by chatgpt) <br>
          <br>
          4. Look at the output, which is the output of the large language model. <br>
          <br>
          5. If you don't pass this question, see if the answer in your post fulfills the
          requirements, and if the content of the output fulfills the answer to
          the question.<br>
          <br>
          For more information you can check the FAQ below.
        </p>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup></script>

<style scoped></style>
