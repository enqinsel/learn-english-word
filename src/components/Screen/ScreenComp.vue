<script setup>
const props = defineProps(["word", "mean"]);
</script>

<template>
  <div class="screen">
    <div class="word">
      <p class="word__w">{{ props.word }}</p>
    </div>
    <div class="meaning">
      <p class="meaning__m">{{ props.mean }}</p>
    </div>
  </div>
</template>

<style scoped>
.screen {
  display: grid; 
  grid-template-columns: repeat(1, 1fr);
  text-align: center;
  width: 1000px;
  height: 400px;
  position: absolute;
  top: 47%;
  left: 40%;
  transform: translate(-50%, -50%);

  background:linear-gradient(0deg, rgba(18,242,119,1) 0%, rgba(45,207,253,1) 70%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  color: rgb(28, 2, 89);
}

.word {
  width: 980px;
  height: 50px;
  border-bottom: 1px solid rgba(31, 38, 135, 0.37);
  padding: 10px;
}

.word__w {
  display: flex;
  justify-content: center;
  font-size: 24px;
  margin-top: 10px;
}

.meaning {
  width: 1000px;
  height: 120px;
  border-bottom: 1px solid rgba(31, 38, 135, 0.37);
  overflow-wrap: break-word;
}

.meaning__m {
  display: flex;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 100px;
}
</style>
