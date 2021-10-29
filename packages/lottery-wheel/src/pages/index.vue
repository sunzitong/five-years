<template>
  <div class="index">
    <the-wheel></the-wheel>
  </div>
</template>

<script>
/* eslint-disable*/
import TheWheel from '../components/thewheel'
import { setTimeout } from 'timers';
export default {
  name: 'index',
  components: {
    TheWheel
  },
  mounted() {
    setTimeout(() => {
      window.zhuge.track('积分抽奖页')
    }, 2000)
  }
}
</script>
