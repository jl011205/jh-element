<!-- 基于 “pinyin-pro” 库实现中文转拼音、获取首字母等功能，通过 Vue 的组合式 API 和条件渲染展示不同的结果。 -->
<template>
	<div class="container">
		<div class="header">
			<div class="title">中文转拼音</div>
			<div class="sub-title">中文转拼音,获取拼音首字母等，使用场景：如获取通讯录按A-Z排序</div>
		</div>
		<div class="vk-title">中文</div>
		<div class="vk-content">
			{{ chinese }}
		</div>
		<div class="vk-title" v-show="type === 'pinyin'">转拼音
			<div class="vk-content">
				{{ result }}
			</div>
		</div>

		<div class="vk-title" v-show="type === 'shouzimu'">首字母
			<div class="vk-content">
				{{ result }}
			</div>
		</div>
		<div class="vk-title" v-show="type === 'xingshi'">首字母
			<div class="vk-content">
				{{ result }}
			</div>
		</div>


	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { pinyin } from 'pinyin-pro';
import type { PinyinProps } from './types';

defineOptions({
	name: 'VkPinyin',
});

const props = withDefaults(defineProps<PinyinProps>(), {
	type: 'xingshi',
	toneType: false,
	text: '欢迎使用'
});
const chinese = ref(props.text);
const result = ref('');
onMounted(() => {
	if (props.toneType) {
		if (props.type === 'pinyin') {
			result.value = pinyin(chinese.value);
		}
		if (props.type === 'shouzimu') {
			result.value = pinyin(chinese.value, { pattern: 'first' });
		}
		if (props.type === 'xingshi') {
			result.value = pinyin(chinese.value, { surname: 'head' });
		}
	} else {
		if (props.type === 'pinyin') {
			result.value = pinyin(chinese.value, { toneType: 'none' });
		}
		if (props.type === 'shouzimu') {
			result.value = pinyin(chinese.value, { pattern: 'first', toneType: 'none' });
		}
		if (props.type === 'xingshi') {
			result.value = pinyin(chinese.value, { surname: 'head' , toneType: 'none'});
		}
	}
});

</script>

<style>
.container {
	padding: 20rpx 0 120rpx 0;
	box-sizing: border-box;
}

.header {
	padding: 80rpx 90rpx 60rpx 90rpx;
	box-sizing: border-box;
}

.title {
	font-size: 34rpx;
	color: #333;
	font-weight: 500;
}

.sub-title {
	font-size: 24rpx;
	color: #7a7a7a;
	padding-top: 18rpx;
}

.tui-title {
	padding: 30rpx;
	font-size: 32rpx;
	color: #333;
	font-weight: bold;
	box-sizing: border-box;
}

.tui-content {
	padding: 30rpx;
	font-size: 30rpx;
	color: #333;
	box-sizing: border-box;
	background-color: #fff;
	word-break: break-all;
}

.tui-btn-box {
	padding: 30rpx 40rpx;
	box-sizing: border-box;
	margin-top: 40rpx;
}
</style>
