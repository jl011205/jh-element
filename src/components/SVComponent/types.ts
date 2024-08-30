export interface SVComponentProps {
    type?: 'primary' |'success';
    size?: 'large' |'small' | undefined;
    icon?: string;
    showicon?: boolean;
}

export interface SVComponentEmits {
    (e: 'result', value: boolean): boolean;
}
