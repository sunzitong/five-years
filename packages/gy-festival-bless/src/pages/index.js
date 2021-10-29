import React from 'react';
import { getAppAuthInfo, ShowSharePanel } from '@guanyu/guanyu-h5-tools';
import { wxShare } from '@guanyu/h5-tools';
import { Toast } from 'antd-mobile';
import axios from 'axios';
import { parse } from 'qs';
import close from 'assets/close.png';
// import timeout from 'assets/timeout.png';
import styles from './index.less';

// 活动结束图片
const timeout = 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/DBrIFS30_YYR0S7H4syZbw.png';

// 活动分享图片
const shareSmallImg = 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/ykWtShg-5ktDvF2LMrOiwQ.png';

// 分享微信好友icon
const WECHAT_ICON = 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/qKQMh88bpIkhzjhET8GDzA.png';

// 分享微信朋友圈icon
const TIMELINE_ICON = 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/HtnYWjhjjD3zzEk_zdKyIQ.png';

// 预览图
const PREVIE_IMG = 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/LV3dB6_Wkt5hFa6RGLaRLQ.png';

// 引导微信小程序分享icon
const MINNI_LEAD_ICON = 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/WEeHPjcKr2dMk6wcSWW5VA.png';

// 引导长按保存图片icon
const SAVE_TIPS = 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/DrAGbZ8vuyHCzkMnvJ24kw.png';
class Index extends React.Component {
  constructor(props) {
    super(props);
    const searchObj = parse(props.location.search.replace('?', ''));
    this.isMiniProgram = navigator.userAgent.includes('miniProgram');
    this.id = '';
    this.source = searchObj.source;
    this.state = {
      finish: false,
      shadowVisibile: false,
      sessionId: this.isMiniProgram ? searchObj.sessionId : (getAppAuthInfo() || {}).access_token,
      data: {},
      showSharePanel: false,
      showMiniLeadIcon: false,
      showTimelineShareImg: false,
      shareShadowdDisplay: false,
      sharePanelDisplay: false,
    };
  }

  componentDidMount() {
    const { sessionId } = this.state;
    axios.defaults.headers.common.Authorization = sessionId;
    // axios.defaults.headers.common.Authorization = '699deace41f0e193';
    axios.defaults.headers.common['X-GY-App-Platform'] = 'XCXGY';
    this.getFestivalId();
    this.setMiniShare();
    this.setZhuge();
  }

  // 记录页面访问埋点
  setZhuge = () => {
    // 识别小程序码进入
    if (this.source === 'minicode') {
      window.zhuge.track('节日运签_识别小程序码');
    } else {
      window.zhuge.track('节日运签_点击小程序卡片');
    }
  }

  // 设置小程序分享
  setMiniShare = () => {
    if (this.isMiniProgram) {
      window.wx.miniProgram.postMessage({
        data: {
          title: "试试看，你能抽中什么好运！",
          imageUrl: shareSmallImg,
          path: `${window.location.origin}/fe/gy-festival-bless`,
        },
      });
    }
  }

  // 获取节日id
  getFestivalId = () => {
    Toast.loading('加载中...', 0);
    axios.get('/app-server/api/v1/main/personal?cityId=1', {
      validateStatus(status) {
        return status < 500;
      },
    }).then((res = {}) => {
      const { data = {} } = res || {};
      const { code = '', message = '', data: subData = {} } = data || {};
      // 接口正常
      if (+code === 10000) {
        const { holidayBlessings } = subData || {};
        const { url = '' } = holidayBlessings || {};
        // 通过url截取节日id
        if (url.split('?')[1]) {
          this.id = parse(url.split('?')[1]).id;
          this.getHolidayWishesInfo();
        } else {
          Toast.hide();
          this.setState({
            finish: true,
          })
        }
      } else {
        Toast.fail(message, 3);
      }
    }).catch(() => {
      Toast.fail('系统错误', 3);
    });
  }


  // 抽签
  open = () => {
    const { sessionId, data = {} } = this.state;
    const { frequency = 0 } = data;
    // 未登录状态
    if (!sessionId) {
      if (this.isMiniProgram) {
        window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
      } else { // app
        window.location.href = 'guanyu://page.gy/login';
      }
      return;
    }
    if (!frequency) {
      Toast.info('抽签次数已用完');
      return;
    }
    window.zhuge.track('节日抽开运签按钮');
    this.addFrequency();
  }

  // 获取节日数据
  getHolidayWishesInfo = () => {
    const params = {
      id: this.id,
    };
    axios.post('/commactivity-server/holidayWishes/HolidayWishesInfo', params, {
      validateStatus(status) {
        return status < 500;
      },
    }).then((res = {}) => {
      const { data = {}, status = '' } = res || {};
      const { code = '', message = '', data: subData = {} } = data || {};
      // 接口正常
      if (+code === 10000) {
        this.setState({
          data: subData,
        });
        const { title } = subData;
        document.title = title || '节日祝福';
        Toast.hide();
      } else if (+status === 401) {
        // 小程序
        if (this.isMiniProgram) {
          Toast.fail('身份过期,请重新授权', 3, () => {
            window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
          }, false);
        } else { // app
          Toast.fail('身份过期,请重新授权', 3, () => {
            window.location.href = 'guanyu://page.gy/login';
          });
        }
      } else {
        Toast.fail(message, 3);
      }
    }).catch(() => {
      Toast.fail('系统错误', 3);
    });
  }

  // 进行抽奖
  addFrequency = () => {
    const { data } = this.state;
    const {
      firstBlessing = '',
      secondBlessing = '',
      thirdBlessing = '',
      shareFirstUrl = '',
      shareSecondUrl = '',
      shareThirdUrl = '',
    } = data;
    const params = {
      id: this.id,
    };
    axios.post('/commactivity-server/holidayWishes/addFrequency', params, {
      validateStatus(status) {
        return status < 500;
      },
    }).then((res = {}) => {
      const { data: newData = {}, status = '' } = res || {};
      const { code = '', message = '' } = newData || {};
      if (+code === 10000) {
        switch (this.random()) {
          case 'TT':
            this.setState({
              lot: firstBlessing,
              shareLot: shareFirstUrl,
            });
            break;
          case 'TM':
            this.setState({
              lot: secondBlessing,
              shareLot: shareSecondUrl,
            });
            break;
          case 'MM':
            this.setState({
              lot: thirdBlessing,
              shareLot: shareThirdUrl,
            });
            break;
          default:
        }
        this.setState({
          shadowVisibile: true,
        }, () => {
          this.getHolidayWishesInfo();
        });
      } else if (+status === 401) {
        // 小程序
        if (this.isMiniProgram) {
          Toast.fail('身份过期,请重新授权', 3, () => {
            window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
          }, false);
        } else { // app
          Toast.fail('身份过期,请重新授权', 3, () => {
            window.location.href = 'guanyu://page.gy/login';
          });
        }
      } else {
        Toast.fail(message, 3);
      }
    }).catch(() => {
      Toast.fail('系统错误', 3);
    });
  }


  random = () => {
    const num = Math.floor(Math.random() * 100);
    let lot = '';
    if (+num >= 0 && num < 33) {
      lot = 'TT';
    } else if (num >= 33 && num < 66) {
      lot = 'TM';
    } else if (num >= 66 && num <= 99) {
      lot = 'MM';
    } else {
      lot = 'TT';
    }
    return lot;
  }

  // 暂时保留，不进行调用
  share = () => {
    const { shareLot = '' } = this.state;
    ShowSharePanel({
      types: ['wx_session', 'wx_timeline'],
      title: '你有一份神秘的天降好运请查收哦',
      url: `${window.location.origin}/fe/gy-festival-bless?reciviedLot=${encodeURIComponent(shareLot)}`,
      image: shareSmallImg,
      text: '好友派送了节日好运签给你，快来收好运祝福吧！',
    });
  }

  // 显示分享弹窗
  showShareePanelFn = () => {
    window.zhuge.track('节日分享好运按钮');
    this.setState({
      shareShadowdDisplay: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          sharePanelDisplay: true,
        });
      }, 100);
    });
  }

  // 收起分享弹窗
  closeShareePanelFn = () => {
    this.setState({
      sharePanelDisplay: false,
    }, () => {
      setTimeout(() => {
        this.setState({
          shareShadowdDisplay: false,
        });
      }, 250);
    });
  }

  // 显示微信分享引导
  showMiniLeadIconFn = () => {
    this.closeTimelineShareImgFn();
    this.setState({
      showMiniLeadIcon: true,
    })
  }

  // 关闭怒微信分享引导
  closeMiniLeadIconFn = () => {
    this.setState({
      showMiniLeadIcon: false,
    })
  }

  // 显示微信朋友圈分享图片
  showTimelineShareImgFn = () => {
    this.closeMiniLeadIconFn();
    this.setState({
      showTimelineShareImg: true,
    })
  }

  // 关闭微信朋友圈分享图片
  closeTimelineShareImgFn = () => {
    this.setState({
      showTimelineShareImg: false,
    })
  }

  render() {
    const {
      shadowVisibile,
      data,
      lot,
      showSharePanel,
      showMiniLeadIcon,
      showTimelineShareImg,
      shareLot,
      shareShadowdDisplay,
      sharePanelDisplay,
      finish,
    } = this.state;

    const {
      coverUrl = '',
      shareButton = '',
      firstButton = '',
      secondButton = '',
      thirdButton = '',
      frequency = '',
    } = data;

    let openBtn;
    switch (frequency) {
      case 3:
        openBtn = firstButton;
        break;
      case 2:
        openBtn = secondButton;
        break;
      case 1:
        openBtn = thirdButton;
        break;
      default:
        openBtn = thirdButton;
    }

    return (
      <div
        className={styles.container}
      >
        <img
          src={finish ? timeout : coverUrl}
          // src='https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/0a7IyLocZQ-upC6_etIZxg.png'
          alt=""
          className={styles['bg-img']}
        />
        {
          (!finish && !!openBtn) && (
            <img
              src={openBtn}
              alt=""
              className={styles.button}
              onClick={this.open}
            />
          )
        }
        {/* {分享碳层} */}
        <div
          className={styles['shadow-cotainer']}
          style={{
            display: `${shadowVisibile ? 'flex' : 'none'}`,
          }}
        >
          <div
            className={styles['lot-bg-container']}
          >
            <img
              src={lot}
              alt=""
              className={styles['lot-bg']}
            />
            <img
              src={shareButton}
              alt=""
              className={styles['share-btn']}
              onClick={(e) => {
                this.showShareePanelFn()
              }}
            />
          </div>
          <img
            src={close}
            alt=""
            className={styles.close}
            onClick={() => {
              this.setState({
                shadowVisibile: false,
              });
            }}
          />
        </div>
        <div
          // className={styles['share-shadow-cotainer']}
          className={`${styles['share-shadow-cotainer']} ${shareShadowdDisplay ? styles['show'] : ''} ${sharePanelDisplay ? styles['expand'] : ''}`}
          onClick={() => {
            // this.closeShareePanelFn()
            this.closeMiniLeadIconFn();
            this.closeTimelineShareImgFn();
          }}
        >
          {
            showTimelineShareImg && (
              <div
                className={styles['preview-img-container']}
              >
                <img className={styles['preview-img']} src={shareLot} alt="" />
              </div>
            )
          }
          <div
            // className={`${styles['wrapper']} ${showSharePanel ? styles['expand'] : ''}`}
            className={`${styles['wrapper']} ${shareShadowdDisplay ? styles['show'] : ''} ${sharePanelDisplay ? styles['expand'] : ''}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className={styles['content-container']}
            >
              <div
                className={styles['icon-container']}
                onClick={this.showMiniLeadIconFn}
              >
                <img src={WECHAT_ICON} alt="" />
                <div
                  className={styles['label']}
                >
                  微信
                </div>
              </div>
              <div
                className={styles['icon-container']}
                onClick={this.showTimelineShareImgFn}
              >
                <img src={TIMELINE_ICON} alt="" />
                <div
                  className={styles['label']}
                >
                  朋友圈
                </div>
                {
                  showTimelineShareImg && <img className={styles['save-tips']} src={SAVE_TIPS} alt="" />
                }
              </div>
            </div>
            <div
              className={styles['btn-container']}
            >
              <div
                className={styles['btn']}
                onClick={() => {
                  this.closeShareePanelFn();
                  this.closeTimelineShareImgFn();
                  this.closeMiniLeadIconFn();
                }}
              >
                取消
              </div>
            </div>
          </div>
        </div>
        {/* 小程序分享引导图 */}
        {
          showMiniLeadIcon && <img className={styles['mini-lead-icon']} src={MINNI_LEAD_ICON} alt="" />
        }
      </div>
    );
  }
}

export default Index;
