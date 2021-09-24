<template>
  <!-- <Spin :height="833" :loading="loading" :empty="empty"> -->
  <div class="page__d5__map">
    <div class="whole_pannel">
      <div class="big_title">
        <div>金额</div>
        <div class="big_values">
          <span>{{ sepNumber(201485) }}</span>
          万
          <span>{{ 1.4 }}%</span>
          逾期率
        </div>
      </div>
      <div class="center">
        <div class="flex_box">
          <div class="text_style">
            长租
            <span>{{ sepNumber(2200.34) }}</span>
            万
            <div class="whole_border_box">
              <div class="border_box">
                企客
                <span>{{ 1218900 }}</span>
                万
              </div>
              <div class="border_box">
                散客
                <span>{{ 36 }}</span>
                万
              </div>
            </div>
          </div>
          <div class="text_style">
            底商增值
            <span>{{ sepNumber(200.34) }}</span>
            万
          </div>
          <div class="text_style">
            一展空间
            <span>{{ sepNumber(1296) }}</span>
            万
          </div>
        </div>
      </div>
      <div class="big_title">
        <div>轻资产待回款</div>
        <div class="big_values">
          <span>{{ sepNumber(201485) }}</span>
          万
        </div>
      </div>
    </div>
  </div>
  <!-- </Spin> -->
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";

@Component({
  components: {},
})
export default class D5 extends Base {}
</script>

<style lang="scss" scoped>
.whole_pannel {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  color: #90a4c3;
  padding: 66px 52px 104px 52px;

  .big_title {
    font-size: 40px;
    line-height: 40px;

    .big_values {
      font-size: 36px;
      line-height: 36px;
      margin-top: 6px;

      span:nth-child(1) {
        @extend %value-font;
        font-weight: bold;
        font-size: 66px;
        line-height: 77px;
        color: #dbf0ff;

        margin: 12px 2px 30px 0;
      }
      span:nth-child(2) {
        @extend %value-font;
        font-weight: bold;
        font-size: 66px;
        line-height: 77px;
        color: #ff3980;

        margin: 12px 2px 30px 30px;
      }
    }
  }

  .center {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 17px;
      bottom: 80px;
      left: 0;
      width: 10px;
      background: linear-gradient(0deg, #556aa9, #556aa9 33%, transparent 33%);
      background-size: 100% 12px;
    }
  }

  .text_style:before {
    display: inline-block;
    content: "";
    background: #556aa9;
    width: 42px;
    height: 4px;
    vertical-align: top;
    position: relative;
    top: 20px;
  }
  .center {
    margin: 22px 0 2px 120px;

    .flex_box {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;

      .text_style {
        font-size: 36px;
        line-height: 36px;
        margin-bottom: 60px;

        span {
          @extend %value-font;
          font-weight: bold;
          font-size: 48px;
          line-height: 36px;
          color: #dbf0ff;
        }
      }

      .whole_border_box {
        margin: 24px 0 0 151px;
      }

      .border_box {
        display: flex;
        align-items: center;
        height: 48px;
        width: 424px;
        background: linear-gradient(
          89.96deg,
          rgba(5, 203, 253, 0.1) 0%,
          rgba(0, 127, 249, 0) 100.9%
        );
        backdrop-filter: blur(10px);

        font-size: 36px;
        line-height: 36px;
        color: #90a4c3;
        &::before {
          content: "";
          width: 2px;
          height: 100%;
          background: #5180e4;
          box-shadow: 0px 0px 10px #5180e4;
          margin-right: 30px;
        }
        span {
          margin: 0 6px 0 80px;
          width: 150px;
          @extend %value-font;
          font-weight: bold;
          font-size: 36px;
          line-height: 42px;
          color: #dbf0ff;
          opacity: 0.9;
          text-align: right;
        }
      }
    }
  }
}
</style>
