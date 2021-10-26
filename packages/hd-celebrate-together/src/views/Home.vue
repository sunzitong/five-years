<template>
  <div class="home">
    <!-- 分享按钮 -->
    <div v-if="inWeChat" class="share-btn" @click="share()"></div>
    <div class="activity-cont">
      <h2>活动内容</h2>
      <p>不知不觉，龙湖冠寓已经四岁啦！非常感谢每一个朋友的陪伴，我们将在冠寓门店举办丰富的活动，希望大家能够带着自己的朋友一起来参与，共同为狮子座的冠寓和租客小可爱们庆生！</p>
      <h3>Goyoo星球，吃喝不愁、玩乐有伴！</h3>
    </div>
    <div class="enroll-box-wrap">
      <div class="enroll-box">
        <div class="form-box" @click="showCityPicker()">
          <label for>地区</label>
          <input type="text" placeholder="请选择地区" disabled v-model="params.cityName" />
        </div>
        <div class="form-box" @click="showProjectPicker()">
          <label for>门店</label>
          <input type="text" placeholder="请选择门店" disabled v-model="params.projectName" />
        </div>
        <div class="form-box">
          <label for>姓名</label>
          <input type="text" placeholder="请输入姓名" v-model="params.name" />
        </div>
        <div class="form-box">
          <label for>手机</label>
          <input type="number" placeholder="请输入手机号" v-model="params.phone" />
        </div>
      </div>
      <!-- 我要报名按钮 -->
      <div class="button" @click="submit()"></div>
    </div>
    <div class="rules-box">
      <h4>活动规则</h4>
      <p>
        <em>一、活动时间：</em>
        2020年9月4日
        <em>二、参与人群：</em>
        活动期间内登陆活动页面的龙湖冠寓用户。
        <em>三、注意事项：</em>
        1、冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。
        <br />2、在法律许可的范围内，冠寓保留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。
        <br />3、因不可抗力事件使本活动不能实现，冠寓不承担责任。不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件。
        <br />4、活动最终解释权归冠寓所有。
      </p>
    </div>
  </div>
</template>

<script>
  import './index.less'
  import { wxShare } from '@guanyu/h5-tools'
  import {
    /* eslint-disable no-unused-vars */
    Style,
    Picker
  } from 'cube-ui'
  // @ is an alias to /src

  export default {
    name: 'home',
    data() {
      return {
        cityList: [],
        projectList: [],
        inWeChat: true,
        params: {
          cityId: '',
          cityName: '',
          projectId: '',
          projectName: '',
          name: '',
          phone: ''
        },
        flag: true
      }
    },
    components: {},
    mounted() {
      const { cityId, cityName } = this.$route.query
      this.params.cityId = cityId
      this.params.cityName = cityName
      this.getCityList()
      this.getProjectLict(cityId)
      wxShare({
        debug: false, // 默认为false，不开启调试模式
        api: `${window.location.origin}/gymwebsite/getJsapiSigna`, // 获取微信鉴权的接口地址, 不填写默认为 /gymwebsite/getJsapiSigna
        title: '冠寓四重奏，由你放“肆“租：最高立减1个月房租', // 分享标题,
        link: `${window.location.href}?cityId=${cityId}&cityName=${cityName}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/R4j-zmLBdDM.jpg', // 分享图标,
        desc: '冠寓四重奏，由你放“肆“租：最高立减1个月房租', // 分享描述,
        type: '', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空,
      })
      this.$nextTick(() => {
        this.initailShareData()
      })
    },
    methods: {
      // 小程序初始化分享
      initailShareData() {
        let user = navigator.userAgent.toLowerCase()
        if (user.match(/MicroMessenger/i) == 'micromessenger') {
          this.inWeChat = false
          // 微信内
          window.wx.miniProgram.postMessage({
            data: {
              title: '冠寓四重奏，由你放“肆“租：最高立减1个月房租',
              imageUrl: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/R4j-zmLBdDM.jpg',
              path: window.location.href
            }
          })
        }
      },
      // 调用app分享小程序卡片，微信朋友圈，微博
      share() {
        const { cityId, cityName } = this.$route.query
        let url = encodeURIComponent(
          `${window.location.origin}/fe/hd-celebrate-together?cityId=${cityId}&cityName=${cityName}`
        )
        this.$ShowSharePanel({
          types: ['wx_session', 'wx_timeline', 'sina'],
          title: '冠寓四重奏，由你放“肆“租：最高立减1个月房租',
          text: '冠寓四重奏，由你放“肆“租：最高立减1个月房租',
          url: window.location.href,
          image:
            'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/R4j-zmLBdDM.jpg',
          shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
            `/packageA/pages/bearWeb/bearWeb?item=${url}`
          )}&appId=wx1c1c8c073e2be1fc&type=0`
        })
      },

      // 获取城市
      getCityList() {
        this.$axios.get('/commactivity-server/anniversary/city').then((res) => {
          const { status, data = [] } = res.data || {}
          if (status === 'ok') {
            this.cityList = data || []
          }
        })
      },
      // 根据城市获取对应门店列表
      getProjectLict(cityId) {
        this.$axios
          .get('/commactivity-server/anniversary/project', {
            params: { cityId: cityId || 1 }
          })
          .then((res) => {
            const { status, data = [] } = res.data || {}
            if (status === 'ok') {
              this.projectList = data || []
              if (!this.projectPicker) return
              this.projectPicker.$updateProps({
                title: '门店',
                data: [data],
                selectedIndex: [0]
              })
            }
          })
      },
      showCityPicker() {
        if (!this.cityPicker) {
          this.cityPicker = this.$createPicker({
            title: '城市',
            data: [this.cityList],
            onSelect: this.selectCityHandle
          // onValueChange: this.onChange
          })
        }
        this.cityPicker.show()
      },
      selectCityHandle(selectedVal, selectedIndex, selectedText) {
        this.params.cityId = selectedVal[0]
        this.params.cityName = selectedText[0]
        this.params.projectId = ''
        this.params.projectName = ''
        this.getProjectLict(selectedVal[0])
      },
      showProjectPicker() {
        if (!this.projectPicker) {
          this.projectPicker = this.$createPicker({
            title: '门店',
            data: [this.projectList],
            onSelect: this.selectProjectHandle
          })
        }
        this.projectPicker.show()
      },
      selectProjectHandle(selectedVal, selectedIndex, selectedText) {
        this.params.projectId = selectedVal[0]
        this.params.projectName = selectedText[0]
      },
      submit() {
        if (!this.flag) return
        if (!this.params.cityId) {
          this.toast = this.$createToast({
            txt: '请选择城市',
            type: 'txt'
          })
          this.toast.show()
          return
        }
        if (!this.params.projectId) {
          this.toast = this.$createToast({
            txt: '请选择门店',
            type: 'txt'
          })
          this.toast.show()
          return
        }
        if (!this.params.name) {
          this.toast = this.$createToast({
            txt: '请输入您的姓名',
            type: 'txt'
          })
          this.toast.show()
          return
        }
        if (!this.params.phone) {
          this.toast = this.$createToast({
            txt: '请输入手机号',
            type: 'txt'
          })
          this.toast.show()
          return
        }
        if (!parseInt(this.params.phone) || this.params.phone.length !== 11) {
          this.toast = this.$createToast({
            txt: '请输入正确的手机号',
            type: 'txt'
          })
          this.toast.show()
          return
        }
        this.flag = false
        this.$axios
          .post('/commactivity-server/anniversary/apply', this.params)
          .then((res) => {
            this.flag = true
            const { data, msg, status } = res.data || {}
            let title = ''
            if (status === 'ok') {
              title = '报名成功'
            } else {
              title = '报名失败'
            }
            this.$createDialog({
              type: 'alert',
              title,
              content: msg
            }).show()
          })
          .catch(() => {
            this.flag = true
            this.$createDialog({
              type: 'alert',
              title: '提示',
              content: '网络故障，请稍后再试'
            }).show()
          })
      }
    }
  }
</script>
