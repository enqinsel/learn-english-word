<script setup>
const props = defineProps(["showLearn", "showRemember", "showAccount", "showLogin","showRegister", "isDisabled"])
const emits = defineEmits(["learningHandler", "rememberHandler", "accountHandler", "loginHandler","registerHandler"]);

const learningHandler = () => emits("learningHandler");

const rememberHandler = () => emits("rememberHandler");

const accountHandler = () => emits("accountHandler");

const loginHandler = () => emits("loginHandler");

const registerHandler = () => emits("registerHandler");
</script>

<template>
  <div class="screenButtons">
    <button v-if="props.showLearn" @click="learningHandler">Learn</button>
    <button v-if="props.showRemember" @click="rememberHandler">Remind me later</button>
  </div>

    <button v-if="props.showLogin" @click="loginHandler">Login</button>
    <button v-if="props.showRegister" @click="registerHandler" :disabled="!props.isDisabled">Register</button>
    <button v-if="props.showAccount" @click="accountHandler">Have Account? Sign In</button>

</template>

<style scoped>


.screenButtons {
  display: flex;
  flex-direction: row;
  gap: 100px;
  position: absolute;
  top: 67%;
  left: 40%;
  transform: translate(-50%, -50%);
}

button {
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  width: 180px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: none;
  color: rgb(28, 2, 89);
}

button:hover {
  background: rgba(45,207,253,1) 70%;
}

button:disabled {
    opacity: 0.5;
    background: #505050;
    cursor: context-menu;
}
</style>
