<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
// import type { Options } from '@popperjs/core'

import Tooltip from './components/Tooltip/Tooltip.vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Input from './components/Input/Input.vue'
import Message from './components/Message/Message.vue'
import Switch from './components/Switch/Switch.vue'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'
import { createMessage } from './components/Message/method'
import type { MenuOption } from './components/Dropdown/types'


const inputTest = ref('')

const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)

const openedValue = ref(['a'])
const size = ref<any>('3x')
const trigger = ref<any>('click')
// const optionss :Partial<Options> = { placement:'right',strategy:'fixed'}
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

onMounted(() => {
  createMessage({ message: 'hello world', type: 'info', showClose: true })
  createMessage({ message: 'hello world again', duration: 0, type: 'success', showClose: true })
  createMessage({ message: 'hello world three', duration: 0, type: 'danger', showClose: true })
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref)
  }
  setTimeout(() => {
    openedValue.value = ['a', 'b']
    size.value = '2xl'
    // trigger.value = 'hover'
    // instance.destory()
  }, 2000)

})
</script>

<template>


  <header>
    <button>123</button>
    <Button type="danger">123</Button>
    <Test type="primary">12hfghfgh3</Test>
    <!-- <Switch> -->
    <Input v-model="inputTest" clearable placeholder="输入字符以后可以点击清空"/>
   
    <!-- <Input v-model="test" placeholder="密码文本框，可以切换" showPassword/>
    <Input v-model="test" placeholder="prepend append">
      <template #prepend>Https://</template>
      <template #append>.com</template>
    </Input>
    <Input v-model="test" placeholder="prefix suffix">
      <template #prefix>
        <Icon icon="fa-user"/>
      </template>
      <template #suffix>
        <Icon icon="fa-user"/>
      </template> -->
      <Input v-model="inputTest" placeholder="密码文本框，可以切换" showPassword/>
    <Tooltip :trigger="trigger" :open-delay="1000" :close-delay="1000" ref="tooltipRef">
      <img alt="Vue logo" class="logo" src="./assets/img/dog.png" width="125" height="125" />
      <template #content>
        <h1>Hello tooltip</h1>
      </template>
      <br><br>
    </Tooltip>
    <div class="dropdownnnn">
      <Dropdown placement="bottom" :trigger="trigger" :menu-options="options" >
        <img alt="Vue logo" class="logo" src="./assets/img/22.jpg" width="125" height="125" />
      </Dropdown>
    </div>

  </header>
  <Icon icon="arrow-up" :size="size" type="primary" color="red" />
  <Icon :icon="['fasds', 'pen-nib']" />
  <Icon :icon="['fasds', 'bolt']" size="5x" color="yellow" />
  <Icon :icon="['fas', 'arrow-up']" type="success" />
  <!-- <Icon :icon="['fas', 'user-secret']" /> -->
  <!-- <font-awesome-icon :icon="['fas', 'user-secret']" /> -->
  <main>
    <Icon icon="spinner" spin/>
    <Button ref="buttonRef" @click="open">Test Button</Button>
    <Button plain @click="close">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success--</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button>
    <br><br>
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button>


    <Collapse v-model="openedValue">
      <Item name="a" title="Title A">
        <h1>headline title</h1>
        -----------------------
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
        <div>qweqwewqe</div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>

      </Item>
    </Collapse>
    {{ openedValue }}
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.dropdownnnn {
  margin: auto;
  padding: 50px;
}
</style>