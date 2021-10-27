module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare module "@guanyu/h5-tools" {
  /**
   * 微信分享配置
   */
  interface WxShareOptions {
    /**
     * 默认为false 不开启调试模式
     */
    debug?: boolean;
    /**
     * 获取微信鉴权的接口地址, 不填写默认为 /gymwebsite/getJsapiSigna
     */
    api?: string;
    /**
     * 分享标题
     */
    title?: string;
    /**
     * 分享链接 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     */
    link?: string;
    /**
     * 分享图标
     */
    img?: string;
    /**
     * 分享描述
     */
    desc?: string;
    /**
     * 分享类型 music、video或link 不填默认为link
     */
    type?: string;
    /**
     * 如果type是music或video则要提供数据链接 默认为空
     */
    dataUrl?: string;
  }
  /**
   * 微信分享
   */
  const wxShare: (config: WxShareOptions) => void;
  /**
   * 获取地理位置
   */
  const getGeolocation: (
    /**
     * 回调函数
     */
    callback: (
      /**
       * 值为complete时，表示查询成功。
       * 值为error时，表示查询失败。
       */
      status: string,
      /**
       * 查询结果
       * 失败为空对象
       */
      result: {
        addressComponent: {
          city: string;
          [key: string]: any;
        };
        [key: string]: any;
      }
    ) => void,
    key?: string
  ) => void;
  /**
   * 判断手机系统
   * isAndroid | isIos
   */
  const judgeSystem: () => string;
  /**
   * 判断设备
   * APP | 小程序 | browser
   */
  const judgeDevice: () => string;
}

declare module "@guanyu/guanyu-h5-tools" {
  interface MpShareOptions {
    title?: string;
    imageUrl?: string;
    path?: string;
  }

  interface AppShareOptions {
    /**
     * ["wx_session", "wx_timeline", "sina"]
     */
    types?: string[];
    title?: string;
    url?: string;
    text?: string;
    image?: string;
    shareMiniProgramUrl?: string;
  }
  const getAppAuthInfo: Function;
  const ShowSharePanel: Function;
  const getCurrentCity: Function;
}


declare module '@guanyu/zhugeio'