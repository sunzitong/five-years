<template>
  <div class="home">
    <!-- <div class="header-box">
      <em class="back-btn"></em>
      <h1>退房规则说明</h1>
    </div> -->
    <div
      class="main-content">
      <p
        v-if="contractVersion === 'V1'">
        正常退房：距离服务期限届满日不足1个月退房，退还合同押金。
        <br/>
        <br/>
        提前退房：距离服务期限届满日超过1个月退房，扣除一个月押金作为违约金，退还剩余费用。
      </p>
      <p
        v-if="contractVersion === 'V2'">
        正常退房：距离服务期限届满日不足1个月退房，退还合同押金。
        <br/>
        <br/>
        提前退房：距离服务期限届满日超过1个月退房。
        <br/>
        1、需至少提前15日在冠寓APP发起退房申请，
        支付金额相当于一个月<span>{{funTypeText_1}}</span>的违约金。
        用户申请的退房日期不得晚于发起退房申请之日起第45日。
        <br/>
        2、用户在申请的退房日期之前搬离租住房间的，按实际搬离之日为本协议解除之日，
        除支付金额相当于一个月<span>{{funTypeText_1}}</span>的违约金外，
        应付<span>{{funTypeText_1}}</span>将自动计收至申请的退房日期。
        <br/>
        3、在申请的退房日期仍未搬离租住房间的，提交的退房申请自动失效，<span>{{funTypeText_1}}</span>正常计收，如需退房应重新发起退房申请。
        <br/>
        4、未发起退房申请直接退房，自实际退房日起加收15日<span>{{funTypeText_2}}</span>。
        <br/>
        5、退房时生成退房账单，用户须及时确认；三天内仍未确认的，视为用户无异议，系统将直接按账单金额进行结算。
        </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      contractVersion: '',
      funType: '',
    };
  },
  mounted() {
    this.contractType();
  },
  methods: {
    // 根据url里contractVersion参数判断新旧合同
    contractType() {
      switch (this.$route.query.contractVersion) {
        case 'V1': // 旧合同
          this.contractVersion = 'V1';
          break;
        case 'V2': // 新合同
          this.contractVersion = 'V2';
          break;
        default: // 默认为新合同
          this.contractVersion = 'V2';
      }
      switch (this.$route.query.funType) {
        case 'Rent':
          this.funTypeText_1 = '租金服务费';
          this.funTypeText_2 = '服务费';
          break;
        case 'RentalFee':
          this.funTypeText_1 = '租金';
          this.funTypeText_2 = '租金';
          break;
        default: // 默认为新合同
          this.funTypeText_1 = '租金';
          this.funTypeText_2 = '租金';
      }
    },
  },
};
</script>
<style lang="scss">
@import '../style/reset.css';
.home {
  .header-box {
    position: relative;
    border-bottom: 1px solid #efefef;
    .back-btn {
      width: 54px;
      height: 44px;
      background: url('../assets/titlebar_back.png') center center no-repeat;
      background-size: 27px 27px;
      position: absolute;
      left: 1px;
      top: 50%;
      transform: translate(0, -50%);
    }
    h1 {
      font-size: 18px;
      color: #2D2D30;
      text-align: center;
      line-height: 44px;
      font-family: PingFangSC-Regular,PingFang SC;
    }
  }
  .main-content {
    padding: 20px;
    p {
      font-size:15px;
      font-family: PingFangSC-Regular,PingFang SC;
      line-height: 25px;
      color: #666666;
    }
  }
}
</style>
