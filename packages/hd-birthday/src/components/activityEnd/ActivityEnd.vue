<template>
  <div class="box">
    <div class="active_end">
      <p class="end_titile">
        {{userInfo.userName}}
        <br />生日已过完
      </p>
      <p class="end_description">友谊是最圣洁的灵物，她既会在同性中生根发芽，也会在异性中开花结果，有空的时候要常联系ta哦！</p>
      <img src="@/assets/box-bottom.png" class="end_box" />
      <img src="@/assets/end-sentences.png" class="end_sentences" />
      <div class="erweima"></div>
      <div class="end_footer">
        <p class="p1">龙湖冠寓</p>
        <p class="p2">青年白领公寓</p>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
  import './index.less'
  export default {
    props: {
      userInfo: {
        type: Object,
        default: () => ({})
      }
    },
    name: 'ActivityEnd',
    components: {}
  }
</script>
