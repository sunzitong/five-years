<template>
  <div class="page__example">
    <box title="商机转化">
      <template #footer>
        <a href="javascript:;">供销存详情→</a>
      </template>
    </box>
    <Subtitle title="营造盘面">
      <template #extra>
        <a href="javascript:;">详情→</a>
      </template>
    </Subtitle>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Box from "@/components/Box/index.vue";
import Subtitle from "@/components/Subtitle/index.vue";

@Component({
  components: {
    Box,
    Subtitle,
  },
})
export default class Example extends Vue {}
</script>

<style lang="less" scoped></style>
