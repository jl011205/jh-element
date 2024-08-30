<template>
    <div class="container">
      <div class="code-row">
        <Input v-model="userInput" placeholder="请输入验证码" />
        <canvas ref="canvasRef" width="100" height="30"></canvas>
      </div>
      <div class="button-row">
        <Button type="primary" @click="checkCode">验证</Button>
        <Button type="default" @click="refreshCode">刷新验证码</Button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Button from '../Button/Button.vue';
  import Input from '../Input/Input.vue';
  
  const canvasRef = ref(null);
  const userInput = ref('');
  let generatedCode;
  
  function randomCharacter() {
    const characters = '0123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
    return characters[Math.floor(Math.random() * characters.length)];
  }
  
  function drawCode() {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
    const code = Array.from({ length: 4 }, randomCharacter).join('');
    ctx.fillText(code, 10, 30);
    return code;
  }
  
  function generateCode() {
    generatedCode = drawCode();
    return generatedCode;
  }
  
  function checkCode() {
    if (userInput.value.toLowerCase() === generatedCode.toLowerCase()) {
      alert('验证码正确！');
    } else {
      alert('验证码错误！');
    }
    console.log(userInput.value.toLowerCase());
    console.log(generatedCode.toLowerCase());
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