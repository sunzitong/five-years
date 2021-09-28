<template>
  <Spin :height="700" :loading="loading" :empty="empty">
    <div class="page__project_opening__map">
      <div class="whole_pannel">
        <B1A class="on_left" />
        <B1B class="on_right" />
      </div>
      <div class="position">
        <van-row class="legend-group">
          <van-col :span="8">
            <span class="legend"></span>
            <span>重资产</span>
          </van-col>
          <van-col :span="8">
            <div class="legend"></div>
            <span>中资产</span>
          </van-col>
          <van-col :span="8">
            <div class="legend"></div>
            <span>轻资产</span>
          </van-col>
        </van-row>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import B1A from "./B1A.vue";
import B1B from "./B1B.vue";
import { Base } from "@/views/Base";

@Component({
  components: {
    B1A,
    B1B,
  },
})
export default class B1 extends Base {}
</script>

<style lang="scss" scoped>
.whole_pannel {
  display: flex;
  flex-flow: row nowrap;

  .on_left {
    width: 787px;
    height: 800px;
  }

  .on_right {
    flex: 1;
    height: 664px;
  }
}

.van-col {
  span {
    vertical-align: middle;
    margin-left: 18px;
  }
}

.legend-group {
  font-size: 36px;
  line-height: 36px;
  color: #90a4c3;
  width: 486px;
  margin: 0 auto;

  .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 16px;
  }
}

.position {
  position: absolute;
  top: -66px;
  right: 20px;
}

.van-col:nth-child(1) .legend {
  background-color: #5180e4;
}
.van-col:nth-child(2) .legend {
  background-color: #f7d14a;
}
.van-col:nth-child(3) .legend {
  background-color: #b491fd;
}
</style>
