<script setup>
import { onMounted, ref, reactive } from "vue";
import { runData } from "../service/getData";

import ScreenComp from "../components/Screen/ScreenComp.vue";
import ButtonComp from "../components/Button/ButtonComp.vue";
import LearnedTableComp from "../components/LearnedTable/LearnedTableComp.vue";
import ProfileComp from "../components/Profile/ProfileComp.vue";

const word = ref();
const mean = ref();
const showProfile = ref(false);
const showSecond = ref();
const isLoad = ref(false);
const user = JSON.parse(localStorage.getItem("user"));

const learned = ref([null]);
const leftTime = reactive({
  timeLeft: "",
  hours: "",
  minutes: "",
  seconds: "",
});

const timeout = ref(null);
const interval = ref(null);

// async?
onMounted(() => {
  runData(learned, word, mean);
  learned.value = JSON.parse(localStorage.getItem("learned")) || [];
  if (learned.value.length >= 10) {
    showSecond.value = true;
  } else {
    showSecond.value = false;
  }
  setTimeout(() => {
    isLoad.value = true;
  }, 4500);
});

const learnHandler = () => {
  let start = Date.now(); // zamanlayıcının başlangıç zamanı
  let time = 7000; // 24(or smth.) saat zaman aralığı (milisaniye cinsinden)
  runData(learned, word, mean);
  if (learned.value.length >= 10) {
    setTimeout(() => {
      showSecond.value = true;
    }, 1100);
    timeout.value = setTimeout(() => {
      // Hafıza dolduktan 1 gün sonra boşalacaktır. Böylelikle günde 10 kelime sınırı koyulmuş olacak
      for (let i = learned.value.length; i > 0; i--) {
        learned.value.pop();
        localStorage.setItem("learned", JSON.stringify([]));
        showSecond.value = false;
      }
    }, time);
    // Her saniye ekrana kalan zamanı gösterir
    interval.value = setInterval(function () {
      leftTime.timeLeft = time - (Date.now() - start);
      leftTime.hours = Math.floor(leftTime.timeLeft / (1000 * 60 * 60));
      leftTime.minutes = Math.floor((leftTime.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      leftTime.seconds = Math.floor((leftTime.timeLeft % (1000 * 60)) / 1000);
    }, 1000);
  } else {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }

    if (interval.value) {
      clearInterval(interval.value);
    }

    learned.value = [...new Set(learned.value.concat(word.value))];
    localStorage.setItem("learned", JSON.stringify(learned.value));
  }
};

const remindHandler = () => {
  runData(learned, word, mean);
};

const profileHandler = () => {
  showProfile.value = !showProfile.value;
};
</script>

<template>
  <div class="appPage" v-if="isLoad">
    <ScreenComp :word="word" :mean="mean"></ScreenComp>

    <ButtonComp
      @learningHandler="learnHandler"
      @rememberHandler="remindHandler"
      :showLearn="true"
      :showRemember="true"
    ></ButtonComp>

    <div class="second" v-if="showSecond">
      <div class="secondMask"></div>
      <div class="secondStyle">
        <p>{{ leftTime.hours }} : {{ leftTime.minutes }} : {{ leftTime.seconds }}</p>
      </div>
    </div>
    <LearnedTableComp :learned="learned"></LearnedTableComp>
    <ProfileComp
      v-show="showProfile"
      @show="profileHandler"
      class="profileComp"
    ></ProfileComp>

    <div @click="profileHandler" class="profileNav">
      <img class="avatar" src="../assets/profile-avatar.svg" />
      <div class="profileContent">
        <p class="userName">{{ user.name }}</p>
        <p class="userMail">{{ user.email }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <div id="load">
      <div>G</div>
      <div>N</div>
      <div>I</div>
      <div>D</div>
      <div>A</div>
      <div>O</div>
      <div>L</div>
    </div>
  </div>
</template>

<style scoped>
@keyframes app {
  0%   {opacity: 0;}
  25%  {opacity: 0.25;}
  50%  {opacity: 0.50;}
  75%  {opacity: 0.75;}
  100% {opacity: 1;}
}
.appPage{
  animation: app 0.3s linear;
}
.secondStyle {
  background-color: rgb(0, 0, 0);
  width: 250px;
  height: 75px;
  font-size: 50px;
  border: 3px solid rgba(0, 225, 255, 1);
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  border-radius: 10px;
  right: 70px;
  bottom: 305px;
  z-index: 2;
}

.secondMask {
  padding: 25px;
  width: 215px;
  height: 400px;
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  right: 65px;
  top: 145px;
  background-color: rgb(235, 12, 12, 0.7);
  filter: blur(5px);
  z-index: 1;
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    background-color: rgba(0, 225, 255, 0.5);
  }
}

button {
  position: absolute;
  left: 550px;
  top: 50px;
}

.profileNav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  max-width: 230px;
  height: 50px;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 5px 1px rgba(127, 255, 212, 0.795);
}
.profileNav:hover {
  box-shadow: 0px 0px 5px 3px aquamarine;
}
.avatar {
  width: 40px;
  height: 40px;
}

.profileContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: rgb(20, 27, 123);
}

/* -------------------------------------- */

#load {
  width:100%;
  height:100%;
  margin-left:-300px;
  overflow:visible;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  cursor:default;
  background-color: #fff;
}

#load div {
  position:absolute;
  left:50%;
  top:40%;
  width:20px;
  height:36px;
  opacity:0;
  font-size: 120px;
  font-family:Helvetica, Arial, sans-serif;
  animation:move 2s linear infinite;
  -o-animation:move 2s linear infinite;
  -moz-animation:move 2s linear infinite;
  -webkit-animation:move 2s linear infinite;
  transform:rotate(180deg);
  -o-transform:rotate(180deg);
  -moz-transform:rotate(180deg);
  -webkit-transform:rotate(180deg);
  color:#17b5e5;
}

#load div:nth-child(2) {
  animation-delay:0.2s;
  -o-animation-delay:0.2s;
  -moz-animation-delay:0.2s;
  -webkit-animation-delay:0.2s;
}
#load div:nth-child(3) {
  animation-delay:0.4s;
  -o-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
}
#load div:nth-child(4) {
  animation-delay:0.6s;
  -o-animation-delay:0.6s;
  -moz-animation-delay:0.6s;
  -webkit-animation-delay:0.6s;
}
#load div:nth-child(5) {
  animation-delay:0.8s;
  -o-animation-delay:0.8s;
  -moz-animation-delay:0.8s;
  -webkit-animation-delay:0.8s;
}
#load div:nth-child(6) {
  animation-delay:1s;
  -o-animation-delay:1s;
  -moz-animation-delay:1s;
  -webkit-animation-delay:1s;
}
#load div:nth-child(7) {
  animation-delay:1.2s;
  -o-animation-delay:1.2s;
  -moz-animation-delay:1.2s;
  -webkit-animation-delay:1.2s;
}

@keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  35% {
    left: 41%; 
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    left:59%; 
    -moz-transform:rotate(0deg); 
    -webkit-transform:rotate(0deg); 
    -o-transform:rotate(0deg);
    transform:rotate(0deg); 
    opacity:1;
  }
  100% {
    left:100%; 
    -moz-transform:rotate(-180deg); 
    -webkit-transform:rotate(-180deg); 
    -o-transform:rotate(-180deg); 
    transform:rotate(-180deg);
    opacity:0;
  }
}

@-moz-keyframes move {
  0% {
    left:0; 
    opacity:0;
  }
  35% {
    left:41%; 
    -moz-transform:rotate(0deg); 
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    left:59%; 
    -moz-transform:rotate(0deg); 
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%; 
    -moz-transform:rotate(-180deg); 
    transform:rotate(-180deg);
    opacity:0;
  }
}

@-webkit-keyframes move {
  0% {
    left:0; 
    opacity:0;
  }
  35% {
    left:41%; 
    -webkit-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  65% {
    left:59%; 
    -webkit-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  100% {
    left:100%;
    -webkit-transform:rotate(-180deg); 
    transform:rotate(-180deg); 
    opacity:0;
  }
}

@-o-keyframes move {
  0% {
    left:0; 
    opacity:0;
  }
  35% {
    left:41%; 
    -o-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  65% {
    left:59%; 
    -o-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  100% {
    left:100%; 
    -o-transform:rotate(-180deg); 
    transform:rotate(-180deg); 
    opacity:0;
  }
}
</style>
