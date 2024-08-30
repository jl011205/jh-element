<template>
    <div class="long-list-container" @scroll="handleScroll" ref="listContainer" style="height: 400px; overflow-y: auto;">
        <div v-for="item in items" :key="item.id" class="item">
            {{ item.content }}
        </div>
        <div v-if="loading" class="loading">加载中...</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Item } from './types';

interface Props {
    fetchDataFn: () => Promise<Item[]>; 
}

const props = defineProps<Props>();

const items = ref<Item[]>([]);
const loading = ref(false);
const page = ref(1);


const fetchData = async () => {
    if (loading.value) return; 
    loading.value = true;

    try {
        const newItems = await props.fetchDataFn();
        if (newItems.length === 0) {
            console.log("No more data to load.");
        }
        items.value.push(...newItems);
        page.value++;
    } catch (error) {
        console.error("Failed to fetch data:", error);
    } finally {
        loading.value = false;
    }
};

const handleScroll = () => {
    const container = document.querySelector('.long-list-container');
    if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            fetchData();
        }
    }

};

onMounted(() => {
    fetchData(); 
});
</script>

<style scoped>
.item {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

.loading {
    padding: 8px;
    text-align: center;
    color: #999;
}
</style>