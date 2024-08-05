<template>
    <Transition
    :name='transitionName'
      @after-leave="destroyComponent"
  @enter="updateHeight"
    >
    <div class="vk-message" v-show="visible" :class="{
        [`vk-message--${type}`]: type,
        'is-close': showClose
    }" role="alert" ref="messageRef" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
        <div class="vk-message__content">
            <slot>
                <RenderVnode :vNode="message" v-if="message" />
            </slot>
        </div>
        <div class="vk-message__close" v-if="showClose">
            <Icon @click.stop="visible = false" icon="xmark" />
        </div>
    </div>
    </Transition>
</template>
<script lang="ts" setup>
import type { MessageProps } from './type';
import { computed, onMounted, ref, watch, nextTick, getCurrentInstance } from 'vue';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import useEventListener from '@/hoooks/useEventListener';
import { getLastBottomOffset, getLastInstance } from './method'
const props = withDefaults(defineProps<MessageProps>(), {
    //默认值
    type: 'info',
    duration: 3000,
    offset: 20,
    transitionName:'fade-up'
})
// const prevInstance = getLastInstance()
// console.log('prev', prevInstance)

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const instance = getCurrentInstance()
console.log('ad', instance);


//计算偏移高度
//这个div高度
const height = ref(0)
//上一个实例最下面的坐标数组
const lastOffset = computed(() => getLastBottomOffset(props.id))
//这个元素应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
//为下一个元素预留offset也就是他最底端的bottom的值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
    top: topOffset.value + 'px',
    zIndex: props.zIndex
}))
let timer: any
function startTimer() {
    if (props.duration === 0) return
    timer = setTimeout(() => {
        visible.value = false
    }, props.duration)
}


function clearTimer() {
    clearTimeout(timer)
}
onMounted(async () => {
    visible.value = true
    startTimer()
    // await nextTick()
    // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e: Event) {
    const event = e as KeyboardEvent
    if (event.code === 'Escape') {
        visible.value = false
    }
}
useEventListener(document, 'keydown', keydown)
// watch(visible, (newValue) => {
//     if (!newValue) {
//         props.onDestory()
//     }
// })
// 不用watch用生命周期 钩子
function destroyComponent () {
  props.onDestory()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
    bottomOffset,
    visible
})
</script>
