import { wxShare } from '@guanyu/h5-tools';
import { judgeIsInGyApp, showShareButton } from '@guanyu/guanyu-h5-tools';
import './rentGuide.less';

const constant = {
  debug: false,
  api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
  title: '终于等到你，欢迎入住冠寓',
  link: window.location.href,
  img: `${window.location.protocol}${PUBLIC_PATH}static/images/share.png`,
  desc: '你想知道的冠寓租住指南，都在这里哦',
  type: '',
  dataUrl: '',
  success: () => {
  },
};

if (judgeIsInGyApp()) {
  showShareButton({
    types: [],
    url: window.location.href,
    title: '终于等到你，欢迎入住冠寓',
    text: '你想知道的冠寓租住指南，都在这里哦',
    image: `${window.location.protocol}${PUBLIC_PATH}static/images/share.png`,
  });
} else {
  wxShare(constant);
}
