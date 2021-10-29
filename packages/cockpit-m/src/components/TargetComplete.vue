<template>
  <div class="climbing__wrapper">
    <div class="climbing__time">
      <div class="countdown"><slot></slot></div>
      <div class="status">{{ status }}</div>
    </div>
    <div class="climbing__info">
      <p
        :class="{
          explane: true,
          success: complete,
          fail: !complete,
        }"
      >
        {{ explane }}
      </p>
      <div class="cycle">{{ cycle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ProCard from "@/components/ProCard.vue";

@Component({
  components: {
    ProCard,
  },
})
export default class TargetComplete extends Vue {
  /**
   * 状态
   */
  @Prop({ default: "" }) status!: string;

  /**
   * 说明
   */
  @Prop({ default: "" }) explane!: string;

  /**
   * 周期
   */
  @Prop({ default: "" }) cycle!: string;

  /**
   * 是否达成
   */
  @Prop({ default: true }) complete!: boolean;

  mounted() {
    // ajax
  }
}
</script>

<style lang="scss" scoped>
.climbing__wrapper {
  display: flex;
  padding: 8px 10px;
  margin: 0 18px;
  min-height: 80px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #f4f3f7;
  box-sizing: border-box;
  box-shadow: 0px 0px 14px rgba(226, 232, 240, 0.34);
  border-radius: 2px;
}

.climbing__time {
  display: flex;
  flex-flow: column;
  margin-right: 20px;
  .countdown {
    flex: 1;
  }
  .status {
    color: #64696e;
    text-align: center;
  }
}
.climbing__info {
  display: flex;
  flex-flow: column;
  flex: 1;
  .explane {
    flex: 1;
  }

  .explane.success {
    color: #45c698;
  }
  .explane.fail {
    color: #dc5564;
  }
  .cycle {
    color: #232832;
  }
}
</style>
