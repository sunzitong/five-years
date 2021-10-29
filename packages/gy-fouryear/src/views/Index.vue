<template>
  <div class="page-wrap page-index">
    <header class="header">
      活动时间：2020.08.20 - 2020.09.30
      <aside
        class="share"
        v-if="visitSource==='APP'"
        @click="share"
      >分享</aside>
    </header>
    <main class="main">
      <ul class="act-list">
        <template v-for="item in actList">
          <router-link
            :key="item.key"
            v-if="item.key==='one'"
            tag="li"
            :to="{path:'./act-rent',query:routeQuery}"
            class="item act__rent"
            :class="{disabled:!item.display}"
          >限时签约租6免1</router-link>
          <li
            :key="item.key"
            class="item act__party"
            :class="{disabled:!item.display}"
            v-else-if="item.key==='two'"
          >
            <a :href="`/fe/hd-celebrate-together?${linkQuery}`">百店同庆生日趴</a>
          </li>
          <li
            :key="item.key"
            class="item act__cash"
            :class="{disabled:!item.display}"
            v-else-if="item.key==='three'"
          >
            <a :href="`/fe/customerinvitat?${linkQuery}`">带着朋友住冠寓</a>
          </li>
          <li
            :key="item.key"
            class="item act__iphone"
            :class="{disabled:!item.display}"
            v-else-if="item.key==='four'"
          >
            <a :href="`/fe/hd-luck-draw/#/?${linkQuery}`">呼朋唤友来助力</a>
          </li>
        </template>
      </ul>
      <article class="rule">{{ruleText}}</article>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import to from 'await-to-js';
import { getAnnCMS } from '@/api';
import qs from "qs"
import { getToken } from '@/utils/guanyu';

interface ActItem {
  key: string,
  display: boolean
}

@Component
export default class Index extends Base {
  @Inject() visitSource!: string
  // app和小程序分享
  @Inject() share!: Function
  // 活动1参数
  routeQuery = {}
  // 活动2/3/4参数
  linkQuery = ""
  // 写静态文本会被编译优化空白
  ruleText = `
      1.冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。
      2.在法律许可的范围内，冠寓保留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。
      3.因不可抗力事件使本活动不能实现，冠寓不承担责任。不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件。
      4.活动最终解释权归冠寓所有。
    `.trim()

  // 活动
  actList: ActItem[] = []
  created() {
    if (this.$route.query.cityId != this.env.cityId) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          cityId: this.env.cityId,
          cityName: this.env.cityName,
        }
      })
    }
    // 计算活动入口参数
    const token = getToken();
    if (token) {
      this.routeQuery = { sessionId: getToken() };
    }
    this.linkQuery = qs.stringify({
      ...this.routeQuery,
      cityId: this.env.cityId,
      cityName: this.env.cityName
    });
    this.getActList();
  }
  mounted() {
    document.title = "冠寓四重奏，由你放“肆“租";
    if (this.visitSource === '小程序') {
      this.share();
    }
  }

  /**
   * 获取活动列表配置
   */
  async getActList() {
    const [, res] = await to(getAnnCMS());
    if (!res) return;
    if (res.status === 'ok') {
      this.actList = res.data;
    } else {
      this.$toast(res.msg);
    }
  }
}
</script>

<style lang="scss">
.page-index {
  @extend %bg-img-bg;
  background-color: #0a1457;
  color: #fff;
  // 头部日期
  .header {
    padding-top: 640px;
    font-size: 15px;
    text-align: center;
  }
  .main {
    padding: 0 15px;
    .act-list {
      .item {
        height: 86px;
        margin: 18px 0;
        font-size: 0;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        &.disabled {
          pointer-events: none;
        }
      }
      .act__rent {
        @extend %bg-img-act-rent;
      }
      .act__iphone {
        // @extend %bg-img-act-iphone;
        @extend %bg-img-act-hw;
        &.disabled {
          // @extend %bg-img-act-iphone-0;
          @extend %bg-img-act-hw-0;
        }
      }
      .act__party {
        @extend %bg-img-act-party;
        &.disabled {
          @extend %bg-img-act-party-0;
        }
      }
      .act__cash {
        @extend %bg-img-act-cash;
      }
    }
    // 规则
    .rule {
      white-space: pre-line;
      font-size: 14px;
      line-height: 24px;
      margin-top: 18px;
      padding-bottom: 60px;
    }
  }
}
</style>
