<template>
  <div style="height: 100vh">
    <GoToBack title="门店地址" />
    <div id="allmapa" style="height: 100%"></div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import Base from "./Base";
import { getCityList } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import MAPMAKERICON from "@/assets/img/storeMap/icon_map_mark.png";

const { BMap } = window;

@Component({
  components: {
    GoToBack,
  },
})
export default class StoreMap extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 城市列表
  protected cityList: Array<any> = [];

  mounted() {
    // 初始化地图
    this.map = new BMap.Map("allmapa", { enableMapClick: false });
    // 添加地图
    this.bmapFunction(this.map);

    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  bmapFunction(map: any) {
    const lng = Number(this.$route.query.lng || 0);
    const lat = Number(this.$route.query.lat || 0);
    map.enableScrollWheelZoom();
    const myIcon = new BMap.Icon(MAPMAKERICON, new BMap.Size(27, 39));

    this.Apoint = this.tobdMap(lng, lat);
    const point = new BMap.Point(this.Apoint.lng, this.Apoint.lat);
    const marker = new BMap.Marker(point, { icon: myIcon });
    this.Bpoint = point;
    map.centerAndZoom(point, 19);
    // 将标注添加到地图中
    map.addOverlay(marker);
    this.addClickHandler(marker);
  }
  // 点击标记点
  addClickHandler(marker: any) {
    marker.addEventListener("click", () => {
      this.animationNav = "show-nav-list";
      this.animationFixed = "show-nav-bj";
    });
  }
  //高德坐标转百度（传入经度、纬度）
  tobdMap(x: number, y: number) {
    var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    var pt = new BMap.Point(bd_lon, bd_lat);
    return pt;
  }

  /**
   * 获取城市列表
   */
  async getCityList() {
    const res = await getCityList();
    if (!res) return;
    if (res.status === "ok") {
      /**/
      this.cityList = res.data;
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

<style lang="scss"></style>
