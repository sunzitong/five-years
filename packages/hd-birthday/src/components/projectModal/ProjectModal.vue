<template>
  <div class="projectModal" v-if="show">
    <div class="Modal">
        <h3 class="title">为爱充电 邀好友助力发红包 为您充值水电费</h3>
        <p class="check">请选择需要一个充值的房间：</p>
        <ul>
          <li
              v-for="(item, index) in roomData"
              :key="item.roomId"
              @click="getRoomId(item.roomId, index)"
              :class="{current:current === index}">
            {{item.projectName}}-{{item.roomName}}
          </li>
        </ul>
        <div class="btn_inviate" @click="wxShare">邀请好友助力</div>
        <div class="btn_shut" @click="$emit('update:show',false)"></div>
    </div>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
  import './index.less'
  import {
    ShowSharePanel
  } from '@guanyu/guanyu-h5-tools'
  export default {
    name: 'ProjectModal',
    data() {
      return {
        roomId: this.roomData[0].roomId,
        current: 0,
        miniType: 0
      }
    },
    mounted() {
      this.judgeEnv()
    },
    props: {
      roomData: {
        type: Array,
        defalut: () => ([])
      },
      userInfo: {
        type: Object,
        default: () => ({})
      },
      show: {
        type: Boolean,
        default: () => (false)
      },
      token: {
        type: String,
        default: () => ('')
      }
    },
    components: {},
    methods: {
      // 判断处于那个环境
      judgeEnv() {
        if (!window.location.href.includes('m.iguanyu.com')) {
          this.miniType = 2
        }
      },
      wxShare() {
        window.zhuge.track('生日红包活动页-邀请好友微信分享按钮')
        const { birthDay, userId } = this.$route.query
        ShowSharePanel({
          types: ['wx_session'],
          title: `【龙湖冠寓】${this.userInfo.userName}寿星宝宝要过生日了，Ta发来一条撒娇`,
          text: '寿星宝宝有个小需求，快来看看满足ta吧',
          url: window.location.href,
          image: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/ciRWx0WzMz4.png',
          shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(`/packageA/pages/birthday/birthday?userId=${encodeURIComponent(userId)}&birthDay=${encodeURIComponent(birthDay)}&roomId=${encodeURIComponent(this.roomId)}&token=${encodeURIComponent(this.token)}`)}&appId=wx1c1c8c073e2be1fc&type=${this.miniType}`
        })
      },
      getRoomId(e, index) {
        this.roomId = e
        this.current = index
      }
    }
  }
</script>
