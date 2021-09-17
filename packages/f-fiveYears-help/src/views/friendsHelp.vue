<template>
  <div class="page__index">
    <!-- banner区域 -->
    <div class="ruleBtn">活动规则</div>
    <div class="banner-box">
      <div class="banner"></div>
      <div class="invitationInfo">
        <p class="invitationImage"></p>
        <div class="invitationContext">
          <div class="invitation">蛋壳</div>
          <div class="invitationDesc">邀请你为Ta 助力领冠寓免租券</div>
        </div>
      </div>
      <div class="banner-photoFrame">
        <p class="active-overTime">活动时间：2021年9月17日-2021年9月17日</p>
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
            <!-- <li>用户182****1235已达成1355珑珠</li>
            <li>用户182****1235已达成1355珑珠</li> -->
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
            帮TA助力
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
            <div class="helpUserList">
              <div class="helpUser">
                <div class="headerImage"></div>
                <ul>
                  <li>蛋壳1</li>
                  <li class="descript">10月23日前来助力</li>
                </ul>
              </div>
              <div class="helpUser">
                <div class="headerImage"></div>
                <ul>
                  <li>蛋壳2</li>
                  <li class="descript">10月23日前来助力</li>
                </ul>
              </div>
              <div class="helpUser">
                <div class="headerImage"></div>
                <ul>
                  <li>蛋壳3</li>
                  <li class="descript">10月23日前来助力</li>
                </ul>
              </div>
              <div class="helpUser">
                <div class="headerImage"></div>
                <ul>
                  <li>蛋壳4</li>
                  <li class="descript">10月23日前来助力</li>
                </ul>
              </div>
              <div class="helpUser">
                <div class="headerImage"></div>
                <ul>
                  <li>蛋壳5</li>
                  <li class="descript">10月23日前来助力</li>
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
import { getNumber, getRankings, getHelpMy ,helpJoin} from "@/service";
import { getToken } from "@/utils/guanyu";
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
  time = 3129094655;
  activeTab = 1;
  loading = false;
  token = getToken() || "31fea0e77cdd4663976f2041d2bab1cc"; //todo
  async mounted() {
    document.title = "冠寓五周年助力活动";
    await this.getNum();
    await this.getRankings();
    await this.getHelpMy();
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
  async helpJoin() {
    console.log(this.$route.query,'this.$router.query');
    const res = await helpJoin({
      s: this.$route.query.id,
      t: "69977ab6364545e98349b1616c5d8b70",
    });
    if ((res as any)?.code == "0") {
      return true;
    } else {
      return false;
    }
  }
  async handleConfirm() {
    this.$router.push({
      path: "/myInvitation",
    });
  }
  handleClosed(): void {
    this.popParm.isShow = false;
  }
  handleSelectTab($event: any): void {
    let tabIndex = $event.target.getAttribute("tabIndex");
    this.activeTab = tabIndex;
  }
  async handleInvitation(): Promise<void> {
    const flag = await this.helpJoin();
    if (flag) {
      this.popParm.descript = "每人仅能为他人助力一次";
      this.popParm.buttonContext = "我也要发起助力";
      this.popParm.isShow = true;
    }
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
  margin: 0px 46px;
  .rateBg {
    background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/GMIvYIhkavkt20V9v0h8tg.png)
      0 0 no-repeat;
    background-size: cover;
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
  display: flex;
  justify-content: center;
  .banner {
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/X8FdfNOlx0UEG0q_KiXq0g.png") 0 0 no-repeat;
    background-size: contain;
    height: 299px;
    width: 375px;
  }
  .invitationInfo {
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/2WxLPqsubwBENOIop4AV4A.png") 0 0 no-repeat;
    background-size: contain;
    height: 118px;
    width: 306px;
    position: absolute;
    top: 40px;
    .invitationImage {
      position: absolute;
      top: -24px;
      left: -30px;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Kr0rhl-F7QoYKwBk2R37uw.png") 0 0 no-repeat;
      background-size: contain;
      height: 100px;
      width: 100px;
    }
    .invitationContext {
      color: #00FFFF;
      margin-top: 26px;
      margin-left: 79px;
      text-shadow: 0px 0px 12px #00FBFD, 0px 2px 4px rgba(0, 0, 0, 0.89);
      .invitation {
        font-weight: 500;
        font-size: 20px;
      }
      .invitationDesc {
        font-weight: 400;
        font-size: 15px;
        margin-top: 12px;
      }
    }
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
        li {
          margin-bottom: 6px;
          line-height: 18px;
        }
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
            border: 1px solid red;
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
