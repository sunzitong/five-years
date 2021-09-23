import '@/assets/common.less';
import { wxShare } from '@guanyu/h5-tools';
import { judgeIsInGyApp, showShareButton } from '@guanyu/guanyu-h5-tools';

window.zhuge.track('快递公约页');

const constant = {
  debug: false,
  api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
  title: '终于等到你，欢迎入住冠寓',
  link: window.location.href,
  img: `${window.location.protocol}${PUBLIC_PATH}static/images/express.png`,
  desc: '入住冠寓如何查收快递，这篇公约送给你哦',
  type: '',
  dataUrl: '',
  success: () => {
  },
};

wxShare(constant);

if (judgeIsInGyApp()) {
  showShareButton({
    types: [],
    url: window.location.href,
    title: '终于等到你，欢迎入住冠寓',
    text: '入住冠寓如何查收快递，这篇公约送给你哦',
    image: `${window.location.protocol}${PUBLIC_PATH}static/images/express.png`,
  });
} else {
  wxShare(constant);
}
