<template>
    <i class="vk-icon" >
      <font-awesome-icon v-bind="$props"/>
    </i>
  </template>
  <script setup lang="ts">

  import type { IconProps } from './types'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  defineOptions({
    name: 'VkIcon',
    inheritAttrs: false
  })
defineProps<IconProps>()

  </script>
  