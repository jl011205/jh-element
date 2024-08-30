<template>
    <div>
        <h1>Text </h1>
        <List :fetchDataFn="fetchTextData" />

        <h1>API </h1>
        <List :fetchDataFn="fetchApiData" />
    </div>
</template>

<script lang="ts" setup>
import List from '../../../src/components/List/List.vue';
import type { Item } from '../../../src/components/List/types';

const pageSize = 20;
let currentPageText = 1;
let currentPageApi = 1;

// 用户传入的 text 数据获取函数
const fetchTextData = async (): Promise<Item[]> => {
    // 模拟 text 数据加载
    const newItems = Array.from({ length: pageSize }, (_, i) => ({
        id: (currentPageText - 1) * pageSize + i + 1,
        content: `Text Item ${(currentPageText - 1) * pageSize + i + 1}`
    }));
    currentPageText++;
    return newItems;
};

// 用户传入的 API 数据获取函数
const fetchApiData = async (): Promise<Item[]> => {
    // 使用最开始给你的 API
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPageApi}&_limit=${pageSize}`);
    const data = await response.json();
    currentPageApi++;
    return data.map((item: any) => ({
        id: item.id,
        content: item.title
    }));
};
</script>