<!-- 基于 Vue 的组合式 API，利用响应式数据、计算属性和定时器实现了一个简单的倒计时功能。通过按钮触发开始、重置和暂停操作，将时间拆分为小时、分钟和秒进行处理，并在模板中实时显示格式化后的时间。 -->

<template>
    <div class="vk-timer">
      <Button info @click="startCountDown"> 开始倒计时</Button>
      <br>
      <Button info @click="clearCountDown"> 重置</Button>
      <br>
      <Button info @click="stopCountDown"> 暂停</Button>
      <br>
      <div class="time">
        <span>{{ formattedTime }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { TimerProps } from './types';
  import Button from '../Button/Button.vue';
  import { computed, reactive, ref } from 'vue';
  defineOptions({
    name:'Vktimer'
})
  const props = defineProps<TimerProps>();

  console.log(props.time);
  
  const countdown = ref();
  const timeObj = reactive({
    h: 0,
    m: 0,
    s: 0
  });
  
  if (props.time) {
    const [h, m, s] = props.time.split(':').map(Number);
    timeObj.h = h;
    timeObj.m = m;
    timeObj.s = s;
  }
 
  
  const startCountDown = () => {
    countdown.value = setInterval(() => {
      if (timeObj.s > 0) {
        timeObj.s--;
      } else if (timeObj.m > 0) {
        timeObj.m--;
        timeObj.s = 59;
      } else if (timeObj.h > 0) {
        timeObj.h--;
        timeObj.m = 59;
        timeObj.s = 59;
      } else {
        clearInterval(countdown.value);
      }
    }, 1000);
  };
  
  const clearCountDown = () => {
    timeObj.h = 0;
    timeObj.m = 0;
    timeObj.s = 0;
  };
  
  const stopCountDown = () => {
    if (countdown.value) {
      clearInterval(countdown.value);
      countdown.value = null;
    } else {
      startCountDown();
    }
  };
  
  const formattedTime = computed(() => {
    return `${timeObj.h < 10? '0' + timeObj.h : timeObj.h}:${timeObj.m < 10? '0' + timeObj.m : timeObj.m}:${timeObj.s < 10? '0' + timeObj.s : timeObj.s}`;
  });

  </script>