<template>
  <div id="app">
    <div v-if="hasBright">
      <img class="BackImg" :src="`${publicPath}img/sources/dianliang_bg.jpg`" alt="">
      <img class="LogoBackImg" :src="`${publicPath}img/sources/logo.png`" alt="">
      <img class="goyooLightImg" :style="`opacity: ${changeOpacity}`"
        :src="`${publicPath}img/sources/goyoo_lighted.png`" alt="">
      <img class="LineFramImg" :src="`${publicPath}img/sources/lightSumText_Frame.png`" alt="">
      <div class="bodyJoinNumber">
        已有  {{joinNumber}}  人参与点亮
      </div>
      <span class="LastRawmTimes">剩余抽奖次数 {{lastDrawTimes}} 次</span>
      <div class="UnlightModel" v-if="scroppChange"></div>
      <div class="StoreDrawBox">
        <img class="DrawBigImg" :style="`transform: rotate(${rotateBox}deg)`"
        :src="`${publicPath}img/sources/fwheel_outer_spotLight.png`" alt="">
        <img class="DrawsmallImg" :src="`${publicPath}img/sources/fwheel_outerCircle.png`" alt="">
        <img class="RotatePan" :src="`${publicPath}img/sources/prizeGet.png`"
          alt="" :style="`transform: rotate(${rotate}deg)`">
        <img class="PlayRotate" :src="`${publicPath}img/sources/GoBtn.png`" alt=""
          @click="changeDraw">
      </div>
      <div class="joinMyPrize">
        <img class="JoinCommon" :src="`${publicPath}img/sources/my_prizBtn.png`"
          @click="checkMyPrize">
        <img class="JoinCommon" :src="`${publicPath}img/sources/shareBtn.png`" alt=""
          @click="ShareFriend">
      </div>
      <div class="joinPrandPart">
        <div class="JoinTop" @click="JoinOtherPage('Pr')">
          <img :src="`${publicPath}img/sources/BPS_Banner.png`" alt="">
        </div>
        <div class="JoinTop JoinBtn" @click="JoinOtherPage('Br')">
          <img :src="`${publicPath}img/sources/bannerBirth.png`" alt="">
        </div>
        <div class="GameRules">
          <span class="GameTitle">一、活动时间：</span>
          <p>2019年9月5日-2019年9月30日</p>
          <span class="GameTitle">二、参与人群：</span>
          <p>活动期间内登陆活动页面的龙湖冠寓用户。</p>
          <span class="GameTitle">三、抽奖次数：</span>
          <p>每人每天登陆即可获得一次抽奖机会，转发本页面给好友还可额外增加一次抽奖机会。</p>
          <span class="GameTitle">四、签约奖品：</span>
          <p class="RulesF">
            <span class="RulesS">1. </span>
            活动期间，凡在冠寓成功签约的前816名用户，
            额外获得“拎包入住大礼包”+goyooT恤+goyoo帆布袋一个，数量有限，先到先得。
          </p>
          <p class="RulesF"><span class="RulesS">1. </span>
            成功签约的第3名、33名、333名、3333名用户，还可额外获得“三重大礼包（switch+kindle+戴森吹风机）”一套。
          </p>
          <span class="GameTitle">五、领奖规则：</span>
          <p class="RulesF"><span class="RulesS">1. </span>
          用户通过抽奖所兑换的虚拟物品（包括但不限于小米代金券等）会以绑定手机号形式绑定在登陆手机号，
          在活动页面即可查看并兑换。</p>
          <p class="RulesF">
            <span class="RulesS">2. </span>
            用户通过抽奖获得的实物奖品会在活动页面进行展示，
            活动结束后会有工作人员通过您的登陆手机号与您取得联系并快递奖品
            （奖品快递收货地址仅限中国大陆地区，如中奖人无法提供中国大陆收获地址，视为放弃领奖资格）。
          </p>
          <p class="RulesF"><span class="RulesS">3. </span>
            签约奖品需用户在活动结束后在门店领取，具体以门店公示及运营官通知为准。</p>
          <p class="RulesF"><span class="RulesS">4. </span>
          实物奖品中奖人需确保提供的领奖信息清晰准确，如果因领奖信息有误、不完整或不清晰而导致奖品不能正常发放的情况，
          视为放弃领奖资格。 </p>
          <p class="RulesF">
            <span class="RulesS">5. </span>
            活动奖品以收到实物为准，冠寓有权用等价值的奖品对奖品清单中的奖品做替换。
          </p>
          <span class="GameTitle">【规则】：</span>
          <p class="RulesF">
            <span class="RulesS">1. </span>
            冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。
          </p>
          <p class="RulesF"><span class="RulesS">2. </span>
          在法律许可的范围内，冠寓留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。</p>
          <p class="RulesF">
            <span class="RulesS">3. </span>
            因不可抗力事件使本抽奖活动或本次抽奖目的不能实现，冠寓不承担责任。
            不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件。
          </p>
          <p class="RulesF"><span class="RulesS">4. </span>活动最终解释权归冠寓所有。</p>
        </div>
      </div>
    </div>
    <div v-else>
      <img class="BackImg" :src="`${publicPath}img/sources/dianliang_bg.jpg`" alt="">
      <img class="LogoBackImg" :src="`${publicPath}img/sources/logo.png`" alt="">
      <img class="goyooLightImg" :src="`${publicPath}img/sources/goyoo_unlighted.png`" alt="">
      <img class="LineFramImg" :src="`${publicPath}img/sources/lightSumText_Frame.png`" alt="">
      <div class="bodyJoinNumber">已有  {{joinNumber}}  人参与点亮</div>
      <img class="BirghtStart" :src="`${publicPath}img/sources/star.png`" alt=""
        @click="UserBirghtBtn">
      <img class="BirghtText"
        :src="`${publicPath}img/sources/BrightGoyoo.png`" alt="" @click="UserBirghtBtn">
      <!-- <img class="ClickGetPrize" :src="`${publicPath}img/sources/xiaozi.png`" alt=""> -->
      <div class="ClickGetPrize" @click="UserBirghtBtn">点亮立享千万好礼</div>
    </div>
    <div v-if="checkPrize">
      <div class="StorePrizeBox" v-if="showPrevent"
        @touchmove.prevent :style="{'height': celiHeight+'px'}">
        <img class="ClosePrizeList"
          :src="`${publicPath}img/sources/closeBtn.png`" alt="" @click="checkMyPrize">
          <div v-if="PrizeListBox.length == 0" class="noPirze">主人您还没有获得任何奖品~</div>
          <div class="StoreALL" v-else>
            <div class="MainBox" v-for="(item, index) in PrizeListBox" v-bind:key="index">
              <div class="prizeOfentiy" v-if="item.prizeType == 0">
                <h1 class="PrizeTitle">{{item.name}}</h1>
                <p class="PrizeContent">实物类奖品在活动结束后15天由冠寓客服联系您确认信息后进行派发，请保持手机畅通。</p>
              </div>
              <div class="inventid" v-if="item.prizeType == 3 && item.name == '小米商城20元代金券'">
                <h1 class="PrizeTitle">{{item.name}}</h1>
                <div class="CardNumber">
                  <span class="CardSon">卡号</span>:
                  <span class="Cardlength" :id="item.id">{{item.prizeCode}}</span>
                  <span class="Clone" @click="ClonseText(item.id)">复制</span>
                </div>
                <div class="UserRules">使用规则：</div>
                <p class="RulesP">1、复制券码后，请下载小米有品App，在“我的-优惠券”里输入券码兑换使用；</p>
                <p class="RulesP">2、优惠券适用于小米有品APP，可用商品具体以结算页信息为准；</p>
                <p class="RulesP">3、每个手机号限领一次优惠券；</p>
                <p class="RulesP">4、优惠券不能抵扣运费，只能抵扣商品金额，与其他优惠不同享，不兑现，不找零。</p>
              </div>
              <div class="inventid" v-if="item.prizeType == 3 && item.name == '爱奇艺会员周卡'">
                <h1 class="PrizeTitle">爱奇艺周卡</h1>
                <div class="CardNumber">
                  <span class="CardSon">卡号</span>:
                  <span class="Cardlength" :id="item.id">{{item.prizeCode}}</span>
                  <span class="Clone" @click="ClonseText(item.id)">复制</span>
                </div>
                <div class="UserRules">使用规则：</div>
                <p class="RulesP">请登录爱奇艺官网点击右上角“vip”输入券码兑换</p>
              </div>
              <div class="inventid" v-if="item.prizeType == 2">
                  <h1 class="PrizeTitle">租房95折特权</h1>
                  <div class="UserRules">使用规则：</div>
                  <p class="RulesP">签约租期≥6个月可用，使用方法详询冠寓门店；有效期 - 2019年9月17日至2019年9月30日；</p>
              </div>
            </div>
          </div>
      </div>

      <div class="StorePrizeBox" v-else :style="{'height': celiHeight+'px'}">
        <img class="ClosePrizeList"
          :src="`${publicPath}img/sources/closeBtn.png`" alt="" @click="checkMyPrize">
          <div v-if="PrizeListBox.length == 0" class="noPirze">主人您还没有获得任何奖品~</div>
          <div class="StoreALL" v-else>
            <div class="MainBox" v-for="(item, index) in PrizeListBox" v-bind:key="index">
              <div class="prizeOfentiy" v-if="item.prizeType == 0">
                <h1 class="PrizeTitle">{{item.name}}</h1>
                <p class="PrizeContent">实物类奖品在活动结束后15天由冠寓客服联系您确认信息后进行派发，请保持手机畅通。</p>
              </div>
              <div class="inventid" v-if="item.prizeType == 3 && item.name == '小米商城20元代金券'">
                <h1 class="PrizeTitle">{{item.name}}</h1>
                <div class="CardNumber">
                  <span class="CardSon">卡号</span>:
                  <span class="Cardlength" :id="item.id">{{item.prizeCode}}</span>
                  <span class="Clone" @click="ClonseText(item.id)">复制</span>
                </div>
                <div class="UserRules">使用规则：</div>
                <p class="RulesP">1、复制券码后，请下载小米有品App，在“我的-优惠券”里输入券码兑换使用；</p>
                <p class="RulesP">2、优惠券适用于小米有品APP，可用商品具体以结算页信息为准；</p>
                <p class="RulesP">3、每个手机号限领一次优惠券；</p>
                <p class="RulesP">4、优惠券不能抵扣运费，只能抵扣商品金额，与其他优惠不同享，不兑现，不找零。</p>
              </div>
              <div class="inventid" v-if="item.prizeType == 3 && item.name == '爱奇艺会员周卡'">
                <h1 class="PrizeTitle">爱奇艺周卡</h1>
                <div class="CardNumber">
                  <span class="CardSon">卡号</span>:
                  <span class="Cardlength" :id="item.id">{{item.prizeCode}}</span>
                  <span class="Clone" @click="ClonseText(item.id)">复制</span>
                </div>
                <div class="UserRules">使用规则：</div>
                <p class="RulesP">请登录爱奇艺官网点击右上角“vip”输入券码兑换</p>
              </div>
              <div class="inventid" v-if="item.prizeType == 2">
                  <h1 class="PrizeTitle">租房95折特权</h1>
                  <div class="UserRules">使用规则：</div>
                  <p class="RulesP">签约租期≥6个月可用，使用方法详询冠寓门店；有效期 - 2019年9月17日至2019年9月30日；</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    <img class="BigBackImg"
      v-if="showTraison" :src="imgDate" alt="">
    <div class="DrawShow" :style="`top:${getCarton}%`">{{showUserInfor}}</div>
    <div class="UserDrawPrize" v-if="shadowLockPrize">
      <img class="PrizeStar" :src="`${publicPath}img/sources/star.png`" alt="">
      <div class="PrizeTitle">{{userPrizeName}}</div>
      <img class="MyPrizeCommon PrizeLeft" :src="`${publicPath}img/sources/btnBack.png`" alt="">
      <img class="MyPrizeCommon PrizeRight" :src="`${publicPath}img/sources/btnBack.png`" alt="">
      <div class="MyPrizeTCommon TLeft" @click="checkMyPrize">我的奖品</div>
      <div class="MyPrizeTCommon TRight" @click="CloseShaow">关闭</div>
    </div>
    <div class="BoxShawo" @click="CloseShaow" @touchmove.prevent v-if="shadowLock"></div>
    <div class="GoDownApp" v-if="DownApp">
      <img class="AppStart" :src="`${publicPath}img/sources/star.png`" alt="">
      <div class="AppContent">
        “冠寓有光” 活动仅在冠寓App端开放，请前往冠寓App参与活动
      </div>
      <img class="AppGotoDown AppGotoDownCommon" @click="goToDwonApp"
        :src="`${publicPath}img/sources/downApp.png`" alt="">
      <img class="AppGotoDownClose AppGotoDownCommon" @click="CloseShaow"
        :src="`${publicPath}img/sources/closeApp.png`" alt="">
    </div>
    <img :src="TestImg" alt="">
  </div>
</template>
<script>

import { actionShare, getAppAuthInfo, judgeIsInGyApp } from '@guanyu/guanyu-h5-tools';
import { wxShare } from '@guanyu/h5-tools';
import { setTimeout, setInterval } from 'timers';
import { downApp, cloneContent, getImgsAry } from '../utils/task';
import { playLight, getJoinNumber, getPrizeIndex, getPrizeList, shareFirend } from '../utils/http';

export default {
  name: '',
  data() {
    return {
      TestImg: '',
      showModel: false,
      active: false,
      backRashTop: false, // 回跳是否刷新
      token: '',
      showPrevent: true, // 禁止滑动
      celiHeight: 0,
      publicPath: process.env.BASE_URL,
      showUserInfor: '', // 提示用户信息
      getCarton: '',
      DownApp: false, // 是否显示下载app
      changeOpacity: 1, // Goyoo 灯透明度变化
      lastDrawTimes: '--', // 剩余抽奖次数
      userPrizeName: '', // 当前中奖名称
      shadowLock: false, // 遮罩锁
      shadowLockPrize: false, // 奖品提示
      PrizeListBox: [], // 奖品列表
      showTraison: false, // 是否显示动画
      uaname: '',
      downNumber: 0, // 预加载图片数量
      downErrorNumber: 0, // 预加载失败重新加载成功数量
      hasBright: false, // 是否点击 点亮按钮
      checkPrize: false, // 查看礼物
      scroppChange: false, // 滚动是否影响变化
      joinNumber: '--', // 参加活动人数
      inWXapp: '', // 是否存在微信小程序当中
      judgeApp: '', // 微信小程序 wxApp  微信浏览器 wxPower  冠寓app gyApp
      name: '抽奖页面',
      imgDate: '',
      Prosess: 0,
      response: '---',
      colorAry: ['#243895', '#878043', '#5B1CA3', '#E79F1F', '#2CAC54', '#902D95'],
      prizeIndex: 0, // 中奖下角标
      tokenName: '', // 获取token值
      prizeName: '', // 奖品名称
      drawPrize: true, // 抽奖锁
      baseDeg: 0, // 基本旋转角度
      extraDeg: 0, // 额外需要转动的角度
      lastDeg: 0, // 上次旋转的角度  以360 为最大值
      rotate: 0, // 基本转动的圈数
      rotateBox: 0, // 外层转动圈数
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scrollTop); // 监听（绑定）滚轮滚动事件
  },
  created() {
    this.getInitailDate();
    this.getJoinNumber(); // 获取参加人数
    this.juedgeEnviroment();
    this.loadingImgs(); // 预加载首页需要的图片
    this.changeBrightOp();
  },
  methods: {
    getInitailDate() {
      const height = document.documentElement.clientHeight;
      document.getElementById('app').style.width = `${height}px`;
      if (judgeIsInGyApp()) {
        // app 中
        this.token = getAppAuthInfo().access_token;
      }
      this.celiHeight = window.screen.height;
      this.tokenName = this.getParams('token');
      window.zhuge.track('冠寓有光首页');
      const url = `${window.location.origin}/fe/threeyears/index.html`;
      wxShare({
        api: `${window.location.origin}/gymwebsite/getJsapiSigna`, // 获取微信鉴权的接口地址,
        title: '冠寓三周年点亮仪式 千万好礼抽不停！', // 分享标题,
        debug: false,
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/DS3crsbVqEw.png', // 分享图标,
        desc: '点亮星光抽大奖，switch、kindle、戴森吹风机、租房大礼包等你来！', // 分享描述,
        type: '', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
      });
    },
    getJoinNumber() {
      // 获取参加人数
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.indexOf('micromessenger') > 0) {
        this.token = '123';
      }
      getJoinNumber('', this.token).then((res) => {
        this.joinNumber = res.data.data.brightCount;
        this.lastDrawTimes = res.data.data.count;
        if (res.data.data.isBright) {
          // 表示已经点亮过了  不显示点亮按钮
          this.hasBright = true;
        } else {
          this.hasBright = false;
        }
      })
        .catch(() => {
        });
    },
    ready(pics) {
      window.onload = () => {
        pics.map((imgurl) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgurl;
            img.onload = () => resolve(this.handleSucess());
            img.onerror = () => reject(this.handleErrorImg(imgurl));
          });
        });
      };
    },
    handleErrorImg(imgurl) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgurl;
        img.onload = () => resolve(this.handleSucess());
        img.onerror = () => reject(this.handleErrorImg(imgurl)); // 递归
      });
    },
    handleSucess() {
      this.downNumber += 1;
      const Prosess = (this.downNumber / 102) * 100;
      document.getElementById('DownImg').style.width = `${Prosess}%`;
      if (Prosess >= 98) {
        document.getElementById('boxShaow').style.display = 'none';
      }
    },
    loadingImgs() {
      const newARY = getImgsAry();
      this.ready(newARY);
    },
    goToDwonApp() {
      // 下载app
      window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
    },
    JoinOtherPage(name) {
      // 进入其他页面
      this.hasBright = true; // 不显示点亮
      switch (name) {
        case 'Pr':
          window.location.href = 'prBook.html';
          break;
        case 'Br':
          window.location.href = 'birthday.html';
          break;
        default:
          break;
      }
    },
    ShareFriend() {
      // 调用app端分享
      window.zhuge.track('调用app端分享');
      actionShare({
        shareTitle: '冠寓三周年点亮仪式 百万好礼抽不停！',
        shareUrl: `${window.location.origin}/fe/threeyears/index.html`,
        shareImg: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/DS3crsbVqEw.png',
        shareText: '点亮星光抽大奖，switch、kindle、戴森吹风机、租房大礼包等你来！',
      });
      shareFirend('', this.token).then((res) => {
        if (res.data.code === 0) {
          this.getJoinNumber();
        }
      })
        .catch(() => {
          this.getJoinNumber();
        });
    },
    scrollTop() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 40) {
        this.scroppChange = true;
      } else {
        this.scroppChange = false;
      }
    },
    UserBirghtBtn() {
      // 用户点击 点亮按钮
      if (!judgeIsInGyApp()) {
        this.DownApp = true;
        this.shadowLock = true;
        return;
      }
      window.zhuge.track('点亮');
      playLight('', this.token).then((res) => {
        if (res.data.code === 401) {
          window.location.href = 'guanyu://page.gy/login';
          return;
        }
        if (res.data.code === 100) {
          // 表示用户已经点亮过了， 没有动过 直接过渡到图形展示
          this.hasBright = true;
        } else if (res.data.code === 0) {
          // 点亮成功
          this.joinNumber = res.data.data; // 点亮人数
          this.showTraison = true; // 动画承载 true
          this.startCartoon(); // 动画开始
        }
      })
        .catch(() => {
        });
    },
    changeBrightOp() {
      setInterval(() => {
        if (this.changeOpacity === 1) {
          this.changeOpacity = 0.6;
        } else {
          this.changeOpacity = 1;
        }
      }, 1000);
    },
    juedgeEnviroment() {
      const ua = window.navigator.userAgent.toLowerCase();
      this.uaname = ua;
      if (ua.indexOf('micromessenger') > 0) { // 判断是否是微信环境
        // 微信环境
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            // 小程序环境下逻辑
            this.inWXapp = 'WXAPP';
            this.judgeApp = 'wxApp';
          } else {
            this.inWXapp = 'WXPOWER';
            // 非小程序环境下逻辑
            this.judgeApp = 'wxPower';
          }
        });
      } else if (ua.indexOf('gy') > 0) {
        // 非微信环境逻辑
        this.inWXapp = 'goyooApp';
      } else {
        this.inWXapp = 'OtherPower';
      }
    },
    CloseShaow() {
      // 点击遮罩关闭弹窗
      this.shadowLock = false;
      this.shadowLockPrize = false;
      this.DownApp = false;
    },
    checkMyPrize() {
      if (!judgeIsInGyApp()) {
        this.playShowTitle('请在冠寓app中查看奖品');
        return;
      }
      window.zhuge.track('查看奖品');
      this.shadowLock = false;
      this.shadowLockPrize = false;
      this.checkPrize = !this.checkPrize;
      if (this.checkPrize) {
        getPrizeList('', this.token).then((res) => {
          // 我的奖品列表
          if (res.data.code === 0) {
            this.PrizeListBox = res.data.data;
            if (this.PrizeListBox.length > 2) {
              this.showPrevent = false; // 禁止
            }
          }
        })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    ClonseText(id) {
      cloneContent(id);
      this.playShowTitle('复制成功');
    },
    startCartoon() {
      setTimeout(() => {
        let ImgNumber = 0;
        const setInt = setInterval(() => {
          ImgNumber += 1;
          this.imgDate = `${this.publicPath}img/sources/bg_${ImgNumber}.jpg`;
          if (ImgNumber === 98) {
            // 动画结束  转盘 true
            this.showTraison = false;
            clearInterval(setInt);
            this.hasBright = true; // 点亮界面消失  转盘界面出现
            // 动画结束时候获取抽奖次数
            this.getJoinNumber();
          }
        }, 30);
      }, 900);
    },
    shareApp() {
      // 分享功能
      actionShare(
        '冠寓有关·Goyoo LIGHT',
        'http://m.test109.iguanyu.com/fe/threeyears/index.html',
        'https://img3.doubanio.com/view/dale-online/dale_ad/public/3736693c4520625.jpg',
        '龙湖冠寓三周年活动，参与抽奖更有好礼相送!'
      );
    },
    playShowTitle(title) {
      this.showUserInfor = title;
      this.getCarton = 30;
      setTimeout(() => {
        this.getCarton = -70;
      }, 2000);
    },
    downApp() {
      downApp();
    },
    closeModel() {
      this.showModel = false;
    },
    changeDraw() {
      if (!judgeIsInGyApp()) {
        this.playShowTitle('请在冠寓app中进行抽奖');
        return;
      }
      window.zhuge.track('开始抽奖');
      this.getJoinNumber();
      const prize = ['爱奇艺周卡', '任天堂 Switch NS 游戏机', '小米商城20元代金券', 'Kindle paperwhite 第四代', '戴森 Dyson 吹风机', '龙小湖公仔', '拎包入住大礼包', '租房95折特权'];
      if (this.drawPrize) {
        this.drawPrize = false;
        const sendDate = {
          city: '全国',
          channel: 'wx_miniprogram',
        };
        getPrizeIndex(sendDate, this.token).then((res) => {
          if (res.data.code === 100) {
            alert(res.data.msg);
            this.drawPrize = true;
            return;
          }
          const index = res.data.data.prizeCode;
          this.prizeIndex = index;
          const extraDeg = 360 - (360 / 16) * (this.prizeIndex * 2);
          // 开始抽奖
          // n * 60 - 30
          // index == 1;  extraDeg = 360 - (360/16)*2
          // index == 2;  extraDeg = 360 - (360/16)*4
          // index == 3;  extraDeg = 360 - (360/16)*4
          this.rotate = this.baseDeg + 4680 + extraDeg + this.lastDeg;
          this.baseDeg = this.rotate;
          this.rotateBox -= 540;
          this.lastDeg = 360 - extraDeg;
          setTimeout(() => {
            this.userPrizeName = `恭喜您，获得${prize[index - 1]}`;
            this.shadowLock = true;
            this.shadowLockPrize = true;
          }, 5100);
          let aysnTime = 0;
          if (this.lastDrawTimes === 0) {
            aysnTime = 0;
          } else {
            aysnTime = 5200;
          }
          setTimeout(() => {
            this.drawPrize = true;
            this.getJoinNumber();
          }, aysnTime);
        })
          .catch(() => {
            this.drawPrize = true;
          });
      }
    },
    getParams(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]); return null;
    },
  },
};
</script>

<style lang="less">
#app{font-family: 'PingFangSC-Regular'}
body,html{margin: 0px;padding: 0px;
font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'PingFangSC';}
.BackImg{
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -8;
  height: 100%;
}
.BigBackImg{
  position: fixed;
  width: 100%;
  opacity: 0.7;
  height: 100%;
}
.LogoBackImg{
  width: 193px;
  position: fixed;
  z-index: -5;
  left: 57px;
  top: 40px;
}
.goyooLightImg{
  width: 377px;
  position: fixed;
  z-index: -3;
  left: 132px;
  top: 250px;
  left: 50%;
  opacity: 1;
  margin-left: -190px;
  transition: all 1s;
}
.LineFramImg{
  position: fixed;
  z-index: -3;
  top: 370px;
  width: 526px;
  margin-left: 57px;
}
.bodyJoinNumber{
  text-align: center;
  font-size: 28px;
  color: #ffffff;
  font-weight: 400;
  position: fixed;
  z-index: -3;
  top: 372px;
  width: 100%
}
.LastRawmTimes{
  background: #9C8546;
  color: #FFFFFF;
  padding: 4px 7px;
  position: absolute;
  top: 420px;
  border-radius: 8px;
  letter-spacing: 2px;
  font-size: 24px;
  left: 50%;
  width: 240px;
  z-index: 1;
  text-align: center;
  margin-left: -130px;
}
.BirghtStart{
  width: 130px;
  height: 118px;
  position: fixed;
  left: 50%;
  margin-left: -65px;
  bottom: 280px;
}
.BirghtText{
  width: 160px;
  position: fixed;
  left: 50%;
  margin-left: -80px;
  bottom: 220px;
}
.ClickGetPrize{
  position: fixed;
  bottom: 175px;
  text-align: center;
  color: #FFFFFF;
  font-size: 15px;
  width: 200px;
  left: 50%;
  height: 40px;
  line-height: 40px;
  margin-left: -100px;
}
.UnlightModel{
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.7;
  top: 0px;
  left: 0px;
}
.StoreDrawBox{
  width: 499px;
  height: 499px;
  margin: 438px auto 0px;
  position: relative;
  padding: 0px;
  .DrawBigImg{
    width: 491px;
    height: 491px;
    position: absolute;
    left: 50%;
    margin: -245px;
    top: 50%;
    margin-top: -245px;
    transition: all 5s linear;
  }
  .DrawsmallImg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .RotatePan{
    width: 420px;
    height: 420px;
    position: absolute;
    left: 50%;
    margin-left: -210px;
    top: 50%;
    margin-top: -210px;
    transition:all 5s ease-in-out;
    transform: rotate(0deg)
  }
  .PlayRotate{
    width: 80px;
    height: 100px;
    position: absolute;
    left: 50%;
    margin-left: -40px;
    top: 48%;
    margin-top: -50px;
  }
}
.joinMyPrize{
  height: 57px;
  margin-top: 25px;
  text-align: center;
  .JoinCommon{
    width: 216px;
    height: 64px;
  }
}
.StoreBtn{
  background: #cccccc;
  min-height: 400px;
}
.joinPrandPart{
  width: 100%;
  min-height: 400px;
  padding-top: 56px;
  margin-top: 20px;
  .JoinTop{
    width: 554px;
    height: 161px;
    margin: 0 auto;
    background: #303028;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .JoinBtn{
    margin-top: 22px;
  }
  .GameRules{
    font-family: 'PingFangSC-Regular';
    padding: 51px 0px 40px 43px;
    color: #ffffff;
    width: 87%;
    font-size: 22px;
    .GameTitle{
      padding: 5px;
      background: #9c8546;
      border-radius: 5px;
      color: #ffffff;
    }
    .RulesF{
      position: relative;
      margin-left: 20px;
      .RulesS{
        position: absolute;
        left: -20px;
        top: 0px;
      }
    }
    p{
      line-height: 40px;
    }
  }
}
.CardNumber{
  padding-bottom: 20px;
  border-bottom: 1px dashed #cccccc;
  margin-bottom: 20px
}
.StorePrizeBox{
  position: fixed;
  background: #000000;
  opacity: 0.9;
  width: 90%;
  z-index: 33;
  padding: 80px 5% 0px 5%;
  left: 0px;
  top: 0px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .ClosePrizeList{
    width: 30px;
    height: 30px;
    position: fixed;
    z-index: 77;
    right: 50px;
    top: 50px
  }
  .noPirze{
    font-size: 26px;
    text-align: center;
    color: rgba(255,246,207,1);
    margin-top: 120px;
  }
  .MainBox{
    background: #000;
    overflow-y: auto;
    margin-top: 0px;
    -webkit-overflow-scrolling: touch;
    color: #FFFFFF;
    .prizeOfentiy{
      border-bottom: 1px solid #ffffff;
      .PrizeTitle{
        font-size: 30px;
      }

      .PrizeContent{
        font-size: 23px;
        line-height: 40px;
        letter-spacing: 2px;
      }
    }
    .inventid{
      padding-bottom: 20px;
      border-bottom: 1px solid #ffffff;
      .PrizeTitle{
        font-size: 30px;
      }
      .lineStought{
        padding-bottom: 20px;
        border-bottom: 1px dashed #cccccc;
        margin-bottom: 20px
      }
      .UserRules{
        font-size: 26px;
      }
      .RulesP{
        font-size: 24px;
      }
      .CardSon{
        font-size: 23px;
      }
      .Clone{
        margin-left: 60px;
        background: #9c8546;
        font-size: 20px;
        padding: 2px 5px 2px 5px;
        border-radius: 4px;
      }
      .Cardlength{
        width: 140px;
        display: inline-block;
        overflow: auto;
      }
    }
  }
}
.DrawShow{
  width: 431px;
  height: 100px;
  line-height: 100px;
  background: #9C8546;
  color: #FFFFFF;
  font-size: 18px;
  text-align: center;
  line-height: 100px;
  border-radius: 14px;
  border: 1px solid #FFFFFF;
  position: fixed;
  left: 50%;
  margin-left: -215px;
  top: -70%;
  z-index: 34;
  transition: all 0.3s Ease-out;
}
.UserDrawPrize{
  width: 431px;
  min-height: 200px;
  background: #9C8546;
  position: fixed;
  left: 50%;
  margin-left: -215px;
  top: 30%;
  z-index: 88;
  border-radius: 14px;
  border: 2px solid #ffffff;
  .PrizeStar{
    width: 51px;
    height: 51px;
    position: absolute;
    left: 50%;
    margin-left: -24px;
    top: -25px;
  }
  .PrizeTitle{
    color: #FFFFFF;
    font-size: 20px;
    width: 90%;
    margin: 40px auto;
    height: 65px;
    border-bottom: 1px solid #ffffff;
    padding-bottom: 16px;
    line-height: 40px;;
  }
  .MyPrizeCommon{
    width: 178px;
    height: 45px;
    position: absolute;
    bottom: 13px;
  }
  .MyPrizeTCommon{
    position: absolute;
    font-size: 26px;
    bottom: 17px;
    color: #FFFFFF;
    letter-spacing: 1px;
    font-weight: 500;
  }
  .TLeft{
    left: 55px;
  }
  .TRight{
    right: 90px
  }
  .PrizeLeft{
    left: 22px;
  }
  .PrizeRight{
    right: 28px;
  }
}
.BoxShawo{
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 2
}
.StoreALL{
  max-height: 82%;
  overflow: auto;
}
.GoDownApp{
  width: 350px;
  height: 130px;
  position: fixed;
  left: 50%;
  margin-left: -200px;
  top: 340px;
  background: #9C8546;
  border-radius: 14px;
  z-index: 123;
  border: 2px solid #FFFFFF;
  padding: 40px 25px;
  .AppStart{
    width: 60px;
    height: 60px;
    position: absolute;
    top: -30px;
    left: 50%;
    margin-left: -30px;
  }
  .AppContent{
    font-size: 21px;
    color: #FFFFFF;
    font-family: 'PingFangSC-Regular';
    text-align: justify;
    line-height: 34px;
    padding-bottom: 28px;
    border-bottom: 1px solid #FFFFFF;
  }
  .AppGotoDownCommon{
    width: 144px;
    height: 40px;
    position: absolute;
    bottom: 20px;
  }
  .AppGotoDown{
    left: 30px;
  }
  .AppGotoDownClose{
    right: 30px;
  }
}
</style>
