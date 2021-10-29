<template>
  <div class="st_box">
    <GoToBack :border="true" title="门店列表" />
    <div
      v-for="item in storeList"
      :key="item.projectId"
      class="store"
      @click="gotoStoreDetail(item.projectId)"
    >
      <div class="store_view">
        <img
          class="store_view_bg"
          alt=""
          :src="`${item.projectImages[0].url}?x-oss-process=image/resize,s_280/interlace,1/format,jpg`"
          v-if="item.projectImages && item.projectImages.length"
        />
        <div class="store_view_info">住冠寓送珑珠</div>
      </div>
      <div class="store_info">
        <div class="store_title">{{ item.projectName }}</div>
        <div class="store_address">{{ item.district }}</div>
        <div class="store_price">
          <div v-if="item.remainRoomNum < 11" class="store_price_r">
            剩余
            <span class="unit">{{ item.remainRoomNum }}</span>
            间
          </div>
          <div v-if="item.remainRoomNum > 10" class="store_price_r">
            剩余房间充足
          </div>
        </div>
      </div>
    </div>
    <van-empty v-if="!storeList.length" description="暂无数据" />
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import Base from "./Base";
import { getProjectList } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import { stringify } from "qs";

@Component({
  components: {
    GoToBack,
  },
})
export default class StoreList extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 城市列表
  protected storeList: Array<any> = [];
  protected loading = false;
  protected finished = false;

  mounted() {
    this.onStoreLoad();
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  // 跳转到门店列表
  gotoStoreDetail(projectId: string) {
    const url = stringify({ projectId, ...this.$route.query });
    this.$router.push({
      path: `/storeDetail?${url}`,
    });
  }

  async onStoreLoad() {
    const { cityId, startDate, endDate } = this.$route.query;
    const data = {
      cityId,
      startDate,
      endDate,
    };
    const res = await getProjectList(data);
    if (!res) return;
    if (res.status === "ok") {
      this.storeList = res.data;
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
.st_box {
  padding-top: 44px;
  padding-bottom: env(safe-area-inset-bottom);
}
.store {
  display: flex;
  // align-items: flex-start;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 2px;
}
.store_view {
  flex: 3;
  height: 105px;
  position: relative;
  .store_view_info {
    position: absolute;
    width: 82px;
    height: 23px;
    line-height: 23px;
    top: 6px;
    left: 6px;
    background: #3273eb;
    border-radius: 4px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
.store_view_bg {
  height: 100%;
  width: 100%;
  border-radius: 8px;
}
.store_info {
  flex: 5;
  padding-left: 10px;
}
.store_title {
  font-size: 17px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  margin-top: 6px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
  line-height: 1;
}
.store_address {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
}
.store_price {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  // .store_price_l {
  //   font-size: 12px;
  //   font-family: SulSans-Medium, SulSans;
  //   color: rgba(241, 141, 0, 1);
  //   text-align: center;
  //   border: 1px solid rgba(241, 141, 0, 1);
  //   padding: 5px;
  // }
  .store_price_r {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 30px;
    span {
      color: #3273eb;
    }
  }
}
</style>
