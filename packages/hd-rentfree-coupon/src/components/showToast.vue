<template>
  <div class="show-toast">
    <p>{{ showToast.msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'showToast',
  props: {
    showToast: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.show-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0 54px;
  z-index: 300;
  width: 100%;
  box-sizing: border-box;
  p {
    widows: 100%;
    background: rgba(0,0,0,0.7);
    border-radius: 10px;
    font-size: 16px;
    color: #ffffff;
    padding: 10px 10px;
    line-height: 26px;
  }
}
</style>
