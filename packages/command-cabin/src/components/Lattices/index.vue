<template>
  <canvas ref="cvs" :width="width" :height="height"></canvas>
</template>

<script lang="ts">
import { Component, Ref, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class Lattices extends Vue {
  @Ref() cvs!: HTMLCanvasElement;

  @Prop({ default: 0 }) width!: number;
  @Prop({ default: 0 }) height!: number;

  /**
   * 画渐变线条
   */
  drawLinearRect(x: number, y: number, dir: "vertical" | "horization") {
    const { width, height } = this.cvs;
    const config = {
      vertical: {
        linearGradientArgs: [0, 0, width, 0],
        fillRectArgs: [x, y, width, 1],
      },
      horization: {
        linearGradientArgs: [0, 0, 0, height],
        fillRectArgs: [x, y, 1, height],
      },
    }[dir];
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.fillRect(...config.fillRectArgs);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  /**
   * 画删格
   */
  @Watch("width")
  @Watch("height")
  drawLattices() {
    const step = 20;
    const { width, height } = this.cvs;
    this.ctx = this.cvs.getContext("2d");
    // 清除画布
    this.ctx.clearRect(0, 0, width, height);
    // 画竖条
    for (let i = 0; i < this.cvs.height; i += step) {
      this.drawLinearRect(0, i, "vertical");
    }
    // 画横条
    for (let i = 0; i < this.cvs.height; i += step) {
      this.drawLinearRect(i, 0, "horization");
    }
    // 遮盖
    const radgrad = this.ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.min(width, height)
    );
    radgrad.addColorStop(0, "rgba(2, 6, 51, 0)");
    radgrad.addColorStop(0.5, "rgba(2, 6, 51, 1)");
    radgrad.addColorStop(1, "rgba(2, 6, 51, 1)");
    this.ctx.fillStyle = radgrad;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.fill();
  }

  mounted() {
    this.drawLattices();
  }
}
</script>

<style lang="scss" scoped></style>
