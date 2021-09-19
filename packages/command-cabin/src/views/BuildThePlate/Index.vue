<template>
  <div class="page__plate">
    <SubWrapperA title="营造盘面详情" style="height: 2750px">
      营造盘面详情
    </SubWrapperA>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";

/**营造盘面详情 */
@Component({
  components: {
    SubWrapperA,
  },
})
export default class BuildThePlate extends Base {}
</script>

<style lang="scss" scoped>
.page__plate {
  width: 7070px;
  margin: 0 auto;
}
</style>
