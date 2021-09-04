<template>
  <div class="page__example">
    <Subtitle title="营造盘面">
      <template #extra>
        <a href="javascript:;">详情→</a>
      </template>
    </Subtitle>
    <van-row :gutter="100">
      <van-col :span="8">
        <Card title="营造盘面" dataSourcePosition="right top" size="small">
          body区域
        </Card>
        <br />
        <Card title="营造盘面">body区域</Card>
        <br />
        <Card title="营造盘面" :showFooter="true">body区域</Card>
        <br />
        <Card
          title="营造盘面"
          :showFooter="true"
          :showRectBackground="false"
          :opacity="0.6"
        />
      </van-col>
      <van-col :span="8">
        <Card title="Icon">
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
            <Icon type="corner-top" />
            <Icon type="corner-left" />
            <Icon type="corner-right" />
            <Icon type="corner-bottom" />
            <Icon type="corner-bottom" color="#fff" />
            <Icon type="funnel" color="#01F5F1|transparent" />
            <Icon type="funnel" color="#01F5F1|#01F5F1" />
            <Icon type="flag" />
            <Icon type="map" />
            <Icon type="brand" />
            <Icon type="users" />
            <Icon type="income" />
            <Icon type="room-number" :size="200" />
            <Icon type="number-of-opening-rooms" :size="200" />
            <Icon type="year-income" :size="200" />
            <Icon type="power" :size="200" />
          </p>
        </Card>

        <Card title="ProgressBar">
          <ProgressBar :width="1000" v-model="progress" />
        </Card>
        <Card title="ProgressCircle">
          <ProgressCircle :size="180" v-model="progress" />
        </Card>
        <Card title="Animationend">
          <Animationend key="1" :scrollMinCount="10" :dataSource="dataSource">
            <template v-slot="{ list }">
              <ul>
                <li animated class="aaaa" v-for="item in list" :key="item.id">
                  {{ item.id }}
                </li>
              </ul>
            </template>
          </Animationend>
          <Animationend key="2" :scrollMinCount="10" :dataSource="dataSource1">
            <template v-slot="{ list }">
              <ul>
                <li animated v-for="item in list" :key="item.id">
                  {{ item.id }}
                </li>
              </ul>
            </template>
          </Animationend>
        </Card>
        <Card title="BlurBox">
          <BlurBox :trangleSize="10">
            <p>BlurBox</p>
            <p>BlurBox</p>
            <p>BlurBox</p>
            <p>BlurBox</p>
            <p>BlurBox</p>
            <p>BlurBox</p>
          </BlurBox>
        </Card>
      </van-col>
      <van-col :span="8">
        <Card
          title="AnimateBgCircle"
          :showFooter="true"
          :showRectBackground="false"
        >
          <div
            style="
              position: relative;
              width: 300px;
              height: 300px;
              display: flex;
            "
          >
            <AnimateBgCircle />
            <div style="margin: auto">内容内容内容</div>
          </div>
        </Card>
      </van-col>
    </van-row>
    <!-- <Lattices :width="1000" :height="1000" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Box from "@/components/Box/Index.vue";
import Subtitle from "@/components/Subtitle/Index.vue";
import Lattices from "@/components/Lattices/Index.vue";
import Card from "@/components/Card/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import ProgressBar from "@/components/Progress/ProgressBar.vue";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import Animationend from "@/components/Animationend/Index.vue";
import Btn from "@/components/Btn/Index.vue";
import BlurBox from "@/components/BlurBox/Index.vue";
import AnimateBgCircle from "@/components/AnimateBgCircle/Index.vue";

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
    Btn,
    BlurBox,
    AnimateBgCircle,
  },
})
export default class Example extends Vue {
  progress = 60;

  dataSource = Array.from({ length: 100 }).map((item, index) => ({
    id: index + 1,
  }));

  dataSource1 = Array.from({ length: 10 }).map((item, index) => ({
    id: index + 1,
  }));

  aaa() {
    alert("a");
  }

  mounted() {
    setTimeout(() => {
      console.log(this.progress);
    }, 3000);
  }
}
</script>

<style lang="less" scoped></style>
