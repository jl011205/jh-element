<!-- 基于 Vue 的组合式 API，利用响应式系统、DOM 操作和事件处理，实现了一个可拖动滑块的滑动验证组件 -->
<template>
  <div class="vk-svcomponent"
       :class="{
         [`vk-svcomponent--${type}`]: type,
         [`vk-svcomponent--${size}`]: size,
       }"
  >
    <div class="slide-container-wrapper" ref="containerRef">
      <div class="slide-verification-slider"
           ref="draggableRef"
           @mousedown="startDrag"

      >
      <Icon icon="fa-solid fa-angles-right" size="2xl" style="color: #6f7171;" class="svcomponent_arrow" v-if="!visible" />
      <Icon :icon="['fas', 'check']" v-if="visible" class="svcomponent_arrow"/>
      </div>
    </div>
  </div>
  {{ type }}--{{ startX }}--{{ startLeft }}--{{ containerWidth }}--{{elementWidth}}--{{isDragging}}

</template>

<script setup lang="ts">
import type { SVComponentProps,SVComponentEmits} from './types';
import Icon from '../Icon/Icon.vue';
import { onMounted, ref, onBeforeUnmount } from 'vue';

defineOptions({
  name: 'Vksvcomponent'
});

const props = withDefaults(defineProps<SVComponentProps>(), {
  type: 'primary' as 'primary' |'success', // 明确类型为 'primary' 或'success'
  size:'small'
});

const type = ref(props.type);
const startX = ref(0);
const startLeft = ref(0);
const containerWidth = ref(0);
const elementWidth = ref(0);
const isDragging = ref(false);
const visible = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);
const draggableRef = ref<HTMLDivElement | null>(null);

const emits = defineEmits<SVComponentEmits>()

onMounted(() => {
  if (containerRef.value && draggableRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
    elementWidth.value = draggableRef.value.offsetWidth;

    // 在这里添加 startDrag 相关的操作
    draggableRef.value.addEventListener('mousedown', (event) => startDrag(event));
  } else {
    console.error('Refs are null after onMounted');
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', endDrag);
});

function startDrag(event: MouseEvent) {
  event.preventDefault();
  startX.value = event.clientX;
  const draggableElement = draggableRef.value;
  const containerElement = containerRef.value;

  if (draggableElement && containerElement) {
    containerWidth.value = containerElement.offsetWidth;
    elementWidth.value = draggableElement.offsetWidth;
    startLeft.value = draggableElement.offsetLeft;
    isDragging.value = true;
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);
  } else {
    console.log('Draggable or container element is null');
  }
}

function drag(event: MouseEvent) {
  if (isDragging.value) {
    const distanceX = event.clientX - startX.value;
    let newLeft = startLeft.value + distanceX;
    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft + elementWidth.value > containerWidth.value) {
      newLeft = containerWidth.value - elementWidth.value;
    }
    const draggableElement = draggableRef.value!;
    draggableElement.style.left = newLeft + 'px';
    if (newLeft + elementWidth.value === containerWidth.value) {
      type.value ='success'; 
      visible.value = true;
      emits('result',true);
    }
  }
}

function endDrag() {
  if (isDragging.value) {
    isDragging.value = false;
  }
}
</script>

<style scoped>



</style>