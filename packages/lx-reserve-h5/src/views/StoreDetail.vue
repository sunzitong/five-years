<template>
  <div class="st_bg">
    <GoToBack :border="true" title="门店详情" />
    <!-- 头部轮播 -->
    <div class="st_top">
      <img
        class="swipe_img"
        alt=""
        :src="`${data.projectImages[0].url}?x-oss-process=image/resize,s_560/interlace,1/format,jpg`"
        v-if="data.projectImages && data.projectImages.length"
        @click="gotoStoreAlbum"
      />
      <div class="st_top_info">
        <img class="st_top_info_img" alt="" :src="numsrc" />
        <span v-if="data.projectImages && data.projectImages.length">
          {{ GetPicNum }}
        </span>
      </div>
    </div>
    <!-- 门店信息 -->
    <div class="st_card">
      <div class="st_card_top">
        <div class="st_card_top_title">
          {{ data.projectName }}
        </div>
        <div class="st_card_top_area">
          {{ data.minRoomArea }}-{{ data.maxRoomArea }}㎡
        </div>
      </div>
      <div class="price_box">
        ¥{{ data.rentPrice }}元
        <span>/天</span>
      </div>
      <div class="st_card_addr" @click="gotoMap">
        <img :src="gpssrc" alt="" class="st_card_arrd_gps" />
        <span>{{ data.address }}</span>
        <div class="st_addr_arrow_box">
          <img :src="arrowsrc" alt="" class="st_card_arrd_arrow" />
        </div>
      </div>
      <div class="st_card_gift">
        <div class="st_card_gift_title">好礼</div>
        <div class="detail_fixed">住冠寓送珑珠</div>
      </div>
      <div class="longzhu_desc">前往“异动暖居采买”选购更多家居好物</div>
      <div class="st_card_gift last">
        <div class="st_card_gift_title">亮点</div>
        <div class="detail_tags">
          <div class="tag" v-for="item in data.featureLabels" :key="item">
            <img class="tag_img" :src="marksrc" alt="" srcset="" />
            {{ item }}
          </div>
        </div>
      </div>
      <div class="st_card_gift phone">
        <div class="st_card_gift_title">联系方式</div>
        <div class="detail_phone">
          <a :href="`tel:${data.phone}`">{{ data.phone }}</a>
        </div>
      </div>
    </div>
    <div class="detail_bottom">
      <div class="detail_bottom_l">
        <div class="detail_bottom_l_item">
          入住：
          <span>{{ startDate }} 晚</span>
        </div>
        <div class="detail_bottom_l_item last">
          离店：
          <span>{{ endDate }} 早</span>
        </div>
      </div>
      <div class="detail_bottom_r" @click="gotoSignOrder">预定</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import Base from "./Base";
import { getProjectDetail } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import NUM from "@/assets/img/storeDetail/num.png";
import LOCATION from "@/assets/img/storeDetail/location.png";
import ARROW from "@/assets/img/storeDetail/arrow.png";
import MARK from "@/assets/img/storeDetail/mark.png";
import { stringify } from "qs";

@Component({
  components: {
    GoToBack,
  },
})
export default class StoreDetail extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 城市列表
  protected data: any = {};
  protected current = 0;
  protected numsrc = NUM;
  protected gpssrc = LOCATION;
  protected arrowsrc = ARROW;
  protected marksrc = MARK;
  protected startDate: string | (string | null)[] = "";
  protected endDate: string | (string | null)[] = "";

  mounted() {
    this.getProjectDetail();
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
    const { startDate, endDate } = this.$route.query;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  // 计算门店所有图片数量
  get GetPicNum() {
    const {
      projectVRs = [],
      projectVideos = [],
      projectImages = [],
    } = this.data;
    const len = (arr: Array<any>) => (arr || []).length;
    return len(projectVRs) + len(projectVideos) + len(projectImages);
  }

  // 跳转至地图页
  gotoMap() {
    const { longitude, latitude } = this.data;
    this.$router.push({
      path: `/storeMap?lng=${longitude}&lat=${latitude}`,
    });
  }

  // 跳转至图片列表页
  gotoStoreAlbum() {
    const url = stringify(this.$route.query);
    this.$router.push({
      path: `/storeAlbum?${url}`,
    });
  }

  // 跳转至签约页
  gotoSignOrder() {
    const url = stringify({
      projectName: this.data.projectName,
      price: this.data.rentPrice,
      ...this.$route.query,
    });
    this.$router.push({
      path: `/signOrder?${url}`,
    });
  }

  /**
   * 获取门店详情
   */
  async getProjectDetail() {
    const { projectId, startDate, endDate } = this.$route.query;
    const data = {
      projectId,
      startDate,
      endDate,
    };
    const res = await getProjectDetail(data);
    if (!res) return;
    if (res.status === "ok") {
      this.data = res.data;
    }
  }

  onChange(index: number) {
    this.current = index;
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
.st_bg {
  height: 100vh;
  background: #fff;
}
.st_top {
  position: relative;
  .swipe_img {
    width: 100%;
    height: 277px;
  }
  .st_top_info {
    position: absolute;
    width: 44px;
    height: 21px;
    line-height: 21px;
    right: 12px;
    bottom: 64px;
    font-family: Sul Sans;
    font-style: normal;
    font-size: 14px;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 11px;
    text-align: center;
  }
  .st_top_info_img {
    width: 13px;
    height: 9px;
    margin-right: 4px;
  }
}
.st_card {
  width: calc(100% - 54px);
  margin: 0 12px;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 15px;
  position: absolute;
  margin-top: -54px;
  .st_card_top {
    display: flex;
    align-items: center;
    .st_card_top_title {
      flex: 1;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: #333333;
    }
    .st_card_top_area {
      font-size: 14px;
      color: #666666;
      margin-left: 10px;
    }
  }
  .price_box {
    font-family: Alibaba PuHuiTi;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #3273eb;
    margin: 6px 0;
    span {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: #666666;
    }
  }
  .st_card_addr {
    display: flex;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    padding: 10px 0;
    color: #666666;
    .st_card_arrd_gps {
      width: 11px;
      height: 17px;
      margin-right: 9px;
    }
    .st_addr_arrow_box {
      flex: 1;
      text-align: right;
      .st_card_arrd_arrow {
        height: 10px;
        width: 3px;
      }
    }
  }
  .st_card_gift {
    display: flex;
    .st_card_gift_title {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: #333333;
      height: 17px;
      line-height: 17px;
    }
    .detail_phone {
      line-height: 1.5;
      margin-left: 12px;
      a {
        color: #3273eb;
      }
    }
  }
  .st_card_gift.phone {
    margin-top: 5px;
  }
  .longzhu_desc {
    margin-left: 40px;
    margin-top: 5px;
    color: #999999;
    font-size: 12px;
  }
  .detail_fixed {
    display: inline-block;
    font-size: 12px;
    font-family: SulSans-Medium, SulSans;
    color: #3273eb;
    text-align: center;
    border: 2px solid rgba(0, 122, 255, 0.3);
    border-radius: 4px;
    padding: 0 5px;
    margin-left: 16px;
  }
  .detail_tags {
    display: flex;
    flex-wrap: wrap;
    margin-left: 12px;
    flex: 1;
    .tag {
      display: flex;
      align-items: center;
      margin: 0px 5px 10px;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
    }
  }
}
.st_card_gift.last {
  margin-top: 13px;
  .tag_img {
    height: 12px;
    width: 12px;
    vertical-align: middle;
    margin-right: 4px;
  }
}
.custom-indicator {
  color: #fff;
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.detail_bottom {
  width: calc(100% - 20px);
  display: flex;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  height: 50px;
  box-shadow: inset 0px 0.5px 0px rgba(0, 0, 0, 0.08);
  padding: 10px;
  padding-bottom: 10px + env(safe-area-inset-bottom);
  .detail_bottom_l {
    flex: 1;
    padding-left: 2px;
    height: 100%;
    .detail_bottom_l_item {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #666666;
      span {
        color: #3273eb;
      }
    }
    .detail_bottom_l_item.last {
      margin-top: 6px;
    }
  }
  .detail_bottom_r {
    width: 173px;
    height: 50px;
    line-height: 50px;
    background: #3273eb;
    border-radius: 8px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    color: #fff;
    text-align: center;
  }
}
</style>
