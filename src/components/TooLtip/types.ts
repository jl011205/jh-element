import type { Placement } from '@popperjs/core'
export interface TooltipProps {
  content? : string;
  //两种触发方式
  trigger?: 'hover' | 'click';
  //放置在哪里，放置位置   Placement;是对应的类型  上下左右，每个有三种
  placement?: Placement;
}
//对应事件
export interface TooltipEmits {
    //事件名称          turle显示
  (e: 'visible-change', value: boolean) : void;
}