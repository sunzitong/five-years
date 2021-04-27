/* eslint-disable @typescript-eslint/no-unused-vars */
import { VueConstructor } from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $rem: number;
    $rpx: number;
    [key: string]: any;
  }
  interface VueConstructor {
    rem: number;
    rpx: number;
    [key: string]: any;
  }
}
