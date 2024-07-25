<template>
    <div class="vk-collapse-item" :class="{
        'is-didsabled': disabled
    }">
        <div class="vk-collapse-item__header" :class="{
            'is-disabled': disabled,
            'is-active': isActive,
        }" :id="`item-header-${name}`" @click="handleClick">
            <slot name="title">{{ title }}</slot>

        </div>
        <Transition name="slide" v-on="transitionEvents">
            <div class="vk-collapse-item__wrapper" v-show="isActive">
                <div class="vk-collapse-item__content" :id="`item-content-${name}`">
                    <slot />
                </div>
            </div>
        </Transition>

    </div>


</template>

<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { computed, inject } from 'vue';
import { collapseContextKey } from './types';
defineOptions({
    name: 'VkCollapseItem'
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
    if (props.disabled) {
        return
    }
    collapseContext?.handleItemClick(props.name)
}

//事件对象
   //这部分定义了一个常量 transitionEvenents ，其类型为 Record<string,(el:HTMLElement)=>void> 。
    // Record<string,(el:HTMLElement)=>void> 表示这是一个对象类型，其中键的类型为字符串 string 
    // ，值的类型是一个接受 HTMLElement 类型参数并且没有返回值（void）的函数。
    //第一个事件
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
 
    beforeEnter(el) {
        el.style.height = '0px'
        el.style.overflow = 'hidden'
    },
    //设置为元素高度
    enter(el) {
        el.style.height = `${el.scrollHeight}px`
    },
    afterEnter(el) {
        el.style.height = ''
        el.style.overflow = ''
    },
    beforeLeave(el) {
        el.style.height = `${el.scrollHeight}px`
        el.style.overflow = 'hidden'
    },
    leave(el) {
        el.style.height = '0px'
    },
    afterLeave(el) {
        el.style.height = ''
        el.style.overflow = ''
    }

}


</script>

<style></style>