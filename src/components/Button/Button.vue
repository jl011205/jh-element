<!-- 组件 -->
<template>
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
 </template>


 <script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';

defineOptions({
    name:'Vkbutton'
})
//确定属性
withDefaults( defineProps<ButtonProps>(),{
    nativeType:'button'  
})
//根据对应属性添加classname

//暴露 
//获取dom节点到组件当中
const _ref = ref<HTMLButtonElement>()
defineExpose({
    ref:_ref
})
</script>

<style >

</style>