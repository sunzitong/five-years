<template>
  <div class="page-wrap page-rent">
    <header class="slogan">
      <nav
        class="rule-btn"
        @click="showRule=true"
      >活动规则</nav>
      <aside
        class="share"
        v-if="visitSource==='APP'"
        @click="share"
      >分享</aside>
    </header>
    <main class="coupon">
      <a
        class="apply"
        @click="receive"
      >立即领取</a>
    </main>
    <section class="stores">
      <div class="title">活动门店</div>
      <section class="content">
        <aside
          @click="showCities=true"
          class="city"
        >
          {{cityName}}
          <van-icon
            name="arrow-up"
            v-show="showCities"
          />
          <van-icon
            name="arrow-down"
            v-show="!showCities"
          />
        </aside>
        <ul class="st__list">
          <li
            v-for="item in projects"
            :key="item.id"
            class="st__item"
          >
            <!-- <img :src="item.projectImageUrl"> -->
            <van-image
              :src="item.projectImageUrl+'?x-oss-process=image/resize,h_235,w_314'"
              lazy-load
            >
              <template #loading>
                <van-loading
                  type="spinner"
                  size="20"
                />
              </template>
            </van-image>
            <div class="name">
              {{item.projectName}}
            </div>
            <i
              class="icon i15d"
              v-if="item.couponValue==15"
            >{{item.couponValue}}</i>
            <i
              class="icon i30d"
              v-if="item.couponValue==30"
            >{{item.couponValue}}</i>
          </li>
        </ul>
      </section>
    </section>

    <van-popup
      v-model="showCities"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="cities"
        @cancel="showCities=false"
        @confirm="changeCity"
        :default-index="cityIndex"
      />
    </van-popup>

    <van-overlay
      :show="showRule"
      @click="showRule=false"
      class="overlay-rule"
    >
      <div
        class="rule-wrap"
        @click.stop
      >
        <div class="title">活动规则</div>
        <div class="content">
          <p class="p2">活动时间：2020.8.20 — 2020.9.30</p>
          <p class="p2">参与用户：活动期间全部新签用户</p>
          <div class="p3">
            <p>根据门店不同，免租券分为“免15天”及“免一个月”两种，请在使用前查看门店适用券类型或询问门店运营管理人员；</p>
            <p>签约时选择相应免租券使用即可，签约租期仅限6个月，相应免租金额将在最后一个月减免；</p>
            <p>本优惠部分门店不参与，且不与其他优惠叠加，具体询问门店运营管理人员。</p>
          </div>
        </div>
      </div>
      <van-icon name="cross" />
    </van-overlay>
  </div>

</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { getCityList, getProjectList, receive } from '@/api';
import to from "await-to-js"
import { getToken, toLogin } from '@/utils/guanyu';
import { noop } from '@/utils/tools';

@Component
export default class ActRent extends Base {
  @Inject() visitSource!: string
  // app和小程序分享
  @Inject() share!: Function

  // 城市存放在env.city中

  // 城市列表
  cities: Array<string> = []
  // 门店列表
  projects: Array<Dictionary<any>> = []
  // 选择城市
  showCities = false
  // 活动规则
  showRule = false
  // 当前城市
  cityName = ""
  // 城市候选默认Index
  cityIndex = 0
  // 领奖状态
  receiveLoading = false

  created() {
    this.cityName = sessionStorage['gy-fouryear-cityName'] || this.env.cityName;
    // 更新 url
    if (this.$route.query.cityName != this.cityName) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          cityName: this.cityName
        }
      });
    }
    this.getCityList();
    this.getProjectList();
  }
  mounted() {
    document.title = "限时签约租6免1";
    this.miniProgramShare();
  }

  miniProgramShare() {
    if (this.visitSource === '小程序') {
      this.share();
    }
  }

  /**
   * 获取城市列表
   */
  async getCityList() {
    const [, res] = await to(getCityList());
    if (!res) return;
    if (res.status === 'ok') {
      this.cities = res.data as Array<string>;
      this.cityIndex = res.data.indexOf(this.cityName);
    }
  }

  /**
   * 选定城市
   */
  changeCity(cityName: string) {
    this.showCities = false;
    if (this.cityName === cityName) { return; }
    // 暂存所选城市
    sessionStorage['gy-fouryear-cityName'] = cityName;
    this.cityName = cityName;
    this.$router.replace({
      query: {
        ...this.$route.query,
        cityName: cityName,
      },
      hash: this.$route.hash
    }).then(() => {
      this.miniProgramShare();
    }).catch(noop);
    /**
     * 防卡
     * popup-closed默认300ms
     */
    setTimeout(this.getProjectList, 300);
  }
  /**
   * 选择城市
   * 获取门店列表
   */
  async getProjectList() {
    const [, res] = await to(getProjectList(this.cityName));
    if (!res) return;
    if (res.status === 'ok') {
      this.projects = res.data;
    }
  }
  /**
   * 领奖
   */
  async receive() {
    if (this.receiveLoading) return;
    const token = getToken();
    // 未登录
    if (!token) {
      toLogin();
      return;
    }
    this.receiveLoading = true;
    const [, res] = await to(receive(token));
    this.receiveLoading = false;
    if (!res) return;
    if (res.status === 'ok') {
      this.$toast('领取成功');
    } else {
      this.$toast(res.msg || '您已领取过免租券');
    }
  }
}
</script>

<style lang="scss">
.page-rent {
  background: #ffe368;
  .rule-btn {
    @extend %bg-img-rule-btn;
    position: absolute;
    top: 94px;
    right: 0;
    width: 28px;
    height: 88px;
    font-size: 0;
  }
  .overlay-rule {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .van-icon-cross {
      font-size: 26px;
      margin-top: 16px;
      color: #fff;
    }
    .rule-wrap {
      background: #fff;
      width: 265px;
      padding: 30px;
      border-radius: 3px;
    }
    .title {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 1em;
    }
    .p2 {
      font-size: 14px;
      color: #555;
      margin: 12px 0;
    }
    .p3 {
      font-size: 13px;
      color: #666;
      line-height: 1.8;
      margin-top: 20px;
      p {
        margin: 10px 0;
      }
    }
  }
  .slogan {
    @extend %bg-img-slogan;
    height: 333px;
  }
  .coupon {
    @extend %bg-img-cp-bg;
    height: 95px;
    display: flex;
    .apply {
      @extend %bg-img-cp-btn;
      font-size: 0;
      width: 63px;
      height: 63px;
      margin: 14px 74px auto auto;
      &:active {
        opacity: 0.8;
      }
    }
  }
  .stores {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding-bottom: 20px;
    .title {
      @extend %bg-img-ptitle;
      height: 95px;
      width: 100%;
      font-size: 0;
    }
    .content {
      background: #fff;
      width: 345px;
      border-radius: 0 0 2px 2px;
    }
    .city {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
      text-align: center;
      .van-icon {
        font-size: 12px;
      }
    }
    .st__list {
      display: flex;
      flex-flow: wrap;
      justify-content: space-around;
      padding-bottom: 10px;
      &::after {
        content: "";
        width: 157px;
      }
      .st__item {
        width: 157px;
        position: relative;
        margin: 12px 0;
        .van-image {
          width: 100%;
          height: 117.5px;
          margin-bottom: 6px;
        }
        img {
          object-fit: cover;
        }
        .name {
          font-size: 14px;
          line-height: 20px;
          color: #000;
        }
        .icon {
          position: absolute;
          width: 38px;
          height: 41px;
          font-size: 0;
          top: -3px;
          left: 5px;
        }
        .i15d {
          @extend %bg-img-i15d;
        }
        .i30d {
          @extend %bg-img-i30d;
        }
      }
    }
  }
}
</style>
