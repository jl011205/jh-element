<script setup>
import { ref } from 'vue'
import Input from '../../../src/components/Input/Input.vue'
const testt = ref('')
const testtt = ref('')
</script>
<template>
  <div class="size-holder">
    <Input v-model="testt" placeholder="大的 Input" size="large">
    </Input>
    <Input v-model="testtt" placeholder="普通的 Input">
    </Input>
    <Input v-model="testt" placeholder="小的 Input" size="small">
    </Input>
  </div>
</template>
<style scoped>
.size-holder {
  display: flex;
  align-items: center;
}
</style>