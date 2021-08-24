import Vue from "vue";

Vue.directive("zhuge", {
  bind(el, binding) {
    const clickHandler = () => {
      console.log(binding);
      if (window.zhuge && binding.value) {
        window.zhuge.track(`驾驶舱-${binding.value}-点击`);
      }
    };
    el.addEventListener("click", clickHandler, true);
  },
});
