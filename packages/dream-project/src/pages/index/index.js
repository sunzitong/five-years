import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Toast } from 'antd-mobile';
import RulePopup from '@/components/RulePopup';
// import axios from 'axios';
import { judgeDevice } from '@guanyu/h5-tools';
import { parse, stringify } from 'qs';
import guanyu from 'assets/guanyu.png';
import btnClose from 'assets/btn_close.png';
import discount from 'assets/discount.png';
import noRiseInPrice from 'assets/noRiseInPrice.png';
import free from 'assets/free.png';
import insideRecommend from 'assets/insideRecommend.png';
// import arrowRight from 'assets/arrowRight.png';
import grayArrowRight from 'assets/gray_arrow_right.png';
import studentLogo from 'assets/studentLogo.png';
import one from 'assets/one.png';
import two from 'assets/two.png';
import three from 'assets/three.png';
import four from 'assets/four.png';
// import five from 'assets/five.png';
import styles from './index.less';

const visitSource = judgeDevice();

@connect(({ global, index }) => ({
  global, index,
}))
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showKnowMore: false,
      showLogin: false,
      verificationCode: '',
      phone: '',
      codeText: '发送验证码',
    };
  }

  componentDidMount() {
    const { global: { cityName = '' } } = this.props;
    window.zhuge.track('住梦计划页', {
      cityname: cityName,
    });
    sessionStorage.clear();
    this.resideDreamPlanIndex();
    this.setShareMessage();
  }

  setShareMessage = () => {
    const { global: { isMiniProgram } } = this.props;
    if (isMiniProgram) {
      window.wx.miniProgram.postMessage({
        data: {
          title: '住梦计划',
          imageUrl: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/CMS/X0-tj0DpRlc.jpeg',
          path: 'pages/index/index',
        },
      });
    }
  }

  resideDreamPlanIndex = async () => {
    Toast.loading('加载中...', 0);
    const { dispatch, global } = this.props;
    const { cityId } = global;
    const res = await dispatch({
      type: 'index/resideDreamPlanIndex',
      payload: {
        cityId,
      },
    });
    if (!res) return;
    Toast.hide();
    const { data = {} } = res;
    const { data: newData = {} } = data || {};
    this.setState({
      data: newData,
    });
  }

  loginSendVerificationCode = async () => {
    const { phone = '', sendDisabled } = this.state;
    if (sendDisabled) return;
    const { dispatch } = this.props;
    if (!phone) {
      Toast.info('请输入手机号', 3, () => { }, false);
      return;
    }
    const res = await dispatch({
      type: 'index/loginSendVerificationCode',
      payload: {
        phone,
      },
    });
    const { data = {} } = res;
    const { code = '', msg = '' } = data || {};
    if (code === 1000) {
      Toast.info('发送成功', 3, () => { }, false);
      this.setState({
        count: 60,
        sendDisabled: true,
      });
      const authTimetimer = setInterval(() => {
        const { count } = this.state;
        this.setState({
          count: count - 1,
        }, () => {
          const { count: newCount } = this.state;
          this.setState({
            codeText: `${newCount}秒后可重新发送`,
          });
          if (newCount <= 0) {
            this.setState({
              codeText: '发送验证码',
              sendDisabled: false,
            });
            clearInterval(authTimetimer);
          }
        });
      }, 1000);
    } else {
      Toast.info(msg, 3, () => { }, false);
    }
  }

  login = async () => {
    const { phone = '', verificationCode = '' } = this.state;
    const { dispatch } = this.props;
    if (!phone) {
      Toast.info('请输入手机号', 3, () => { }, false);
      return;
    }
    if (!verificationCode) {
      Toast.info('请输入验证码', 3, () => { }, false);
      return;
    }
    const res = await dispatch({
      type: 'index/login',
      payload: {
        phone,
        verificationCode,
      },
    });
    const { data = {} } = res;
    const { code = '', data: subData = {}, msg = '接口错误' } = data || {};
    const { token = '' } = subData || {};
    if (+code === 1000) {
      Toast.info('登录成功', 3, () => { }, false);
      document.cookie = `GyAuthorization=${token}; path=/`;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      Toast.info(msg, 3, () => { }, false);
    }
  }

  render() {
    const { dispatch, global } = this.props;
    const { sessionId, isFullScreen, GyVirtualPhone } = global;
    const { data = {},
      showKnowMore,
      showLogin,
      verificationCode,
      phone,
      codeText,
    } = this.state;
    const { userInfo = {}, studentStatusInfo = {}, items = {}, studentAuthInfo = {} } = data || {};
    const { schoolName = '', periodValidity = '', id = '' } = studentAuthInfo || {};
    const { icon = '', userName = '' } = userInfo || {};
    const { statusName = '', statusDesc = '' } = studentStatusInfo || {};
    const { items: list = [] } = items || {};
    const isGaryBtn = statusName === 'TOBEAUDIT' || statusName === 'REFUSE' || statusName === 'EXPIRE' || statusName === 'INVALID' || statusName === 'UNAUTHORIZED';
    return (
      <div
        className={styles.container}
        style={{
          paddingBottom: isFullScreen ? '34pt' : '1pt',
        }}
      >
        {
          GyVirtualPhone && (
            <a className={styles['advisory-phone']} href={`tel:${GyVirtualPhone}`}>
              <img src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/b7hbq78Cchg3ujKWzWlkjw.png" className={styles['advisory-icon']} alt="" />
            </a>
          )
        }
        <img src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/P1u-SkRME9ASDvBSzKopDw.png" className={styles.topPic} alt="" />
        <div
          className={styles['content-container']}
        >
          {
            sessionId ? (
              <div
                className={styles['userInfo-container']}
              >
                <div style={{ display: 'flex' }}>
                  <div
                    className={styles['portrait-container']}
                  >
                    <img src={guanyu} alt="" className={styles['guanyu-icon']} />
                    <img src={icon} alt="" className={styles.protrait} />
                  </div>
                  <div
                    className={styles['info-container']}
                  >
                    <div
                      className={styles['top-container']}
                    >
                      <div
                        className={styles['left-container']}
                      >
                        <div
                          className={styles.name}
                        >
                          {userName}
                        </div>
                        {
                          statusDesc && (
                            <div
                              className={`${styles.status} ${!isGaryBtn ? styles.valid : styles.invalid}`}
                            >
                              {/* {
                            statusName === 'UNAUTHORIZED' ? '未认证' : '已认证'
                          } */}
                              {
                                statusDesc
                              }
                            </div>
                          )
                        }
                      </div>
                      {
                        statusName !== 'UNAUTHORIZED' ? (
                          <div
                            className={styles['right-container']}
                            onClick={() => {
                              const searchObj = parse(window.location.href.split('?')[1]);
                              if (id) {
                                dispatch({
                                  type: 'global/setId',
                                  payload: {
                                    id,
                                  },
                                });
                                searchObj.id = id;
                                searchObj.fromHomepage = true;
                              }
                              router.push(`/fe/dream-project/layout/authentication?${stringify(searchObj)}`);
                            }}
                          >
                            <div
                              className={styles.label}
                            >
                              {
                                statusName === 'PASS' && '修改认证'
                              }
                              {
                                statusName === 'TOBEAUDIT' && '修改认证'
                              }
                              {
                                (statusName === 'REFUSE' || statusName === 'EXPIRE' || statusName === 'INVALID') && '重新认证'
                              }
                            </div>
                            <img src={grayArrowRight} alt="" className={styles.icon} />
                          </div>
                        ) : null
                      }
                    </div>
                    {
                      statusName === 'PASS' && (
                        <div
                          className={styles['valid-bottom-container']}
                        >
                          <div
                            className={styles['school-container']}
                          >
                            <div
                              className={styles.label}
                            >
                              学校
                            </div>
                            <div>
                              {schoolName}
                            </div>
                          </div>
                          <div>
                            {periodValidity}
                          </div>
                        </div>
                      )
                    }
                    {
                      statusName === 'UNAUTHORIZED' && (
                        <div
                          className={styles['invalid-bottom-container']}
                        >
                          在校学生及毕业2年内的大专、本科、硕士、博士（含海外高校） 通过认证后即享专属学生权益。
                        </div>
                      )
                    }
                    {
                      statusName === 'TOBEAUDIT' && (
                        <div
                          className={styles['invalid-bottom-container']}
                        >
                          您的学生认证正在审核中，审核完成后会通过短信方式告知审核结果。
                        </div>
                      )
                    }
                    {
                      (statusName === 'REFUSE' || statusName === 'EXPIRE' || statusName === 'INVALID') && (
                        <div
                          className={styles['invalid-bottom-container']}
                        >
                          很抱歉，您的学生认证失败或已超过毕业时间2年，请重新填写认证信息。
                        </div>
                      )
                    }
                  </div>
                </div>
                {
                  statusName === 'UNAUTHORIZED' && (
                    <div
                      className={styles['certification-container']}
                    >
                      <div
                        className={styles['login-btn']}
                        onClick={() => {
                          const searchObj = parse(window.location.href.split('?')[1]);
                          searchObj.fromHomepage = true;
                          router.push(`/fe/dream-project/layout/authentication?${stringify(searchObj)}`);
                        }}
                      >
                        立即认证
                      </div>
                    </div>
                  )
                }
              </div>
            ) : (
              <div
                className={styles['not-login']}
              >
                <div
                  className={styles['login-btn']}
                  onClick={() => {
                    if (visitSource === '小程序') {
                      window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
                    } else if (visitSource === 'APP') {
                      window.location.href = 'guanyu://page.gy/login';
                    } else {
                      this.setState({
                        showLogin: true,
                      });
                    }
                  }}
                >
                  登录
                </div>
                <div
                  className={styles.label}
                >
                  在校学生及毕业2年内的大专、本科、硕士、博士（含海外高校） 通过认证后即享专属学生权益。
                </div>
              </div>
            )
          }
          <div
            className={styles['title-container']}
          >
            学生专属优惠
          </div>
          <div
            className={styles['coupon-type-container']}
          >
            <div
              className={styles['cell-container']}
              style={{
                backgroundImage: `url(${discount})`,
              }}
            >
              <div
                className={styles.title}
              >
                租金9.8折
              </div>
              <div
                className={styles.label}
              >
                额外享受租金折扣
              </div>
            </div>
            <div
              className={styles['cell-container']}
              style={{
                backgroundImage: `url(${noRiseInPrice})`,
              }}
            >
              <div
                className={styles.title}
              >
                月付不涨价
              </div>
              <div
                className={styles.label}
              >
                月付房租一身轻松
              </div>
            </div>
            <div
              className={styles['cell-container']}
              style={{
                backgroundImage: `url(${free})`,
              }}
            >
              <div
                className={styles.title}
              >
                全国免费换租
              </div>
              <div
                className={styles.label}
              >
                工作调动无忧换房
              </div>
            </div>
            <div
              className={styles['cell-container']}
              style={{
                backgroundImage: `url(${insideRecommend})`,
              }}
            >
              <div
                className={styles.title}
              >
                龙湖集团岗位内推
              </div>
              <div
                className={styles.label}
              >
                实习社招内推通道
              </div>
            </div>
          </div>
          <div
            className={styles['know-more-btn']}
            onClick={() => {
              window.zhuge.track('住梦计划页-了解更多按钮');
              this.setState({
                showKnowMore: true,
              });
            }}
          >
            了解更多
          </div>
          {/* <div
            className={styles['title-container']}
          >
            学生专享优惠券
          </div>
          <div
            className={styles['coupon-container']}
          >
            <div
              className={styles['gift-container']}
              onClick={() => {
                if (isMiniProgram) {
                  Toast.info('很抱歉由于微信平台限制，学生专享优惠券需前往冠寓App进行领取', 3, () => { }, false);
                } else if (!sessionId || statusName !== 'PASS') {
                  Toast.info('很抱歉，学生专享优惠券目前仅限已认证的学生领取', 3, () => { }, false);
                } else {
                  window.zhuge.track('住梦计划页-优惠券按钮', {
                    coupontype: '货拉拉',
                  });
                  window.location.href = 'https://act.huolala.cn/rs/201903/act_user_ling/login.html?uuid=slmt22&ref=lhgy&from=singlemessage&isappinstalled=0';
                }
              }}
            >
              <div
                className={styles['top-container']}
              >
                <div
                  className={styles.unit}
                >
                  ¥
                </div>
                <div
                  className={styles.price}
                >
                  185
                </div>
                <div
                  className={styles.name}
                >
                  搬家礼包
                </div>
              </div>
              <div
                className={styles['bottom-container']}
              >
                <div
                  className={styles.label}
                >
                  立即领取
                </div>
                <div
                  className={styles.icon}
                >
                  <img src={arrowRight} alt="" className={styles.arrow} />
                </div>
              </div>
            </div>
            <div
              className={styles['wait-gift']}
            >
              更多礼包
              <br />
              即将上线
            </div>
          </div> */}
          <div
            className={styles['title-container']}
          >
            精选门店推荐
          </div>
        </div>
        <div
          className={styles['project-list-container']}
        >
          {
            list.map((item) => {
              const { imgUrl = '', itemName = '', minPrice = '', priceUnit = '', url = '', itemId = '', isOpen = true } = item;
              return (
                <div
                  className={styles['item-container']}
                  key={itemId}
                  onClick={() => {
                    window.zhuge.track('住梦计划页-精选门店按钮');
                    if (visitSource === '小程序') {
                      if (isOpen) {
                        window.wx.miniProgram.navigateTo({
                          url: `/packageA/pages/shopDetail/shopDetail?itemId=${item.itemId}&projectname=${item.itemName}`,
                        });
                      } else {
                        window.wx.miniProgram.navigateTo({
                          url: `/packageA/pages/planOpenShopDetail/planOpenShopDetail?itemId=${item.itemId}`,
                        });
                      }
                    } else if (visitSource === 'APP') {
                      window.location = url;
                    } else {
                      window.location = `${window.location.origin}/guanyudetail/${itemId}`;
                    }
                  }}
                >
                  <div
                    className={styles['pic-container']}
                  >
                    <img src={guanyu} alt="" className={styles['guanyu-icon']} />
                    {/* <img src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/null/tziDXmjglcg.jpg?x-oss-process=image/resize,h_750,w_560/quality,Q_90" alt="" className={styles['project-img']} /> */}
                    <img src={imgUrl} alt="" className={styles['project-img']} />
                  </div>
                  <div
                    className={styles['desc-container']}
                  >
                    <div
                      className={styles['project-name']}
                    >
                      {itemName}
                    </div>
                    <div
                      className={styles['price-container']}
                    >
                      <div
                        className={styles.price}
                      >
                        {minPrice}
                      </div>
                      <div
                        className={styles.unit}
                      >
                        {priceUnit}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
        {
          showKnowMore && (
            <RulePopup
              onClose={() => {
                this.setState({
                  showKnowMore: false,
                });
              }}
              classname={styles['shadow-class']}
            >
              <div
                className={styles['shadow-inside-container']}
              >
                <div
                  style={{
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                  <img src={studentLogo} alt="" className={styles.studentLogo} />
                  <div
                    className={styles.container}
                    style={{
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <div>
                      <div
                        className={styles['number-container']}
                      >
                        <img src={one} alt="" className={styles.number} />
                        <div
                          className={styles.title}
                        >
                          租金9.8折
                        </div>
                      </div>
                      <div
                        className={styles['content-text']}
                      >
                        1. 每月租金98折，租期大于等于六个月可用;
                        <br />
                        2.可叠加冠寓年租98折、半年付99折/年付98折;
                        <br />
                        3.不可叠加企业优惠和部分折扣券，其他活动可询龙湖冠寓门店；
                        <br />
                        4.有效期:每次签约时住梦计划身份认证为已通过状态；
                        <br />
                        5.认证通过后即可在签约时自动享有本权益，您可在签约时通过租金价格查看；
                        <br />
                        6.全国冠寓门店通用，剩余房量需详询门店。
                      </div>
                    </div>
                    <div>
                      <div
                        className={styles['number-container']}
                      >
                        <img src={two} alt="" className={styles.number} />
                        <div
                          className={styles.title}
                        >
                          月付不涨价
                        </div>
                      </div>
                      <div
                        className={styles['content-text']}
                      >
                        1.按照冠寓官方价格政策，采用月付方式，每月租金上涨100-300元;认证通过住梦计划后，可享受每月租金不上涨；
                        <br />
                        2.认证通过后即可在签约时自动享有本权益，您可在签约时通过租金价格查看。
                      </div>
                    </div>
                    <div>
                      <div
                        className={styles['number-container']}
                      >
                        <img src={three} alt="" className={styles.number} />
                        <div
                          className={styles.title}
                        >
                          全国免费换租
                        </div>
                      </div>
                      <div
                        className={styles['content-text']}
                      >
                        1.按照冠寓官方价格政策，合同未到期换房时须缴纳20%月租金作为手续费;认 证通过住梦计划后，可享受免手续费换房;
                        <br />
                        2.每一个以 住梦计划认证身份签署的合同有效期内，可享受1次本权益 ；
                        <br />
                        3.全国冠寓门店通用，可同店、同城、全国换房，剩余房量需详询门店。
                        <br />
                        4.跨城市免费换房需至少提前15天与门店运营官/店长提出申请，否则将产生退租手续费须客户自行承担。
                      </div>
                    </div>
                    <div>
                      <div
                        className={styles['number-container']}
                      >
                        <img src={four} alt="" className={styles.number} />
                        <div
                          className={styles.title}
                        >
                          龙湖集团实习内推
                        </div>
                      </div>
                      <div
                        className={styles['content-text']}
                      >
                        1.实习:
                        <br />
                        ①.如果您希望到龙湖集团实习，只要您未毕业，在住冠寓或曾经住过冠寓(租期 1个月)，即可将您的简历投递给门店，由门店为您进行内推；
                        <br />
                        ②.龙湖集团所有实习岗位皆可内推，如有意向岗位，您可以注明；
                        <br />
                        ③.简历推荐后，将会有HRBP反馈结果，为您安排面试和录用流程；若简历未通过筛选，将不影响您对我们其他招聘岗位的申请，感谢您对龙湖集团的关注和支持哦！
                        <br />
                        2.社招:
                        <br />
                        若您已毕业希望加入龙湖集团，门店设有“龙湖集团招聘”二维码，您可以扫码进入“社会招聘”菜单，选择岗位投递简历。
                      </div>
                    </div>
                    {/* <div>
                      <div
                        className={styles['number-container']}
                      >
                        <img src={five} alt="" className={styles.number} />
                        <div
                          className={styles.title}
                        >
                          搬家优惠券
                        </div>
                      </div>
                      <div
                        className={styles['content-text']}
                      >
                        1.本权益由龙湖冠寓和货拉拉联合提供，新老用户可领取最高185元拉货搬家券;
                        <br />
                        2.优惠券有多种，使用规则详见货拉拉领券页面；
                        <br />
                        3.搬家/货运由货拉拉提供，服务相关问题可咨询货拉拉客服1010-3636
                      </div>
                    </div> */}
                    <div>
                      <div
                        className={styles['content-text']}
                      >
                        更多精彩权益和福利即将推出敬请期待!
                        <br />
                        龙湖冠寓保留住梦计划活动的最终解释权。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RulePopup>
          )
        }
        {
          showLogin && (
            <div className={styles.shadow}>
              <div className={styles.container}>
                <div className={styles.title}>手机验证</div>
                <input
                  className={styles['input-phone']}
                  maxLength="11"
                  type="number"
                  placeholder="请输入您的手机号码"
                  value={phone}
                  onChange={(e) => {
                    this.setState({
                      phone: e.target.value,
                    });
                  }}
                />
                <div className={styles['code-phone']}>
                  <input
                    type="number"
                    placeholder="请输入验证码"
                    maxLength="6"
                    value={verificationCode}
                    onChange={(e) => {
                      this.setState({
                        verificationCode: e.target.value,
                      });
                    }}
                  />
                  <div
                    className={styles['code-container']}
                    onClick={() => {
                      this.loginSendVerificationCode();
                    }}
                  >
                    {codeText}
                  </div>
                </div>
                <div
                  className={styles['login-btn']}
                  onClick={() => {
                    this.login();
                  }}
                >
                  登录
                </div>
              </div>
              <img
                src={btnClose}
                alt=""
                onClick={() => {
                  this.setState({
                    showLogin: false,
                  });
                }}
              />
            </div>
          )
        }

      </div>
    );
  }
}


export default Homepage;
