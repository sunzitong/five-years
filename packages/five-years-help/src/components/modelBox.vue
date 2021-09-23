<template>
  <div class="popMainLayOut">
    <div class="popMain" v-if="popType === 1">
      <div class="popRuleLayOut">
        <div class="popRule">
          <div class="title">活动规则</div>
          <p>
            1.
            活动面向冠寓在租用户开放，所有在租用户参与活动时需保持珑珠账号登录状态。
          </p>
          <p>
            2.
            在租用户可通过助力活动页面发起邀请好友助力。好友点击活动链接，通过页面成功授权并新注册珑珠账号后，点击“助力”即可为好友完成助力。发起该助力活动的用户获得1个好友助力值。
          </p>
          <p>
            3. 活动截止时，好友助力值不足下一等级，则珑珠积分按当前所处等级计算。
          </p>
          <div class="notice">注意事项：</div>
          <p>1. 活动期间注册冠寓的用户可助力1次</p>
          <p>
            2.
            此次活动获得的珑珠积分将在活动结束后5个工作日内发放至用户的珑珠账户。活动所得珑珠可进入冠寓APP-我的【珑珠生活】进行使用。
          </p>
          <p>
            3.
            活动期间，如发现有用户通过不正当手段（包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、恶意套现、刷信誉、批量注册、用机器注册账户、用机器模拟客户端）参加活动而有碍其他用户公平参加本次活动或有违反活动目的之行为，活动举办方有权取消该用户获奖资格或取消、追回该用户通过参加活动所获珑珠及权益。如该作弊行为给活动举办方造成损失的，活动举办方保留向该用户追究赔偿的权利
          </p>
          <p>4. 如对活动规则有任何问题，可拨打电话：400-001-1166。</p>
        </div>
      </div>
    </div>
    <div v-else-if="popType === 2">
      <div class="tipsImage"></div>
    </div>
    <div class="popMain" v-else>
      <img class="conectImage" :src="backgroundUrl" />
      <div class="descript">{{ descript }}</div>
      <div
        class="btnConfirm"
        v-if="buttonContext !== ''"
        @click="handleConfirm"
      >
        {{ buttonContext }}
      </div>
    </div>
    <div v-if="popType !== 2" class="close" @click="handleClose"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component
export default class MixinMask extends Vue {
  @Prop({ default: "发送至微信好友或群聊" }) descript!: string;
  @Prop({ default: "" }) buttonContext!: string;
  @Prop({ default: 2 }) popType!: number;
  @Prop({
    default:
      "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/leM0J9cHa0nFYMKh8U2DLQ.png",
  })
  backgroundUrl!: string;
  created() {
    // console.log(this.isShow,'this.isShow123');
  }
  @Emit("confirm") private handleConfirm() {
    console.log("confirm");
  }
  @Emit("closed") private handleClose() {
    console.log("closed");
  }
}
</script>
/* less也支持 */
<style lang="scss" scoped>
.van-overlay {
  z-index: 99999;
}
.popMainLayOut {
  position: relative;
  height: 100%;
}
.popMain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/w4pZhQSB-KIriqB2NLPtag.png") 0 0 no-repeat;
  background-size: contain;
  background-position: center;
  height: 335px;
  margin-top: 30%;
  color: #fff;
}
.tipsImage {
  background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Ci2Pz6NOvtZpfQ9KiacGwQ.png) 0 0 no-repeat;
  background-size: contain;
  background-position: right;
  margin-right: 53px;
  margin-top: 20px;
  height: 107px;
}
.popRuleLayOut {
  width: 278px;
  height: 280px;
}
.popRule {
  display: flex;
  flex-direction: column;
  height: 280px;
  overflow-y: auto;
  padding: 0 4px;
  letter-spacing: 1px;
  .title {
    text-align: center;
    margin: 10px 0;
    font-size: 15px;
    font-weight: 500;
  }
  .notice {
    font-size: 15px;
    font-size: 15px;
    margin: 12px 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    margin-top: 3px;
    line-height: 22px;
    text-align: justify;
  }
}
.conectImage {
  width: 208px;
  height: 171px;
}
.close {
  // position: absolute;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/xr6Ep_zxVUCyFf_z1gr76g.png") 0 0 no-repeat;
  background-size: contain;
  background-position: center;
  height: 35px;
  margin-top: 20px;
  // width: 35px;
  // position: fixed;
  // left: 44%;
  // bottom: 90px;
}
.descript {
  font-size: 15px;
}
.btnConfirm {
  background: url(https://goyoo-assets.longfor.com//prod/app/JTEYpVYQyxBFGYaFGSzRVQ.png)
    0 0 no-repeat;
  background-size: contain;
  background-position: center;
  width: 158.5px;
  height: 33.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0E0748;
  margin-top: 25px;
  font-size: 14px;
  font-weight: 500;
}
</style>
