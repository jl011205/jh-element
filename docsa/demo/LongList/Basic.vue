<template>
    <div>
      <h1>Real Data Example</h1>
      <List :fetchDataFn="fetchRealData" />
    </div>
  </template>

<script lang="ts" setup>
import List from '../../../src/components/List/List.vue';
import type { Item } from '../../../src/components/List/types';

// 定义真实的数据
const realData: Item[] = [
  { id: 1, content: '孙悟空' },
  { id: 2, content: '猪八戒' },
  { id: 3, content: '沙和尚' },
  { id: 4, content: '唐僧' },
  { id: 5, content: '白龙马' },
  { id: 1242, content: '孙悟空' },
  { id: 219, content: '猪八戒' },
  { id: 3345, content: '沙和尚' },
  { id: 4546, content: '唐僧' },
  { id: 571, content: '孙悟空' },
  { id: 45642, content: '猪八戒' },
  { id: 4563, content: '沙和尚' },
  { id: 474, content: '唐僧' },
  { id: 3451, content: '孙悟空' },
  { id: 352, content: '猪八戒' },
  { id: 3213, content: '沙和尚' },
  { id: 1234, content: '唐僧' },
  { id: 2211, content: '孙悟空' },
  { id: 492, content: '猪八戒' },
  { id: 1113, content: '沙和尚' },
  { id: 274, content: '唐僧' },
  { id: 331, content: '孙悟空' },
  { id: 22, content: '猪八戒' },
  { id: 113, content: '沙和尚' },
  { id: 116, content: '唐僧' },
  { id: 159, content: '孙悟空' },
  { id: 714, content: '猪八戒' },
  { id: 193, content: '沙和尚' },
  { id: 172, content: '唐僧' },
];

// 当前加载的数据页数
let currentPage = 1;
const pageSize = 20; 
const fetchRealData = async (): Promise<Item[]> => {
  // 计算要返回的数据片段
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const newItems = realData.slice(start, end);
  currentPage++;
  return newItems;

};


</script>