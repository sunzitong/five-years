<template>
  <div class="page__example">
    <Card title="营造盘面" dataSourcePosition="right top" size="small">
      body区域
    </Card>
    <br />
    <Card title="营造盘面">body区域</Card>
    <br />
    <Card title="营造盘面" :showFooter="true">body区域</Card>
    <br />
    <Card title="营造盘面">
      <p>
        <Icon type="desc" />
        <Icon type="asce" />
        <Icon type="data-source" />
        <Icon type="light" />
        <Icon type="light" color="#FF598C|#EB2763" />
        <Icon type="call" color="#65DA7A" />
        <Icon type="call" color="#EB4477" />
        <Icon type="call" color="rgba(0,0,0,0)" />
        <Icon type="trangle" />
        <Icon type="turn-back" />
        <Icon type="version-touch" color="#00A1FF" />
        <Icon type="version-search" />
        <Icon type="version-metting" />
        <Icon type="camera" />
        <Icon type="water-drop" />
        <Icon type="lightning" />
        <Icon type="door" />
        <Icon type="arrow-top" />
        <Icon type="arrow-left" />
        <Icon type="arrow-right" />
        <Icon type="arrow-bottom" />
        <Icon type="arrow-right" color="#fff" />
        <Icon type="funnel" color="#01F5F1|transparent" />
        <Icon type="funnel" color="#01F5F1|#01F5F1" />
        <Icon type="flag" />
        <Icon type="map" />
      </p>
      <div>
        <ProgressBar :width="1000" v-model="progress" />
        <ProgressCircle :width="100" v-model="progress" />
        <div>
          <Animationend key="1" :dataSource="dataSource" />

          <br />
          <br />
          <br />
          <br />
        </div>
        <div>
          <Animationend key="2" :dataSource="dataSource1" />
        </div>
      </div>
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
import ProgressBar from "@/components/Progress/ProgressBar.vue";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import Animationend from "@/components/Animationend/index.vue";
import { getMapJson } from "@/service";

@Component({
  components: {
    Box,
    Subtitle,
    Lattices,
    Card,
    Icon,
    ProgressBar,
    ProgressCircle,
    Animationend,
  },
})
export default class Example extends Vue {
  progress = 60;

  dataSource = Array.from({ length: 10 }).map((item, index) => ({
    id: index + 1,
  }));

  dataSource1 = Array.from({ length: 10 }).map((item, index) => ({
    id: index + 1,
  }));

  mounted() {
    setTimeout(() => {
      console.log(this.progress);
    }, 3000);
  }
}
</script>

<style lang="less" scoped>
.page__example {
  width: 1000px;
}
</style>
