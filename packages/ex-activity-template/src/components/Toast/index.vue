<template>
  <div class="toastMessageBox" v-show="show">{{message}}</div>
</template>

<script>
export default {
  name: 'toastMessage',
  data() {
    return {
      message: '',
      show: false,
    };
  },
};
</script>

<style lang='less' scoped>
@import 'index.less';
</style>
