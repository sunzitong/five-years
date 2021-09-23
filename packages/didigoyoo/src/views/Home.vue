<template>
  <div class="home">
    <div class="header-banner">
      <img src="../assets/banner.jpg" alt="">
      <div
        class="active-rules"
        @click="activeRulesShow">
        <span>活动规则</span>
      </div>
    </div>
    <div class="main-box">
      <div class="reward-box">
        <div class="reward">
          <h2>个人奖励</h2>
          <img src="../assets/reward-img01.png" alt="">
        </div>
        <div class="reward">
          <h2>个人看房奖励</h2>
          <img src="../assets/reward-img02.png" alt="">
        </div>
      </div>
      <div class="active-text">
        <p>企业及员工出示该图即可参与本次活动，
          <em>请截屏存图。</em>
          <br>活动有效期至2019年12月08日
        </p>
        <p class="stronge-text">{{`本页面服务由龙湖冠寓提供，更多签约福利、房型介绍及售后信息请联系龙湖冠寓客户经理，或到门店参观：${initData.city !== '天津' ? initData.city : ''}${initData.name} - ${initData.phone}`}}</p>
      </div>
      <div class="active-text">
        <p>龙湖冠寓，是龙湖集团旗下面向新世代人群租住生活形态及消费升级需求推出的独栋式长租公寓品牌，倡导“去孤岛化”的租住生态，将“住、商、办公、社交、服务”生态化联动一体，让冠寓成为城市的Hub（聚落），贯通整个城市的生活资源为租住人群所用，为职场年轻人提供舒适、现代、方便、高性价比的租住体验。</p>
      </div>
      <div class="active-text">
        <p>同时，龙湖冠寓特别为企业和企业员工提供租房一站式、多方位的解决方案 – 冠企荟</p>
        <ul class="goyoo-customized">
          <li>
            <h3>01  VIP服务</h3>
            <p>全程专人对接企业，高效服务企业。</p>
          </li>
          <li>
            <h3>02  定制产品</h3>
            <p>可按企业需求打造公寓，定制化住宿空间。</p>
          </li>
          <li>
            <h3>03 活力配套</h3>
            <p>24H 免费开放的超大客厅公区，丰富员工生活。</p>
          </li>
          <li>
            <h3>04  精彩生活</h3>
            <p>多元化创意社交空间，定期组织门店各项活动。</p>
          </li>
          <li>
            <h3>05  结算优惠</h3>
            <p>可享受折扣价格优惠，为企业节约更多成本。</p>
          </li>
          <li>
            <h3>06  退/换租便捷</h3>
            <p>为企业员工出现的工作变动，提供进一步解决方案。</p>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="call-up"
      @click="callUp">
      <a :href="phone"><i class="icon"></i>立即呼叫龙湖冠寓客户经理</a>
    </div>
    <ActiveRules
    :activeRulesIsShow="activeRulesIsShow"
    :initData="initData"
    @activeRulesHide="activeRulesHide"/>
  </div>
</template>

<script>
import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';
import ActiveRules from '@/components/ActiveRules.vue';

export default {
  name: 'home',
  components: {
    ActiveRules,
  },
  data() {
    return {
      activeRulesIsShow: false,
      initData: {
        phone: '',
        name: '',
        city: '',
      },
      phone: '',
    };
  },
  beforeMount() {
    const source = judgeDevice();
    zhugeio({
      appKey: 'c6911bc459bb41a5acbb720e91057739', // 选填 默认：   3ec10a66f82f4951ba811df964fcc199
      jsSrc: 'https://datain.longfor.com/zhuge.js?v=', // 选填 默认：https://dataintest.longfor.com/zhuge.js?v=
      options: {
        superProperty: {
          访问来源: source === 'browser' ? '其他' : source,
        },
        adTrack: false, // 广告监测开关
        zgsee: false, // 视屏采集开关
        autoTrack: true, // 启用全埋点采集
        singlePage: true, // 是否是单页面应用（SPA），启用autoTrack后生效
      }, // 选填
    });
  },
  mounted() {
    if (this.$route.query.city === 'HangZhou') {
      this.initData.phone = '15658870469';
      this.initData.name = '谢女士';
      this.initData.city = '杭州';
      zhuge.track('滴滴企业版冠寓着陆页', { cityname: '杭州' });
    }
    if (this.$route.query.city === 'NanJing') {
      this.initData.phone = '13027154676';
      this.initData.name = '邓先生';
      this.initData.city = '南京';
      zhuge.track('滴滴企业版冠寓着陆页', { cityname: '南京' });
    }
    if (this.$route.query.city === 'TianJin') {
      this.initData.phone = '13148141586';
      this.initData.name = '毛先生';
      this.initData.city = '天津';
      zhuge.track('滴滴企业版冠寓着陆页', { cityname: '天津' });
    }
    if (this.$route.query.city === 'WuHan') {
      this.initData.phone = '13148142481';
      this.initData.name = '熊先生';
      this.initData.city = '武汉';
      zhuge.track('滴滴企业版冠寓着陆页', { cityname: '武汉' });
    }
    if (this.$route.query.city === 'ChengDu') {
      this.initData.phone = '13161019006';
      this.initData.name = '李女士';
      this.initData.city = '成都';
      zhuge.track('滴滴企业版冠寓着陆页', { cityname: '成都' });
    }
  },
  methods: {
    // 开启活动规则弹窗
    activeRulesShow() {
      this.activeRulesIsShow = true;
    },
    // 关闭活动规则弹窗
    activeRulesHide() {
      this.activeRulesIsShow = false;
    },
    // 拨打电话
    callUp() {
      this.phone = `tel:${this.initData.phone}`;
    },
  },
};
</script>

<style lang="less">
  @import '../style/reset.css';
  body, html {
      background: #F2F3F5;
  }
  .home {
    padding-bottom: 106px;
  }
  .header-banner {
      position: relative;
      img {
          width: 100%;
      }
      .active-rules {
          position: absolute;
          right: 0;
          top: 40px;
          span {
              padding: 6px 8px 6px 15px;
              background: #fff;
              border-radius: 13px 0 0 13px;
              font-size: 12px;
              color: #333;
          }
      }
  }
  .main-box {
      padding: 0 10px;
  }
  .reward-box {
      display: flex;
      .reward {
          flex: 1;
          box-sizing: border-box;
          h2 {
              font-size: 17px;
              color: #333;
              line-height: 24px;
              padding: 17px 0 13px 0;
              text-align: center;
          }
          img {
              width: 100%;
          }
          &:first-child {
              padding-right: 7px;
          }
          &:last-child {
              padding-left: 7px;
          }
      }
  }
  .active-text {
      margin-top: 16px;
      background: #fff;
      padding: 14px 20px;
      border-radius: 3px;
      p {
          font-size: 12px;
          color: #B4956C;
          line-height: 20px;
          em {
              color: #F45D72;
          }
      }
      .stronge-text {
          color: #333;
      }
      .goyoo-customized {
          padding-bottom: 19px;
          li {
              margin-top: 20px;
              h3 {
                  font-size: 12px;
                  color: #fff;
                  background: #B4956C;
                  padding: 3px 9px;
                  display: inline-block;
                  border-radius: 2px;
              }
              p {
                  padding-top: 8px;
              }
              &:first-child {
                  margin-top: 15px;
              }
          }
      }
  }
  .call-up {
      position: fixed;
      z-index: 10;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #fff;
      margin-top: 29px;
      padding: 16px;
      box-sizing: border-box;
      a {
          display: block;
          background: #3A82FA;
          line-height: 50px;
          font-size: 17px;
          color: #fff;
          text-align: center;
          border-radius: 2px;
          .icon {
              width: 15px;
              height: 18px;
              display: inline-block;
              background: url('../assets/icon-phone.png') 0 0 no-repeat;
              background-size: 15px 18px;
              margin-right: 4px;
              vertical-align: -4px;
          }
          &:link {
            text-decoration: none;
          }
      }
  }
</style>
