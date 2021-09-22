<template>
  <div class="operation">
    <div class="line"></div>
    <van-row>
      <van-col span="10">
        <h4 class="label">平均出租率(开业三月以上)</h4>
        <div class="">
          <strong>95.3%</strong>
          环比
          <strong class="desc">95.3%</strong>
          <span class="icon">
            <Icon type="desc" color="#22cb98" size="62" />
          </span>
        </div>
        <div class="pointOfTime">时点 84.2%</div>
      </van-col>
      <van-col span="14">
        <h4 class="label">平均续租率</h4>
        <div class="">
          <strong>95.3%</strong>
          环比
          <span class="icon">
            <Icon type="desc" color="#22cb98" size="62" />
          </span>
          <strong>95.3%</strong>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="10" style="padding-top: 30px">
        <h4 class="label">同房间价格涨幅</h4>
        <div class="">
          <strong>95.3%</strong>
          同比
          <span class="icon">
            <Icon type="desc" color="#22cb98" size="62" />
          </span>
        </div>
      </van-col>
      <van-col span="5" style="padding-top: 30px">
        <h4 class="label">在租房间平均成交价(元)</h4>
        <div class="">
          <strong>95.3%</strong>
          <span class="icon">
            <Icon type="asce" color="#FF3980" size="62" />
          </span>
        </div>
      </van-col>
      <van-col span="5" style="padding-top: 30px">
        <div class="simple">
          <span class="label">新签上涨:</span>
          <strong>100%</strong>
        </div>
        <div class="simple">
          <span class="label">续租下降:</span>
          <strong>100%</strong>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import Icon from "@/components/Icon/Index.vue";

@Component({
  components: {
    Icon,
  },
})
export default class D1B extends Base {
  mounted() {
    /**/
  }
}
</script>

<style lang="scss" scoped>
$light: rgba(219, 240, 255, 1);
$desc: #22cb98;
$asce: #ff2a76;

.operation {
  padding: 0 43px;
  .line {
    height: 2px;
    margin: 0 0 30px 0;
    background-image: linear-gradient(
      to right,
      #4d609d 0%,
      #4d609d 50%,
      transparent 50%
    );
    background-size: 20px 2px;
    background-repeat: repeat-x;
  }

  .label {
    font-size: 30px;
    font-weight: normal;
    color: rgba(144, 164, 195, 1);
  }

  strong {
    font-style: normal;
    font-size: 66px;
    color: $light;
    @extend %value__letter;
  }

  .simple {
    display: flex;
    align-items: center;
    padding-left: 27px;
    line-height: 58px;
    border-left: 2px solid #5180e4;
    background: linear-gradient(
      89.96deg,
      rgba(5, 203, 253, 0.1) 0%,
      rgba(0, 127, 249, 0) 100.9%
    );
    strong {
      margin-left: 10px;
      font-size: 40px;
    }
  }

  .icon {
    margin: 0 10px;
  }

  .pointOfTime {
    display: inline-block;
    padding: 0 10px;
    background: #29374b;
    border-radius: 20px;
    color: #fff;
    font-size: 20px;
  }

  .desc {
    color: $desc;
  }
  .asce {
    color: $asce;
  }
}
</style>
