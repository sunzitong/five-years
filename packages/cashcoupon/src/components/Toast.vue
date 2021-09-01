<template>
  <div class="toast-popup">
    <span>{{toast.msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    toast: Object,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .toast-popup {
    position: absolute;
    left: 50%;
    top: 30%;
    background: #cccccc;
    transform: translate(-50%, 0);
    z-index: 40;
    width: 100%;
    height: 100%;
    text-align: center;
    animation: toastShow 20s forwards;
    span {
      padding: 20px 30px;
      background: rgba(0,0,0,0.7);
      color: #ffffff;
      font-size: 15px;
      border-radius: 10px;
    }
  }

  @keyframes toastShow {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
