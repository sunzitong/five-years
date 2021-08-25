import { VueConstructor } from "vue";

declare interface EventBus {
  emit: (event: string, ...args) => void;
  on: (event: string, callback: any) => void;
  off: (event: string, callback: any) => void;
  once: (event: string, callback: any) => void;
}

declare module "vue/types/vue" {
  interface Vue {
    $rem: number;
    $rpx: number;
    env: env;
    $bus: EventBus;
    [key: string]: any;
  }
  interface VueConstructor {
    rem: number;
    rpx: number;
    bus: EventBus;
    [key: string]: any;
  }
}
