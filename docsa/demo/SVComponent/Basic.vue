<template>
    <div>
        <SVComponent @result="handleResult"/>
    </div>
</template>

<script setup lang="ts">
import SVComponent from '../../../src/components/SVComponent/SVComponent.vue'
function handleResult(resultValue) {
  console.log('Received result from custom component:', resultValue);
  // 在这里可以根据 resultValue 的值进行其他操作
}
</script>