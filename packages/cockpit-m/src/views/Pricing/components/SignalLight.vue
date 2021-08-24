<template>
  <div class="signal">
    <span class="signal__light" :class="`signal__light--${color}`"></span>
    <span class="signal__label" v-if="showLabel">
      {{ label || labelMap[color] }}
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SignaLight extends Vue {
  @Prop() color!: "RED" | "GREEN" | "YELLOW";
  @Prop({
    type: Boolean,
  })
  showLabel?: boolean;
  @Prop() label?: string;

  labelMap = {
    RED: "降",
    GREEN: "涨",
    YELLOW: "平",
  };
}
</script>

<style lang="scss" scoped>
.signal {
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  &__light {
    display: inline-flex;
    width: 10px;
    height: 10px;
    border-radius: 12px;
  }
  &__light--RED {
    background: #ed6a72;
    box-shadow: 0px 4px 4px rgba(237, 106, 114, 0.2);
  }
  &__light--GREEN {
    background: #45c698;
    box-shadow: 0px 4px 4px rgba(69, 198, 152, 0.2);
  }
  &__light--YELLOW {
    background: #f6c34d;
    box-shadow: 0px 4px 4px rgba(246, 195, 77, 0.2);
  }
  &__label {
    font-size: 12px;
    color: #64696e;
    margin-left: 4px;
  }
}
</style>
