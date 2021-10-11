<template>
  <div class="c4a-container" :class="{ fold: isFold }">
    <CardB>
      <div class="head">
        <div class="title">供销存</div>
        <div class="fold" @click="isFold = !isFold">
          <span>{{ isFold ? "点击展开" : "点击收起" }}</span>
          <Icon :type="isFold ? 'unfold' : 'fold'" :size="44" />
        </div>
        <div class="detail">
          <span>供销存详情</span>
          <van-icon name="down" />
        </div>
      </div>
      <div class="table-container" v-if="!isFold">222</div>
    </CardB>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import Icon from "@/components/Icon/Index.vue";
import CardB from "@/components/CardB/Index.vue";

@Component({
  components: { Icon, CardB },
})
export default class C4A extends Base implements IFetch {
  isFold = true;
  async fetch() {
    return;
  }
}
</script>
<style lang="scss" scoped>
.c4a-container {
  width: 1644px;
  position: absolute;
  bottom: 180px;
  font-size: 40px;
  color: #fff;
  &::v-deep {
    .app-card-b__content {
      min-height: 160px;
    }
  }

  &.fold {
    width: 834px;
    .head {
      height: 134px;
    }
  }
}
.head {
  height: 60px;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 20px 40px;
  .title {
    margin: 0 auto 0 0;
  }
  .fold,
  .detail {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-right: 14px;
    }
  }
  .fold {
    span {
      color: #dbf0ff;
      opacity: 0.5;
    }
  }
  .detail {
    margin: 0 0 0 44px;
    .van-icon {
      transform: rotate(-90deg);
    }
  }
}
</style>
