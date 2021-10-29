
// 判断当前环境是否为 app环境
export function judgeEnviroment() {
  // isapp 是和 app端 约定好的表示  如果检测到了则为在app端打卡的页面
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/isapp/i) === 'isapp') {
    return true;
  }
  return false;
}

// 下载冠寓app

export function downApp() {
  const wx = navigator.userAgent.toLowerCase();
  if (wx.match(/MicroMessenger/i) === 'micromessenger') {
    // 如果是微信环境  直接进入到下载页面
    window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
  } else {
    window.location = 'guanyu://';
    setTimeout(() => {
      window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
    }, 600);
  }
}
const publicPath = process.env.BASE_URL;
export function getImgsAry() {
  const imgArys = [
    `${publicPath}img/sources/bg_0.jpg`,
    `${publicPath}img/sources/bg_1.jpg`,
    `${publicPath}img/sources/bg_2.jpg`,
    `${publicPath}img/sources/bg_3.jpg`,
    `${publicPath}img/sources/bg_4.jpg`,
    `${publicPath}img/sources/bg_5.jpg`,
    `${publicPath}img/sources/bg_6.jpg`,
    `${publicPath}img/sources/bg_7.jpg`,
    `${publicPath}img/sources/bg_8.jpg`,
    `${publicPath}img/sources/bg_9.jpg`,
    `${publicPath}img/sources/bg_10.jpg`,
    `${publicPath}img/sources/bg_11.jpg`,
    `${publicPath}img/sources/bg_12.jpg`,
    `${publicPath}img/sources/bg_13.jpg`,
    `${publicPath}img/sources/bg_14.jpg`,
    `${publicPath}img/sources/bg_15.jpg`,
    `${publicPath}img/sources/bg_16.jpg`,
    `${publicPath}img/sources/bg_17.jpg`,
    `${publicPath}img/sources/bg_18.jpg`,
    `${publicPath}img/sources/bg_19.jpg`,
    `${publicPath}img/sources/bg_20.jpg`,
    `${publicPath}img/sources/bg_21.jpg`,
    `${publicPath}img/sources/bg_22.jpg`,
    `${publicPath}img/sources/bg_23.jpg`,
    `${publicPath}img/sources/bg_24.jpg`,
    `${publicPath}img/sources/bg_25.jpg`,
    `${publicPath}img/sources/bg_26.jpg`,
    `${publicPath}img/sources/bg_27.jpg`,
    `${publicPath}img/sources/bg_28.jpg`,
    `${publicPath}img/sources/bg_29.jpg`,
    `${publicPath}img/sources/bg_30.jpg`,
    `${publicPath}img/sources/bg_31.jpg`,
    `${publicPath}img/sources/bg_32.jpg`,
    `${publicPath}img/sources/bg_33.jpg`,
    `${publicPath}img/sources/bg_34.jpg`,
    `${publicPath}img/sources/bg_35.jpg`,
    `${publicPath}img/sources/bg_36.jpg`,
    `${publicPath}img/sources/bg_37.jpg`,
    `${publicPath}img/sources/bg_38.jpg`,
    `${publicPath}img/sources/bg_39.jpg`,
    `${publicPath}img/sources/bg_40.jpg`,
    `${publicPath}img/sources/bg_41.jpg`,
    `${publicPath}img/sources/bg_42.jpg`,
    `${publicPath}img/sources/bg_43.jpg`,
    `${publicPath}img/sources/bg_44.jpg`,
    `${publicPath}img/sources/bg_45.jpg`,
    `${publicPath}img/sources/bg_46.jpg`,
    `${publicPath}img/sources/bg_47.jpg`,
    `${publicPath}img/sources/bg_48.jpg`,
    `${publicPath}img/sources/bg_49.jpg`,
    `${publicPath}img/sources/bg_50.jpg`,
    `${publicPath}img/sources/bg_51.jpg`,
    `${publicPath}img/sources/bg_52.jpg`,
    `${publicPath}img/sources/bg_53.jpg`,
    `${publicPath}img/sources/bg_54.jpg`,
    `${publicPath}img/sources/bg_55.jpg`,
    `${publicPath}img/sources/bg_56.jpg`,
    `${publicPath}img/sources/bg_57.jpg`,
    `${publicPath}img/sources/bg_58.jpg`,
    `${publicPath}img/sources/bg_59.jpg`,
    `${publicPath}img/sources/bg_60.jpg`,
    `${publicPath}img/sources/bg_61.jpg`,
    `${publicPath}img/sources/bg_62.jpg`,
    `${publicPath}img/sources/bg_63.jpg`,
    `${publicPath}img/sources/bg_64.jpg`,
    `${publicPath}img/sources/bg_65.jpg`,
    `${publicPath}img/sources/bg_66.jpg`,
    `${publicPath}img/sources/bg_67.jpg`,
    `${publicPath}img/sources/bg_68.jpg`,
    `${publicPath}img/sources/bg_69.jpg`,
    `${publicPath}img/sources/bg_70.jpg`,
    `${publicPath}img/sources/bg_81.jpg`,
    `${publicPath}img/sources/bg_82.jpg`,
    `${publicPath}img/sources/bg_83.jpg`,
    `${publicPath}img/sources/bg_84.jpg`,
    `${publicPath}img/sources/bg_85.jpg`,
    `${publicPath}img/sources/bg_86.jpg`,
    `${publicPath}img/sources/bg_87.jpg`,
    `${publicPath}img/sources/bg_88.jpg`,
    `${publicPath}img/sources/bg_89.jpg`,
    `${publicPath}img/sources/bg_90.jpg`,
    `${publicPath}img/sources/bg_91.jpg`,
    `${publicPath}img/sources/bg_92.jpg`,
    `${publicPath}img/sources/bg_93.jpg`,
    `${publicPath}img/sources/bg_94.jpg`,
    `${publicPath}img/sources/bg_95.jpg`,
    `${publicPath}img/sources/bg_96.jpg`,
    `${publicPath}img/sources/bg_97.jpg`,
    `${publicPath}img/sources/drawImg.png`,
    `${publicPath}img/sources/fwheel_outerCircle.png`,
    `${publicPath}img/sources/fwheel_outer_spotLight.png`,
    `${publicPath}img/sources/GoBtn.png`,
    `${publicPath}img/sources/goyoo_lighted.png`,
    `${publicPath}img/sources/goyoo_unlighted.png`,
    `${publicPath}img/sources/star.png`,
    `${publicPath}img/sources/dianliang_bg.jpg`,
    `${publicPath}img/sources/BirthDay_Banner.png`,
    `${publicPath}img/sources/my_prizBtn.png`,
    `${publicPath}img/sources/shareBtn.png`,
    `${publicPath}img/sources/logo.png`,
    `${publicPath}img/sources/xiaozi.png`,
    `${publicPath}img/sources/logo.png`,
  ];
  return imgArys;
}

export function publImg() {
  const imgAry = [
    `${publicPath}img/bps_imgs/bps_01.jpg`,
    `${publicPath}img/bps_imgs/bps_02.jpg`,
    `${publicPath}img/bps_imgs/bps_03.jpg`,
    `${publicPath}img/bps_imgs/bps_04.jpg`,
    `${publicPath}img/bps_imgs/bps_05.jpg`,
    `${publicPath}img/bps_imgs/bps_06.jpg`,
    `${publicPath}img/bps_imgs/bps_07.jpg`,
    `${publicPath}img/bps_imgs/bps_08.jpg`,
    `${publicPath}img/bps_imgs/bps_09.jpg`,
    `${publicPath}img/bps_imgs/bps_10.jpg`,
  ];
  return imgAry;
}

export function BirthDayImgs() {
  const birthAry = [
    {
      name: '上海生日会',
      imgNumber: 3800,
      imgStore: [
        `${publicPath}img/qs_imgs/01/sh_01.png`,
        `${publicPath}img/qs_imgs/01/sh_02.png`,
        `${publicPath}img/qs_imgs/01/sh_03.png`,
        `${publicPath}img/qs_imgs/01/sh_04.png`,
        `${publicPath}img/qs_imgs/01/sh_05.png`,
        `${publicPath}img/qs_imgs/01/sh_06.png`,
        `${publicPath}img/qs_imgs/01/sh_07.png`,
        `${publicPath}img/qs_imgs/01/sh_08.png`,
        `${publicPath}img/qs_imgs/01/sh_09.png`,
        `${publicPath}img/qs_imgs/01/sh_10.png`,
        `${publicPath}img/qs_imgs/01/sh_11.png`,
        `${publicPath}img/qs_imgs/01/sh_12.png`,
      ],
    },
    {
      name: '成都生日会',
      imgNumber: 2560,
      imgStore: [
        `${publicPath}img/qs_imgs/02/cd_01.png`,
        `${publicPath}img/qs_imgs/02/cd_02.png`,
        `${publicPath}img/qs_imgs/02/cd_03.png`,
        `${publicPath}img/qs_imgs/02/cd_04.png`,
        `${publicPath}img/qs_imgs/02/cd_05.png`,
        `${publicPath}img/qs_imgs/02/cd_06.png`,
        `${publicPath}img/qs_imgs/02/cd_07.png`,
        `${publicPath}img/qs_imgs/02/cd_08.png`,
      ],
    },
    {
      name: '重庆生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/03/cq_01.png`,
        `${publicPath}img/qs_imgs/03/cq_02.png`,
        `${publicPath}img/qs_imgs/03/cq_03.png`,
        `${publicPath}img/qs_imgs/03/cq_04.png`,
        `${publicPath}img/qs_imgs/03/cq_05.png`,
      ],
    },
    {
      name: '合肥生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/04/hf_01.png`,
        `${publicPath}img/qs_imgs/04/hf_02.png`,
        `${publicPath}img/qs_imgs/04/hf_03.png`,
        `${publicPath}img/qs_imgs/04/hf_04.png`,
        `${publicPath}img/qs_imgs/04/hf_05.png`,
      ],
    },
    {
      name: '浙江生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/05/zj_01.png`,
        `${publicPath}img/qs_imgs/05/zj_02.png`,
        `${publicPath}img/qs_imgs/05/zj_03.png`,
        `${publicPath}img/qs_imgs/05/zj_04.png`,
        `${publicPath}img/qs_imgs/05/zj_05.png`,
      ],
    },
    {
      name: '长沙生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/06/cs_01.png`,
        `${publicPath}img/qs_imgs/06/cs_02.png`,
        `${publicPath}img/qs_imgs/06/cs_03.png`,
        `${publicPath}img/qs_imgs/06/cs_04.png`,
        `${publicPath}img/qs_imgs/06/cs_05.png`,
      ],
    },
    {
      name: '南京生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/07/nj_01.png`,
        `${publicPath}img/qs_imgs/07/nj_02.png`,
        `${publicPath}img/qs_imgs/07/nj_03.png`,
        `${publicPath}img/qs_imgs/07/nj_04.png`,
        `${publicPath}img/qs_imgs/07/nj_05.png`,
      ],
    },
    {
      name: '北京生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/08/bj_01.png`,
        `${publicPath}img/qs_imgs/08/bj_02.png`,
        `${publicPath}img/qs_imgs/08/bj_03.png`,
        `${publicPath}img/qs_imgs/08/bj_04.png`,
        `${publicPath}img/qs_imgs/08/bj_05.png`,
      ],
    },
    {
      name: '广佛生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/09/gf_01.png`,
        `${publicPath}img/qs_imgs/09/gf_02.png`,
        `${publicPath}img/qs_imgs/09/gf_03.png`,
        `${publicPath}img/qs_imgs/09/gf_04.png`,
        `${publicPath}img/qs_imgs/09/gf_05.png`,
      ],
    },
    {
      name: '大连生日会',
      imgNumber: 1300,
      imgStore: [
        `${publicPath}img/qs_imgs/10/dl_01.png`,
        `${publicPath}img/qs_imgs/10/dl_02.png`,
        `${publicPath}img/qs_imgs/10/dl_03.png`,
        `${publicPath}img/qs_imgs/10/dl_04.png`,
      ],
    },
    {
      name: '珠海生日会',
      imgNumber: 1610,
      imgStore: [
        `${publicPath}img/qs_imgs/11/zh_01.png`,
        `${publicPath}img/qs_imgs/11/zh_02.png`,
        `${publicPath}img/qs_imgs/11/zh_03.png`,
        `${publicPath}img/qs_imgs/11/zh_04.png`,
        `${publicPath}img/qs_imgs/11/zh_05.png`,
      ],
    },
  ];
  return birthAry;
}
// 复制功能

export function cloneContent(id) {
  const range = document.createRange();
  range.selectNode(document.getElementById(id));
  const selection = window.getSelection();
  if (selection.rangeCount > 0) selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
}
