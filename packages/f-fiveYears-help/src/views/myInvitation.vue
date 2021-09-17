<template>
  <div class="page__index">
    <!-- banner区域 -->
    <div class="ruleBtn">活动规则</div>
    <div class="banner-box">
      <div class="banner"></div>
      <div class="banner-photoFrame">
        <p class="active-overTime">
          活动时间：{{ numberInfo.startTimeStr }}-{{ numberInfo.endTimeStr }}
        </p>
      </div>
    </div>
    <!-- 助力区域 -->
    <div class="help-box">
      <div class="current-help">
        <div class="help-title">当前已助力28人</div>
        <div class="help-rate">
          <div class="unit">
            <span>5人</span>
            <span>25人</span>
            <span>35人</span>
            <span>55人</span>
            <span>85人</span>
          </div>
          <div class="Bar">
            <div class="rateBg" style="width: 80%">
              <!-- <span>80%</span> -->
              <i class="icon"></i>
            </div>
          </div>
          <div class="unit">
            <span>50珑珠</span>
            <span>120珑珠</span>
            <span>555珑珠</span>
            <span>1355珑珠</span>
            <span>2355珑珠</span>
          </div>
        </div>
      </div>
      <div class="history-help">
        <div class="history-left">
          <ul class="complete-user">
            <li>用户182****1235已达成1355珑珠</li>
            <li>用户182****1235已达成1355珑珠</li>
            <li>用户182****1235已达成1355珑珠</li>
            <li>用户182****1235已达成1355珑珠</li>
          </ul>
        </div>
        <div class="history-right">
          <div class="divided-up">
            已瓜分
            <span>5345</span>
            珑珠
          </div>
          <div class="divided-cumulative">当前累计获得</div>
          <div class="divided-totel">
            <span>555</span>
            珑珠
          </div>
          <div
            class="btnInvitation"
            data-type="invitation"
            v-on:click="handleInvitation"
          >
            邀请好友来助力
          </div>
        </div>
      </div>
    </div>
    <!-- 助力记录和TOP10榜单 -->
    <div class="record-box">
      <div class="active-countDown">
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="block day">{{ timeData.days }}</span>
            <span class="block hours">{{ timeData.hours }}</span>
            <span class="block minutes">{{ timeData.minutes }}</span>
            <span class="block seconds">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
      <div class="record-list">
        <div class="tabs">
          <div class="tab-title" v-on:click="handleSelectTab">
            <span tabIndex="1" :class="[activeTab == 1 ? 'active' : '']">
              助力记录
            </span>
            <span tabIndex="2" :class="[activeTab == 2 ? 'active' : '']">
              TOP10榜单
            </span>
          </div>
          <div v-if="activeTab == 1" class="tab-content">
            <div class="helpUserList" v-for="item in helpsList" :key="item.nn">
              <div class="helpUser">
                <img class="headerImage" :src="item.img" />
                <ul>
                  <li>{{ item.nn }}</li>
                  <li class="descript">{{ item.ht }}前来助力</li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else-if="activeTab == 2" class="tab-content tab-topTen">
            <ul class="title">
              <li class="firstCol">名次</li>
              <li class="twoCol">手机号</li>
              <li class="threeCol">助力值</li>
            </ul>
            <div class="tab-topContain">
              <ul>
                <li class="firstCol"><i class="icon number1" /></li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol"><i class="icon number2" /></li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol"><i class="icon number3" /></li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol">4</li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol">5</li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol">6</li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol">7</li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol">8</li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
              <ul>
                <li class="firstCol">9</li>
                <li class="twoCol">182****2563</li>
                <li class="threeCol">85人</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>*珑珠积分(简称珑珠)是</p>
      <p>广大客户在龙湖集团旗下各场景中消费或参与活动所获得的积分</p>
    </div>

    <!-- 弹窗模态框 -->
    <van-overlay :show="this.popParm.isShow">
      <modelBox
        :buttonContext="this.popParm.buttonContext"
        :descript="this.popParm.descript"
        @closed="handleClosed"
        @confirm="handleConfirm"
      ></modelBox>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { getNumber, getRankings, getHelpMy, getMyHelpers, helpStart} from "@/service";
import { getToken } from "@/utils/guanyu";
import { setMiniProgramShare, showAppShare } from "@/utils/guanyu";
import modelBox from "@/components/modelBox.vue";
@Component({
  components: {
    modelBox,
  },
})
export default class Index extends Base {
  /**
   * 运行环境
   * 来源 App.vue中定义
   */
  @Inject() visitSource!: string;
  /**
   * 分享方法
   * 来源 App.vue中定义
   */
  @Inject() share!: () => void;

  popParm = {
    isShow: false,
    buttonContext: "发送",
    descript: "发送至微信好友或群聊",
  };
  numberInfo = {}; //获取活动编号信息
  rankingsInfo = {}; //排行榜
  helpsList = []; // 我的好友助力榜
  time = 3129094655; //倒计时
  activeTab = 1;
  loading = false;
  token = getToken() || "31fea0e77cdd4663976f2041d2bab1cc"; //todo
  async mounted() {
    document.title = "冠寓五周年助力活动";
    await this.getNum();
    await this.getRankings();
    await this.getHelpMy();
    await this.getMyHelpers();
    console.log(this.token,'token123');
  }
  async getNum() {
    const res = await getNumber({
      type: 1,
    });
    if ((res as any)?.code == "0") {
      this.numberInfo = res?.data;
    }
  }
  async getRankings() {
    const res = await getRankings({
      number: this.numberInfo.an,
    });
    if ((res as any)?.code == "0") {
      this.rankingsInfo = res?.data;
    }
  }
  async getHelpMy() {
    const res = await getHelpMy({
      an: this.numberInfo.an,
      t: this.token,
    });
    if ((res as any)?.code == "0") {
      console.log(this.rankingsInfo, "this.rankingsInfo");
    }
  }

  async getMyHelpers(){
    const res = await getMyHelpers({
      n: this.numberInfo.an,
      t: this.token,
    });
    if ((res as any)?.code == "0") {
      this.helpsList = res?.data;
      console.log(this.helpsList, "this.helpsList123");
    }
  }

  async helpStart() {
    const res = await helpStart({
      an: this.numberInfo.an,
      city: "全国",
      t: this.token, //todo
    });
    if ((res as any)?.code == "0") {
      return res?.data?.s;
    }
  }
  async handleConfirm() {
    const invitationId = await this.helpStart();
    if (invitationId) {
      this.$router.push({
        path: "/friendsHelp",
        query: {
          id: invitationId,
        },
      });
      // console.log(this.visitSource ,'this.visitSource123')
      /**
       * 调用app分享
       * @param options app分享配置
       * @param miniProgramUrl 网址分享到小程序
       * @param type 小程序版本 0正式版 1开发版 2体验版
       */
      const title = "冠寓";
      const img =
        "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/oNuSnxNLKKU.png";
      if (this.visitSource === "小程序") {
        return setMiniProgramShare({
          title,
          imageUrl: img,
          path:`${window.location.host}/friendsHelp?id=${invitationId}`,
        });
      }
      if (this.visitSource === "APP") {
        /**
         * 调用app的分享 分享目标到小程序 miniProgramUrl
         */
        return showAppShare(
          {
            title,
            image: img,
            url: `${window.location.host}/friendsHelp?id=${invitationId}`,
          },
          `${window.location.host}/friendsHelp?id=${invitationId}`,
          1
        );
      }
    } else {
      alert("获取分享ID错误");
    }
    this.popParm.isShow = false;
  }
  handleClosed(): void {
    this.popParm.isShow = false;
  }
  handleSelectTab($event: any): void {
    let tabIndex = $event.target.getAttribute("tabIndex");
    this.activeTab = tabIndex;
  }
  async handleInvitation(): Promise<void> {
    this.popParm.descript = "邀请好友助力";
    this.popParm.buttonContext = "邀请";
    this.popParm.isShow = true;
  }
}
</script>

/* less也支持 */
<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
  color: #fff;
  font-size: 10px;
  font-weight: 300;
  padding: 20px 12px 25px 25px;
}
.firstCol {
  display: flex;
  justify-content: center;
  width: 26px;
}
.twoCol {
  width: 100px;
}
.threeCol {
  display: flex;
  justify-content: center;
  width: 39px;
}
.Bar {
  position: relative;
  margin: 0px 50px;
  .rateBg {
    background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/ohoGvB0ZH9Fe0hEM4WH_kQ.png)
      100% 100% repeat-x;
  }
}
.Bar .icon {
  background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Pt0RE6MSbMbSTe7nCC4u-w.png) 0 0 no-repeat;
  background-size: contain;
  height: 27px;
  width: 27px;
  position: absolute;
  right: -9px;
  top: -5px;
}
.Bar div { 
  display: block;
  position: relative;
  height: 9px; /* 高度 */
  line-height: 20px;
}
.Bar div span {
  position: absolute;
  width: 200px; /* 宽度 */
  text-align: center;
  font-weight: bold;
  background: blue;
}
.page__index {
  background: linear-gradient(to right, #000c38, #250476, #012f5b);
}
.ruleBtn {
  position: fixed;
  display: flex;
  align-items: center;
  text-align: center;
  right: 0;
  top: 240px;
  width: 23px;
  height: 87px;
  font-weight: 500;
  font-weight: 500;
  color: #00FFFF;
  text-shadow: 0px 0px 12px #00fbfd, 0px 2px 4px rgb(0 0 0 / 89%);
  border: 1px solid #00FFFF;
  border-right: 0;
  border-radius: 12px 0 0 12px;
  z-index: 9999;
}
.banner-box {
  .banner {
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/-pHbOpg46ynoaiRazCvAgQ.png") 0 0 no-repeat;
    background-size: contain;
    height: 299px;
    width: 375px;
  }
  .banner-photoFrame {
    position: relative;
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/idNHTU4-wUhMrQeMKmycrw.png") 0 0 no-repeat;
    background-size: contain;
    height: 320px;
    width: 375px;
    position: absolute;
    // z-index: 999;
    top: 76px;
    display: flex;
    justify-content: center;
    .active-overTime {
      position: absolute;
      bottom: 158px;
      color: #fff;
      text-shadow: 0px 0px 8px #fd08fe;
    }
  }
  .banner-operationPlatform {
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/BcLqiWI1B8Z8Mjbhk2hDmA.png") 0 0 no-repeat;
    background-size: cover;
    height: 105px;
    width: 375px;
    top: 178px;
    position: absolute;
  }
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
  vertical-align: middle;
}
.block {
  color: #fff;
  text-shadow: 0 0 8px #fd08fe;
  font-size: 12px;
}
.help-box {
  margin-top: 32px;
  .current-help {
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Ue44dyjJRg2TRxyKRRK1Og.png") 0 0 no-repeat;
    background-size: contain;
    // height: 205px;
    height: 160px;
    color: #fff;
    .help-rate {
      margin-top: 18px;
    }
    .help-title {
      display: flex;
      justify-content: center;
      padding-top: 20px;
    }
    .unit {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 48px;
    }
  }
  .history-help {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 16px 14.5px;
    .history-left {
      width: 149px;
      height: 199px;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/PDO0sUdJUrDpMp3gzRXkrw.png")
          no-repeat,
        linear-gradient(270deg, #000c38 0%, #250476 0%, #012f5b 100%);
      background-size: cover;
      border-radius: 8px;
      border-radius: 8px;
      overflow-y: auto;
      .complete-user {
        // animation: myMove 5s linear infinite;
        // animation-fill-mode: forwards;
      }
      @keyframes myMove {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-30px);
        }

        100% {
          transform: translateY(-60px);
        }
      }
      ul {
        margin: 0 auto;
        padding: 23px 0;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        width: 96px;
        line-height: 20px;
      }
    }
    .history-right {
      width: 187px;
      height: 199px;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Veb0G3xGqprsdYLanJ3Q2A.png")
          no-repeat,
        linear-gradient(270deg, #000c38 0%, #250476 0%, #012f5b 100%);
      background-size: cover;
      border-radius: 8px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .divided-up {
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        margin-top: 30px;
        span {
          text-shadow: 0 0 8px #fd08fe;
        }
      }
      .divided-cumulative {
        margin-top: 22.5px;
        opacity: 0.6;
        color: #ffffff;
      }
      .divided-totel {
        font-size: 14px;
        color: #ffffff;
        display: flex;
        align-items: center;
        span {
          font-family: DINAlternate-Bold;
          font-size: 40px;
          color: #fded65;
          margin-right: 7.5px;
        }
      }
      .btnInvitation {
        margin-top: 17.5px;
        width: 158.5px;
        height: 33.5px;
        line-height: 33.5px;
        text-align: center;
        vertical-align: middle;
        background: url("https://goyoo-assets.longfor.com//prod/app/JTEYpVYQyxBFGYaFGSzRVQ.png") 0 0 no-repeat;
        background-size: 154px;
        font-weight: 500;
        color: #0E0748;
      }
    }
  }
}

.record-box {
  .active-countDown {
    position: relative;
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/anwWTrFUV6RqWAFWMBaypg.png") 0 0 no-repeat;
    background-size: contain;
    height: 84px;
    display: flex;
    justify-content: end;
    font-size: 12px;
    font-weight: 0.5;
    text-shadow: 0px 0px 8px #fd08fe;
    .day {
      position: absolute;
      top: 35px;
      right: 187px;
    }
    .hours {
      position: absolute;
      top: 35px;
      right: 139px;
    }
    .minutes {
      position: absolute;
      top: 35px;
      right: 89px;
    }
    .seconds {
      position: absolute;
      top: 35px;
      right: 40px;
    }
  }
  .record-list {
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/CJrWh_APU7OtTwiaK6UNuw.png") 0 0 no-repeat;
    background-size: contain;
    background-position: center;
    height: 369px;
    color: #fff;
    .tabs {
      width: 340px;
      height: 100%;
      margin: 0 auto;
      padding-top: 18px;
      .tab-title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 18px;
        margin-top: 16px;
        span {
          display: inline-block;
          width: 160px;
          outline: none;
          text-align: center;
        }
      }
      .active {
        text-shadow: 0px 0px 8px #fd08fe;
      }
      .tab-content {
        margin: 30px 23px 0 23px;
        .helpUserList {
          overflow-y: auto;
          height: 240px;
        }
        .helpUser {
          display: flex;
          flex-direction: row;
          margin-top: 18px;
          margin-left: 24px;
          .headerImage {
            width: 40px;
            height: 40px;
            // border: 1px solid red;
            margin-right: 10px;
            border-radius: 50px;
          }
          .descript {
            opacity: 0.7;
          }
        }
      }
      .tab-topTen {
        .title {
          color: #ffffff;
          opacity: .7;
        }
        .tab-topContain {
          overflow-y: auto;
          height: 210px;
        }
        .icon {
          height: 21px;
          width: 21px;
        }
        .number1 {
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/7rkQrycsgJY-noaJ9NqxFA.png") 0 0 no-repeat;
          background-size: contain;
        }
        .number2 {
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Dz7Jy73FMbhMxpFvAd7RzQ.png") 0 0 no-repeat;
          background-size: contain;
        }
        .number3 {
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/hL680IJlvnSEy8pEjYKszw.png") 0 0 no-repeat;
          background-size: contain;
        }
        ul {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 0 20px;
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
