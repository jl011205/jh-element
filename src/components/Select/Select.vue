<template>
  <div class="vk-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown"
    @mouseenter="states.mouseHover = true" @mouseleave="states.mouseHover = false">
    <Tooltip placement="bottom-start" ref="tooltipRef" :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)" manual>
      <Input v-model="states.inputValue" :disabled="disabled" :placeholder="filteredPlaceholder" ref="inputRef"
        :readonly="!filterable || !isDropdownShow" @input="debounceOnFilter" @keydown="handleKeydown">
      <template #suffix>
        <Icon icon="circle-xmark" v-if="showClearIcon" class="vk-input__clear" @mousedown.prevent="NOOP"
          @click.stop="onClear" />

        <Icon v-else icon="angle-down" class="header-angle" :class="{ 'is-active': isDropdownShow }" />
      </template>
      </Input>
      <template #content>

        <div class="vk-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin />
        </div>
        <div class="vk-select__nodata" v-else-if="filterable && filteredOptions.length === 0"> no data</div>
        <ul class="vk-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li class="vk-select__menu-item" :class="{
              'is-disabled': item.disabled,
              'is-selected': states.selectedOption?.value === item.value,
              'is-heighlighted': states.highlightIndex === index
            }" :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)">
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { isFunction, debounce } from 'lodash-es'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode'
import type { InputInstance } from '../Input/type'


const findOption = (value: string) => {
  const option = props.options.find(option => option.value === value)
  return option ? option : null
}
defineOptions({
  name: 'VkSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  //给数组设置初始值 要改为函数形式
  options: () => []
})
//延迟
const timeout = computed(() => props.remote ? 300 : 0)
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  //是否在加载
  loading: false,
  highlightIndex: -1
})
const isDropdownShow = ref(false)
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}
const filteredOptions = ref(props.options)
watch(() => props.options, (newOptions) => {
  filteredOptions.value = newOptions
})
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.error(e)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  }
  else {
    filteredOptions.value = props.options.filter(option => option.label.includes(searchValue))
  }
  states.highlightIndex = -1
}
// 发射请求
const onFilter = () => {
  //  将 states.inputValue 作为搜索词传递给 
  // generateFilterOptions 函数，从而根据这个搜索词对选项进行筛选。
  generateFilterOptions(states.inputValue)
}
const debounceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)
const filteredPlaceholder = computed(() => {
  return (props.filterable && states.selectedOption && isDropdownShow.value)
    ? states.selectedOption.label : props.placeholder
})
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter 模式
    // 之前选择过对应的值
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    // 进行一次默认选项的生成
    if (props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    // blur 时候将之前的值回灌到 input 中
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true)
      } else {
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
      // 阻止上下键默认移动
      e.preventDefault()      
      //初始状态 states.highlightIndex = -1 向上到最后一个
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1) {
          states.highlightIndex = filteredOptions.value.length - 1;
        } else {
          states.highlightIndex--;
          if (states.highlightIndex < 0) {
            states.highlightIndex = filteredOptions.value.length - 1;
          }
        }
      }
      break
    case 'ArrowDown':
      // 阻止上下键默认移动
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1) {
          states.highlightIndex = 0
        } else {
          states.highlightIndex++
          if (states.highlightIndex > filteredOptions.value.length - 1) {
            states.highlightIndex = 0;
          }
        }
      }
      break
    default:
      break
  }
}
const showClearIcon = computed(() => {
  // * hover 上去
  // * props.clearable 为 true
  // 必须要有选择过选项
  // Input 的值不能为空
  return props.clearable
    && states.mouseHover
    && states.selectedOption
    && states.inputValue.trim() !== ''
})
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
const NOOP = () => { }
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>