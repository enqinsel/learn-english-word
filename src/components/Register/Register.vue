<script setup>
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";

import InputName from "../Inputs/InputName.vue";
import InputPassword from "../Inputs/InputPassword.vue";
import InputMail from "../Inputs/InputMail.vue";
import ButtonComp from "../Button/ButtonComp.vue";

const router = useRouter();

const loginShow = ref(false);
const registerShow = ref(true);

const form = ref({
  name: "",
  email: "",
  password: "",
});

const disText = ref();

// Register Start
const isDisabled = computed(() => {
  if ((form.value.name && form.value.email && form.value.password).length > 1) {
    return true;
  } else {
    disText.value = "dis";
    return false;
  }
});

function registerHandler() {
  const task = localStorage.setItem("user", JSON.stringify(form.value));
  registerShow.value = false;
  loginShow.value = true;
  return task;
}

const isAccountHandler = () => {
  registerShow.value = false;
  loginShow.value = true;
};


// Login Start

const name = ref("");
const password = ref("");
const showError = ref(false);

function loginHandler() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (name.value === user.name && password.value === user.password) {
    router.push("/app");
  } else {
    showError.value = true;
  }
}

</script>

<template>
  <!-- Login Start -->
  <div class="login" v-if="loginShow">
    <div class="head">
      <h2>Login</h2>
    </div>
    <div class="login__inputs">
      <InputName v-model:name="name" placeholder="Username"></InputName>
      <InputPassword v-model:password="password" placeholder="Password"></InputPassword>
    </div>
    <div class="btn__login">
      <ButtonComp :showLogin="true" @loginHandler="loginHandler"></ButtonComp>
    </div>
    <p v-if="showError" class="showError">Incorrect Login! Re-enter the information.</p>
  </div>
  <!-- Login End -->
  <!-- Register Start -->

  <div class="register" v-if="registerShow">
    <div class="head">
      <h2>Register</h2>
    </div>
    <div class="register__inputs">
      <InputName v-model:name="form.name" placeholder="Full Name"></InputName>
      <InputPassword
        v-model:password="form.password"
        placeholder="Password"
      ></InputPassword>
      <InputMail v-model:email="form.email"></InputMail>
    </div>
    <div class="btn">
      <ButtonComp
        :showRegister="true"
        @registerHandler="registerHandler"
        :isDisabled="isDisabled"
      ></ButtonComp>
      <ButtonComp :showAccount="true" @accountHandler="isAccountHandler"></ButtonComp>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 500px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.head {
  border-bottom: 1px solid #ff514a;
  padding: 10px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  color: rgba(31, 38, 135, 0.87);
}

.login__inputs {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-content: space-evenly;
  justify-items: center;
  height: 300px;
  margin-bottom: 50px;
}

.btn__login {
  position: absolute;
  top: 320px;
  left: 150px;
}

@keyframes showError {
  from {
    color: red;
  }
  to {
    color: rgb(255, 255, 255);
  }
}

.showError {
  color: red;
  position: absolute;
  top: 185px;
  left: 105px;

  animation-name: showError;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

/* register */

.register {
  width: 600px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.register__inputs {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-content: space-evenly;
  justify-items: center;
  height: 400px;
  margin-bottom: 50px;
}

.btn {
  display: flex;
  gap: 50px;
  position: absolute;
  top: 420px;
  left: 120px;
}
</style>
