<template>
  <div class="page__activityOne">
    <!-- <header class="header">
      <aside class="share" v-if="visitSource === 'APP'" @click="share">
        分享
      </aside>
    </header> -->
    <main class="main">
      <div class="activity_header">
        <div class="select_btn">
          <div class="city_name" @click="alerList()">
            {{ city }}
            <div class="square"></div>
          </div>
        </div>
      </div>
      <div class="floor">
        <ul :class="[flag ? 'room_five' : 'room_all']">
          <li v-for="item in activityRoomList" :key="item.id">
            <div class="room_item">
              <div class="left">
                <h4 class="room_name">{{ item.projectName }}</h4>
                <div class="room_price">
                  ￥{{ item.projectPrice }}
                  <span class="yue">月</span>
                  <span class="qi">起</span>
                </div>
              </div>
              <div class="right" @click="jump(item)"></div>
            </div>
          </li>
        </ul>
        <div class="floor_bottom">
          <div class="show_all" @click="showAll()" v-show="show">
            查看全部
            <i class="arrow"></i>
          </div>
        </div>
      </div>
      <div class="activity_description">
        <div class="activity_time">
          <h3>活动有效期</h3>
          <p>即日起至2020年12月31日</p>
        </div>
        <div class="activity_rules">
          <h3>活动细则</h3>
          <p>
            1.了解心仪门店房源价格,点击“预约看房”留下信息,门店运营官将尽快联系您;
            <br />
            2.特价房源,数量有限,先到先得;
            <br />
            3.具体优惠细则及房源情况请详询门店运营官;
            <br />
            4.本活动最终解释权归龙湖冠寓所有。
            <br />
          </p>
        </div>
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
import Base from "./Base";
import { getCityList, getActivityCity, getActivityRoom } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";

@Component
export default class Index extends Base {
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
    window.zhuge.track("进入_2020双11-秒杀房");
    // console.log("$this", this);
    this.city = this.env.cityName;
    document.title = "万元省钱攻略一触即GO";
    // if (this.visitSource === "小程序") {
    //   this.share();
    // }
    this.getActivityCity();
    this.getActivityRoom(this.city, 202010277856);
  }

  // 点击展示全部
  showAll() {
    this.flag = false;
    this.show = false;
  }

  jump(item: any) {
    // if (this.visitSource === "小程序") {
    //   if (item.isOpen) {
    //     window.wx.miniProgram.navigateTo({
    //       url: `/packageA/pages/shopDetail/shopDetail?itemId=${item.itemId}&projectname=${item.itemName}`,
    //     });
    //   } else {
    //     window.wx.miniProgram.navigateTo({
    //       url: `/packageA/pages/planOpenShopDetail/planOpenShopDetail?itemId=${item.itemId}`,
    //     });
    //   }
    // } else {
    //   window.location.href = `${window.location.origin}/guanyudetail/${item.itemId}`;
    // }
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
    this.isShow = true;
  }

  onConfirm(value: any) {
    this.city = value;
    this.isShow = false;
    this.flag = true;
    this.getActivityRoom(this.city, 202010277856);
  }

  onCancel() {
    this.isShow = false;
  }

  // 获取活动城市列表
  async getActivityCity() {
    const activityNumber = 202010277856;
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
    // console.log("res", res);
    if (!res) return;
    if (res.status === "ok") {
      this.activityRoomList = res.data || [];
      this.show = this.activityRoomList.length > 5;
    }
  }

  /**
   * 获取城市列表
   */
  async getCityList() {
    const res = await getCityList();
    if (!res) return;
    if (res.status === "ok") {
      /**/
    }
  }

  login() {
    const token = getToken();
    // 未登录
    if (!token) {
      toLogin();
      return;
    }
  }
}
</script>

<style lang="scss">
.page__activityOne {
  width: 100%;
  min-height: 100vh;
  background-color: #000d65;

  // .header {
  //   font-size: 15px;
  //   text-align: center;
  //   .share {
  //     position: fixed;
  //     top: 20px;
  //     right: 0;
  //     width: 62px;
  //     height: 30px;
  //     font-size: 0;
  //     @extend %bg-img-share;
  //   }
  // }

  .main {
    padding-bottom: 20px;

    // 头部
    .activity_header {
      position: relative;
      height: 424.5px;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/O7Ha73FVWOMLjKLh816AYQ.png")
        0 0 no-repeat;
      background-size: 100%;
      z-index: 1;

      // 城市选择按钮
      .select_btn {
        display: flex;
        transform: translateX(-50%);
        position: absolute;
        top: 328px;
        left: 50%;
        width: 115px;
        height: 46.5px;
        background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/gVekDLHaMw_TFSiG3rgyEQ.png")
          0 0 no-repeat;
        background-size: 100%;
        justify-content: center;
        // align-items: center;

        // 城市名字
        .city_name {
          margin-top: 12px;
          position: relative;
          vertical-align: middle;
          height: 28px;
          line-height: 28px;
          font-size: 20px;
          font-weight: bold;
          color: #fff1bf;

          .square {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -10px;
            width: 7.5px;
            height: 4px;
            background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Zgjs2YWwA1PJpn9P8CHU-g.png")
              0 0 no-repeat;
            background-size: 100%;
          }

          // 三角形
          // .square {
          //   position: absolute;
          //   // top: 50%;
          //   bottom: 0;
          //   right: -10px;
          //   width: 0px;
          //   height: 0px;
          //   border-bottom: 3.5px solid transparent;
          //   border-left: 3.5px solid transparent;
          //   border-right: 3.5px solid transparent;
          //   border-top: 3.5px solid #fff2d3;
          // }
        }
      }
    }

    // 楼梯
    .floor {
      margin-top: -50px;

      // 默认展示五条
      .room_five {
        max-height: 585.5px;
        overflow: hidden;

        li {
          position: relative;
          height: 109px;
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/SmuZaHlTErZj26cQf8kWsQ.png")
            0 0 no-repeat;
          background-size: 100%;
          margin-top: -1px;

          .room_item {
            position: absolute;
            top: 9px;
            left: 49px;
            width: 273.5px;
            height: 75.5px;

            .left {
              float: left;
              margin-top: 10px;
              margin-left: 8px;

              .room_name {
                width: 190px;
                height: 21px;
                line-height: 21px;
                font-size: 15px;
                font-weight: bold;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .room_price {
                margin-left: -6px;
                height: 45.5px;
                line-height: 42.5px;
                font-size: 25px;
                font-weight: bold;
                letter-spacing: 2.5px;
                color: #e16016;

                .yue {
                  margin-left: -10px;
                  font-size: 22px;
                }

                .qi {
                  margin-left: 1px;
                  font-size: 14px;
                }
              }
            }

            .right {
              float: left;
              margin-left: 16px;
              margin-top: 13px;
              width: 52px;
              height: 50.5px;
              background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/sM9IvJbZOAHH2yV6B_X83w.png")
                0 0 no-repeat;
              background-size: 100%;
            }
          }
        }

        li:nth-child(1) {
          height: 149.5px;
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Ms7U5czadoW57B2faHSKKg.png")
            0 0 no-repeat;
          background-size: 100%;

          .room_item {
            position: absolute;
            top: 50px;
            left: 50px;
            width: 273.5px;
            height: 75.5px;

            .left {
              float: left;
              margin-top: 10px;
              margin-left: 8px;

              .room_name {
                width: 190px;
                height: 21px;
                line-height: 21px;
                font-size: 15px;
                font-weight: bold;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .room_price {
                margin-left: -6px;
                height: 45.5px;
                line-height: 42.5px;
                font-size: 25px;
                font-weight: bold;
                letter-spacing: 2.5px;
                color: #e16016;

                .yue {
                  margin-left: -10px;
                  font-size: 22px;
                }

                .qi {
                  margin-left: 1px;
                  font-size: 14px;
                }
              }
            }

            .right {
              float: left;
              margin-left: 16px;
              margin-top: 13px;
              width: 52px;
              height: 50.5px;
              background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/sM9IvJbZOAHH2yV6B_X83w.png")
                0 0 no-repeat;
              background-size: 100%;
            }
          }
        }
      }

      // 点击全部展示
      .room_all {
        li {
          position: relative;
          height: 109px;
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/SmuZaHlTErZj26cQf8kWsQ.png")
            0 0 no-repeat;
          background-size: 100%;
          margin-top: -1px;

          .room_item {
            position: absolute;
            top: 9px;
            left: 49px;
            width: 273.5px;
            height: 75.5px;

            .left {
              float: left;
              margin-top: 10px;
              margin-left: 8px;

              .room_name {
                width: 190px;
                height: 21px;
                line-height: 21px;
                font-size: 15px;
                font-weight: bold;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .room_price {
                margin-left: -6px;
                height: 45.5px;
                line-height: 42.5px;
                font-size: 25px;
                font-weight: bold;
                letter-spacing: 2.5px;
                color: #e16016;

                .yue {
                  margin-left: -10px;
                  font-size: 22px;
                }

                .qi {
                  margin-left: 1px;
                  font-size: 14px;
                }
              }
            }

            .right {
              float: left;
              margin-left: 16px;
              margin-top: 13px;
              width: 52px;
              height: 50.5px;
              background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/sM9IvJbZOAHH2yV6B_X83w.png")
                0 0 no-repeat;
              background-size: 100%;
            }
          }
        }

        li:nth-child(1) {
          height: 149.5px;
          background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Ms7U5czadoW57B2faHSKKg.png")
            0 0 no-repeat;
          background-size: 100%;

          .room_item {
            position: absolute;
            top: 50px;
            left: 50px;
            width: 273.5px;
            height: 75.5px;

            .left {
              float: left;
              margin-top: 10px;
              margin-left: 8px;

              .room_name {
                height: 21px;
                line-height: 21px;
                font-size: 15px;
                font-weight: bold;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .room_price {
                width: 190px;
                margin-left: -6px;
                height: 45.5px;
                line-height: 42.5px;
                font-size: 25px;
                font-weight: bold;
                letter-spacing: 2.5px;
                color: #e16016;

                .yue {
                  margin-left: -10px;
                  font-size: 22px;
                }

                .qi {
                  margin-left: 1px;
                  font-size: 14px;
                }
              }
            }

            .right {
              float: left;
              margin-left: 16px;
              margin-top: 13px;
              width: 52px;
              height: 50.5px;
              background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/sM9IvJbZOAHH2yV6B_X83w.png")
                0 0 no-repeat;
              background-size: 100%;
            }
          }
        }
      }

      // 楼梯底部
      .floor_bottom {
        margin-top: -1px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48.5px;
        background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/bU7UtfTCAOsqrckaITw-PA.png")
          0 0 no-repeat;
        background-size: 100%;

        // 展示全部按钮
        .show_all {
          position: relative;
          height: 21px;
          line-height: 21px;
          font-size: 15px;
          font-weight: bold;
          color: #ffffff;

          .arrow {
            position: absolute;
            top: 4px;
            left: 68px;
            display: block;
            width: 8px;
            height: 16px;
            background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/IIdudlRmRkubVxU83435EQ.png")
              0 0 no-repeat;
            background-size: 100%;
          }
        }
      }
    }

    // 活动描述
    .activity_description {
      margin-left: 12px;
      margin-top: 35px;
      margin-right: 26.5px;

      // 活动规则
      .activity_rules {
        margin-top: 25px;
      }

      h3 {
        height: 25px;
        line-height: 25px;
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
      }

      p {
        margin-top: 10px;
        line-height: 30px;
        font-size: 16px;
        font-weight: normal;
        color: #e1f1ff;
      }
    }
  }
}
</style>
