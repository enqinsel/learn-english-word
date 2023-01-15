<script setup>
import { computed } from "vue";

const props = defineProps(["name", "placeholder"]);

const emits = defineEmits(["update:name"]);

const nameHandler = (event) => {
  emits("update:name", event.target.value);
};

const isValid = computed(() => {
  return props.name.length > 1;
});
</script>

<template>
  <input
    type="text"
    class="name"
    :value="props.name"
    :placeholder="props.placeholder"
    @input="nameHandler"
  />


  <div class="warn" v-if="!isValid">
    <span>
      Invalid Name
    </span>
  </div>
</template>

<style scoped>
.name {
  width: 363px;
  height: 33px;
  margin-bottom: 20px;
  background: #ffffff;
  border: 2px solid #FF514A;;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

@keyframes warnName {
  0%   {background-color:#9485E7; left:702px; top:115px;}
  25%  {background-color:#BDDE31; left:760px; top:115px;}
  50%  {background-color:#92CCFE; left:760px; top:115px;}
  75%  {background-color:#DE5A42; left:702px; top:115px;}
  100% {background-color:#F75F92; left:702px; top:115px;}
}

.warn{
  margin-bottom: 10px;
  position: absolute;
  left: 702px;
  top: 115px;
  text-align: center;
  width: 100%;
  z-index: -1;
  width: 100px;
  background-color: #e57373;
  padding: 10px;
  animation-name: warnName;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
</style>
