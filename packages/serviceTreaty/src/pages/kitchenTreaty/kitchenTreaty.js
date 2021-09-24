import '@/assets/common.less';
import { wxShare } from '@guanyu/h5-tools';
import { judgeIsInGyApp, showShareButton } from '@guanyu/guanyu-h5-tools';

window.zhuge.track('共享厨房公约页');

const constant = {
  debug: false,
  api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
  title: '终于等到你，欢迎入住冠寓',
  link: window.location.href,
  img: `${window.location.protocol}${PUBLIC_PATH}static/images/kitchen.png`,
  desc: '如何使用共享厨房，这篇公约送给你哦',
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
    text: '如何使用共享厨房，这篇公约送给你哦',
    image: `${window.location.protocol}${PUBLIC_PATH}static/images/kitchen.png`,
  });
} else {
  wxShare(constant);
}

