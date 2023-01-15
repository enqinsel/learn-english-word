<script setup>
import Register from "../components/Register/Register.vue";
</script>

<template>
  <div>
    <div class="img">
      <img class="learnImg" src="../assets/learn.svg" />
      <img class="englishImg" src="../assets/english.svg" />
    </div>
    <Register></Register>
  </div>
</template>

<style scoped>
div {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: #34b0d2;
}

.img {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 120px;
}

.learnImg{
    grid-column: -3;
}

.englishImg{
    grid-row: 2;
    grid-column: 1;
}
</style>
