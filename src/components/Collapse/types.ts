import type { Ref,InjectionKey } from "vue";

export interface CollapseProps{
    modelValue:NameType[];
    //手风琴效果
    accordion?:boolean;
}

export type NameType = string | number
export interface CollapseItemProps {
    name:NameType;
    title?:string;
    disabled?:boolean;
}

//创建类型
export interface CollapseContext {
    activeNames:Ref<NameType[]>
    handleItemClick:(name:NameType) => void

}
//确定对应事件 
export interface CollapseEmits {
    (e:'update:modelValue',values:NameType[]):void
    (e:'change',values:NameType[]):void
}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')