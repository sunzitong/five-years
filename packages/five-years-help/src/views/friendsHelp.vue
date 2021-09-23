<template>
  <div class="page__index">
    <div class="ruleBtn" @click="handleRule">活动规则</div>
    <!-- banner区域 -->
    <div class="banner-box">
      <div class="banner"></div>
      <div class="invitationInfo">
        <p class="invitationImage">
          <img v-if="startUserInfo.src" :src="startUserInfo.src" />
          <img
            v-else
            src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/uV3bLfc3BkfKQa6bZfrzfA.png"
          />
        </p>
        <div class="invitationContext">
          <div class="invitation">{{ startUserInfo.nn }}</div>
          <div class="invitationDesc">邀请你为Ta 助力领珑珠</div>
        </div>
      </div>
      <div class="banner-photoFrame">
        <p class="active-overTime">
          活动时间：{{ numberInfo.startTimeStr }}-{{ numberInfo.endTimeStr }}
        </p>
      </div>
    </div>
    <!-- 助力区域 -->
    <div class="help-box">
      <div class="current-help">
        <div class="help-title">当前已助力{{ startUserInfo.ic }}人</div>
        <div class="help-rate">
          <div class="unit unit1">
            <p
              :class="[
                startUserInfo.ic >= 5
                  ? 'scale-active scale5-active'
                  : 'scale scale5',
              ]"
            >
              5人
            </p>
            <p
              :class="[
                startUserInfo.ic >= 15
                  ? 'scale-active scale15-active'
                  : 'scale scale15',
              ]"
            >
              15人
            </p>
            <p
              :class="[
                startUserInfo.ic >= 25
                  ? 'scale-active scale25-active'
                  : 'scale scale25',
              ]"
            >
              25人
            </p>
            <p
              :class="[
                startUserInfo.ic >= 55
                  ? 'scale-active scale55-active'
                  : 'scale scale55',
              ]"
            >
              55人
            </p>
            <p
              :class="[
                startUserInfo.ic >= 85
                  ? 'scale-active scale85-active'
                  : 'scale scale85',
              ]"
            >
              85人
            </p>
          </div>
          <div class="barLayout">
            <div class="Bar">
              <div
                class="rateBg"
                :style="{
                  width:
                    startUserInfo.ic / helpHeadCountList.slice(-1) >= 1
                      ? (1 / 3.75) * 287 + `vw`
                      : (startUserInfo.ic / helpHeadCountList.slice(-1)) *
                          (1 / 3.75) *
                          287 +
                        `vw`,
                }"
              >
                <i
                  class="icon"
                  :style="{
                    right:
                      startUserInfo.ic >= helpHeadCountList.slice(-1)
                        ? `-1vw`
                        : `-6vw`,
                  }"
                ></i>
              </div>
            </div>
          </div>
          <div class="unit unit2">
            <p
              :class="[
                startUserInfo.ic >= 5
                  ? 'scaleLong-active scaleLong5-active'
                  : 'scaleLong scaleLong5',
              ]"
            >
              100珑珠
            </p>
            <p
              :class="[
                startUserInfo.ic >= 15
                  ? 'scaleLong-active scaleLong15-active'
                  : 'scaleLong scaleLong15',
              ]"
            >
              315珑珠
            </p>
            <p
              :class="[
                startUserInfo.ic >= 25
                  ? 'scaleLong-active scaleLong25-active'
                  : 'scaleLong scaleLong25',
              ]"
            >
              555珑珠
            </p>
            <p
              :class="[
                startUserInfo.ic >= 55
                  ? 'scaleLong-active scaleLong55-active'
                  : 'scaleLong scaleLong55',
              ]"
            >
              1355珑珠
            </p>
            <p
              :class="[
                startUserInfo.ic >= 85
                  ? 'scaleLong-active scaleLong85-active'
                  : 'scaleLong scaleLong85',
              ]"
            >
              2355珑珠
            </p>
          </div>
        </div>
      </div>
      <div class="history-help">
        <div class="history-left">
          <div class="history-left-ly">
            <ul
              class="complete-user"
              v-if="
                rankingsInfo && rankingsInfo.ll && rankingsInfo.ll.length > 0
              "
            >
              <li v-for="(item, index) in rankingsInfo.ll" :key="index">
                用户{{ item.nn }}已达成{{ item.pn }}珑珠
              </li>
            </ul>
            <div class="emptyTemplateLy" v-else>
              <div class="emptyTemplate"></div>
              <div class="emptyDescript">暂无内容</div>
            </div>
          </div>
        </div>
        <div class="history-right">
          <div class="divided-up">
            已瓜分
            <span>{{ numberInfo.longZhuCount }}</span>
            珑珠
          </div>
          <div class="divided-cumulative">当前累计获得</div>
          <div class="divided-totel">
            <span>{{ getLongShuCount(startUserInfo.ic) }}</span>
            珑珠
          </div>
          <div
            data-type="invitation"
            :class="[
              'btnInvitation',
              startUserInfo.cd <= 0 ? 'btnOverTime' : '',
            ]"
            v-on:click="handleInvitation"
          >
            帮TA助力
          </div>
          <span class="activeOverDesc" v-if="startUserInfo.cd == 0">
            来晚来! 助力已结束
          </span>
        </div>
      </div>
    </div>
    <!-- 助力记录和TOP10榜单 -->
    <div class="record-box">
      <div class="active-countDown">
        <van-count-down :time="startUserInfo.cd * 1000">
          <template #default="timeData">
            <span class="block day">{{ formateNumber(timeData.days) }}</span>
            <span class="block hours">{{ formateNumber(timeData.hours) }}</span>
            <span class="block minutes">
              {{ formateNumber(timeData.minutes) }}
            </span>
            <span class="block seconds">
              {{ formateNumber(timeData.seconds) }}
            </span>
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
            <div
              class="helpUserList"
              v-if="
                startUserInfo && startUserInfo.hu && startUserInfo.hu.length > 0
              "
            >
              <div
                class="helpUser"
                v-for="(item, index) in startUserInfo.hu"
                :key="index"
              >
                <img v-if="item.img" class="headerImage" :src="item.img" />
                <img
                  v-else
                  class="headerImage"
                  src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/uV3bLfc3BkfKQa6bZfrzfA.png"
                />
                <ul>
                  <li>{{ item.nn }}</li>
                  <li class="descript">
                    {{ dayjs(item.ht).month() + 1 }}月{{
                      dayjs(item.ht).date()
                    }}日前来助力
                  </li>
                  <!-- {dayjs(item.ht).month()+1}}月{{dayjs(item.ht).date() -->
                </ul>
              </div>
            </div>
            <div class="emptyTemplateLy" v-else>
              <div class="emptyTemplate"></div>
              <div class="emptyDescript">暂时还没有小伙伴助力</div>
            </div>
          </div>
          <div v-else-if="activeTab == 2" class="tab-content tab-topTen">
            <div v-if="rankingsInfo && rankingsInfo.rl.length > 0">
              <ul class="title">
                <li class="firstCol">名次</li>
                <li class="twoCol">手机号</li>
                <li class="threeCol">助力值</li>
              </ul>
              <div class="tab-topContain">
                <ul v-for="(item, index) in rankingsInfo.rl" :key="index">
                  <li class="firstCol">
                    <i
                      v-if="index <= 2"
                      :class="[
                        index == 0 ? 'number1' : '',
                        index == 1 ? 'number2' : '',
                        index == 2 ? 'number3' : '',
                        'icon',
                      ]"
                    ></i>
                    <span v-else>{{ index + 1 }}</span>
                  </li>
                  <li class="twoCol">{{ item.nn }}</li>
                  <li class="threeCol">{{ item.ic }}人</li>
                </ul>
              </div>
            </div>
            <div class="emptyTemplateLy" v-else>
              <div class="emptyTemplate"></div>
              <div class="emptyDescript">暂无内容</div>
            </div>
          </div>
        </div>
      </div>
    </div>
 <div class="footer">
      <p>*珑珠积分(简称珑珠)是</p>
      <p class="context">
        广大客户在龙湖集团旗下各场景中消费或参与活动所获得的积分
      </p>
    </div>

    <!-- 弹窗模态框 -->
    <van-overlay
      :show="this.popParm.isShow"
      @click="handleClosed"
      :lock-scroll="false"
    >
      <modelBox
        :buttonContext="this.popParm.buttonContext"
        :descript="this.popParm.descript"
        :popType="this.popParm.popType"
        @closed="handleClosed"
        @confirm="handleConfirm"
      ></modelBox>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import {
  getNumber,
  getRankings,
  getHelpMy,
  helpStart,
  helpJoin,
  getStartUser,
} from "@/service";
import { getToken } from "@/utils/guanyu";
import { setMiniProgramShare, showAppShare } from "@/utils/guanyu";
import modelBox from "@/components/modelBox.vue";
import dayjs from "dayjs";
import { toLogin } from "../utils/guanyu";
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
  @Inject() share!: (url: string) => void;

  popParm = {
    isShow: false,
    buttonContext: "",
    popType: 3,
    descript: "",
  };
  helpHeadCountList: any = [5, 15, 25, 55, 85]; //获取奖励比例图-助力人头数
  helpLongZhuList: any = [100, 315, 555, 1355, 2355]; //获取奖励比例图-珑珠数量
  dayjs: any = dayjs;
  userInfo: any = {}; // 我的用户信息 ||  被助力人信息
  startUserInfo: any = {}; //发起人信息
  numberInfo: any = {}; //获取活动编号信息
  rankingsInfo: any = {}; //排行榜
  helpsList: any = []; // 我的好友助力榜
  invitationId: any = 0;
  activeTab = 1;
  loading = false;
  id: any = "";
  token = getToken();
  async mounted() {
    document.title = "冠寓五周年助力活动";
    this.id = this.$route.query.id;
    await this.getNum();
    await this.getRankings();
    await this.getStartUser();
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
      number: (this.numberInfo as any).an,
    });
    if ((res as any)?.code == "0") {
      this.rankingsInfo = res?.data;
    }
  }
  async getHelpMy() {
    const res = await getHelpMy({
      an: (this.numberInfo as any).an,
      t: getToken(),
    });
    if ((res as any)?.code == "0") {
      this.userInfo = res?.data;
    }
  }
  async getStartUser() {
    const res = await getStartUser({
      s: this.id,
    });
    if ((res as any)?.code == "0") {
      this.startUserInfo = res?.data;
      // this.startUserInfo.ic = 0; //todo
    }
  }
  getLongShuCount(count: any) {
    if (count < this.helpHeadCountList[0]) {
      return 0;
    } else {
      const res = this.helpHeadCountList.filter(function (item: any) {
        return item <= count;
      });
      const index = this.helpHeadCountList.indexOf(
        res
          .sort(function (a: any, b: any) {
            return a - b;
          })
          .slice(-1)[0]
      );
      return this.helpLongZhuList[index];
    }
  }
  handleClosed(): void {
    this.popParm.isShow = false;
  }
  handleRule(): void {
    this.popParm.popType = 1;
    this.popParm.isShow = true;
  }
  handleSelectTab($event: any): void {
    let tabIndex = $event.target.getAttribute("tabIndex");
    this.activeTab = tabIndex;
  }
  formateNumber(t: any) {
    if (t < 10) {
      return "0" + t;
    }
    return t;
  }
  // 确认按钮-我也要发起助力
  async handleConfirm() {
    this.popParm.isShow = false; //确认关闭弹窗
    const res = await helpStart({
      an: (this.numberInfo as any).an,
      city: "全国",
      t: getToken()
    });
    if ((res as any)?.code == "0") {
      const url = `${window.location.origin}/fe/five-years-help/#/myInvitation`;
      if (this.visitSource === "小程序") {
        this.popParm.popType = 2;
        this.popParm.isShow = true;
      }
      this.share(url);
    } else {
      this.popParm.descript = (res as any)?.msg;
      this.popParm.buttonContext = "我也要发起助力";
      this.popParm.popType = 4;
      this.popParm.isShow = true;
    }
  }
  // 帮好友助力事件
  async handleInvitation(): Promise<void> {
    // 未登录
    if (!getToken()) {
      toLogin();
    } else {
      // 倒计时大于0可以助力,否则按钮变灰不可点击
      if (this.startUserInfo.cd > 0) {
        const res = await helpJoin({
          s: this.$route.query.id,
          t: getToken(),
        });
        if ((res as any)?.code === 0) {
          this.popParm.descript = "恭喜你助力成功！";
          this.popParm.buttonContext = "我也要发起助力";
          this.popParm.popType = 3;
          this.popParm.isShow = true;
          await this.getNum();
          await this.getRankings();
          await this.getStartUser();
        } else {
          this.popParm.descript = (res as any)?.msg;
          this.popParm.buttonContext = "我也要发起助力";
          this.popParm.popType = 3;
          this.popParm.isShow = true;
        }
      }
    }
  }
}
</script>

/* less也支持 */
<style lang="scss" scoped>
/* 当前蒙层显示时生效 */
.van-overlay {
  overflow-y: hidden;
  z-index: 99999;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
  color: #fff;
  font-size: 10px;
  font-weight: 300;
  padding: 20px 12px 25px 25px;
  .context {
    margin-top: 3px;
  }
}
.firstCol {
  display: flex;
  justify-content: center;
  width: 26px;
  text-align: center;
}
.twoCol {
  width: 100px;
}
.threeCol {
  display: flex;
  justify-content: center;
  width: 39px;
}
.barLayout {
  position: absolute;
  width: 100%;
  top: 82.3px;
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
  right: -22px;
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
  text-align: center;
  vertical-align: middle;
  align-items: center;
  right: -2px;
  top: 267px;
  width: 23px;
  height: 71px;
  font-weight: 500;
  color: #00FFFF;
  text-shadow: 0px 0px 12px #00fbfd, 0px 2px 4px rgb(0 0 0 / 89%);
  border: 1px solid #00FFFF;
  border-right: 0;
  border-radius: 12px 0 0 12px;
  z-index: 98;
  font-size: 12px;
  line-height: 15px;
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
      img {
        position: absolute;
        top: 12.6px;
        left: 13.1px;
        height: 72px;
        width: 72px;
        border: 1px solid #00ffff;
        border-radius: 50%;
      }
    }
    .invitationContext {
      color: #00FFFF;
      margin-top: 26px;
      margin-left: 79px;
      text-shadow: 0px 0px 12px #00FBFD, 0px 2px 4px rgba(0, 0, 0, 0.89);
      .invitation {
        font-weight: 500;
        font-size: 20px;
        margin-top: 3px;
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
    top: 36px;
    display: flex;
    justify-content: center;
    .active-overTime {
      position: absolute;
      bottom: 158px;
      color: #fff;
      text-shadow: 0px 0px 8px #fd08fe;
      width: 100%;
      text-align: center;
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
  margin-top: -7px;
  .current-help {
    position: relative;
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Ue44dyjJRg2TRxyKRRK1Og.png") 0 0 no-repeat;
    background-size: contain;
    // height: 205px;
    height: 160px;
    color: #fff;
    .scale,
    .scaleLong {
      color: #fff;
      font-weight: 400;
    }
    .scale-active,
    .scaleLong-active {
      text-shadow: 0px 0px 8px #fd08fe;
      font-weight: 500;
    }
     // 5珑珠刻度
    .scale5 {
      justify-content: end;
      width: 46px;
      opacity: 0.5;
    }
    .scale5-active {
      justify-content: end;
      width: 46px;
    }
    .scaleLong5 {
      justify-content: end;
      width: 48px;
      opacity: 0.5;
    }
    .scaleLong5-active {
      justify-content: end;
      width: 48px;
    }
    // 15珑珠刻度
    .scale15 {
      justify-content: end;
      width: 40px;
      opacity: 0.5;
    }
    .scale15-active {
      justify-content: center;
      width: 40px;
    }
    .scaleLong15 {
      justify-content: center;
      width: 50px;
      opacity: 0.5;
    }
    .scaleLong15-active {
      justify-content: center;
      width: 50px;
    }
    // 25珑珠刻度
    .scale25 {
      justify-content: center;
      width: 46px;
      opacity: 0.5;
    }
    .scale25-active {
      justify-content: center;
      width: 46px;
    }
    .scaleLong25 {
      justify-content: center;
      width: 53px;
      opacity: 0.5;
    }
    .scaleLong25-active {
      justify-content: center;
      width: 53px;
    }
    // 55珑珠刻度
    .scale55 {
      justify-content: center;
      width: 96px;
      opacity: 0.5;
    }
    .scale55-active {
      justify-content: center;
      width: 96px;
    }
    .scaleLong55 {
      justify-content: center;
      width: 87px;
      opacity: 0.5;
    }
    .scaleLong55-active {
      justify-content: center;
      width: 87px;
    }
    // 85珑珠刻度
    .scale85 {
      justify-content: center;
      width: 68px;
      opacity: 0.5;
    }
    .scale85-active {
      justify-content: center;
      width: 68px;
    }
    .scaleLong85 {
      justify-content: center;
      width: 68px;
      opacity: 0.5;
    }
    .scaleLong85-active {
      justify-content: center;
      width: 68px;
    }
    .scale85-active {
      justify-content: center;
      width: 90px;
      opacity: 0.5;
    }
    .scaleLong85 {
      justify-content: center;
      width: 88px;
      opacity: 0.5;
    }
    .scaleLong85-active {
      justify-content: center;
      width: 88px;
    }
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
      p {
        display: flex;
        justify-content: flex-end;
        font-weight: 400;
      }
    }
    .unit1 {
      position: absolute;
      top: 50px;
      text-align: center;
      margin-left: 27px;
    }
    .unit2 {
      position: absolute;
      bottom: 38px;
      margin-left: 27px;
      text-align: center;
    }
  }
  .history-help {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 16px 14.5px;
    .emptyTemplate {
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/pMkkAKCV1UcZixBhZ4WYBw.png") 0 0 no-repeat;
      background-size: contain;
      background-position: center;
      height: 47px;
      margin-top: 70px;
    }
    .emptyDescript {
      text-align: center;
      color: #fff;
      opacity: 0.7;
      margin-top: 12px;
    }
    .history-left {
      display: flex;
      align-items: center;
      width: 149px;
      height: 199px;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/PDO0sUdJUrDpMp3gzRXkrw.png")
          no-repeat,
        linear-gradient(270deg, #000c38 0%, #250476 0%, #012f5b 100%);
      background-size: cover;
      border-radius: 8px;
      border-radius: 8px;
      .history-left-ly {
        width: 149px;
        height: 170px;
        overflow-y: auto;
      }
      .complete-user {
        animation: myMove 5s linear infinite;
        animation-fill-mode: forwards;
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
        width: 102px;
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
        font-weight: 500;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        margin-top: 30px;
        span {
          text-shadow: 0 0 8px #fd08fe;
        }
      }
      .divided-cumulative {
        margin-top: 17.5px;
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
          line-height: 44px;
        }
      }
      .btnInvitation {
        margin-top: 2.5px;
        width: 158.5px;
        height: 33.5px;
        line-height: 37.5px;
        text-align: center;
        vertical-align: middle;
        background: url("https://goyoo-assets.longfor.com//prod/app/JTEYpVYQyxBFGYaFGSzRVQ.png") 0 0 no-repeat;
        background-size: 154px;
        font-weight: 500;
        color: #0E0748;
      }
      .btnOverTime {
        opacity: 0.6;
      }
      .activeOverDesc {
        color: #fff;
        margin-top: 5px;
        font-weight: 300;
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
      right: 138px;
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
        .emptyTemplate {
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/NMwpl-lA6uDhLSWYwZEfPw.png") 0 0 no-repeat;
          background-size: contain;
          background-position: center;
          height: 100px;
          margin-top: 84px;
        }
        .emptyDescript {
          width: 100%;
          text-align: center;
          color: #fff;
          opacity: 0.7;
          margin-top: 12px;
        }
      }
      .tab-topTen {
        .title {
          color: #ffffff;
          opacity: 0.7;
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

function helpStart(arg0: { an: any; city: string; t: any; }) {
  throw new Error("Function not implemented.");
}
