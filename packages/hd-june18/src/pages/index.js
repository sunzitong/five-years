import React from 'react';
import { wxShare } from '@guanyu/h5-tools';
import bg0 from 'assets/bg_0.jpg';
import bg1 from 'assets/bg_1.jpg';
import bg2 from 'assets/bg_2.jpg';
import bg3 from 'assets/bg_3.jpg';
import bg4 from 'assets/bg_4.jpg';
import bg5 from 'assets/bg_5.jpg';
import bg6 from 'assets/bg_6.jpg';
import bg7 from 'assets/bg_7.jpg';
import btn1 from 'assets/btn_1.png';
import btn2 from 'assets/btn_2.png';
import btn3 from 'assets/btn_3.png';
import btn4 from 'assets/btn_4.png';
import btn5 from 'assets/btn_5.png';
import btn6 from 'assets/btn_6.png';
import qrCode from 'assets/qr_code.jpg';
import styles from './index.less';


class Index extends React.Component {
  state = {
    qrCodePopupIsShow: false,
  }

  componentDidMount() {
    const constant = {
      debug: false,
      api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
      title: '龙湖冠寓·4周年超值大礼包',
      link: window.location.href,
      img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/ktEaV34B_6uDhuZ_xxkYbQ.jpeg',
      desc: '菜鸟裹裹、货拉拉、屈臣氏等多品牌联合助力',
      type: '',
      dataUrl: '',
      success: () => {
      },
    };

    wxShare(constant);
  }

  render() {
    const { qrCodePopupIsShow } = this.state;
    return (
      <div
        className={styles.container}
      >
        <div
          className={styles['img-container']}
        >
          <img
            src={bg0}
            alt=""
          />
        </div>
        <div
          className={styles['img-container']}
        >
          <img
            src={bg1}
            alt=""
          />
          <img
            src={btn1}
            alt=""
            className={styles.btn_1}
            onClick={() => {
              window.location.href = 'https://act.huolala.cn/rs/201903/act_user_ling/login.html?uuid=ttsjv9';
            }}
          />
        </div>
        <div
          className={styles['img-container']}
        >
          <img
            src={bg2}
            alt=""
          />
          <img
            src={btn2}
            alt=""
            className={styles.btn_2}
            onClick={() => {
              window.location.href = 'https://h5.watsons.com.cn/topic/T20200611183420580?f=gykh0611';
            }}
          />
        </div>
        <div
          className={styles['img-container']}
        >
          <img
            src={bg3}
            alt=""
          />
          <img
            src={btn3}
            alt=""
            className={styles.btn_3}
            onClick={() => {
              this.setState({
                qrCodePopupIsShow: true,
              });
            }}
          />
        </div>
        <div
          className={styles['img-container']}
        >
          <img
            src={bg4}
            alt=""
          />
          <img
            src={btn4}
            alt=""
            className={styles.btn_4}
            onClick={() => {
              window.location.href = 'https://mobile.caocaokeji.cn/activity/invite04.html?id=608031760585640922737&sign=2247b74bd58a7b5f18e9ecc08fc8807a&pageShowType=1';
            }}
          />
        </div>
        <div
          className={styles['img-container']}
        >
          <img
            src={bg5}
            alt=""
          />
          <img
            src={btn5}
            alt=""
            className={styles.btn_5}
            onClick={() => {
              window.location.href = 'https://wx.lechun.cc/pages/active/getCoupon/getCoupon.html?bindCode=0030eecfb99948849b5622e97daf1976&from=singlemessage&isappinstalled=0';
            }}
          />
        </div>
        <div
          className={styles['img-container']}
        >
          <img
            src={bg6}
            alt=""
          />
          <img
            src={btn6}
            alt=""
            className={styles.btn_6}
            onClick={() => {
              window.location.href = 'https://m.youshu.cc/pages/generalActivity/index.html?from_ys_source=WXH5&from=singlemessage&code=youshuyuekaxianshimianfeilinglonghu&tpl_id=&only_key=&isappinstalled=0';
            }}
          />
        </div>
        <div
          className={styles['img-container']}
        >
          <img
            src={bg7}
            alt=""
          />
        </div>
        {qrCodePopupIsShow && (
        <div className={styles['popup-cont']}>
          <div className={styles.fixed} />
          <div className={styles['main-cont-box']}>
            <div className={styles['main-cont']}>
              <p>
                嗨～很高兴认识你
                <br />
                菜鸟裹裹，2亿人都在用它寄快递
                <br />
                长按二维码关注公众号
                <br />
                回复“冠寓”，
                <br />
                即可获取3元寄件券
                <br />
                <br />
                记得哦，要在优惠有效期内使用
                <br />
                早点寄出你给TA的爱吧
              </p>
              <i className={styles.arrow} />
              <div className={styles['qr-code']}>
                <img src={qrCode} alt="" />
              </div>
              <div
                className={styles['close-button']}
                onClick={() => {
                  this.setState({
                    qrCodePopupIsShow: false,
                  });
                }}
              />
            </div>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default Index;
