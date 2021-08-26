<template>
  <div class="confirm-wapper">
    <div class="box-container">
      <div :class="['top-container', !desc ? 'auto-min-height' : '']">
        <div class="title">{{title}}</div>
        <div class="desc">{{desc}}</div>
      </div>
      <div class="button-container">
        <div v-if="!hasOneBtn" class="btn active" @click="use">立即使用</div>
        <div v-if="!hasOneBtn" class="split-line" />
        <div :class="['btn', hasOneBtn ? 'active' : '']" @click="close">确定</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ConfirmModal extends Vue {
  @Prop({ default: false }) show!: boolean;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) desc!: string;
  @Prop({ default: false }) hasOneBtn!: boolean;
  scrollX = 0;
  scrollY = 0;
  @Watch('show')
  restoreScroll(show: boolean) {
    if (show) {
      this.scrollY = window.scrollY;
      this.scrollX = window.scrollX;
    } else {
      window.scroll(this.scrollX, this.scrollY);
    }
  }
  // 关闭层
  close() {
    this.$emit('close');
  }
  use() {
    this.$emit('use');
  }
}
</script>

<style lang="scss">
.confirm-wapper {
  background: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;

  .box-container {
    background-color: #ffffff;
    border-radius: 8px;
    width: 305px;

    .top-container {
      padding: 20px 20px 10px;
      min-height: 105px;
      box-sizing: border-box;
      &.auto-min-height {
        min-height: auto;
      }
      .title {
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        text-align: center;
        color: #333333;
        margin-bottom: 20px;
      }
      .desc {
        // margin-top: 20px;
        font-size: 15px;
        line-height: 21px;
        color: #333333;
      }
    }

    .button-container {
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      .btn {
        height: 54px;
        font-size: 17px;
        line-height: 54px;
        text-align: center;
        color: #666666;
        flex: 1;
        &.active {
          font-weight: bold;
          color: #f18d00;
        }
      }
      .split-line {
        width: 0.5px;
        height: 24px;
        background-color: #ebebeb;
      }
    }
  }
}
</style>