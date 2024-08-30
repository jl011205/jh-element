<template>
  <form class="vk-form">
    <slot/>

  </form>
</template>
<script setup lang="ts">
import { provide } from 'vue';
import type { FormProps,FormItemContext, FormContext ,FormValidateFailure,FormInstance} from './types'
import { formContextKey } from './types';
import type { ValidateFieldsError} from 'async-validator';
const props =  defineProps<FormProps>()
defineOptions({
  name: 'VkForm'
})
const fields:FormItemContext[]=[]
// 方法
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  } 
}
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.resetField())
}
const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.clearValidate())  
}
const validate = async () =>{
  // 初始化错误信息对象
  let validationErrors:ValidateFieldsError = {}
  console.log('fields',fields);
  // key value 格式  名称 和错误
  for (const field of fields) {
    try {
      await field.validate('')
    }catch(e){
      // 拿到错误
      // 类型断言
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (Object.keys(validationErrors).length ===0) return true
  return Promise.reject(validationErrors)
}
provide(formContextKey,{
  ...props,
  addField,
  removeField
})
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate
})
</script>