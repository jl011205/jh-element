<!-- 基于 Vue 的组合式 API，利用ref引用 DOM 元素和响应式数据，通过自定义函数生成随机验证码图形并进行大小写敏感的验证，同时引入Button和Input组件，结合 CSS 样式实现了一个验证码验证组件。 -->

<template>
  <div class="container">
    <div class="code-row">
      <Input v-model="userInput" placeholder="请输入验证码" />
      <canvas @click="refreshCode" ref="canvasRef" width="100" height="30"></canvas>
    </div>
    <div class="button-row">
      <Button type="primary" @click="checkCode">验证</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from '../Button/Button.vue';
import Input from '../Input/Input.vue';
import type { CodeVerifierProps } from './type';
defineOptions({
  name: 'VkCodeVerifier',
});
const props = withDefaults(defineProps<CodeVerifierProps>(), {
  generatedCode: undefined,
  VCD: 4,
  casesensitive: false, // 默认不区分大小写
});
const canvasRef = ref(null);
const userInput = ref('');
let generatedCode = props.generatedCode;

function randomCharacter() {
  const characters = '0123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
  return characters[Math.floor(Math.random() * characters.length)];
}
console.log(generatedCode);

function drawCode() {
  const canvas = canvasRef.value as HTMLCanvasElement | null;
  if (!canvas) {
    console.error('Canvas is not initialized.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
    ctx.fill();
  }
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }
  ctx.font = '24px Arial';
  ctx.fillStyle = '#333';
  const codeArray = Array.from({ length: props.VCD }, randomCharacter);
  let x = 10;
  for (const char of codeArray) {
    const rotation = Math.random() * Math.PI / 4 - Math.PI / 8; // 随机旋转角度
    ctx.save();
    ctx.translate(x, 20);
    ctx.rotate(rotation);
    ctx.fillText(char, 0, 0);
    ctx.restore();
    x += 20;
  }
  return codeArray.join('');
}

function generateCode() {
  generatedCode = drawCode();
  return generatedCode;
}

function checkCode() {
  if (generatedCode === undefined) return;
  if (props.casesensitive) {
    // 如果区分大小写，直接比较
    if (userInput.value === generatedCode) {
      alert('验证码正确！');
    } else {
      alert('验证码错误！');
    }
  } else {
    // 如果不区分大小写，转换为小写比较
    if (userInput.value.toLowerCase() === generatedCode.toLowerCase()) {
      alert('验证码正确！');
    } else {
      alert('验证码错误！');
    }
  }
  console.log(userInput.value);
  console.log(generatedCode);
}

function refreshCode() {
  generateCode();
}

onMounted(() => {
  generateCode();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.code-row {
  display: flex;
  align-items: center;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>