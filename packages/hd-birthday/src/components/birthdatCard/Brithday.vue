<template>
  <div class="wishes" v-if="BrithdayIsShow">
    <div class="box1">
      <div class="greetings">
        <h3>亲爱的 {{userInfo.userName}}</h3>
        <p class="description">
          成长不期而遇<br>
          生日如期而至<br>
          感谢时间轨迹里的遇见<br>
          感谢这一路上的陪伴<br>
          在这个都属于你的日子里<br>
          做个被宠爱的人吧<br>
          勇敢前行<br>
          不惧时光<br>
        </p>
        <div class="greet_end">
          <p class="time">{{$moment(birthdayInfo.birthdayTime).format('YYYY.MM.DD')}}</p>
          <p class="sign">{{userInfo.projectName}}全体敬上</p>
        </div>
      </div>
      <div class="btn" @click="ToHome" v-if="share">邀好友为爱充电</div>
    </div>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
  import './index.less'
  export default {
    name: 'birthdatCard',
    props: {
      BrithdayIsShow: {
        type: Boolean,
        default: false
      },
      userInfo: {
        type: Object,
        default: () => ({})
      },
      birthdayInfo: {
        type: Object,
        default: () => ({})
      },
      roomData: {
        type: Array,
        default: () => ([])
      },
      share: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    methods: {
      ToHome() {
        this.$emit('ShowBirthday', false)
        window.zhuge.track('生日贺卡页-邀请好友按钮')
      }
    }
  }
</script>
