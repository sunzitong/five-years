<template>
  <div class="page__activityFour">
    <main class="main">
      <div class="contacts">
        <div class="selectList" @click="alerList()">
          <div class="city">请选择你所在的城市</div>
          <div class="city-slect">
            <div class="cityName">{{ city }}</div>
            <div class="arrow"></div>
          </div>
        </div>
        <div class="contactList">
          <div class="contactItem">
            <p>{{ cityContact.contactName }}:{{ cityContact.contactTel }}</p>
            <a :href="'tel:' + cityContact.contactTel" class="phone">
              拨打电话
            </a>
          </div>
          <!-- <div class="contactItem">
            <p>王经理:18932092891</p>
            <a href="tel:15935121250" class="phone">拨打电话</a>
          </div> -->
        </div>
      </div>
      <div class="rules">
        <div class="rules-title">活动规则</div>
        <h3 class="rules-time">活动有效期</h3>
        <p class="mt12">即日起 至 2020年12月31日</p>
        <h3 class="mt24">参与方式</h3>
        <p class="mt6">
          在上方选择所在城市，您可获取城市大客户经理联系方式，致电即可享受专属咨询服务与企业优惠福利。
        </p>
        <h3 class="mt24">活动规则</h3>
        <p class="mt6">
          同一企业在职员工，在同一门店缴纳定金达到指定间
          数即可享受企业团购优惠，团购成功需在规定时段内入住。
        </p>
        <h3 class="mt24">优惠阶梯</h3>
        <p class="mt6 stronger">
          1.一次性团购大于等于5间小于10间：96折(可累加门店现有租期折扣)；
        </p>
        <p class="mt6 stronger">
          2.一次性团购大于等于10间：95折(可累加门店现有租期折扣)；
        </p>
        <p class="mt6">
          3.团购成功后需在7天内办理物业交割并入住(满足当前阶梯最低人数即可)；
        </p>
        <p class="mt6">
          4.具体政策、操作方式以及相关后续操作流程详询地区大客户经理或相关对接人员。
        </p>
      </div>
    </main>
    <van-popup v-model="isShow" position="bottom" :style="{ height: '50%' }">
      <van-picker
        v-show="isShow"
        title="城市列表"
        show-toolbar
        :columns="cityList"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="0"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";

@Component
export default class Index extends Base {
  @Inject() visitSource!: string;

  // 城市列表信息
  cityListInfo = [
    {
      cityName: "北京",
      cityContacts: {
        contactName: "北京城市大客户经理",
        contactTel: 18600562756,
      },
    },
    {
      cityName: "郑州",
      cityContacts: {
        contactName: "郑州城市大客户经理",
        contactTel: 18694048303,
      },
    },
    {
      cityName: "武汉",
      cityContacts: {
        contactName: "武汉城市大客户经理",
        contactTel: 18694048303,
      },
    },
    {
      cityName: "长沙",
      cityContacts: {
        contactName: "长沙城市大客户经理",
        contactTel: 17673167671,
      },
    },
    {
      cityName: "南昌",
      cityContacts: {
        contactName: "南昌城市大客户经理",
        contactTel: 17673167671,
      },
    },
    {
      cityName: "杭州",
      cityContacts: {
        contactName: "杭州城市大客户经理",
        contactTel: 13758280423,
      },
    },
    {
      cityName: "宁波",
      cityContacts: {
        contactName: "宁波城市大客户经理",
        contactTel: 13758280423,
      },
    },
    {
      cityName: "绍兴",
      cityContacts: {
        contactName: "绍兴城市大客户经理",
        contactTel: 13758280423,
      },
    },
    {
      cityName: "嘉兴",
      cityContacts: {
        contactName: "嘉兴城市大客户经理",
        contactTel: 13758280423,
      },
    },
    {
      cityName: "合肥",
      cityContacts: {
        contactName: "合肥城市大客户经理",
        contactTel: 13851457954,
      },
    },
    {
      cityName: "南京",
      cityContacts: {
        contactName: "南京城市大客户经理",
        contactTel: 13851457954,
      },
    },
    {
      cityName: "无锡",
      cityContacts: {
        contactName: "无锡城市大客户经理",
        contactTel: 13851457954,
      },
    },
    {
      cityName: "西安",
      cityContacts: {
        contactName: "西安城市大客户经理",
        contactTel: 18092740284,
      },
    },
    {
      cityName: "成都",
      cityContacts: {
        contactName: "成都城市大客户经理",
        contactTel: 15828061720,
      },
    },
    {
      cityName: "上海",
      cityContacts: {
        contactName: "上海城市大客户经理",
        contactTel: 13564094158,
      },
    },
    {
      cityName: "苏州",
      cityContacts: {
        contactName: "苏州城市大客户经理",
        contactTel: 13564094158,
      },
    },
    {
      cityName: "天津",
      cityContacts: {
        contactName: "天津城市大客户经理",
        contactTel: 18515966477,
      },
    },
    {
      cityName: "大连",
      cityContacts: {
        contactName: "大连城市大客户经理",
        contactTel: 18515966477,
      },
    },
    {
      cityName: "沈阳",
      cityContacts: {
        contactName: "沈阳城市大客户经理",
        contactTel: 18515966477,
      },
    },
    {
      cityName: "重庆",
      cityContacts: {
        contactName: "重庆城市大客户经理",
        contactTel: 13594294305,
      },
    },
    {
      cityName: "昆明",
      cityContacts: {
        contactName: "昆明城市大客户经理",
        contactTel: 13594294305,
      },
    },
    {
      cityName: "福州",
      cityContacts: {
        contactName: "福州城市大客户经理",
        contactTel: 15980840006,
      },
    },
    {
      cityName: "厦门",
      cityContacts: {
        contactName: "厦门城市大客户经理",
        contactTel: 15980840006,
      },
    },
    {
      cityName: "泉州",
      cityContacts: {
        contactName: "泉州城市大客户经理",
        contactTel: 15980840006,
      },
    },
    {
      cityName: "深圳",
      cityContacts: {
        contactName: "深圳城市大客户经理",
        contactTel: 18825188164,
      },
    },
    {
      cityName: "东莞",
      cityContacts: {
        contactName: "东莞城市大客户经理",
        contactTel: 18825188164,
      },
    },
    {
      cityName: "保定",
      cityContacts: {
        contactName: "保定城市大客户经理",
        contactTel: 18600562756,
      },
    },
    {
      cityName: "石家庄",
      cityContacts: {
        contactName: "石家庄城市大客户经理",
        contactTel: 18600562756,
      },
    },
    {
      cityName: "广州",
      cityContacts: {
        contactName: "广州城市大客户经理",
        contactTel: 15522071637,
      },
    },
    {
      cityName: "佛山",
      cityContacts: {
        contactName: "佛山城市大客户经理",
        contactTel: 15522071637,
      },
    },
    {
      cityName: "珠海",
      cityContacts: {
        contactName: "珠海城市大客户经理",
        contactTel: 15522071637,
      },
    },
    {
      cityName: "中山",
      cityContacts: {
        contactName: "中山城市大客户经理",
        contactTel: 15522071637,
      },
    },
    {
      cityName: "青岛",
      cityContacts: {
        contactName: "青岛城市大客户经理",
        contactTel: 13145314780,
      },
    },
    {
      cityName: "济南",
      cityContacts: {
        contactName: "济南城市大客户经理",
        contactTel: 13145314780,
      },
    },
  ];

  // 城市列表
  cityList = [
    "北京",
    "保定",
    "长沙",
    "成都",
    "大连",
    "东莞",
    "福州",
    "佛山",
    "广州",
    "杭州",
    "合肥",
    "嘉兴",
    "济南",
    "昆明",
    "南昌",
    "宁波",
    "南京",
    "泉州",
    "青岛",
    "绍兴",
    "上海",
    "苏州",
    "沈阳",
    "深圳",
    "石家庄",
    "天津",
    "武汉",
    "无锡",
    "西安",
    "厦门",
    "郑州",
    "重庆",
    "珠海",
    "中山",
  ];

  // 当前城市
  city = this.cityList[0];

  // 联系人
  cityContact = this.cityListInfo[0].cityContacts;

  // 控制弹窗是否显示
  isShow = false;

  mounted() {
    // 双十一活动四埋点
    window.zhuge.track("进入_2020双11-企客优惠");
    document.title = "用好价 租好房";
  }

  // 点击展示弹窗
  alerList() {
    this.isShow = true;
  }

  // 确认
  onConfirm(value: any) {
    this.city = value;
    this.cityContact = this.cityListInfo.filter(
      (item) => item.cityName === value
    )[0].cityContacts;
    this.isShow = false;
  }

  // 取消
  onCancel() {
    this.isShow = false;
  }
}
</script>

<style lang="scss">
.page__activityFour {
  width: 100%;
  min-height: 100vh;
  background: #3848ff;
  padding-bottom: 21px;

  .main {
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/QCbxhHES8Gd5YYbC7iIigQ.png")
      0 0 no-repeat;
    background-size: 100%;
    overflow: hidden;

    .contacts {
      position: relative;
      margin: 310px 10px 40px;
      width: 355px;
      height: 150px;
      background: #17a1fa;
      box-shadow: 0px 1px 2px 0px #0c1ba7;
      border-radius: 12px;

      .selectList {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 306px;
        height: 65px;
        background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/klj4czT__khpCX2xmvW-2Q.png")
          0 0 no-repeat;
        background-size: 100%;

        .city {
          float: left;
          height: 15px;
          line-height: 15px;
          padding-left: 23px;
          padding-top: 26px;
          font-size: 14px;
          font-weight: normal;
          color: #ffffff;
        }

        .city-slect {
          float: left;
          position: absolute;
          top: 12px;
          right: 7px;
          width: 88px;
          height: 43px;
          background: linear-gradient(180deg, #7a23ff 0%, #cd39ff 100%);
          border-radius: 0px 3px 3px 0px;

          .cityName {
            margin-left: 29px;
            margin-top: 11px;
            font-size: 15px;
            color: #ffffff;
            font-weight: bold;
            line-height: 21px;
          }

          .arrow {
            position: absolute;
            top: 17px;
            right: 12px;
            bottom: 24px;
            width: 14px;
            height: 14px;
            background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/PRQe4TX9-W4RO_cToAymWA.png")
              0 0 no-repeat;
            background-size: 100%;
          }
        }
      }

      .contactList {
        padding: 41px 10px 0;
        padding-left: 10px;
        padding-right: 10px;
        overflow: hidden;

        .contactItem {
          padding-top: 17px;
          line-height: 21px;
          font-size: 18px;
          color: #ffffff;
          text-align: center;

          .phone {
            margin: 21px auto 0;
            display: block;
            text-align: center;
            background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/KqnZaVJOQNzdMxaWFxacjQ.png")
              0 0 no-repeat;
            background-size: 100%;
            width: 155px;
            height: 34px;
            font-size: 15px;
            font-weight: normal;
            color: #ffffff;
            line-height: 34px;
          }
        }
      }
    }

    .rules {
      position: relative;
      margin-left: 10px;
      margin-right: 10px;
      height: 584px;
      background: #17a1fa;
      box-shadow: 0px 1px 2px 0px #0c1ba7;
      border-radius: 12px;
      padding-left: 12px;
      padding-right: 6px;

      .rules-title {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 201px;
        height: 45px;
        background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/PtlGrr6oaST5e0oafvrH_g.png")
          0 0 no-repeat;
        background-size: 100%;
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        line-height: 25px;
        letter-spacing: 1.5px;
      }

      h3 {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        line-height: 25px;
      }

      .stronger {
        font-weight: bold;
      }

      .mt6 {
        margin-top: 6px;
      }

      .mt12 {
        margin-top: 12px;
      }

      .mt24 {
        margin-top: 24px;
      }

      .rules-time {
        padding-top: 42px;
      }

      p {
        font-size: 14px;
        font-weight: normal;
        color: #ffffff;
        line-height: 20px;
      }
    }
  }
}
</style>
