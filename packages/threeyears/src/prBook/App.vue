<template>
    <tbody>
      <tr v-for="(item, index) in imgAry" v-bind:key="index">
        <td>
          <img class="ImgCommon" :src="`${item}`" alt="">
        </td>
      </tr>
    </tbody>
</template>

<script>

import { wxShare } from '@guanyu/h5-tools';
import { publImg } from '../utils/task';

export default {
  name: 'pr白皮书',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      imgAry: [],
    };
  },
  created() {
    this.changeName();
    this.initailShare();
  },
  methods: {
    changeName() {
      this.imgAry = publImg();
    },
    initailShare() {
      const url = `${window.location.origin}/fe/threeyears/index.html`;
      wxShare({
        api: `${window.location.origin}/gymwebsite/getJsapiSigna`, // 获取微信鉴权的接口地址,
        title: '冠寓三周年点亮仪式 百万好礼抽不停！', // 分享标题,
        debug: false,
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/DS3crsbVqEw.png', // 分享图标,
        desc: '点亮星光抽大奖，switch、kindle、戴森吹风机、租房大礼包等你来！', // 分享描述,
        type: '', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
      });
    },
  },
};
</script>
<style lang="less">
.ImgCommon{
  width: 100%;
}
</style>
