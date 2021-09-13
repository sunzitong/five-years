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
        <CardA title="营造盘面" />
      </van-col>
      <van-col :span="8">
        <Card title="Icon">
          <p>
            desc:
            <Icon type="desc" />
            asce:
            <Icon type="asce" />
            data-source:
            <Icon type="data-source" />
            light:
            <Icon type="light" />
            light:
            <Icon type="light" color="#FF598C|#EB2763" />
            call:
            <Icon type="call" color="#65DA7A" />
            call:
            <Icon type="call" color="#EB4477" />
            call:
            <Icon type="call" color="rgba(0,0,0,0)" />
            trangle:
            <Icon type="trangle" />
            turn-back:
            <Icon type="turn-back" />
            version-touch:
            <Icon type="version-touch" color="#00A1FF" />
            version-search:
            <Icon type="version-search" />
            version-metting:
            <Icon type="version-metting" />
            camera:
            <Icon type="camera" />
            water-drop:
            <Icon type="water-drop" />
            lightning:
            <Icon type="lightning" />
            door:
            <Icon type="door" />
            arrow-top:
            <Icon type="arrow-top" />
            arrow-left:
            <Icon type="arrow-left" />
            arrow-right:
            <Icon type="arrow-right" />
            arrow-bottom:
            <Icon type="arrow-bottom" />
            arrow-right:
            <Icon type="arrow-right" color="#fff" />
            corner-top:
            <Icon type="corner-top" />
            corner-left:
            <Icon type="corner-left" />
            corner-right:
            <Icon type="corner-right" />
            corner-bottom:
            <Icon type="corner-bottom" />
            corner-bottom:
            <Icon type="corner-bottom" color="#fff" />
            funnel:
            <Icon type="funnel" color="#01F5F1|transparent" />
            funnel:
            <Icon type="funnel" color="#01F5F1|#01F5F1" />
            flag:
            <Icon type="flag" />
            map:
            <Icon type="map" />
            brand:
            <Icon type="brand" />
            users:
            <Icon type="users" />
            income:
            <Icon type="income" />
            room-number:
            <Icon type="room-number" :size="200" />
            number-of-opening-rooms:
            <Icon type="number-of-opening-rooms" :size="200" />
            year-income:
            <Icon type="year-income" :size="200" />
            energy:
            <Icon type="energy" :size="200" />
          </p>
        </Card>

        <Card title="ProgressBar">
          <ProgressBar :width="1000" v-model="progress" />
        </Card>
        <Card title="ProgressCircle">
          <ProgressCircle1 :size="180" v-model="progress" />
        </Card>
        <Card title="Webrtc">
          <Webrtc />
        </Card>
        <Card title="Spin">
          <Spin />
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
          title="ProgressCircle"
          :showFooter="true"
          :showRectBackground="false"
        >
          <div
            style="display: flex; flex-flow: row wrap; justify-content: center"
          >
            <ProgressCircle
              :styleType="1"
              :rate="45"
              :size="400"
              :strokeWidth="210"
              :strokeSize="280"
              style="height: 400px; width: 400px"
              primary
            >
              <template v-slot="{ value }">
                <div class="rate-text">
                  <div class="value">{{ value }}%</div>
                </div>
              </template>
            </ProgressCircle>
            <ProgressCircle
              :styleType="1"
              :rate="45"
              :size="400"
              style="height: 400px; width: 400px"
              color="yellow"
              strokeLinecap="round"
              :strokeWidth="100"
              :strokeSize="180"
            >
              <template v-slot="{ value }">
                <div class="rate-text">
                  <div class="value">{{ value }}%</div>
                </div>
              </template>
            </ProgressCircle>
            <ProgressCircle
              :styleType="1"
              :rate="45"
              :size="400"
              style="height: 400px; width: 400px"
              color="yellow"
              strokeLinecap="round"
              :strokeWidth="100"
              :strokeSize="180"
              :arc="false"
            >
              <template v-slot="{ value }">
                <div class="rate-text">
                  <div class="value">{{ value }}%</div>
                </div>
              </template>
            </ProgressCircle>
            <ProgressCircle
              :styleType="2"
              :rate="45"
              :size="400"
              :strokeWidth="210"
              :strokeSize="280"
              style="height: 400px; width: 400px"
            >
              <template v-slot="{ value }">
                <div class="rate-text">
                  <div class="value">{{ value }}</div>
                  <div class="desc">总分</div>
                </div>
              </template>
            </ProgressCircle>
            <ProgressCircle
              :styleType="3"
              :rate="45"
              :size="400"
              :strokeWidth="210"
              :strokeSize="280"
              style="height: 400px; width: 400px"
              warning
            >
              <template v-slot="{ value }">
                <div class="rate-text">
                  <div class="value">{{ value }}</div>
                  <div class="desc">总分</div>
                </div>
              </template>
            </ProgressCircle>
          </div>
        </Card>

        <Card
          title="ButtonGroup"
          :showFooter="true"
          :showRectBackground="false"
        >
          <ButtonGroup>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio :name="1">单选框 1</van-radio>
              <van-radio :name="12">单选框 1</van-radio>
              <van-radio :name="13">单选框 1</van-radio>
              <van-radio :name="2">
                单选框 2
                <van-icon name="arrow" />
              </van-radio>
            </van-radio-group>
          </ButtonGroup>
          <ButtonGroup>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio :name="1">单选框 1</van-radio>
              <van-radio :name="2">
                单选框 2
                <van-icon name="arrow" />
              </van-radio>
            </van-radio-group>
          </ButtonGroup>
          <ButtonGroup>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio :name="1">单选框 1</van-radio>
            </van-radio-group>
          </ButtonGroup>
        </Card>
        <Card title="StepNumber" :showFooter="true" :showRectBackground="false">
          <van-row>
            <van-col :span="3">
              基础用法
              <StepNumber :to="stepNum" />
            </van-col>
            <van-col :span="3">
              每次都从0开始算
              <StepNumber :to="stepNum" :from="0" />
            </van-col>
            <van-col :span="3">
              保留小数
              <StepNumber :to="stepNum" :precision="2" />
            </van-col>
            <van-col :span="6">
              插槽
              <StepNumber :to="stepNum">
                <template v-slot="{ value }">
                  value:{{ value }}
                  (和v-model一致)
                </template>
              </StepNumber>
            </van-col>
          </van-row>
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
import CardA from "@/components/CardA/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import ProgressBar from "@/components/Progress/ProgressBar.vue";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import ProgressCircle1 from "@/components/Progress/ProgressCircle1.vue";
import Animationend from "@/components/Animationend/Index.vue";
import Btn from "@/components/Btn/Index.vue";
import BlurBox from "@/components/BlurBox/Index.vue";
import ButtonGroup from "@/components/ButtonGroup/Index.vue";
import Webrtc from "@/components/Webrtc/Index.vue";
import StepNumber from "@/components/StepNumber/Index.vue";
import Spin from "@/components/Spin/Index.vue";

@Component({
  components: {
    Box,
    Subtitle,
    Lattices,
    Card,
    Icon,
    ProgressBar,
    ProgressCircle,
    ProgressCircle1,
    Animationend,
    Btn,
    BlurBox,
    ButtonGroup,
    Webrtc,
    StepNumber,
    Spin,
    CardA,
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

  radio = 1;

  stepNum = 0;

  created() {
    this.stepNum = Math.random() * 10000;
    setInterval(() => {
      // this.stepNum = Math.random() * 100000;
      this.stepNum += 10;
    }, 3000);
  }
  mounted() {
    setTimeout(() => {
      console.log(this.progress);
    }, 3000);
  }
}
</script>

<style lang="less" scoped></style>
