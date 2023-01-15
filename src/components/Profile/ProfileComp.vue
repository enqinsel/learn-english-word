<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emits = defineEmits(["show"]);

const closeHandler = () => {
  emits("show");
};

const router = useRouter();
const user = ref();

user.value = JSON.parse(localStorage.getItem("user"));

const nameText = ref(null);
const emailText = ref(null);
const passwordText = ref(null);

const updateHandler = (event) => {
  event.target.blur();

  user.value.name = nameText.value.innerText.trim();
  user.value.email = emailText.value.innerText.trim();
  user.value.password = passwordText.value.innerText.trim();

  const modifiedStrigified = JSON.stringify(user.value);
  localStorage.setItem("user", modifiedStrigified);

  // page refresh
  location.reload(true);
};

defineExpose({
  nameText: nameText,
  emailText: emailText,
  passwordText: passwordText,
});

const exitHandler = () => {
  router.push("/");
};
</script>

<template>
  <div>
    <div class="mask" @click="closeHandler"></div>
    <div class="container">
      <div class="avatar">
        <img src="../../assets/profile-avatar.svg" />
      </div>
      <div class="content">
        <p>
          <b>Name</b>
          <span ref="nameText" contenteditable>{{ user.name }} </span>
        </p>
        <p>
          <b>E-mail</b> <span ref="emailText" contenteditable>{{ user.email }}</span>
        </p>
        <p>
          <b>Password</b>
          <span class="password" ref="passwordText" contenteditable>{{ user.password }}</span>
        </p>
        <div class="button">
          <button class="updateButton" @click="updateHandler">Update</button>
          <button class="exitButton" @click="exitHandler">Exit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes transition {
  from {left: -350px;}
  to {left: 0px;}
}

[contenteditable] {
  outline: 0px solid transparent;
  border: 1px solid rgba(255, 255, 255, 0.644);
  justify-content: center;
}

[contenteditable]:hover {
  outline: 1px solid aquamarine;
  justify-content: center;
}

[contenteditable]:focus {
  outline: 3px solid aquamarine;
  justify-content: center;
}

b {
  background-color: aquamarine;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
span {
  background-color: rgba(0, 255, 255, 0.573);
  margin: 20px;
  padding: 5px;
  display: grid;
}

.password{
  filter: blur(4px);
}

.password:hover{
  filter: blur(0px);
}

.password:focus{
  filter: blur(0px);
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.549);
  cursor: pointer;
  z-index: 2;
}
.container {
  position: absolute;
  background: linear-gradient(0deg, rgba(18, 242, 119, 1) 0%, rgba(45, 207, 253, 1) 70%);
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 50px;
  gap: 30px;
  z-index: 3;
  animation: transition 0.3s linear;
}


.avatar {
  width: 100px;
  height: 100px;
  margin-right: auto;
  margin-left: auto;
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
  font-size: 20px;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width:100%;
}

button{
  padding: 15px;
  width: 100px;
  font-size: 16px;
  background-color: transparent;
}

.updateButton{
  border: 3px solid green;
}
.updateButton:hover{
  background-color: rgba(33, 206, 33, 0.847);
  cursor: pointer;
}

.exitButton{
  border: 3px solid red;
}

.exitButton:hover{
  background-color: rgba(245, 65, 65, 0.695);
  cursor: pointer;
  border: 2px solid red;
}
</style>
