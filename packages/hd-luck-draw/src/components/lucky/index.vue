<template>
  <div class="container">
    <div class="tray-img"></div>
    <div class="lucky-wheel">
      <div class="wheel-main">
        <div class="wheel-pointer-box">
          <div
            class="wheel-pointer"
            @click="rotateHandle()"
            :style="{transform:rotateAnglePointer,transition:rotateTransitionPointer}"
          >
            <div class="draw-num">
              剩余抽奖次数
              <br />
              {{count}}次
            </div>
          </div>
        </div>
        <div :class="[wheelBg,urlbg]" :style="style">
          <img src="../../assets/img/luck/bg_1.png" alt class="bg-box" />
          <div class="prize_list">
            <div
              class="prize-item"
              v-for="(item,index) in prizeList"
              :key="index"
              :style="prizeItemStyle[index]"
            >
              <div class="prize-pic">
                <img :src="item.icon" />
              </div>
              <div class="prize-type">
                <p v-if="item.id === 3">龙湖冠寓<br>98折租房券</p>
                <p v-if="item.id === 7">屈臣氏<br>豪气大礼包</p>
                <p v-if="item.id !== 3 && item.id !== 7" style="margin-top: 7px">{{item.name}}</p>
              </div>
              <div class="prize-count" v-if="item.count">{{item.count}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./index.scss";
import { Toast } from "vant";
export default {
  name: "luckyWheel",
  props: {
    total: {
      //奖品总数
      type: Number,
      default: 8
    },
    change: {
      //抽奖次数
      type: Number,
      default: 1
    },
    newUrl: {
      type: String
    },
    prizeInfo: {
      type: Array,
      required: true
    }, //奖品列表
    wheelUrl: {
      type: Array
      //required: true,
    }, //背景图URL
    prizeIdFn: {
      //获取奖品ID
      type: Function
    },
    count: {
      //获取奖品ID
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      prizeList: this.prizeInfo,
      lotteryTicket: this.change, //抽奖总次数
      clickNum: this.change,
      urlbg: "",
      hasPrize: false, //是否中奖
      prizeNum: 0, //初始获奖号码
      startRotatingDegree: 0, //初始旋转角度
      rotateAngle: 0, //将要旋转的角度
      rotateAnglePointer: 0, //指针将要旋转的度数
      rotateTransition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotateTransitionPointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      clickFlag: true, //是否可以旋转抽奖
      index: 0,
      duringTime: 5,
      resultAngle: [],
      prizeItemStyle: {},
      wheelBg: "wheel-bg",
      urlbgStr: "",
    };
  },
  created() {
    this.cssStyle();
    if (this.prizeList.length != this.total) {
      if (this.prizeList.length > this.total) {
        alert("奖品数目超过规定数目");
        return;
      }
      if (this.prizeList.length < this.total) {
        alert("奖品数目少于规定数目");
        return;
      }
    }
  },

  computed: {
    toastTitle() {
      const newDes = this.prizeList[this.prizeNum].prizeDes;
      if (!newDes) {
        return this.hasPrize
          ? "恭喜您，获得" + this.prizeList[this.index].name
          : "对不起您未中奖";
      } else {
        return newDes;
      }
    },
    style() {
      const obj = {
        transform: this.rotateAngle,
        transition: this.rotateTransition
      };
      if (this.urlbgStr !== "") {
        obj.backgroundImage = this.urlbgStr;
      } else {
        if (obj.background) {
          delete obj.backgroundImage;
        }
      }
      return obj;
    }
  },
  mounted() {
    //   this.setPrizeText('测试<br>测试')
  },
  methods: {
    //此方法为处理奖品数据
    async rotateHandle() {
      if (this.clickFlag) {
        if (this.lotteryTicket <= 0) {
          return;
        }
        this.$emit("endPrize", true);
        const idValue = await this.prizeIdFn();
        if (!idValue) {
          Toast("已经没有抽奖次数了，邀请好友助力吧");
          return;
        }
        //let const findIndex
        if (typeof idValue != "undefined") {
          for (let i = 0; i < this.prizeInfo.length; i++) {
            if (this.prizeInfo[i].id == idValue) {
              this.prizeNum = i;
            }
          }
          this.rotating();
        } else {
          this.prizeNum = Math.floor(Math.random() * this.total);
          this.rotating();
        }
      }
    },
    rotating() {
      if (!this.clickFlag) return;
      const resultIndex = this.prizeNum; // 最终要旋转到哪一块，对应prizeList的下标
      this.index = resultIndex;
      const randCircle = 6; // 附加多转几圈，2-3
      this.clickFlag = false; // 旋转结束前，不允许再次触发
      // 转动盘子
      const rotateAngle =
        this.startRotatingDegree +
        randCircle * 360 +
        this.resultAngle[resultIndex] -
        (this.startRotatingDegree % 360);
      this.startRotatingDegree = rotateAngle;
      this.rotateAngle = "rotate(" + rotateAngle + "deg)";
    //   const _that = this;
      // 旋转结束后，允许再次触发
      setTimeout(() => {
        if (this.lotteryTicket > 0) {
          this.lotteryTicket -= 1;
          this.clickFlag = true;
          this.gameOver();
        }
        if (this.lotteryTicket == 0) {
          this.clickFlag = false;
          this.gameOver();
        }
      }, this.duringTime * 1000 + 1500); // 延时，保证转盘转完
    },

    gameOver() {
      this.$emit("gameOver");
      this.hasPrize = this.prizeList[this.index].isPrize;
    },
    //关闭弹窗
    closeToast() {
      if (this.clickNum > 1) {
        this.clickNum--;
      } else {
        window.location.href = this.newUrl;
      }
    },

    //动态生成样式
    cssStyle() {
      const n = this.total;
      for (let i = 0; i < n; i++) {
        const angleRe = 180 / n + (360 / n) * i;
        this.resultAngle.unshift(angleRe);
        this.prizeItemStyle[i] = {};
        this.prizeItemStyle[i].transform = "rotate(" + angleRe + "deg)";
      }
    }
  }
};
</script>
