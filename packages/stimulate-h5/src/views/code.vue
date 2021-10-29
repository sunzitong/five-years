<template>
  <div id="code">
    <div class="content" v-if="list.length>0">
     <div
      class="list"
      v-for="(item, index) of list"
      :key="index"
     >
       <div :class="item.status === 'SIGNED' ? 'top skinTxt' : 'top skinTxtNo' ">
        <div>
          <p class="title">抽奖码</p>
          <div :class="item.status === 'SIGNED' ? 'btn skinBtn' : 'btn skinBtnNo'">
            {{item.status === 'SIGNED' ? '抽奖码有效' : (
               item.status === 'EXPIRED' ? '合同已解约，抽奖码失效' : '已中奖'
            ) }}
          </div>
        </div>
        <p class="codeKey">{{item.awardCode}}</p>
       </div>
       <div class="border"></div>
       <div class="foot">
        <p class="time">生成时间：{{moment(item)}}</p>
        <p>关联合同号：{{item.contractNo}}</p>
       </div>
     </div>
     <p class="foorTitle">奖品将在活动结束后统一进行发放</p>
    </div>
    <div class="abstract" v-else-if="list.length===0">
      <img src="../assets/box.png" alt="">
      <p>您还没有获得抽奖码，快去签约收集抽奖码吧</p>
    </div>
  </div>
</template>
<script>
import { getAppToken } from '../utils/utils';

export default {
  name: 'index',
  data() {
    return {
      list: [],
    };
  },
  created() {
    getAppToken();
    this.init();
  },
  methods: {
    init() {
      const thas = this;
      const token = sessionStorage.getItem('xiaoguan_notice_token');
      this.$ajax({
        method: 'get',
        url: '/coupon_api/sign/incentive/list',
        headers: {
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : null,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then((response) => {
        const { data: { status, data: { list = [] }, msg } } = response;
        if (status === 'ok') {
          thas.list = list;
        } else {
          // eslint-disable-next-line no-alert
          alert(msg || '失败');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    moment(item) {
      return this.$moment(item.signTime).format('YYYY-MM-DD HH:mm:ss');
    },
  },
};


</script>
<style lang='less'>
  html {
    height: 100%;
    background-color: #7C5C86FF;
  }
  body{
    height: 100%;
  }
  #code {
    height: 100%;
    padding: 40px;
    background-image: url(../assets/background3.png);
    background-size: 100% 100%;
    box-sizing: border-box;
    .content {
      height: 100%;
      overflow-y: auto;
    }

    .list {
      background-image: url(../assets/background2.png);
      background-size: 100% 100%;
      padding: 22px 30px 35px 30px;
      margin-bottom: 35px;
      height: 298px;
      box-sizing: border-box;

      .top {
        padding-left: 42px;
        font-family: 'Source Han Sans CN';

        div {
          position: relative;
        }

        .title {
          font-size: 30px;
          font-weight: bold;
          line-height: 40px;
          height: 40px;
        }

        .btn {
          color: rgba(255, 255, 255, 1);
          border-radius: 7px;
          padding: 10px;
          font-size: 22px;
          font-weight: 400;
          line-height: 20px;
          height: 40px;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          right: 0;
        }

        .codeKey {
          margin-top: 20px;
          font-size: 48px;
          font-weight: bold;
          line-height: 37px;
          font-family:'Source Han Sans CN';
        }
      }

      .border {
        margin: 32px 0px 35px 0px;
        border-top: 2px rgba(54,50,95,1) dotted;
        box-sizing: border-box;
        opacity:0.5;
      }

      .foot {
        font-size: 24px;
        font-family: 'Source Han Sans CN';
        font-weight: 400;
        color: rgba(54, 50, 95, 1);
        line-height: 48px;

        .time {
          margin-bottom: 10px;
          line-height: 20px;
        }

        padding-left: 42px;
      }
    }

    .skinTxtNo {
      color: rgba(162,162,162,1);
    }

    .skinBtnNo {
      background:rgba(162,162,162,1);
    }

    .skinTxt {
      color: rgba(243, 152, 0, 1);
    }

    .skinBtn {
      background: rgba(243, 152, 0, 1);
    }

    .abstract {
      background: rgba(248, 249, 250, 1);
      box-shadow: 0px 0px 0px 0px rgba(248, 249, 250, 1) inset,
        0px 8px 214px 20px rgba(148, 125, 223, 0.47) inset;
      border-radius: 15px;
      padding: 48px 15px 81px 28px;
      box-sizing: border-box;
      text-align: center;

      img {
        width: 162px;
        height: 194px;
      }

      p {
        margin-top: 50px;
        font-family: 'Source Han Sans CN';
        font-weight: 400;
        color: rgba(54, 50, 95, 1);
        line-height: 48px;
      }
    }

    .foorTitle {
      font-size:24px;
      font-family:'Source Han Sans CN';
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:37px;
      text-align: end;
      padding: 0 40px 8px 0;
    }
  }
</style>
