<template>
  <div id="app">
    <div class="success-page" v-if="showSuccess">
      <h2 id="topBar">
        <span v-if="billFundTypes && billFundTypes.length">
          【{{billFundTypes[0].expenseTypeDesc}}】
        </span>
        <span>
          【{{billData.expenseTheme}}_{{billData.expenseNo}}】
        </span>
        <!-- <span class="close" @click="closeTopBar">关闭</span> -->
      </h2>
      <div class="billInfo">
        <div class="billInfoListWrap">
          <ul class="billInfoList">
            <li class="weight"><span>报销单号：</span>{{billData.expenseNo}}</li>
            <li class="weight"><span>报销主题：</span>{{billData.expenseTheme}}</li>
            <li><span>申请人：</span>{{billData.applyUser}}</li>
            <li><span>提报公司：</span>{{billData.reportCompanyDesc}}</li>
            <li><span>申请部门：</span>{{billData.applyDepartDesc}}</li>
            <li><span>项目归属：</span>{{billData.projectName}}</li>
            <li><span>付款单位：</span>{{billData.payDepartmentName}}</li>
            <li><span>合同编号：</span>{{billData.contractNo}}</li>
            <li><span>来源系统：</span>{{billData.sourceDesc}}</li>
            <li>
              <span>申请日期：</span>
              {{billData.applyTimeToLong}}
            </li>
            <li><span>共享审批模式：</span>{{billData.approvalModelDesc}}</li>
            <li><span>单据审批状态：</span>{{billData.expenseApprovalStatusDesc}}</li>
            <li><span>共享审批状态：</span>{{billData.shareApprovalStatusDesc}}</li>
            <!-- <li><span>附言内容：</span>{{billData.remark}}</li> -->
          </ul>
          <div class="billStatusBox">
            <div class="billStatusTitle">报销支付状态</div>
            <div class="billStatusDesc">{{billData.payStatusDesc || ''}}</div>
          </div>
          <div class="billStatusBox">
            <div class="billStatusTitle">报销金额(元)</div>
            <div class="billStatusDesc">
              {{billData.expenseAmount ? billData.expenseAmount.toFixed(2) : 0}}
            </div>
          </div>
        </div>
      </div>
      <h3 class="title">支付流水</h3>
      <div class="billDetailList" style="min-width: 600px;overflow-x:scroll;">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th v-for="title in columns" :key="title.field">{{title.title}}</th>
          </tr>
          <tr v-for="bill in billFundTypes" :key="bill.payNo">
            <td v-for="item in columns" :key="item.field">
              {{renderColumns(bill, item.field)}}
            </td>
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
import './mock/mock.js';

require.config({
  paths: {
    mock: './mock/mock',
  },
});
export default {
  name: 'App',
  data() {
    return {
      billData: {},
      billFundTypes: [],
      statusData: '',
      params: '',
      showSuccess: true,
      columns: [
        { field: 'payNo', title: '支付单号', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'expenseTypeDesc', title: '报销类型', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'payPlaceDesc', title: '支付渠道', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'createTime', title: '创建时间', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'payWayDesc', title: '付款方式', width: 100, titleAlign: 'center', columnAlign: 'center' },
        { field: 'outId', title: '单据Url地址', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'voucherUrl', title: '预制凭证Url', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'currencyDesc', title: '币种', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'payee', title: '收款单位', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'province', title: '开户省', width: 100, titleAlign: 'center', columnAlign: 'center' },
        { field: 'city', title: '开户市', width: 100, titleAlign: 'center', columnAlign: 'center' },
        { field: 'bank', title: '开户银行', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'branchBank', title: '开户支行全称', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'bankAccount', title: '银行账号', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'payableAmount', title: '应付金额', width: 100, titleAlign: 'center', columnAlign: 'center' },
        { field: 'payStatusDesc', title: '支付状态', width: 200, titleAlign: 'center', columnAlign: 'center' },
        { field: 'payFailReason', title: '支付信息', titleAlign: 'center', columnAlign: 'center' },
      ],
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
      // axios.get('./mock/mock', this.params).then((res) => {
      axios.get(`/cost/getReimburseDetail/${this.id}?sign=${this.sign}&timestamp=${this.timestamp}`).then((res) => {
        if (res.data.status === 'ok') {
          this.billData = res.data.data;
          this.billData.applyTimeToLong = moment(this.billData.applyTimeToLong).format('YYYY-MM-DD HH:mm:ss');
          this.billFundTypes = res.data.data.payOrders;
          this.billData.createTime = moment(this.billData.createTime).format('YYYY-MM-DD HH:mm:ss');
          this.billFundTypes = this.billFundTypes.map((data) => {
            const type = { ...data };
            type.createTime = moment(type.createTime).format('YYYY-MM-DD HH:mm:ss');
            type.payableAmount = type.payableAmount ? type.payableAmount.toFixed(2) : 0;
            return type;
          });
        } else {
          this.showSuccess = false;
          this.statusData = res.data;
          document.body.style.background = '#f3f3e1';
        }
      });
    },
    closeTopBar() {
      const topBar = document.querySelector('#topBar');
      topBar.style.display = 'none';
    },
    // 根据key渲染账单列表项
    renderColumns(record, key) {
      const { version } = record;
      switch (key) {
        // 单据Url地址 1.0 渲染之前逻辑、2.0渲染退款申请单单号
        case 'outId':
          if (version === '2.0') {
            return record.refundApplyNo;
          }
          break;
        // 预制凭证Url 1.0 渲染之前逻辑、2.0渲染账单id
        case 'voucherUrl':
          if (version === '2.0') {
            return record.billId;
          }
          break;
        default:
      }

      return record[key];
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
    .close {
      font-size: 20px;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      background-color: red;
      padding: 0 10px;
      border-radius: 5px;
    }
  }
  #topBar {
    display: flex;
    justify-content: space-around;
  }
  h3.title{
    font-size: 20px;
    padding: 30px 0 16px 0;
    color: #333;
    font-weight: bold;
    margin-left: 20px;
  }
  .billInfo{
    padding: 30px 20px;
  }
  .billInfoListWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .billStatusBox {
      flex: 1;
      .billStatusTitle {
        font-size: 23px;
        color: rgba(0, 0, 0, 0.3);
      }
      .billStatusDesc {
        font-size: 23px;
        margin-top: 20px;
      }
    }
  }
  .billInfoList{
    // width: 100%;
    margin-left: -20px;
    overflow: hidden;
    flex: 4;
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
    li.weight {
      font-weight: 700;
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
          min-width: 200px;
        }
      }
    }
  }
}
</style>
