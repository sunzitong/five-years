<template>
  <div class="box">
    <div class="content">
      <Icon type="power" :size="160" />
      <div class="desc">
        <span class="value__letter value">-34</span>
        <span class="unit">万</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";

@Component({
  components: { Icon },
})
export default class D8 extends Vue {}
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
}
.content {
  @extend %flex-center;
  width: 100%;
  .desc {
    color: #01f5f1;
  }
  .value {
    font-weight: bold;
    font-size: 60px;
  }
  .unit {
    font-size: 26px;
  }
}
</style>
