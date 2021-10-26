<template>
  <router-link
    :to="url"
    class="fix-to-home"
  >返回首页</router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { stringify } from 'qs';
@Component
export default class BackHome extends Vue {
  url = ""
  created() {
    const url = stringify(this.$route.query) + this.$route.hash;
    this.url = "/?" + url;
  }
}
</script>
