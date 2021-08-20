import Vue, { VueConstructor } from "vue";
// 计算原字体和放大后字体的比例
function setRem(vue: VueConstructor, rem?: number) {
  rem = rem || 100;
  const scale = document.documentElement.clientWidth / 7680;
  if (!scale) return;
  // 计算的fontsize
  const calcPX = rem * scale;
  document.documentElement.style.fontSize = calcPX + "px";
  if (document.documentElement.clientWidth > 7680) {
    document.documentElement.style.width = "7680px";
    document.documentElement.style.margin = "auto";
  } else {
    document.documentElement.style.width = "";
    document.documentElement.style.margin = "";
  }
  // 真实fontsize
  const realPX: any = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  );
  /**
   * 存储rootpx
   */
  vue.rpx = vue.prototype.$rpx = realPX;
  console.log("计算大小:", calcPX, "实际大小:", realPX);
}

const Plugin = {
  install(vue: VueConstructor, options: { px: number; [key: string]: any }) {
    const px = options.px;
    /**
     * 存储rem值
     */
    vue.rem = vue.prototype.$rem = px;
    setRem(vue, px);
    setTimeout(() => {
      setRem(vue, px);
    }, 1000);
    window.addEventListener("resize", () => {
      setRem(vue, px);
    });
  },
};

Vue.use(Plugin, { px: 100 });

export default Plugin;
