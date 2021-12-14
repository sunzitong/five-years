<template>
  <div class="main-cont skin2">
    <div class="form-box">
      <div class="inter-user-name">
        <div class="head-img">
          <img
            class="user-avatar"
            :src="
              userImg
                ? userImg
                : 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/CMS/e0NRKFirS3Q.png?x-oss-process=image/resize,s_230/interlace,1/format,jpg'
            "
            alt
          />
        </div>
        <div class="head-info-box">
          <h2>{{ userName }}</h2>
          <p>邀请您入住龙湖冠寓</p>
        </div>
      </div>
      <!-- <div class="inter-form">
            <div class="input-box">
            <input
                type="number"
                maxlength="11"
                v-model="phone"
                placeholder="请输入手机号"
                class="InputCommon phonenumber"
                pattern="[0-9]*"
            />
            </div>
            <div class="input-box">
            <input
                type="number"
                v-model="PhoneCode"
                maxlength="6"
                placeholder="请输入验证码"
                class
                pattern="[0-9]*"
            />
            <span class="SendCode" v-if="sendCode" @click="UserSendcode">发送验证码</span>
            <span class="SendCode" v-else>{{countDown}}s</span>
            </div>
            
        </div> -->
      <!-- 接受邀请按钮 -->
      <div class="ReceivePrize" @click="rightGet"></div>
    </div>
    <div class="rules-box">
      <div class="rules-cont">
        <h3 class="active-rules-title">活动规则</h3>
        <div class="rules-text">
          <p>
            1.您的好友正在邀请您参与龙湖冠寓“友邻”计划，通过上方邀请功能使用您的手机并完成验证即可与您的好友完成好友绑定关系；
          </p>
          <p>
            2.绑定成功后您在活动有效期内成功在冠寓门店完成签约入住，您的好友将获得相应珑珠。
          </p>
          <br />
          <p>注：</p>
          <p>1.活动期间内您只能与一名好友进行绑定；</p>
          <p>2.部分指定冠寓门店不参与上述活动，请您在办理签约手续前咨询对应运营官所在门店是否参与该活动；</p>
          <p>3.请确保您用于签约的手机号与参与绑定的手机号一致，若签约手机号与参与绑定的手机号不一致，您的好友则无法成功获取。</p>
        </div>
      </div>
    </div>
    <div class="fixed" v-if="drawSucess"></div>
    <div class="getSuccess" v-if="drawSucess">
      <div class="SuccessTitle">恭喜您</div>
      <div class="SucceContent">已经成功接受了好友邀请</div>
      <div class="SucceContent">{{ mimiProgram ? '快去选房入住吧' : '快下载冠寓app去签约吧' }}</div>
      <a
        v-if="isWx"
        class="DownApp"
        @click="DownloadApp"
        href="https://a.app.qq.com/o/simple.jsp?pkgname=com.guanyu.gy&channel=0002160650432d595942&fromcase=60001"
        >下载 冠寓APP</a
      >
      <div v-else class="DownApp" @click="DownloadApp">
        {{ mimiProgram ? '去逛逛' : '下载 冠寓APP' }}
      </div>
      <img src="../assets/close.png" alt @click="CloseShaow" />
    </div>
    <div class="shadow" @touchmove.prevent @click="CloseShaow" v-if="shadow"></div>
    <div class="ShowToast" v-if="showOnOff">{{ content }}</div>
  </div>
</template>

<script>
import '../style/reset.css';
import './index.scss';
import {
  getPhoneCode,
  getInforMation,
  getCityList,
  getNearbyHouse,
  getUserInfo,
  UserAcceptInter,
} from '../utils/http';
import { positionIp } from '../utils/share';
import { getToken, toLogin } from '../utils/guanyu';
import { wxShare } from '@guanyu/h5-tools';
import { setInterval, clearInterval, setTimeout } from 'timers';
// import zhugeio from '../utils/zhugeio'
import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      rules: '活动细则',
      showRules: false,
      shadow: false,
      loading: false,
      sendCode: true, // 是否显示发送验证码
      countDown: 60,
      timer: '',
      content: '--',
      mimiProgram: false, // 是否在小程序中
      showOnOff: false, // 提示开关
      userName: '--',
      userImg: '',
      cityId: '', // 当前城市id
      sendPhonLock: true, // 验证码锁
      sendInterLock: true, // 邀请锁
      sendParams: {
        token: '',
        cityName: '',
        userId: '',
      }, // 接受邀请对象参数集
      drawSucess: false,
      isWx: false, // 当前环境是否是微信环境
      phone: '',
      houseAry: [],
      PhoneCode: '', // 验证码
    };
  },
  watch: {
    PhoneCode() {
      this.PhoneCode = this.PhoneCode.slice(0, 6);
      if (this.PhoneCode.length > 0) {
        this.clearPhoneCode = true;
      } else {
        this.clearPhoneCode = false;
      }
    },
    phone() {
      this.phone = this.phone.slice(0, 11);
      if (this.phone.length > 0) {
        this.clearPhone = true;
      } else {
        this.clearPhone = false;
      }
    },
  },
  beforeMount() {
    const source = judgeDevice();
    zhugeio({
      appKey: 'c6911bc459bb41a5acbb720e91057739', // 选填 默认：   3ec10a66f82f4951ba811df964fcc199
      jsSrc: 'https://datain.longfor.com/zhuge.js?v=', // 选填 默认：https://dataintest.longfor.com/zhuge.js?v=

      options: {
        superProperty: {
          访问来源: source === 'browser' ? '其他' : source,
        },
        adTrack: false, // 广告监测开关
        zgsee: false, // 视屏采集开关
        autoTrack: true, // 启用全埋点采集
        singlePage: true, //是否是单页面应用（SPA），启用autoTrack后生效
      }, // 选填
    });
  },
  mounted() {
    window.zhuge.track('邀请好友入驻冠寓页');
    this.getIntialDate();
    this.getUserInof();
    this.initShare();
  },
  methods: {
    getLocation() {
      let geolocation;
      //加载地图，调用浏览器定位服务
      const mapObj = new window.AMap.Map('iCenter');
      var that = this;
      mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 1000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 60 * 24 * 60 * 60 * 1000, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        window.AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
        window.AMap.event.addListener(geolocation, 'error', onError); // 返回定位出错信息
      });
      // 解析定位结果
      function onComplete(data) {
        localStorage.setItem('lat', data.position.lat);
        localStorage.setItem('lng', data.position.lng);
        that.handleGetArea(data.position.lng, data.position.lat);
      }
      // 解析定位错误信息
      function onError() {
        // 如果高德进行ip定位失败之后 最后的退级方案就是给默认北京的ip
        localStorage.setItem('lat', '39.9219');
        localStorage.setItem('lng', '116.44355');
        that.getDefaultCity();
      }
    },
    initShare() {
      const url = `${window.location.origin}/fe/newfriend`;
      wxShare({
        api: `${window.location.origin}/gymwebsite/getJsapiSigna`, // 获取微信鉴权的接口地址,
        title: '够朋友，一起住冠寓', // 分享标题,
        debug: false,
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/CMS/T-N_QvfOtgQ.jpg', // 分享图标,
        desc: '住好房，拿好礼。加入够友圈，神秘大礼包送不停！', // 分享描述,
        type: '', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
      });
    },
    getIntialDate() {
      var ua = window.navigator.userAgent.toLowerCase();
      let url = encodeURIComponent(window.location.href.split('#')[0]);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 微信环境
        window.wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            this.mimiProgram = true; // 小程序中
          } else {
            this.isWx = true;
          }
        });
        if (localStorage.getItem('lng')) {
          // 已经定位过 并且成功获取ip地址
          let lat = localStorage.getItem('lat');
          let lng = localStorage.getItem('lng');
          this.handleGetArea(lng, lat);
        } else {
          // 首次获取ip
          this.getLoAndLa(url); // 微信中调用 JS-SDK 获取坐标
        }
      } else {
        // 非微信环境调用 高德地图 获取横纵坐标
        this.isWx = false;
        this.getLocation();
      }
    },
    getUserInof() {
      // 获取邀请人信息
      this.sendParams.token = this.$route.query.encodeuserId;
      getUserInfo(this.sendParams.token)
        .then((res) => {
          if (!res.data.data.nn) {
            this.userName = res.data.data.pp;
            this.userImg = res.data.data.img;
          } else {
            this.userName = res.data.data.nn;
            this.userImg = res.data.data.img;
          }
        })
        .catch(() => {
          // id 失效导致  获取不到用户信息
        });
    },
    changeToHouseDetail(item) {
      let user = navigator.userAgent.toLowerCase();
      if (user.match(/MicroMessenger/i) == 'micromessenger') {
        window.wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            window.wx.miniProgram.navigateTo({
              url: `/packageA/pages/shopDetail/shopDetail?itemId=${item.itemId}&projectname=${item.itemName}`,
            });
          } else {
            window.location.href = `http://m.iguanyu.com/guanyuDetail/${item.itemId}`;
          }
        });
      } else {
        window.location.href = `http://m.iguanyu.com/guanyuDetail/${item.itemId}`;
      }
    },
    getLoAndLa(url) {
      // 获取用户appid 等信息
      getInforMation(url)
        .then((res) => {
          positionIp(res.data.data)
            .then((res) => {
              // 获取 经纬坐标
              localStorage.setItem('lat', res.latitude);
              localStorage.setItem('lng', res.longitude);
              this.handleGetArea(res.longitude, res.latitude);
            })
            .catch(() => {
              // 在JS-SDK拿不到经纬度坐标信息的时候 调用高德定位
              this.getLocation();
            });
        })
        .catch(() => {
          // 获取用户信息失败  即返回数据为null 发起高德IP定位
          this.getLocation();
        });
    },
    handleGetArea(longitude, latitude) {
      // 获取附近门店信息
      var newLa = latitude,
        newLo = longitude;
      if (!longitude) {
        // 如果经纬度值不正确  走默认北京地址
        (newLo = '116.44355'), (newLa = '39.9219');
      }
      this.$jsonp(
        `https://restapi.amap.com/v3/geocode/regeo?radius=1000&key=3f805862d8b2849adca9400d82b90ca2&extensions=all&location=${newLo},${newLa}`
      )
        .then((res) => {
          let resDate = res.regeocode.addressComponent,
            cityName;
          if (Array.isArray(resDate.city)) {
            cityName = resDate.province;
          } else {
            cityName = resDate.city;
          }
          if (cityName.indexOf('市') > 0) {
            cityName = cityName.slice(0, cityName.length - 1);
          }
          this.sendParams.cityName = cityName;
          getCityList()
            .then((res) => {
              let allCity = res.data.data;
              for (let i = 0; i < allCity.length; i++) {
                if (allCity[i].name == cityName) {
                  this.cityId = allCity[i].id;
                  getNearbyHouse(allCity[i].id).then((res) => {
                    const { data = {} } = res || {};
                    const { data: newData = {} } = data;
                    const { items = {} } = newData;
                    const { items: newItems = [] } = items;
                    this.houseAry = newItems;
                  });
                }
              }
            })
            .catch(() => {
              // 如果获取城市列表接口报错  即将获取默认地区：北京
              this.getDefaultCity();
            });
        })
        .catch(() => {
          // 如果高德获取地区名称失败  即将获取默认地区：北京
          this.getDefaultCity();
        });
    },
    getDefaultCity() {
      getNearbyHouse(1).then((res) => {
        const { data = {} } = res || {};
        const { data: newData = {} } = data;
        const { items = {} } = newData;
        const { items: newItems = [] } = items;
        this.houseAry = newItems;
      });
    },
    // 登录
    login(webviewUrl = '') {
      const token = getToken();
      // 未登录
      if (!token) {
        toLogin(webviewUrl);
        return;
      }
    },
    rightGet() {
      window.zhuge.track('邀请好友入驻冠寓页-立即领取按钮');
      // 立即领取
      // let PhoneTEST = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/;
      // if (!PhoneTEST.test(this.phone)) {
      //   this.showModel('', '很抱歉您输入的手机号码有误 请检查重新输入');
      //   return;
      // }
      // if (this.sendCode) {
      //   this.showModel('', '请先发送验证码');
      //   return;
      // }
      // if (!this.sendInterLock) {
      //   return;
      // }
      const token = getToken();
      if (!token) {
        toLogin();
        return;
      }
      this.sendInterLock = false;
      let sendDate = {
        channel: 'app',
        city: '北京',
        applicantToken: token,
        token: this.sendParams.token,
        // applicantPhone: this.phone,
        // verificationCode: this.PhoneCode,
      };
      UserAcceptInter(sendDate)
        .then((res) => {
          if (res.data.code == '0') {
            this.drawSucess = true;
            this.shadow = true;
            this.clearInfor();
          } else if (res.data.code == '100') {
            if (res.data.msg === '推荐活动不存在') {
              this.showModel('', '好友邀请活动已结束，暂不可领取');
            } else {
              this.showModel('警告', `${res.data.msg}`);
            }
          } else {
            this.showModel('警告', `${res.data.msg}`);
          }
          this.sendInterLock = true;
        })
        .catch(() => {
          this.sendInterLock = true;
        });
    },
    clearInfor() {
      clearInterval(this.timer);
      this.sendInterLock = true;
      this.sendCode = true;
      this.countDown = 60;
      this.phone = '';
      this.PhoneCode = '';
    },
    RulesStatus() {
      // 活动规则
      this.showRules = !this.showRules;
      this.shadow = !this.shadow;
    },
    CloseShaow() {
      // 关闭按钮
      this.showRules = false;
      this.shadow = false;
      this.drawSucess = false;
    },
    UserSendcode() {
      // 发送验证码
      const PhoneTest = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/;
      if (!PhoneTest.test(this.phone)) {
        this.showModel('警告', '很抱歉您输入的手机号码有误请检查重新输入');
        return;
      } else {
        if (!this.sendPhonLock) {
          return;
        }
        clearInterval(this.timer);
        this.sendPhonLock = false;
        getPhoneCode(`${this.phone}`)
          .then((res) => {
            if (res.data.code == '0') {
              this.sendCode = false;
              this.timer = setInterval(() => {
                this.countDown--;
                if (this.countDown == '0') {
                  setTimeout(() => {
                    this.sendCode = true;
                    this.countDown = 60;
                  }, 1000);
                }
              }, 1000);
              this.showModel('短信发送成功', '短信发送成功请注意查收');
            }
            this.sendPhonLock = true;
          })
          .catch(() => {
            this.sendPhonLock = true;
          });
      }
    },
    DownloadApp() {
      if (this.mimiProgram) {
        // 小程序中
        window.wx.miniProgram.switchTab({ url: '/pages/index/index' });
      } else {
        window.location = 'guanyu://';
        setTimeout(() => {
          window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
        }, 600);
      }
    },
    showModel(title, content) {
      this.showOnOff = true;
      this.content = content;
      setTimeout(() => {
        this.showOnOff = false;
      }, 2000);
    },
  },
};
</script>
