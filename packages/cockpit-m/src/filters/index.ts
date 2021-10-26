import { Dictionary } from "vue-router/types/router";
import Vue from "vue";

export function bgImgFilter(img: string) {
  if (!img || img === "none") return;
  img = `url(${img})`;
  return {
    backgroundImage: img,
  };
}

export function styleFilter(styles: Dictionary<any>) {
  if (!styles) return;
  const fz: any = {};
  if (styles.fontSize) {
    fz.fontSize = styles.fontSize / Vue.rem + "rem";
  }
  return {
    ...styles,
    ...fz,
    ...bgImgFilter(styles.backgroundImage),
  };
}

// 背景图
Vue.filter("bgImgFilter", bgImgFilter);
Vue.filter("styleFilter", styleFilter);
