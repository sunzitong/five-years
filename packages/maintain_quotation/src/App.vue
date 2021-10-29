<template>
  <div id="app">
    <div class="area-repair-form">{{areaName ? `${areaName}维修报价表` : ''}}</div>
    <div class="form-box">
      <div class="form-top">
        <div class="form-top-each">服务类型</div>
        <div class="store-two-box">
          <div class="form-top-each">服务名称</div>
          <div class="form-top-each">价格(元)</div>
        </div>
      </div>
      <div v-for="(item, index) in repaiAry" v-bind:key="index" class="each-repair">
        <div class="repair-left">
          <div class="repair-left-name">{{item.name}}</div>
        </div>
        <div class="repair-right">
          <div v-for="(items, index) in item.second" v-bind:key="index" class="each-repair-content">
            <div class="repair-common-each">{{items.name}}</div>
            <div class="repair-common-each each-price">{{items.price}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFormList } from './utils/server.js';

export default {
  name: 'Goyoo',
  data() {
    return {
      areaName: '',
      repaiAry: [],
    };
  },
  created() {
    this.getInitailState();
  },
  methods: {
    getInitailState() {
      const numberId = this.getQueryString('projectId');
      getFormList(numberId).then((res) => {
        const { data } = res;
        const { data: repaiAry = {} } = data;
        const { first, projectName } = repaiAry || {};
        if (Array.isArray(first)) {
          this.repaiAry = first;
          this.areaName = projectName;
        } else {
          console.log(res.msg);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    },
    getQueryString(name) {
      const getUrl = window.location.href.split('?')[1];
      const urlAry = getUrl.split('&');
      for (let i = 0; i < urlAry.length; i += 1) {
        if (urlAry[i].includes(name)) {
          return urlAry[i].split('=')[1];
        }
      }
    },
  },
};
</script>


<style lang="less">
body, html{margin: 0px;padding: 0px;}
#app{
  padding: 0px 10px;
  .area-repair-form{
    height: 57px;
    line-height: 57px;
    color: #FFFFFF;
    font-size: 12PX;
    color: #666666;
    text-align: center;
    font-family: 'PingFangSC-Regular,PingFang SC';
    font-weight: 400;
  }
  .form-box{
    width: 100%;
    background: #F2ECE8;
    color: #666666;
    font-size: 15px;
    border-radius: 8px;
    .form-top{
      display: flex;
      height: 50px;
      line-height: 50px;
      .form-top-each{
        text-align: center;
        border: 1px solid #FFFFFF;
        flex: 1;
        color: #666666;
        font-weight: 400;
      }
      .store-two-box{
        flex: 2;
        display: flex;
        .form-top-each{
          text-align: center;
          border: 1px solid #FFFFFF;
          flex: 1;
          color: #666666;
          font-weight: 400;
        }
      }
    }
    .each-repair{
      font-size: 15px;
      color: #666666;
      font-family: 'PingFangSC-Regular,PingFang SC';
      font-weight: 400;
      text-align: center;
      display: flex;
      .repair-left{
        flex: 1;
        border: 1px solid #FFFFFF;
        position: relative;
        .repair-left-name{
          width: 80%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .repair-right{
        flex: 2;
        background: #F9F6F4;
        .each-repair-content{
          display: flex;
          flex-direction: row;
          .repair-common-each{
            height: 50px;
            line-height: 50px;
            flex: 1;
            border: 1px solid #FFFFFF;
          }
          .each-price{
            font-size: 18px;
            color: #F18D00;
            font-weight: 500;
            letter-spacing: 0.3px;
          }
        }
      }
    }
  }
}

</style>
