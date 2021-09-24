<template>
  <div class="activerules" v-if="activeRulesIsShow">
    <div class="fixed-bj" @click="activerulesClose"></div>
    <div class="rules-box">
      <h4>活动规则</h4>
      <i class="icon-close" @click="activerulesClose"></i>
      <div class="rules-cont-box">
        <div class="rules-cont">
          <div class="rules-text">
            <h5>活动有效期</h5>
            <p>2019年10月08日至2019年12月08日</p>
          </div>
          <div class="rules-text">
            <h5>活动门店范围</h5>
            <p>1、此次活动仅面向滴滴企业版客户，企业客户及企业员工需提供滴滴企业版活动页截图或活动特权图片，并主动展示给龙湖冠寓门店运营官或客户经理，证明客户来源渠道为滴滴企业版专属活动，才可参与本次活动。
            <br>2、此次活动仅面向龙湖冠寓新客户，企业客户或企业员工需在活动起始日前，从未与龙湖冠寓签订过任何住合同（包括个人合约、企业框架协议及企业直租合同）</p>
          </div>
          <div class="rules-text">
            <h5>企业客户活动详情</h5>
            <p>1、企业客户与龙湖冠寓成功签署企业框架协议后，企业员工凭企业在职证件即可享受个人与龙湖冠寓签约98折起。</p>
            <img src="../assets/table-img01.png" alt="">
            <p>2、企业客户与龙湖冠寓成功签约付款（包括企业框架协议或企业直租合同）并产生入住，企业客户可根据活动有效期内（60天）企业或其员工签约入住的房间总量，在企业客户的滴滴出行企业账户中获取相应的专车出行券。</p>
            <img src="../assets/table-img02.png" alt="">
            <p>3、企业所获得的专车出行券，在活动截止日后，经与龙湖冠寓确认后，企业客户需要向滴滴企业版提供书面告知函并加盖公章。专车出行券将于收到企业客户盖章确认告知函后的15个工作日内发放完毕。</p>
            <p>4、若发生以下情况，房间数量不能参与专车出行券核算：
              <br>{{`${'•'} 签署协议的企业客户（企业包括框架协议或企业直租合同），在活动截止日前有任何违约、退订、退租、未付款或终止合同等情况`}}
              <br>{{`${'•'} 签署框架协议的企业客户在活动截止日前未产生入住`}}
              <br>{{`${'•'}  其他违法违约行为`}}</p>
          </div>
          <div class="rules-text">
            <h5>企业员工活动详情</h5>
            <p>1、企业员工在龙湖冠寓门店看房，可参与到店抽奖活动。抽奖活动需提交企业员工在滴滴端的注册手机号，每人限一次抽奖机会，最高可获得50元专车出行券。
              <br>2、企业员工个人与龙湖冠寓成功签约付款（包括无企业框架协议下的个人签约和有企业框架协议下的个人签约）并产生入住，在验证为滴滴企业版专属活动用户后，经与龙湖冠寓确认后，企业员工个人可获得100元专车出行券（5张20元，有效期60天）。以入住人手机号为准，每人限一次。
              <br>3、专车出行券将在活动截止日后，企业员工个人客户和冠寓双方确认完毕之后的15个工作日内发放完毕。
              <br>4、如果在活动截止日前有任何违约、退订、退租、未付款或终止合同等情况，则无法参与“入住送100元专车出行券”活动</p>
          </div>
          <div class="rules-text">
            <h5>活动内容及活动说明由龙湖冠寓提供，
              <br>如有任何疑问请联系对应地区客户经理
              <br>{{`${initData.city} ${initData.name} - ${initData.phone}`}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ActiveRules',
  props: {
    activeRulesIsShow: {
      type: Boolean,
      default: () => (0),
    },
    initData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activerulesHide: true,
    };
  },
  methods: {
    activerulesClose() {
      this.$emit('activeRulesHide', false);
    },
  },
};
</script>

<style lang="less">
  .activerules {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    padding: 0 38px 0 38px;
    .fixed-bj {
        position: fixed;
        background: rgba(0,0,0,0.2);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 30;
    }
    .rules-box {
        position: relative;
        background: #fff;
        border-radius: 3px;
        z-index: 50;
        height: 77%;
        top: 50%;
        transform: translate(0, -50%);
        overflow: hidden;
        padding-bottom: 15px;
        box-sizing: border-box;
          .rules-cont-box {
            position: relative;
            height: 89%;
            overflow-y: scroll;
          }
        h4 {
            font-size: 18px;
            color: #333;
            text-align: center;
            line-height: 56px;
            border-bottom: 1px solid #bebebe;
        }
        .icon-close {
            position: absolute;
            right: 12px;
            top: 14px;
            width: 26px;
            height: 24px;
            background: url('../assets/icon-close.png') center center no-repeat;
            background-size: 13px 12px;
        }
        .rules-cont {
            padding: 0 15px 19px 15px;
        }
        .rules-text {
            padding-top: 20px;
            h5 {
                font-size: 14px;
                color: #333;
                line-height: 20px;
                font-weight: bold;
            }
            p {
                padding-top: 5px;
                font-size: 12px;
                color: #6C6C6C;
                line-height: 17px;
            }
            img {
                margin-top: 10px;
                width: 100%;
            }
        }
    }
}
</style>
