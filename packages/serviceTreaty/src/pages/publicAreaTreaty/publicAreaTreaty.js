import '@/assets/common.less';
import { wxShare } from '@guanyu/h5-tools';
import { judgeIsInGyApp, showShareButton } from '@guanyu/guanyu-h5-tools';

window.zhuge.track('公区公约页');

const constant = {
  debug: false,
  api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
  title: '终于等到你，欢迎入住冠寓',
  link: window.location.href,
  img: `${window.location.protocol}${PUBLIC_PATH}static/images/pulicArea.png`,
  desc: '如何使用超棒的公区，这篇公约送给你哦',
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
    text: '如何使用超棒的公区，这篇公约送给你哦',
    image: `${window.location.protocol}${PUBLIC_PATH}static/images/pulicArea.png`,
  });
} else {
  wxShare(constant);
}
