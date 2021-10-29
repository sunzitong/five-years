import Vue from "vue";
import store from "./store";
import Component from "vue-class-component";
import { AnyFunction } from "@guanyu/shared";

@Component
/**
 * 用于vue class component的mixins()
 * 代替Vue.mixins()
 */
export default class MixStore extends Vue {
  // 参数等
  env = store.env;

  store = store;

  /**
   * 与小冠安卓交互
   */
  postMessage(params: Record<string, any>) {
    const payload = JSON.stringify(params);
    // IOS
    window.webkit?.messageHandlers?.GYWebViewBridge?.postMessage(payload);
    // Android
    window.GYWebViewBridge?.postMessage(payload);
  }

  /**
   * 设置小冠右上角picker 默认值
   * @param startDate string 2020-01-01
   */
  setAppPickerDefaultValue(props: {
    startDate: string;
    type: "year" | "month" | "other" | "day";
  }) {
    const params = {
      action: "SetDriverDate",
      startDate: props.startDate,
      type: props.type,
    };
    this.postMessage(params);
  }

  /**
   * 设置小冠右上角picker 区间
   * @param range { startDate: string; endDate: string }
   */
  setAppPickerRange(range: { startDate: string; endDate: string }) {
    window.getDateSourceDriver = () => {
      return JSON.stringify({
        startDate: range.startDate,
        endDate: range.endDate,
      });
    };
  }

  /**
   * 选择日期后执行此方法，返回日期
   * @param value 2020-01-01 | 2020-01
   */
  getAppPickerValue(callback: (e: string) => boolean) {
    window.didReviceDriverDate = (e: string) => {
      const success = typeof callback === "function" && callback(e);
      return success;
    };
  }

  /**
   * 调用小冠右上角Picker
   * [暂停使用]
   */
  invokeAppPicker(props: {
    startDate: string;
    endDate: string;
    type: "year" | "month" | "other";
  }) {
    const params = {
      action: "cockpitWebPicker",
      startDate: props.startDate,
      endDate: props.startDate,
      type: props.type,
      // TODO 选择区间
    };
    this.postMessage(params);
  }

  /**
   * 设置小冠右上角Icon
   */
  setAppBadge(props: { image: "dirver_action_blue"; callback: AnyFunction }) {
    const params = {
      data: {
        right: [
          {
            title: null,
            image: props.image,
            js: "window.appBadgeClick()",
          },
        ],
      },
      action: "SetNavButtons",
    };
    // 点击回调
    window.appBadgeClick = props.callback;
    this.postMessage(params);
  }

  /**
   * 设置小冠按钮
   */
  setAppNavButtons(
    props: Partial<
      Record<
        "left" | "right",
        {
          title?: Partial<{ text: string; fontSize: number; color: string }>;
          image?: Partial<{
            src: string;
            position: "left" | "right";
            width: number;
            height: number;
          }>;
          js?: string;
        }[]
      >
    >,
    action?: "SetNewNavButtons"
  ) {
    const params = {
      data: props,
      action: action ?? "SetNewNavButtons",
    };
    this.postMessage(params);
  }

  /**
   * 隐藏Nav按钮
   */
  hiddenNavButtons(pos: "right" | "left") {
    const params = {
      data: pos,
      action: "HiddenNavButtons",
    };
    this.postMessage(params);
  }
}
