<template>
  
    <div
      class="vk-switch"
      :class="{
        [`vk-switch--${size}`]: size,
        'is-disabled': disabled,
        'is-checked': checked
      }"
      @click="switchValue"
    >
      <input 
        class="vk-swtich__input"
        type="checkbox"
        role="switch"
        ref="input"
        :name="name"
        :disabled="disabled"
        @keydown.enter="switchValue"
      />
      <div class="vk-switch__core">
       <div class="vk-switch__core-inner">
        <span v-if="activeText || inactiveText" class="vk-switch__core-inner-test">
          {{ checked ? activeText : inactiveText }}
        </span>
       </div>
        <div class="vk-switch__core-action">
        </div>
      </div>
    </div>
    </template>

<script setup lang="ts">

import type { SwtichEmits, SwtichProps } from './types';
import { ref, computed, onMounted ,watch} from 'vue'
defineOptions({
    name: 'VkSwtich',
    inheritAttrs: false
})
const props = withDefaults(defineProps<SwtichProps>(),{
    activeValue:true,
    inactiveValue:false
}) 
const emits = defineEmits<SwtichEmits>()
//组件中有一个状态代表组件是否被选中或者未选中  使用初始值创建一个相应对象 代表变化的值
const innerValue = ref(props.modelValue)
//创建input  获取原生dom节点
const input = ref<HTMLInputElement>()
//计算属性  代表组件是否被选中
const checked = computed(() => innerValue.value === props.activeValue)
// 内部使用inputcheckbox作为组件内部元素 方便实现开关功能 
const switchValue = () =>{
    if (props.disabled) return
    const newValue = checked.value?props.inactiveValue:props.activeValue
    innerValue.value=newValue
    emits('update:modelValue' ,newValue)
    emits('change',newValue)
}
onMounted(()=>{
    input.value!.checked = checked.value
})
watch(checked,(val)=>{
    input.value!.checked = val
})
watch(()=> props.modelValue,(newValue) =>{
    innerValue.value = newValue
})
</script>