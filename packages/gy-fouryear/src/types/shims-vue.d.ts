import { VueConstructor } from "vue";
declare module "vue/types/vue" {
  interface Vue {
    $rem: number;
    $rpx: number;
    [key: string]: any;
    env: env;
  }
  interface VueConstructor {
    rem: number;
    rpx: number;
    [key: string]: any;
  }
}
