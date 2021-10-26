import React from 'react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import { getAppAuthInfo, getAppInfo } from '@guanyu/guanyu-h5-tools';
import axios from 'axios';
import { parse } from 'qs';
import headSrc from '../assets/head.png';
import nextSrc from '../assets/next.png';
import arrowSrc from '../assets/arrow.png';
import styles from './index.less';
// import cityData from './city.json';

@connect(({ address }) => ({
  address,
}))

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    const searchObj = parse(props.location.search.replace('?', ''));
    this.isMiniProgram = navigator.userAgent.includes('miniProgram');
    this.state = {
      cityData: [],
      showCitySelector: false,
      source: searchObj.source,
      cityName: searchObj.cityName,
      cityId: searchObj.cityId,
      projectId: searchObj.projectId,
      projectName: searchObj.projectName,
      sessionId: this.isMiniProgram ? searchObj.sessionId : (getAppAuthInfo() || {}).access_token,
      appInfo: getAppInfo() || {},
      // openid: searchObj.openid,
      // unionid: searchObj.unionid,
      userName: '',
      projectPaymentAmount: '',
    };
    this.cityContainerDom = React.createRef();
  }

  componentDidMount() {
    window.zhuge.track('冠寓小程序-意向金活动页');
    const { sessionId, projectName, cityName, projectId } = this.state;
    axios.defaults.headers.common.Authorization = sessionId;
    window.wx.miniProgram.postMessage({
      data: {
        title: '意向金',
        imageUrl: '',
        path: '',
      },
    });
    this.getPaymentByProject();
    this.startTime = new Date().getTime();
    window.GyWebViewCloseFn = () => {
      window.zhuge.track('页面访问时长', {
        页面名称: '意向金页-停留时长',
        停留时长: new Date().getTime() - this.startTime,
        projectname: projectName,
        projectId,
        cityname: cityName,
      });
    };
  }

  // 获取门店意向金
  getPaymentByProject = (isResquetCityList = true) => {
    Toast.loading('加载中...', 0);
    const { projectId } = this.state;
    axios.get(`/app-server/api/v1/payment/getPaymentByProject?projectId=${projectId}`, {
      validateStatus(status) {
        return status < 500;
      },
    }).then((res = {}) => {
      const { data = {}, status = '' } = res || {};
      const { code = '', message = '', data: subData = {} } = data || {};
      const { projectPaymentAmount = '' } = subData || {};
      // 接口正常
      if (+code === 10000) {
        this.setState({
          projectPaymentAmount,
        });
        // Toast.hide();
        // 成功之后再请求城市列表接口，因为Toast.hide()会导致Toast.fail不执行。
        if (isResquetCityList) {
          this.getCityList();
        } else {
          Toast.hide();
        }
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


  // 获取城市列表
  getCityList = () => {
    const { cityId } = this.state;
    axios.get(`/app-server/api/v1/project/listAllProject?cityId=${cityId}&hasIntention=true`, {
      validateStatus(status) {
        return status < 500;
      },
    }).then((res = {}) => {
      const { data = {}, status = '' } = res || {};
      const { code = '', message = '', data: dataList = [] } = data || {};
      // 接口正常
      if (+code === 10000) {
        this.setState({
          cityData: dataList,
        });
        Toast.hide();
      } else if (+status === 401) {
        // 小程序
        if (this.isMiniProgram) {
          Toast.fail('身份过期,请重新授权', 3, () => {
            window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
          });
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

  // 比较版本号
  compareVersion = (v1, v2) => {
    const v1New = v1.split('.');
    const v2New = v2.split('.');
    const len = Math.max(v1New.length, v2New.length);

    while (v1New.length < len) {
      v1New.push('0');
    }
    while (v2New.length < len) {
      v2New.push('0');
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1New[i], 10);
      const num2 = parseInt(v2New[i], 10);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
    return 0;
  }

  // 创建意向金
  createPayment = () => {
    const { userName, projectId, source, appInfo } = this.state;
    const { app_version = '' } = appInfo;
    const params = {
      projectId,
      source,
      userName,
    };
    if (!userName.trim()) {
      Toast.info('请输入姓名', 3);
      return;
    }
    Toast.loading('加载中...', 0);
    axios.post('/app-server/api/v1/payment/createPayment', params, {
      validateStatus(status) {
        return status < 500;
      },
    }).then((res = {}) => {
      const { data = {}, status = '' } = res || {};
      const { code = '', message = '', data: subData = {} } = data || {};
      const { paymentId = '' } = subData || {};
      // 接口正常
      if (+code === 10000) {
        Toast.hide();
        // 小程序
        if (this.isMiniProgram) {
          window.wx.miniProgram.navigateTo({ url: `/packageA/pages/cashierDesk/cashierDesk?paymentId=${paymentId}&delta=2` });
        } else {
          // 兼容新旧版本app
          if (this.compareVersion(app_version, '4.8.0') >= 0) {
            window.location.href = `guanyu://page.gy/intention/confirmpay?paymentId=${paymentId}`;
          } else {
            window.location.href = `guanyu://page.gy/payment?paymentId=${paymentId}`;
          }
        }
      } else if (+status === 401) {
        // 小程序
        if (this.isMiniProgram) {
          Toast.fail('身份过期,请重新授权', 3, () => {
            window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
          });
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


  next = () => {
    const { sessionId } = this.state;
    // 小程序
    if (this.isMiniProgram) {
      // 没有登陆
      if (!sessionId) {
        window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
        return;
      }
      this.createPayment();
    } else { // app
      // 没有登陆
      if (!sessionId) {
        window.location.href = 'guanyu://page.gy/login';
        return;
      }
      this.createPayment();
    }
  }

  showCitySelector = () => {
    const { showCitySelector } = this.state;
    this.setState({
      showCitySelector: !showCitySelector,
    });
  }

  render() {
    const { showCitySelector, cityData, cityName, projectName, projectPaymentAmount } = this.state;
    return (
      <div
        className={styles.container}
        onClick={() => {
          this.setState({
            showCitySelector: false,
          });
        }}
      >
        <img src={headSrc} alt="" className={styles['head-pic']} />
        <div
          className={styles['head-text']}
        >
          {`缴纳${projectPaymentAmount}元意向金、签约享特权`}
        </div>
        <div
          className={styles['form-container']}
        >
          <div
            className={styles['item-container']}
            onClick={(e) => {
              e.stopPropagation();
              this.showCitySelector();
            }}
          >
            <div>
              {projectName}
            </div>
            <img src={arrowSrc} className={styles.arrow} alt="" />
          </div>
          <div
            className={styles['shop-select-container']}
            style={{
              visibility: !showCitySelector ? 'hidden' : 'visible',
            }}
          >
            <div
              className={styles['city-container']}
              ref={this.cityContainerDom}
            >
              {
                Array.isArray(cityData) && cityData.map((item) => {
                  const { cityName: name = '' } = item;
                  return (
                    <div
                      className={`${styles['item-container']} ${name === cityName ? styles.active : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({
                          cityName: name,
                        });
                      }}
                      key={name}
                    >
                      {name}
                    </div>
                  );
                })
              }
            </div>
            <div
              className={styles['shop-container']}
            >
              {
                Array.isArray(cityData) && cityData.filter((item) => {
                  const { cityName: city } = item;
                  return cityName === city;
                }).map((item2) => {
                  const { projectList = [] } = item2;
                  return projectList.map((item3) => {
                    const { itemName, itemId } = item3 || {};
                    return (
                      <div
                        className={`${styles['item-container']} ${itemName === projectName ? styles.active : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          this.setState({
                            projectName: itemName,
                            projectId: itemId,
                          }, () => {
                            if (projectName === itemName) return;
                            this.getPaymentByProject(false);
                          });
                          this.showCitySelector();
                          // 点击当前的门店，不进行额外操作
                        }}
                        key={itemName}
                      >
                        <div
                          className={styles.ellipsis}
                        >
                          {itemName}
                        </div>
                      </div>
                    );
                  });
                })
              }
            </div>
          </div>
          <div
            className={styles['item-container']}
          >
            <input
              type="text"
              placeholder="请输入姓名"
              maxLength="20"
              onChange={(e) => {
                this.setState({
                  userName: e.target.value,
                });
              }}
              onBlur={() => {
                window.scrollBy(0, -0.1);
                // document.body.scrollTop = 0;
                // document.documentElement.scrollTop = 0 ;
              }}
            />
          </div>
        </div>
        <img
          src={nextSrc}
          alt=""
          className={styles['next-btn']}
          onClick={() => {
            window.zhuge.track('冠寓小程序-意向金活动页-下一步按钮');
            window.scrollBy(0, -0.1);
            this.next();
          }}
        />
        <div
          className={styles['rule-container']}
        >
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              说明事项
            </div>
          </div>
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              您缴纳的意向金可随时发起退款；
            </div>
          </div>
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              若您在缴纳意向金后签约，意向金自动折算成房租，计入您的首期账单中抵扣；
            </div>
          </div>
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              意向金缴纳后将在90个工作日后失效（新开业门店将在开业后15天失效），我们会在失效前给您发送提醒退款短信，请注意查收；
            </div>
          </div>
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              意向金失效后您再进行签约将不会享受上述权益；
            </div>
          </div>
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              每人每天最多可发起3笔意向金缴纳申请；
            </div>
          </div>
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              由于各地区门店政策有所不同，门店急速签约通道具体以门店政策为准；
            </div>
          </div>
          <div
            className={styles['text-container']}
          >
            <div className={styles.spot} />
            <div
              className={styles.text}
            >
              由于各地区门店政策有所不同，您在最终签约时获得的奖品可能有所差异，具体以门店政策为准。
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
