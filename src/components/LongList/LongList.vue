<template>
  <div class="long-list-container" @scroll="handleScroll">
    <ul>
      <li v-for="item in visibleItems" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { LongListProps } from './types';
// 模拟大量数据
const props = withDefaults(defineProps<LongListProps>(), {
  all: () => [1],
  type: 'text'
 })

const allItems = Array.from({ length: 10000 }, (_, index) => ({ id: index, text: `Item ${index}` }));
const itemsPerPage = 20;

const currentPage = ref(1);
const visibleItems = ref(props.all.slice(0, itemsPerPage));

const loadMoreItems = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let newItems;
  if (props.type === 'API') {
    // 模拟 API 请求获取数据
    newItems = Array.from({ length: 10 }, (_, index) => ({ id: index + 100, text: `API Item ${index}` }));
    
  } else {
    newItems = allItems.slice(startIndex, endIndex);

  }
  if (newItems.length > 0) {
    visibleItems.value = visibleItems.value.concat(newItems);
    currentPage.value++;
  }
};

const handleScroll = () => {
  const container = document.querySelector('.long-list-container');
  if (container) {
    const { scrollTop, clientHeight, scrollHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreItems();
    }
  }
};

onMounted(() => {
  loadMoreItems(); // 初始加载一些数据

});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.long-list-container {
  height: 300px;
  overflow: auto;
}
</style>