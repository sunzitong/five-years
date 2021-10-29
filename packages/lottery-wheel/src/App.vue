<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "@/assets/css/base.css";
export default {
  name: 'App'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body,
html {
  min-height: 100%;
  height: 100%;
  /* background: #ff5067; */
  /* background: url('../../../static/img/body.png');
  background-size: 50px 50px; */
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif,"微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.28rem;
}
</style>