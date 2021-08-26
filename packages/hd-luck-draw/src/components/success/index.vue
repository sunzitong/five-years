<template>
  <div class="success-popup">
    <div class="fixed"></div>
    <div class="main-cont">
        <img src="../../assets/img/success.png" alt="">
        <!-- 成功按钮 -->
        <div class="success-btn" @click="toHome()"></div>
        <div class="close-btn" @click="closeBtn()"></div>
    </div>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import { Component, Vue } from "vue-property-decorator";
import { getToken } from "@/utils/guanyu";

@Component({
  props: ["prizeId"]
})
export default class Success extends Vue {
  
  toHome() {
      const token = getToken();
      this.$router.push({
          path: `./index?sessionId=${token}`
      })
  }

  closeBtn() {
      this.$emit('closeBtn');
  }
}
</script>
