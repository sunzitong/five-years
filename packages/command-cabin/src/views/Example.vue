<template>
  <div class="page__example">
    <Card title="营造盘面" size="small" :showFooter="false">
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
      <p>1111</p>
    </Card>
    <Card title="营造盘面" size="medium" :showFooter="false">
      <p>2222</p>
      <p>2222</p>
      <p>2222</p>
      <p>2222</p>
      <p>2222</p>
      <p>2222</p>
      <p>2222</p>
    </Card>
    <Card title="营造盘面" size="medium">
      <p>4444</p>
      <p>4444</p>
      <p>4444</p>
      <p>4444</p>
      <p>4444</p>
      <p>4444</p>
      <p>4444</p>
    </Card>
    <Card
      title="营造盘面"
      size="medium"
      :opacity="0.6"
      :showRectBackground="false"
    >
      <p>3333</p>
      <p>3333</p>
      <p>3333</p>
      <p>3333</p>
      <p>3333</p>
      <p>3333</p>
      <p>3333</p>
      <p>3333</p>
    </Card>
    <Subtitle title="营造盘面">
      <template #extra>
        <a href="javascript:;">详情→</a>
      </template>
    </Subtitle>
    <Lattices :width="1000" :height="1000" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Box from "@/components/Box/index.vue";
import Subtitle from "@/components/Subtitle/index.vue";
import Lattices from "@/components/Lattices/index.vue";
import Card from "@/components/Card/index.vue";

@Component({
  components: {
    Box,
    Subtitle,
    Lattices,
    Card,
  },
})
export default class Example extends Vue {}
</script>

<style lang="less" scoped></style>
