<script setup>
import { computed } from "vue";
const props = defineProps(["password", "placeholder"]);
const emits = defineEmits(["update:password"]);

const passwordHandler = (event) => {
  emits("update:password", event.target.value);
};

const isValid = computed(() => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
    props.password
  );
});
</script>

<template>
  <input
    type="password"
    class="password"
    :value="props.password"
    :placeholder="props.placeholder"
    @input="passwordHandler"
  />

  <div class="warnPassword" v-if="!isValid">
    <span> Upper&lower,number and special char. (#?!@$%^&*-), min 8 length. </span>
  </div>
</template>

<style scoped>
.password {
  width: 363px;
  height: 33px;
  margin-bottom: 20px;
  background: #ffffff;
  border: 2px solid #ff514a;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

@keyframes warnPassword {
  0% {
    background-color: #bdde31;
    left: 780px;
    top: 165px;
  }
  25% {
    background-color: #92ccfe;
    left: 660px;
    top: 165px;
  }
  50% {
    background-color: #de5a42;
    left: 660px;
    top: 165px;
  }
  75% {
    background-color: #9485e7;
    left: 780px;
    top: 165px;
  }
  100% {
    background-color: #f75f92;
    left: 780px;
    top: 165px;
  }
}

.warnPassword {
  margin-bottom: 10px;
  position: absolute;
  width: auto;
  height: auto;
  left: 682px;
  top: 165px;
  text-align: center;
  z-index: -1;
  background-color: #e57373;
  padding: 10px;

  animation-name: warnPassword;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
</style>
