<script setup>
const props = defineProps(["learned"]);
</script>

<template>
  <div class="result">
    <div class="card">
      <div class="card__label">
        <h1>What I Learned</h1>
        <div class="label__line"></div>
      </div>
      <div class="card__wrapper">
        <ul>
          <li class="resultTable" v-for="i in 10">{{ i }}</li>
        </ul>
        <ul>
          <li class="resultTable" v-for="learning in props.learned">{{ learning }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
}

li {
  list-style: none;
}
.label__line {
  width: 100%;
  border-bottom: 1px solid rgba(31, 38, 135, 0.57);
  margin: 5px;
}

.card {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  
  color: rgb(28, 2, 89);
  text-align: center;
  padding: 25px;
  width: 250px;
  position: absolute;
  right: 50px;
  top: 125px;
  font-size: 18px;

  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  border: 2px solid rgba(0, 225, 255, 0.38);
}
.card__wrapper {
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
}
.resultTable {
  padding: 10px;
  border-bottom: 1px solid rgba(31, 38, 135, 0.57);
}
</style>