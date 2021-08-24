<template>
  <div class="page__example">
    <Card title="营造盘面" size="small">body区域</Card>
    <br />
    <Card title="营造盘面">body区域</Card>
    <br />
    <Card title="营造盘面" :showFooter="true">body区域</Card>
    <br />
    <Card title="营造盘面">
      <p>
        <Icon type="desc" color="#D1356E;" />
        上升
      </p>
      <p>
        <Icon type="asce" color="#01F5F1" />
        下降
      </p>
      <p>
        <Icon type="data-source" color="#4988FD" />
        数据来源
      </p>
      <p>
        <Icon type="light" color="green" />
        数据来源
      </p>
      <p>
        <Icon type="light" color="red" />
        数据来源
      </p>
      <p>
        <Icon type="call" color="#65DA7A" />
        数据来源
      </p>
      <p>
        <Icon type="trangle" color="#FF2A76" />
        <Icon type="turn-back" color="#00A1FF" />
        <Icon type="touch" color="#00A1FF" />
      </p>
    </Card>
    <Card
      title="营造盘面"
      :showFooter="true"
      :showRectBackground="false"
      :opacity="0.6"
    />
    <Subtitle title="营造盘面">
      <template #extra>
        <a href="javascript:;">详情→</a>
      </template>
    </Subtitle>
    <!-- <Lattices :width="1000" :height="1000" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Box from "@/components/Box/index.vue";
import Subtitle from "@/components/Subtitle/index.vue";
import Lattices from "@/components/Lattices/index.vue";
import Card from "@/components/Card/index.vue";
import Icon from "@/components/Icon/index.vue";

@Component({
  components: {
    Box,
    Subtitle,
    Lattices,
    Card,
    Icon,
  },
})
export default class Example extends Vue {}
</script>

<style lang="less" scoped>
.page__example {
  width: 1000px;
}
</style>
