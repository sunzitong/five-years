<template>
  <div class="prize-popup">
    <div class="fixed"></div>
    <div class="main-cont">
      <img src="../../assets/img/prize-bg.png" alt class="img-bg" />
      <div class="prize-cont">
          <div  class="img-box">
              <img :src="prizeObj.icon" alt="">
          </div>
          <p>{{prizeObj.prizeDes}}</p>
      </div>
      <!-- 成功按钮 -->
      <div class="my-prize-btn" @click="toPrize()"></div>
      <div class="close-btn" @click="closeBtn()"></div>
    </div>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import { Component, Vue } from "vue-property-decorator";

@Component({
    props: ["prizeObj"]
})
export default class Prize extends Vue {
  toPrize() {
    this.$router.push({
      path: "./myPrize"
    });
  }
  closeBtn () {
      this.$emit('closeBtn');
  }
}
</script>
