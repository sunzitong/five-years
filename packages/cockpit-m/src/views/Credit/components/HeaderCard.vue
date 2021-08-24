<template>
  <div class="header__wrapper">
    <div class="header__top">
      <div class="header__score">
        <div class="header__score__left">
          <em>{{ optData.optIndexNum }}分</em>
          <div class="rule">
            <span class="tag">(试算)</span>
            <Tooltip
              :iconProps="{ color: 'white' }"
              :title="optData.optStageDesc"
              :content="optData.note"
            ></Tooltip>
          </div>
        </div>
        <div class="header__score__right">
          <span>
            <router-link :to="jumpto()">查看月度指数排名</router-link>
          </span>
        </div>
      </div>
      <div class="header_rule">{{ rule || "" }}</div>
    </div>
    <div class="header__bottom">更新于{{ optData.updateDate || "" }}</div>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import Tooltip from "@/components/Tooltip.vue";
import { getQueries } from "@guanyu/shared";

@Component({
  components: {
    Tooltip,
  },
})
export default class HeaderCard extends Base {
  /**
   * 规则
   */
  get rule() {
    const { optStage } = this.optData;
    // 筹开期
    if (optStage === "PREPARE") {
      return "筹开达成率*100%";
    }

    // 爬坡期
    if (optStage === "CLIMBING") {
      return "渠道效能值*60%+运营健康度*40%";
    }

    // 运营期
    if (optStage === "STEADY") {
      return "信用指数*50%+渠道效能值*30%+运营健康度*20%";
    }

    return "";
  }

  get optData() {
    return this.store.optData ?? {};
  }

  /**
   * 查看月度指数排名
   */
  jumpto() {
    const { projectId } = getQueries();
    return `/rank?projectId=${projectId || ""}`;
  }
}
</script>
<style lang="scss" scoped>
.header__wrapper {
  position: relative;
  height: 120px;
  margin: 10px 18px;
  padding: 0 12px;
  color: #fff;
  overflow: hidden;
  @extend %bg-img-card-background;
  display: flex;
  flex-flow: column;
}

.header__top {
  position: relative;
  overflow: hidden;
  padding-top: 14px;
}

.header_rule {
  display: flex;
  align-items: center;
  height: 30px;
  color: rgba(255, 255, 255, 0.7);
}

.header__bottom {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  height: 36px;
  margin-top: auto;
}

.header__score {
  display: flex;
}

.header__score__left {
  flex: 1;
  em {
    font-family: DIN Alternate;
    font-style: normal;
    font-weight: bold;
    line-height: 1;
    font-size: 40px;
    text-align: center;
  }

  .rule {
    display: inline-block;
    font-size: 18px;
    > .tag {
      font-size: 12px;
      margin-right: 5px;
    }
  }
}

.header__score__right {
  span {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #b3e3ff;
    border-radius: 50px;
    background-color: #1c69ff;
    color: #fff;
    a {
      color: #fff;
    }
  }
}
</style>
