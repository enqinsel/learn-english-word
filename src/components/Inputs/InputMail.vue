<script setup>
import { computed } from "vue";
const props = defineProps(["email"]);
const emits = defineEmits(["update:email"]);

const emailHandler = (event) => {
  emits("update:email", event.target.value);
};

const isValid = computed(() => {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(props.email);
});
</script>

<template>
  <input
    type="text"
    class="email"
    :value="props.email"
    placeholder="E-mail"
    @input="emailHandler"
  />

  <div class="warn" v-if="!isValid">
    <span>
      Invalid E-mail
    </span>
  </div>
</template>

<style scoped>

@keyframes warnMail {
  0%   {background-color:#F75F92; left:702px; top:265px;}
  25%  {background-color:#9485E7; left:760px; top:265px;}
  50%  {background-color:#DE5A42; left:760px; top:265px;}
  75%  {background-color:#92CCFE; left:702px; top:265px;}
  100% {background-color:#BDDE31;; left:702px; top:265px;}
}

.warn{
  margin-bottom: 10px;
  position: absolute;
  left: 702px;
  top: 265px;
  text-align: center;
  width: 100%;
  z-index: -1;
  width: 100px;
  background-color: #e57373;
  padding: 10px;
  animation-name: warnMail;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

.email {
  width: 363px;
  height: 33px;
  margin-bottom: 20px;
  background: #ffffff;
  border: 2px solid #FF514A;;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}


</style>
