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
      'is-loading':loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading"/>
    <Icon :icon="icon" v-if="icon"/>
    <span>
      <slot />
    </span>
  </button>
 </template>


 <script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
import Icon from '../Icon/Icon.vue';
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