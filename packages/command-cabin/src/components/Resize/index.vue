<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Box extends Vue {
  isDev = process.env.NODE_ENV !== "development";

  resizeHandle() {
    const { clientWidth } = document.body;
    document.body.style.transformOrigin = "left top";
    document.body.style.transform = `scale(${clientWidth / 7680})`;
  }

  mounted() {
    if (!this.isDev) return;
    this.resizeHandle();
    window.addEventListener("resize", this.resizeHandle);
  }
  unmounted() {
    if (!this.isDev) return;
    window.addEventListener("resize", this.resizeHandle);
  }
}
</script>
