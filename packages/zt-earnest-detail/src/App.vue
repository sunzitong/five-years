<template>
  <div id="app">
    <div class="success-page" v-if="showSuccess">
      <h2>退款账单详情</h2>
      <div class="billInfo">
        <h3 class="title">
          账单编号： {{billData.billId}}
        </h3>
        <div class="billInfoListWrap">
          <ul class="billInfoList">
            <li><span>所属公司：</span>{{billData.departmentName}}</li>
            <li><span>所属门店：</span>{{billData.projectName}}</li>
            <li><span>订单编号：</span>
              {{billData.formatType === 'BusinessTrip' ? billData.serialNo : billData.intentionNo}}
            </li>
            <li><span>房间号：</span>{{billData.itemNo}}</li>
            <li><span>总金额：</span>{{billData.totalAmount}}</li>
            <li><span>应收金额：</span>{{billData.totalAmount}}</li>
            <li><span>账单分类：</span>{{billData.billTypeDesc}}</li>
            <li><span>备注：</span>{{billData.note}}</li>
            <li><span>支付状态：</span>{{billData.billStatusDesc}}</li>
            <li><span>描述：</span>{{billData.note}}</li>
          </ul>
        </div>
      </div>
      <div class="billDetailList">
        <h3 class="title">账单明细</h3>
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>费用类型</th>
            <th>创建时间</th>
            <th>发生金额</th>
            <th>已优惠金额</th>
            <th>所属时段</th>
            <th>状态</th>
          </tr>
          <tr v-for="bill in billFundTypes" :key="bill.billDetailId">
            <td>{{bill.fundTypeDesc}}</td>
            <td>{{bill.createTime}}</td>
            <td>{{bill.amount}}</td>
            <td>{{bill.couponAmount}}</td>
            <td>{{bill.from}} ~ {{bill.to}}</td>
            <td>{{bill.statusDesc}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="error-page" v-show="!showSuccess">
        <div class="logo">
          <img src="./assets/404.png" alt="">
          <p style="display: block">{{statusData.msg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import './style/reset.css';
// import './mock/mock.js';

require.config({
  paths: {
    mock: './mock/mock',
  },
});
export default {
  name: 'App',
  data() {
    return {
      billData: '',
      billFundTypes: '',
      statusData: '',
      params: '',
      showSuccess: true,
    };
  },
  beforeMount() {
    this.id = this.$route.query.id;
    this.sign = this.$route.query.sign;
    this.timestamp = this.$route.query.timestamp;
    this.params = {
      sign: this.sign,
      timestamp: this.timestamp,
    };
    this.getData();
  },
  methods: {
    getData() {
      //  axios.get('./mock/mock',this.params).then( res => {
      axios.get(`/cost/getBillDetailByBillId/${this.id}?sign=${this.sign}&timestamp=${this.timestamp}`).then((res) => {
        //  console.log(res);
        if (res.data.status === 'ok') {
          this.billData = res.data.data;
          this.billFundTypes = res.data.data.billFundTypes;
          this.billData.createTime = moment(this.billData.createTime).format('YYYY-MM-DD HH:mm:ss');
          this.billFundTypes = this.billFundTypes.map((data) => {
            const type = { ...data };
            type.createTime = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss');
            type.from = moment(data.from).format('YYYY-MM-DD');
            type.to = moment(data.to).format('YYYY-MM-DD');
            return type;
          });
        } else {
          this.showSuccess = false;
          this.statusData = res.data;
          document.body.style.background = '#f3f3e1';
        }
      });
    },
  },
};
</script>

<style lang="less">
#app {
  .error-page{
    width: 100%;
    height: 100%;

    .logo{
      margin-top: 80px;
      text-align: center;
      p{
        color: rgb(228, 146, 162);
        font-size: 24px;
        margin-top: 1px;
        text-align: center;
        font-family: monospace;
        width: 660px;
        word-wrap: break-word;
        margin: 0 auto;
      }
    }
  }
  .success-page{
    box-shadow: 0px 0px 20px rgba(51, 51, 51, 0.1);
    max-width: 1080px;
    min-width: 600px;
    margin: 40px auto;
    padding-bottom: 50px;
  }
  h2{
    font-size: 24px;
    text-align: center;
    font-weight: normal;
    padding: 10px 0;
    color: #fff;
    background: #1890ff;
  }
  h3.title{
    font-size: 20px;
    padding: 30px 0 16px 0;
    color: #333;
    font-weight: bold;
  }
  .billInfo{
    padding: 0 20px;
  }
  .billInfoList{
    width: 100%;
    margin-left: -20px;
    overflow: hidden;
    li{
      font-size: 14px;
      color: #333;
      line-height: 20px;
      padding-top: 8px;
      float: left;
      width: 50%;
      box-sizing: border-box;
      padding-left: 20px;
      span{
        color: #000;
      }
    }
  }
  .billDetailList{
    padding: 0 20px;
    table{
      width: 100%;
      text-align: center;
      tr {
        border-bottom: 1px solid #e8e8e8;
        padding: 0 10px;
        th{
          background-color: #fafafa;
        }
        th,td{
          padding: 16px 10px;
        }
      }
    }
  }
}
</style>
