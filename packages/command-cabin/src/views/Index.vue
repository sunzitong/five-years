<template>
  <div class="page__index">
    <van-row>
      <van-col span="8">
        <Subtitle title="拓展盘面">
          <template #extra>
            <a href="#">详情→</a>
          </template>
        </Subtitle>
      </van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import Subtitle from "@/components/Subtitle/index.vue";

@Component({
  components: {
    Subtitle,
  },
})
export default class Index extends Base {
  /**
   * 运行环境
   * 来源 App.vue中定义
   */
  @Inject() visitSource!: string;
  /**
   * 分享方法
   * 来源 App.vue中定义
   */
  @Inject() share!: () => void;
}
</script>

<style lang="scss" scoped>
.page__index {
  width: 7680px;
}
</style>
