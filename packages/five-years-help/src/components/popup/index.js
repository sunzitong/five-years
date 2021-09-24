import Vue from "vue";
import Popup from "./index.vue";

const PopupBox = Vue.extend(Popup);
Popup.install = function (data) {
  console.log(data);
  let instance = new PopupBox({
    data,
  }).$mount();

  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.isShow = true;
  });
};
export default Popup;