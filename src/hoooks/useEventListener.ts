
import { onBeforeMount, onMounted, isRef ,watch,unref} from "vue";
import type {Ref} from 'vue'
export default function useEventListener(
    //在什么上面添加
    target:Ref<EventTarget|null>|EventTarget,
    event:string, 
    handler:(e:Event) =>any
) {
    if (isRef(target)) {
        watch(target, (value,oldValue)=>{
            oldValue?.removeEventListener(event,handler)
            value?.addEventListener(event,handler)
        })
    }else{
        onMounted(()=>{
            target.addEventListener(event,handler)
        }) 
      
    }
    onBeforeMount(()=>{
        unref(target)?.removeEventListener(event,handler)
    })

}   