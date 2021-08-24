<template>
  <div class="page__springRent">
    <header class="header">
      <aside class="share" v-if="visitSource === 'APP'" @click="share">
        分享
      </aside>
    </header>
    <main class="main">
      <!-- 小标题 -->
      <h3 class="title">标题</h3>
      <!-- 特价房 -->
      <div class="special">
        <!-- 城市选择 -->
        <div class="city" @click="alerList()">
          <!-- 位置 -->
          <div class="site">位置</div>
          <!-- 城市名字 -->
          <div class="cityName">{{ city }}</div>
        </div>
        <!-- 特价房展示 -->
        <div :class="[flag ? 'roomFive' : 'roomList']">
          <div class="roomItem" v-for="item in activityRoomList" :key="item.id">
            <!-- 房间照片 -->
            <div class="roomImg">
              <img
                :src="`${item.projectImageUrl}?x-oss-process=image/resize,s_150/interlace,1/format,jpg`"
                class="pic-img"
              />
            </div>
            <!-- 房间信息 -->
            <div class="roomInfo">
              <!-- 房间名称 -->
              <h4 class="projectName">{{ item.projectName }}</h4>
              <!-- 房间价格 -->
              <div class="projectPrice">
                ¥{{ item.projectPrice }}
                <span class="yue">/月</span>
              </div>
              <!-- 预约看房 -->
              <button type="button" class="appointment" @click="jump(item)">
                预约看房
              </button>
            </div>
          </div>
        </div>
        <!-- 展开全部房间按钮 -->
        <div class="showAll" @click="showAll()" v-show="show">
          查看全部
          <span class="down"></span>
        </div>
      </div>
      <!-- 活动规则 -->
      <div class="rules">
        <h3 class="rules_title">活动规则</h3>
        <ul class="ruleList">
          <li>1.活动时间：即日起至2021年2月28日；</li>
          <li>
            2.了解心仪门店房源价格，请点击“预约看房”留下相关信息，门店运营官将尽快联系您；
          </li>
          <li>3.具体优惠细则及房源情况以门店实际情况为准；</li>
          <li>4.租期1-3个月即可特价房享受最低价格；</li>
          <li>5.特价房，数量有限，限时抢购；</li>
          <li>6.本活动最终解释权归龙湖冠寓所有；</li>
        </ul>
      </div>
    </main>
    <van-popup v-model="isShow" position="bottom" :style="{ height: '50%' }">
      <van-picker
        v-show="isShow"
        title="城市列表"
        show-toolbar
        :columns="activityCityList"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="0"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import _ from "lodash";
import Base from "./Base";
import { getActivityCity, getActivityRoom } from "@/api";

@Component
export default class SpringRent extends Base {
  @Inject() visitSource!: string;

  // app和小程序分享
  @Inject() share!: () => void;

  // 初始城市
  city = "";

  // 控制下拉列表显示隐藏
  flag = true;

  // 控制弹窗是否显示
  isShow = false;

  // 控制查看全部按钮是否展示
  show = true;

  // 活动城市列表
  activityCityList: Record<string, any> = [];

  // 门店列表
  activityRoomList: any = [];

  mounted() {
    window.zhuge.track("进入_特价房页面");
    this.city = this.env.cityName;
    document.title = "特价房大赏";
    this.getActivityCity();
    this.getActivityRoom(this.city, 202101147856);
    this.jump = _.debounce(this.jump, 1500, {
      leading: true,
      trailing: false,
    });
  }

  // 点击展示全部
  showAll() {
    window.zhuge.track("点击_特价房页面_查看全部");
    this.flag = false;
    this.show = false;
  }

  jump(item: any) {
    window.zhuge.track("点击_特价房页面_预约看房");
    if (this.visitSource === "小程序") {
      window.wx.miniProgram.navigateTo({
        url: `/packageA/pages/shopDetail/shopDetail?itemId=${item.projectId}`,
      });
    } else if (this.visitSource === "APP") {
      window.location.href = `guanyu://page.gy/apartments/${item.projectId}`;
    } else {
      window.location.href = `${window.location.origin}/guanyudetail/${item.projectId}`;
    }
  }

  // 点击展示弹窗
  alerList() {
    window.zhuge.track("点击_特价房页面_选择城市");
    this.isShow = true;
  }

  onConfirm(value: any) {
    this.city = value;
    this.isShow = false;
    this.flag = true;
    this.getActivityRoom(this.city, 202101147856);
  }

  onCancel() {
    this.isShow = false;
  }

  // 获取活动城市列表
  async getActivityCity() {
    const activityNumber = 202101147856;
    const res = await getActivityCity(activityNumber);
    if (!res) return;
    if (res.status === "ok") {
      this.activityCityList = res.data || [];
    }
  }

  // 获取活动门店列表
  async getActivityRoom(city: any, activityNumber: any) {
    const params = {
      activityNumber: activityNumber,
      city: city,
    };
    const res = await getActivityRoom(params);
    if (!res) return;
    if (res.status === "ok") {
      this.activityRoomList = res.data || [];
      this.show = this.activityRoomList.length > 5;
    }
  }
}
</script>

<style lang="scss">
.page__springRent {
  width: 100%;
  min-height: 100vh;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/xLpt4EIWSB954NFbrF3vyA.png")
    0 0 no-repeat;
  background-size: cover;
  overflow: hidden;

  .header {
    font-size: 15px;
    text-align: center;
    .share {
      z-index: 10;
      position: fixed;
      top: 20px;
      right: 0;
      width: 62px;
      height: 30px;
      font-size: 0;
      @extend %bg-img-share;
    }
  }

  .main {
    position: relative;

    // 小标题
    .title {
      position: absolute;
      top: -55px;
      left: 50%;
      transform: translateX(-50%);
      width: 303px;
      height: 86px;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/LG7XSqVNZzdPJeGIBxKV8w.png")
        0 0 no-repeat;
      background-size: 100% 100%;
      font-size: 0;
    }

    // 特价房
    .special {
      margin: 346px 15px 20px;
      width: 345px;
      border-radius: 12px;
      background: #0043be;
      overflow: hidden;

      // 城市选择
      .city {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 35px 0 0 15px;
        width: 104px;
        height: 36px;
        border-radius: 18px;
        background: #165dde;
        overflow: hidden;

        .site {
          margin-left: 20px;
          width: 15px;
          height: 15px;
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/cElWJXfzV03vOQJ3HBRIQg.png")
            0 0 no-repeat;
          background-size: 100%;
          font-size: 0;
        }

        .cityName {
          display: flex;
          flex-direction: row;
          margin-left: 8px;
          font-size: 14px;
          line-height: 16px;
          color: #ffffff;

          &:after {
            content: "";
            display: block;
            width: 15px;
            height: 15px;
            background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/N8tSKbMn-TR6hE7ScXmBBw.png")
              0 0 no-repeat;
            background-size: 100%;
          }
        }
      }

      // 特价房展示
      .roomList {
        margin: 20px 15px 25px;

        .roomItem {
          display: flex;
          flex-direction: row;
          margin-top: 15px;
          width: 315px;
          height: 106px;
          border-radius: 8px;
          background: #ffffff;

          // 房间照片
          .roomImg {
            .pic-img {
              width: 140px;
              height: 106px;
              border-bottom-left-radius: 5px;
              border-top-left-radius: 5px;
            }
          }

          // 房间信息
          .roomInfo {
            .projectName {
              margin: 10px 10px 6px 10px;
              width: 155px;
              height: 24px;
              font-size: 17px;
              line-height: 20px;
              font-weight: normal;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .projectPrice {
              height: 25px;
              margin-left: 10px;
              font-size: 18px;
              font-weight: bold;
              line-height: 21px;
              color: #ff450c;

              .yue {
                font-weight: normal;
                font-size: 12px;
                line-height: 14px;
              }
            }

            .appointment {
              margin-left: 87px;
              border: 0;
              width: 78px;
              height: 33px;
              border-radius: 16.5px;
              font-size: 12px;
              line-height: 14px;
              text-align: center;
              color: #ffffff;
              background: linear-gradient(180deg, #ffb500 0%, #ff503d 100%);
            }
          }
        }
      }

      // 特价房展示默认展示五个
      .roomFive {
        margin: 5px 15px 25px;
        max-height: 605px;
        overflow: hidden;

        .roomItem {
          display: flex;
          flex-direction: row;
          margin-top: 15px;
          width: 315px;
          height: 106px;
          border-radius: 8px;
          background: #ffffff;

          // 房间照片
          .roomImg {
            .pic-img {
              width: 140px;
              height: 106px;
              border-bottom-left-radius: 5px;
              border-top-left-radius: 5px;
            }
          }

          // 房间信息
          .roomInfo {
            .projectName {
              margin: 10px 10px 6px 10px;
              width: 155px;
              height: 24px;
              font-size: 17px;
              line-height: 20px;
              font-weight: normal;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .projectPrice {
              height: 25px;
              margin-left: 10px;
              font-size: 18px;
              font-weight: bold;
              line-height: 21px;
              color: #ff450c;

              .yue {
                font-weight: normal;
                font-size: 12px;
                line-height: 14px;
              }
            }

            .appointment {
              margin-left: 87px;
              border: 0;
              width: 78px;
              height: 33px;
              border-radius: 16.5px;
              font-size: 12px;
              line-height: 14px;
              text-align: center;
              color: #ffffff;
              background: linear-gradient(180deg, #ffb500 0%, #ff503d 100%);
            }
          }
        }
      }

      // 展开全部按钮
      .showAll {
        margin: 0 68px 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: 0;
        width: 209px;
        height: 40px;
        font-size: 14px;
        line-height: 16px;
        color: #666666;
        border-radius: 24.5px;
        background: #ffffff;

        .down {
          margin-left: 3px;
          display: block;
          font-size: 0;
          width: 15px;
          height: 15px;
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/NVuitprPJiWzjeD-z57aFA.png")
            0 0 no-repeat;
          background-size: 100%;
        }
      }
    }

    // 活动规则
    .rules {
      padding-bottom: 40px;
      margin-top: 24px;

      .rules_title {
        font-size: 0;
        margin: 0 107px;
        width: 160px;
        height: 24px;
        background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/QRV1gCklA4kHKySsmTHtjg.png")
          0 0 no-repeat;
        background-size: 100%;
      }

      .ruleList {
        margin-top: 10px;
        padding: 0 25px;
        font-size: 12px;
        font-weight: normal;
        line-height: 17px;

        color: #ffffff;

        li {
          margin-top: 8px;
        }

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
