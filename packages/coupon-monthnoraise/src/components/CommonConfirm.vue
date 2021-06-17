<template>
  <div class="shadow-container">
    <div class="container">
      <div class="title">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
      <div class="btn" @click="confirm">我知道了</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class CommonConfirm extends Vue {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: "" }) desc!: string;

  confirm() {
    this.$emit("confrimCb");
  }
}
</script>
<style lang="scss" scoped>
.shadow-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    background: #ffffff;
    border-radius: 8px;
    width: 305px;

    .title {
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
      color: #333333;
      margin: 20px 20px 0px 20px;
    }

    .desc {
      font-size: 15px;
      line-height: 21px;
      text-align: center;
      color: #333333;
      margin: 20px 20px 0px 20px;
    }

    .btn {
      margin-top: 20px;
      height: 52px;
      border-top: 0.5px solid rgba(0, 0, 0, 0.08);
      font-weight: bold;
      font-size: 17px;
      line-height: 52px;
      text-align: center;
      color: #f18d00;
    }
  }
}
</style>
