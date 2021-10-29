<template>
  <div class="share-tip">
    <div class="fixed" @click="closeBtn()"></div>
    <img src="../../assets/img/shareTip.png" alt="">
  </div>
</template>

<script lang="ts">
import "./index.scss";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ShareTip extends Vue {
  

  closeBtn() {
      this.$emit('closeShareTip');
  }
}
</script>
