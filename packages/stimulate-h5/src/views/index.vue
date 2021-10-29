<template>
  <div id="index">
    <div class="banner">
      <img src="../assets/banner.png" alt="">
    </div>
    <div class="content">
      <div class="abstract" v-if="params === ''">
        <p class="head">活动期间</p>
        <ul class="appoint">
          <li>
            <div />
            <p>有新签、续租合同签约成功</p>
          </li>
          <li>
            <div />
            <p>合同签约时间在2020年5月6日0:00-2020年5月31日23:59范围内</p>
          </li>
          <li>
            <div />
            <p>合同状态为“ 已签约-已支付 ”</p>
          </li>
          <li>
            <div />
            <p>合同有效签约类型：散客/框架协议/内部员工/直租</p>
          </li>
        </ul>
        <p class="foot">签约满足以上所有条件的合同时，您将获得唯一抽奖码</p>
        <div class="btnDiv">
          <img src="../assets/add.png" alt="">
          <div class="footBtn" @click="jump()"></div>
        </div>
      </div>
      <div class="code" v-if="params !== ''">
        <p class="title">此次获得抽奖码</p>
        <p class="codeKey">{{params}}</p>
        <div class="btnDiv">
          <img src="../assets/add.png" alt="">
          <div class="footBtn" @click="jump()"></div>
        </div>
      </div>
      <div class="live">
        <p>抽奖直播地址： <br>OA-新龙门e站-我的直播-员工抽奖</p>
        <!-- <p class="live-top">抽奖直播时间： <br>
          直播开奖时间：第一次直播开奖时间为4月22日12:00-14:00，第二次直播开奖时间为4月29日12:00-14:00，第三次直播开奖时间为5月6日12:00-14:00
        </p> -->
      </div>
      <!-- <div class="prize">
        <div class="cross">
          <img src="../assets/1.png" alt="">
        </div>
        <div class="vertical">
          <img v-for="(item, index) of this.imgMap" :key="index" :src="item.name" :alt="item">
        </div>
      </div> -->
      <div class="treaty">
        <p class="title">活动规则:</p>
        <div class="rules">
          <p>一、活动范围：全国冠寓门店</p>
          <p>二、有效签约类型：散客、框架、内部员工、直租</p>
          <p>三、有效合同类型：新签、续租</p>
          <p>四、有效合同签约时间：2020年5月6日0:00-2020年5月31日23:59</p>
          <p>五、有效抽奖时间：2020.5.6-2020.6.6</p>
          <p>六、活动期间内完成客户签约（客户性质为散客、框架及直租）的门店运营管理人员（CM/CO/CS），均可通过“小冠 ”推送获得一个专属抽奖码</p>
          <p>七、活动开始后每周三会在线进行直播抽奖，通过抽取抽奖码的形式进行，直播抽奖地址将会在小冠或全国群内同步推送</p>
          <p>八、奖品发放：奖品将在活动结束后统一进行发放</p>
          <p>九、如合同在6月6日前解约、退租（正常到期退租除外），则抽奖码无效，如已中奖则取消相应中奖资格，抽奖码是否有效以最终合同状态及账单状态为准</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  urlParams,
} from '../utils/utils';

const {
  code = '',
} = urlParams;
/* eslint-disable global-require */
export default {
  name: 'index',
  data() {
    return {
      // imgMap: [
      //   {
      //     name: require('../assets/2.png'),
      //   },
      //   {
      //     name: require('../assets/3.png'),
      //   },
      //   {
      //     name: require('../assets/4.png'),
      //   },
      //   {
      //     name: require('../assets/5.png'),
      //   },
      //   {
      //     name: require('../assets/6.png'),
      //   },
      //   {
      //     name: require('../assets/7.png'),
      //   },
      // ],
      params: '',
    };
  },
  created() {
    this.params = code;
  },
  methods: {
    jump() {
      this.$router.push({
        path: `/code?code=${code}`,
      });
    },
  },
};

</script>
<style lang='less'>
  html {
    background-color: #7C5C86FF;
  }

  #index {
    background-image: url(../assets/banner1.png);
    background-size: 100% 100%;

    .banner {
      width: 100%;

      img {
        width: 100%;
      }
    }

    .content {
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
      padding-top: 0px;
      margin-top: -185px;

      .code {
        background-image: url(../assets/background1.png);
        background-size: 100% 100%;
        padding: 29px 15px 36px 28px;
        box-sizing: border-box;
        text-align: center;
        position: relative;
        top: -35px;

        .title {
          font-size: 30px;
          font-family: 'Source Han Sans CN';
          font-weight: bold;
          color: rgba(54, 50, 95, 1);
          margin-bottom: 39px;
          padding-top: 22px;
        }

        .codeKey {
          font-size: 60px;
          font-family: 'Source Han Sans CN';
          font-weight: 800;
          color: rgba(54, 50, 95, 1);
          line-height: 50px;
        }
      }

      .abstract {
        height: 580px;
        background: rgba(248, 249, 250, 1);
        box-shadow: 0px 0px 0px 0px rgba(248, 249, 250, 1) inset,
          0px 8px 214px 20px rgba(148, 125, 223, 0.47) inset;
        border-radius: 15px;
        padding: 39px 28px 0px 28px;
        box-sizing: border-box;
        position: relative;
        top: -30px;

        .head {
          font-size: 28px;
          font-family: 'Source Han Sans CN';
          font-weight: 400;
          color: rgba(54, 50, 95, 1);
          line-height: 37px;
          padding-bottom: 30px;
        }

        .appoint {
          font-size: 28px;
          font-family: 'Source Han Sans CN';
          font-weight: 400;
          color: rgba(54, 50, 95, 1);
          line-height: 32px;

          li {
            margin-bottom: 10px;

            div {
              transform: rotate(45deg);
              position: relative;
              top: 10px;
              float: left;
              width: 8px;
              height: 8px;
              background: rgba(54, 50, 95, 1);
            }

            p {
              margin-left: 25px;
            }
          }
        }

        .foot {
          padding: 30px 0px 0px 0px;
          font-size: 28px;
          font-family: 'Source Han Sans CN';
          font-weight: 400;
          color: rgba(54, 50, 95, 1);
          line-height: 31px;
        }
      }

      .btnDiv {
        width: 100%;
        padding-top: 17.5px;
        position: relative;

        img {
          position: absolute;
          right: 115px;
          top: 0px;
          width: 60px;
          height: 60px;
        }

        .footBtn {
          width: 489px;
          height: 109px;
          margin: 0 auto;
          background-image: url(../assets/btn.png);
          background-size: cover;
        }
      }

      .live {
        font-size: 30px;
        font-family: 'Source Han Sans CN';
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
        padding: 41px 38px 38px 27px;

        .live-top {
          margin-top: 30px;
        }
      }

      .prize {
        margin-bottom: 40px;

        .cross {
          img {
            width: 100%;
          }
        }

        .vertical {
          flex-wrap: wrap;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: center;

          img {
            margin-top: 13px;
            width: 216px;
          }
        }
      }

      .treaty {
        padding: 0 29px 46px 29px;

        .title {
          font-size: 32px;
          font-family: 'Source Han Sans CN';
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 30px;
        }

        .rules {
          margin-top: 30px;
          font-size: 24px;
          font-family: 'Source Han Sans CN';
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 48px;
        }
      }
    }
  }

</style>
