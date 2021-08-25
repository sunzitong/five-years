import Vue from "vue";

function rBlank(el: Element) {
  if (el.childElementCount === 0) {
    el.innerHTML = "&nbsp;";
    return;
  }
  for (const e of el.children) {
    rBlank(e);
  }
}

// 空白占位
Vue.directive("blank", (el, binding) => {
  if (binding.value) {
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";
    // 可以直接设置高度 px
    // 否则自动填充&nbsp;
    const h: string | number | undefined = binding.arg,
      rem = Vue.rem;
    if (h) {
      el.style.height = +h / rem + "rem";
    } else {
      rBlank(el);
    }
  }
});
