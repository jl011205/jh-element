import type { CreateMessageProps, MessageContext } from "./type"
import { render, h, shallowReactive } from "vue"
// 构造函数
import MessageConstructor from './Message.vue'
import useZIndex from "@/hoooks/useZindex"
// 数组
let seed = 1
const instances: MessageContext[] = shallowReactive([])


export const createMessage = (props: CreateMessageProps) => {
    const { nextZIndex } =useZIndex()

    const id = `message_${seed++}`
    //创建dom节点
    const container = document.createElement('div')
    //卸载
    const destory = () => {
        // 删除数组中实例
        const idx = instances.findIndex(instance => instance.id === id)
        if (idx === -1) return
        instances.splice(idx, 1)
        render(null, container)
    }
    // 手动删除,就是手动调整组件中的visible值
    //visible是expose传出来的

    const manualDestroy = () => {
        const instance = instances.find(instance => instance.id ===id)
        if (instance) {
            instance.vm.exposed!.visible.value = false
        }

    }
    const newProps = {
        ...props,
        id,//id传入组件
        zIndex:nextZIndex(),
        onDestory: destory
    }
    // 创建vnode
    const vnode = h(MessageConstructor, newProps)
    render(vnode, container)//渲染上去了
    console.log('vnode',vnode);
    
    //清空
    // render(null,container)

    // 渲染完毕后  要将dom节点插入到文档当中
    //!非空断言操作符
    // firstChild是一个可能为null的联合类型，使用！告诉tscontainer.firstChild!不会是undefind或null
    document.body.appendChild(container.firstElementChild!)

    //把需要的内部实例插入到数组中
    const vm = vnode.component!
    const instance = {
        id,
        vnode,
        vm,
        props: newProps,
        destory:manualDestroy
    }
    instances.push(instance)
    return instance
}

export const getLastInstance = () => {
    //拿到数组最后一项
    return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
    const idx = instances.findIndex(instance => instance.id === id)
   console.log('idx',id,idx,instances.length);
   
   if (idx <= 0) {
    return 0
   }else {
    const prev = instances[idx -1]

    return prev.vm.exposed!.bottomOffset.value
   }
}