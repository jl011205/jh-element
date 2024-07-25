// 一些辅助的ts类型  类型相关内容
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
//原生属性
export type NativeType = 'button' | 'submit' | 'reset'
export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize | undefined;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    nativeType?: NativeType;
    autofocus?: boolean;
}

export interface ButtonInstance{
    ref: HTMLButtonElement
}