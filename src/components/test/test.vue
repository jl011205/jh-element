<script lang="ts" setup>
import type { tsetbuttonprops } from './types';
import  {ref} from 'vue'
defineOptions({
    name:'jhbutton'
})
defineProps<tsetbuttonprops>()
    const _ref = ref<HTMLButtonElement>()
defineExpose({
    ref:_ref
})
</script>

<template>
    <button
    class="jhbutton"
    :class="{
    [`vk-button--${type}`]: type,
    }"
    >
        
    </button>
</template>
<style>

</style>