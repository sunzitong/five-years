<template>
    <div id="record">
      <div class="no" :style="{display:data.length===0 ? 'block' :'none'}">
        <img src="../assets/img/recordHeadBackground.png" class="img">
        <div class="content-no">
          <img src="../assets/img/no.png" class="img_prompt">
          <p>主人您还没有获得任何奖品</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="yes" :style="{display:data.length===0 ? 'none' :'block'}">
        <img src="../assets/img/recordHeadBackground.png" class="img">
        <div class="prize">
          <div class="content-yes" v-for="(item,index) in data" :key="index">
            <div v-if="item.itemType===1">
              <div class="content-left">
                <img :src="item.image==undefined ? '../assets/img/null.png' : item.image " alt="">
              </div>
              <div class="content-right" >
                <p class="title line"><b>{{item.prizeName}}</b></p>
                <p class="information">卡号：{{item.coupon}}</p>
                <p class="information">卡密：{{item.redeemCode}}</p>
              </div>
              <div style="clear:both"></div>
            </div>
            <div v-else-if="item.itemType===2">
              <div class="content-left">
                <img :src="item.image==undefined ? '../assets/img/null.png' : item.image " alt="">
              </div>
              <div class="content-right" >
                <p class="title line"><b>{{item.prizeName}}</b></p>
                <p class="information">邮寄地址：</p>
                <input type="text" v-model="item.receiver" placeholder="请输入填写收件人">
                <input type="text" v-model="item.receiverMobile" placeholder="请输入填写手机号">
                <input type="text" v-model="item.receiverAddress" style="border-bottom: 1px solid #333333;border-bottom-style: dotted;" placeholder="请输入填写收件地址"/>
                <input class="btn" type="button"
                  :value="!item.receiver && !item.receiverMobile && !item.receiverAddress ? '提交' : '修改'"
                  @click="submit(index)"
                />
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="btn_img" v-if="isShowMore" @click="onScrollBottom()"><img src="../assets/img/btn.png" alt=""></div>
      </div>
      <div class="prompt">
        <p class="marginBottom1">温馨提示</p>
        <p class="marginBottom2">虚拟卡密使用方式详见商品说明</p>
        <p class="marginBottom2">实物礼品请务必填写收件地址，实物奖品将在活动结束后7个工作日内派送。</p>
      </div>
      <loading v-model="showLoading" :text="loadText"></loading>
      <alert v-model="alert" title="" :content="alertTitle"></alert>
    </div>
</template>

<script>
/* eslint-disable*/
import api from '../api/index'
import { Scroller, LoadMore, Loading, Alert } from 'vux'
import { setTimeout, setInterval } from 'timers';
export default {
   components: {
    Scroller,
    LoadMore,
    Loading,
    Alert,
  },
  data () {
    return {
      params: {
        pageNo: 0,
        pageSize: 5,
      },
      data:[],
      showLoading: false,
      loadText: '加载中...',
      alert:false,
      alertTitle:"我们也有底线的～",
      isShowMore: true,
    }
  },
  created() {
    this.onScrollBottom ()
  },
  methods:{
    onScrollBottom () {
      this.showLoading=true;
      this.params.pageNo ++;
      window.zhuge.track('预约看房换积分推广页')
      api.postPaging(this.params).then(res => {
        this.showLoading=false;
        if(res.result.data.length>0){
          this.alert=false;
          res.result.data.forEach(v=>{  
            this.data.push(v)
          });
          if(res.result.data.length < this.params.pageSize){
            this.isShowMore = false;
          }
        } else {
          if (this.params.pageNo > 1) {
            this.alert=true;
            this.prompt("我们也有底线的～");
          }
        }
      })
    },
    submit (i){
      console.log(this.data[i].receiverAddress)
      if(!this.data[i].receiverAddress){
        this.prompt("请填写地址～");
      } else if(!this.data[i].receiverMobile){
        this.prompt("请填写手机号～");
      } else if(!this.data[i].receiver){
        this.prompt("请填写名字～");
      } else {
        let arry = {
          address: this.data[i].receiverAddress,
          mobile: this.data[i].receiverMobile,
          receiver: this.data[i].receiver,
          recordId:this.data[i].id,
        }
        api.postReceiveInfo(arry).then(res => {
          if(!res.success){
            this.prompt(res.error);
            return;
          }
          this.prompt("成功～");
        })
      }
    },
    prompt (txt){ // alert提示
      this.alertTitle=txt;
      this.alert=true;
    }
  },
}
</script>

<style lang="less">
body{
  width: 100%;
  background: rgb(171,229,206) url("../assets/img/q_01.png"); 
  background-repeat:repeat-y; 
  background-size: 100%;
}
#record{
  .no{
    display: none;
  }
  .img{
    float: left;
  }
  .content-no{
    margin:-73px 33px 0 33px;
    border: 3px solid #341112;
    border-radius: 15px;
    background-color:#fff;
    float: left;
    width: 83%;
    .img_prompt{
      width: 168px;
      margin: 0 auto;
      display: block;
      margin-top: 30px;
    }
    p{
      text-align: center;
      margin:23px 0 27px 0;
    }
  }
  .content-yes{
    margin: 0px 0px 15px 0px;
    border: 2px solid #341112;
    border-radius: 15px;
    background-color: #fff;
    padding: 16px 16px;
    .content-left{
      float: left;
      img{
        width: 80px;
      }
    }
    .content-right{
        margin-left: 90px;
        color: #333333;
        word-wrap: break-word;
      .title {
        margin-bottom: 5px;
        font-size: 13px;
      }
      .information {
        font-size: 10px;
        padding-bottom: 5px;
      }
      .information:last-child{
        margin-bottom: 0px;
        padding-bottom: 5px;
      }
      input[type=text] {
        height: 15px;
        font-size: 12px;
        border: 0px;
        width: 100%;
        float: left;
        padding-bottom: 5px;
      }
    }
  }
  .prompt{
    margin: 33px 43px 0px 43px;
  }
  .marginBottom1 {
    margin-bottom: 20px;
  }
  .marginBottom2 {
    margin-bottom: 15px;
  }
  .yes{
    .prize{
        width: 83%;
        margin-top: -73px;
        float: left;
        margin-left: 9%;
    }
  }
  .line{
    border-bottom: 1px solid #333333;
    border-bottom-style:dotted;
  }
  .btn{
    width: 85px;
    height: 30px;
    outline: none;
    background: #ffdf34;
    border: 0;
    color: #3d3d3d;
    font-size: 15px;
    float: right;
    border-radius: 5px;
    margin-top: 10px;
  }
}

</style>