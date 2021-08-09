<template>
  <div class="toast" :class="showContent ? 'fadein' : 'fadeout'">
    <span>{{text}}</span>
  </div>
</template>

<script>
// import { setTimeout } from 'timers';
export default {
  name: 'toast',
  data () {
    return {
      text: '',
      showContent: false,
    }
  },
  methods: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
 .toast{
    margin: 0 55px;
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 44;
    span{
      padding: 15px 20px;
      display: block;
      box-sizing: border-box;
      background: rgba(0,0,0,0.85);
      border-radius: 8px;
      font-size: 15px;
      color: #fff;
      line-height: 21px;
    }
  }
  .fadein {
    animation: animate_in 0.3s;
  }
  .fadeout {
    animation: animate_out 0.3s;
    opacity: 0;
  }
  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>


