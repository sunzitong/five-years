import {
  Toast,
  Icon,
  Overlay,
  Loading,
  Dialog,
  Row,
  Col,
  Switch,
  Popover,
  Circle,
} from "vant";
import Vue from "vue";

Toast.allowMultiple(true);

Vue.use(Toast);
Vue.use(Icon);
Vue.use(Overlay);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Switch);
Vue.use(Popover);
Vue.use(Circle);
