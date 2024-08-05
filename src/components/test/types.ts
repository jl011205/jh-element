export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export interface tsetbuttonprops {
    type?: ButtonType;
    disabled?: boolean;
}
export interface ButtonInstance{
    ref: HTMLButtonElement
}