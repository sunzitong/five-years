import Vue, { VueConstructor } from "vue";

const $dom: any = document.createElement("div");
$dom.style.fontSize = "100px";
document.body.appendChild($dom);
// 计算出放大后的字体
const scaledFontSize = parseFloat(
  window.getComputedStyle($dom, null).getPropertyValue("font-size")
);
// 计算原字体和放大后字体的比例
const scaleFactor = 100 / scaledFontSize;
const baseSize = 100;
function setRem(vue: VueConstructor, rem?: number) {
  rem = rem || baseSize;
  const scale = Math.min(750, document.documentElement.clientWidth) / 375;
  if (!scale) return;
  // 计算的fontsize
  const calcPX = rem * scale * scaleFactor;
  document.documentElement.style.fontSize = calcPX + "px";
  if (document.documentElement.clientWidth > 750) {
    document.documentElement.style.width = "750px";
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
  console.log(
    "计算大小:",
    calcPX,
    "实际大小:",
    realPX,
    "缩放比例:",
    scaleFactor
  );
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
