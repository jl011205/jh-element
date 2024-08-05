

export type SwitchValueType = boolean|string|number

export interface SwtichProps {
    modelValue: SwitchValueType;
    disabled?: boolean;
    //添加对应的文本，提醒用户  描述switch做了什么
    activeText?: string;
    inactiveText?: string;
    name?: string;
    id?: string;
    size?: 'small' | 'large';

    activeValue?:SwitchValueType;
    inactiveValue?:SwitchValueType
  }
  
  export interface SwtichEmits {
    (e: 'update:modelValue', value: SwitchValueType) : void;
    (e: 'change', value: SwitchValueType): void;
  }