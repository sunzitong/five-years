<template>
  <div class="invit-popup">
    <div class="rules-popup">
      <div class="fixed-bj" @click="closeInvitPopup"></div>
      <div class="rules-cont">
        <h3 class="active-rules">邀请记录</h3>
        <div class="invitation-box">
          <table border="0" cellspacing="0" cellpadding="0" class="invitation-list">
            <tbody>
              <tr>
                <th>好友信息</th>
                <th>签约状态</th>
                <th>入住日期</th>
              </tr>
            </tbody>
          </table>
          <table border="0" cellspacing="0" cellpadding="0" class="invitation-list">
            <tbody>
              <tr v-for="(item,index) in invitationList" :key="index">
                <td>{{item.phone}}</td>
                <td v-if="item.checkInTime !== '--'">是</td>
                <td v-else>否</td>
                <td>{{item.checkInTime}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <i class="close-btn" @click="closeInvitPopup"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import { setTimeout } from 'timers';
export default {
  name: "InvitPopup",
  props: {
    invitationIsShow: {
      type: Boolean,
      default: true,
    },
    invitationList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    // 关闭邀请记录弹窗
    closeInvitPopup() {
      this.$emit("closeInvitPopup", false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scope>
.rules-popup {
  position: fixed;
  z-index: 200;
  margin: 0 40px;
  left: 0;
  right: 0;
  top: 15%;
  bottom: 0;
  .fixed-bj {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #000;
    opacity: 0.6;
    z-index: 300;
  }
  .rules-cont {
    position: relative;
    z-index: 300;
    background: #ffffff;
    border-radius: 8px;
    padding: 0 20px 20px;
    height: 390px;
    i {
      position: absolute;
      left: 50%;
      bottom: -70px;
      transform: translate(-50%, 0);
      width: 40px;
      height: 40px;
      background: url("../assets/close-btn.png") 0 0 no-repeat;
      background-size: 40px 40px;
    }
    .active-rules {
      font-size: 17px;
      color: #333;
      font-weight: bold;
      line-height: 23px;
      padding: 17px 0 16px 0;
      text-align: center;
    }
    .active-rules::after {
      content: "";
      width: 31px;
      height: 1px;
      position: absolute;
      top: 29px;
      left: 75px;
      background: #333;
    }
    .active-rules::before {
      content: "";
      width: 31px;
      height: 1px;
      position: absolute;
      top: 29px;
      right: 75px;
      background: #333;
    }
    .active-title {
      color: #000000;
      font-size: 16px;
      font-weight: bold;
    }
    .active-time {
      font-size: 15px;
      color: #333333;
      font-weight: 500;
      margin-bottom: 20px;
      display: inline-block;
    }
    h3 {
      font-size: 18px;
      color: #333333;
      font-weight: 500;
      line-height: 25px;
      padding: 20px 0 15px 0;
      text-align: center;
    }
    p {
      font-size: 15px;
      color: #666666;
      line-height: 21px;
      height: 300px;
      font-weight: 400;
      overflow-y: scroll;
      overflow: auto;
    }
  }
  .invitation-box {
    height: 273px;
    overflow-y: scroll;
  }
  .invitation-list {
    width: 100%;
    tr {
      th,
      td {
        text-align: center;
        width: 33.333%;
        &:first-child{
            text-align: left;
        }
        &:last-child{
            text-align: right;
        }
      }
      th {
        font-size: 12px;
        color: #666;
        font-weight: 400;
        font-family: PingFangSC-Regular;
        padding-bottom: 15px;
        
      }
      td {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: #333;
        font-weight: 400;
        line-height: 40px;
      }
    }
    &:first-child {
      position: sticky;
      top: 0;
      tr {
        background: #fff;
      }
    }
  }
}
</style>


