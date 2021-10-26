<template>
  <div id="years">
    <div class="banner">
      <img src="../assets/v2/banner.png" alt="">
    </div>
    <div class="content">
      <div class="abstract" v-if="params === ''">
        <p class="head">2020.12.16-2020.12.31期间</p>
        <ul class="appoint">
          <li>
            <div />
            <p>新签（含定金新租）、续租（不含换房续租）</p>
          </li>
          <li>
            <div />
            <p>合同签约时间在2020年12月16日 0：00 - 2020年12月31日23：59范围内；</p>
          </li>
          <li>
            <div />
            <p>合同状态为"已签约-已支付"；</p>
          </li>
          <li>
            <div />
            <p>合同有效签约类型：普通客户、企业客户（不含直租）、内部员工</p>
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
      <div class="titleBj">Goyoo王牌奖</div>
      <div class="prize">
        <div class="vertical">
          <img v-for="(item, index) of imgMap" :key="index" :src="item.name" :alt="item">
        </div>
      </div>
      <div class="titleBj margin">Goyoo特别奖</div>
      <div class="longTitle" v-for="(item, index) of prize" :key="index">
        <span>{{ item.number }}</span>
        <span>{{ item.name }}</span>
      </div>
      <div class="treaty">
        <p class="title">抽奖内容:</p>
        <div class="rules">
          <p>1、Goyoo特别奖抽奖时间：每周二、五晚上19:00直播抽奖</p>
          <p>2、Goyoo特别奖获奖规则：12.16-12.31期间，每完成签约1单即可获得抽奖1次，签约2单抽奖2次，以此类推，无上限要求</p>
          <p>3、抽奖直播地址：OA-新龙门e站-我的直播-员工抽奖</p>
          <p>4、Goyoo王牌奖公布时间：1月5日晚上19：00抽奖公布全国TOP3</p>
          <p>5、Goyoo王牌奖获奖规则： 12.16-12.31期间，达成门店指标者皆可参与抽奖。</p>
        </div>
      </div>
      <div class="treaty">
        <p class="title">活动规则:</p>
        <div class="rules">
          <p>1、活动期间内活动期间内完成客户签约（客户性质为散客及框架下签约客户）的门店运营管理人员(CM\CO\CS)，即可通过"小冠"获取推送的专属抽奖码</p>
          <p>2、活动开始后每周二、五会在线进行直播抽奖，通过抽取抽奖码的形式进行，直播抽奖地址将会在小冠或全国群内同步推送</p>
          <p>3、奖品发放：奖品将在活动结束后统一进行发放</p>
          <p>
            4、Goyoo特别奖抽奖方式：12.16-12.31期间，每完成签约1单即可获得抽奖1次，签约2单抽奖2次，以此类推，无上限要求；每周二、五线上直播抽奖，获得相应奖品</p>
          <p>
            5、Goyoo王牌奖获奖方式：12.16-12.31期间，达成门店指标者皆可参与抽奖，
            抽奖前三名将分别获得iphone 11pro、ipad 32GB和beats solo3耳机
          </p>
          <p>6、如合同在12月31日前解约、退租（正常到期退租除外），则抽奖码无效，如已中奖则取消相应中奖资格，抽奖码是否有效以最终合同状态及账单状态为准。</p>
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
  name: 'years',
  data() {
    return {
      imgMap: [
        { name: require('../assets/v2/1.png') },
        { name: require('../assets/v2/2.png') },
        { name: require('../assets/v2/3.png') },
      ],
      prize: [
        { number: 'TOP 4', name: 'Apple Airpods Pro' },
        { number: 'TOP 5', name: '摩飞多功能料理锅' },
        { number: 'TOP 6', name: '雀巢胶囊咖啡机' },
        { number: 'TOP 7', name: 'SKG颈椎按摩仪' },
        { number: 'TOP 8', name: '罗技无限鼠标' },
        { number: 'TOP 9', name: '美团外卖月卡' },
      ],
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

  #years {
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
      margin-top: -240px;

      .titleBj{
        width: 216px;
        background-image: url(../assets/v2/title.png);
        background-size: 100% 100%;
        text-align: center;
        color: #fff;
        font-weight: bold;
      }

      .longTitle{
        background-image: url(../assets/v2/content.png);
        background-size: 100% 100%;
        color: #fff;
        height: 60px;
        line-height: 60px;
        padding: 0 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .margin{
        margin-bottom: 13px;
      }

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
              line-height: 35px;
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
        padding: 10px 0 46px 0;

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
