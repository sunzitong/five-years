import '@/lib';
import './index.less';
import xhs from '../../utils/vhs-modal';

let timer;
const { $ } = window;
let selectValue = '';
let activityNumber = '';
let scrollTop = 0;
const jqSend = $('.free-send');
const jqInput = $('.free-input-code');
const jqRecive = $('.recive');
const jqInfo = $('.info');
const jqSure = $('.sure');
const jqModal = $('.free-modal');
const jqModalCover = $('.modal-cover');
const jqTel = $('.free-tel');
const jqWelfare = $('.welfare');
const jqWelfareBox = $('.welfare-box');
const jqProjectName = $('.free-header-top-title');
const jqProjectDesc = $('.free-header-top-desc');
// const jqRulesContent = $('.rules-content');
const jqRulesContentRules = $('.rules-content-rules');
const jqRulesContentRecive = $('.rules-content-recive');
const jqRulesContentTime = $('.rules-content-time');
const jqSelectModal = $('.select-modal');
const jqErrorModal = $('.error-modal');
const jqErrorCover = $('.error-cover');
const jqActiveTime = $('.active-time');
const jqActiveInfo = $('.active-info');

// const vConsole = new VConsole();
let isSendCode = false;

function showModal() {
  jqModal.show();
  jqModalCover.show();
  jqInfo.html(`恭喜您已成功领取<span style="font-weight: 700"> ${jqProjectName.text()} </span>免租券，用<span style="font-weight: 700"> ${jqTel.val()} </span>去冠寓App签约使用`);
  resetPageStatus();
}
function closeModal() {
  jqModal.hide();
  jqModalCover.hide();
  jqSelectModal.hide();
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
  $(document).scrollTop(scrollTop);
}

// 手机号校验
function checkPhone(phone) {
  if (!phone) {
    xhs.showToast({ content: '请输入手机号' });
    return false;
  }
  const pattern = /^\d+$/g;
  if (!phone.match(pattern) || phone.length !== 11) {
    xhs.showToast({ content: '请输入正确的手机号' });
    return false;
  }
  return true;
}

// 重置页面状态
function resetPageStatus() {
  jqInput.val('');
  jqTel.val('');
  jqSend.html('发送验证码');
  clearInterval(timer);
  isSendCode = false;
  jqSend.attr('disabled', null);
}


// 发送验证码
function timeSet() {
  let authTime = 60;
  isSendCode = true;
  jqSend.attr('disabled', 'disabled');
  timer = setInterval(() => {
    authTime -= 1;
    jqSend.html(`${authTime}秒后重新获取`);
    if (authTime <= 0) {
      isSendCode = false;
      jqSend.attr('disabled', null);
      jqSend.html('重新获取');
      clearInterval(timer);
    }
  }, 1000);
}

// 日期生成函数

function getDateStr(date) {
  const dateObj = new Date(date.replace(/-/g, '/'));
  const year = `${dateObj.getFullYear()}年`;
  const month = `${dateObj.getMonth() + 1}月`;
  const day = `${dateObj.getDate()}日`;
  return [year, month, day].join('');
}

// 请求活动详情
function getActiveDetail() {
  const query = location.search;
  if (query && query.indexOf('?activityNumber=') >= 0) {
    activityNumber = query.replace('?activityNumber=', '');
  }
  $.ajax({
    url: '/coupon_api/api/discount/detail',
    type: 'get',
    data: {
      activityNumber,
    },
    success(data) {
      if (data.code !== 0 && Object.keys(data.data).length > 0) return xhs.showToast({ content: data.msg || '失败' });
      const {
        data: {
          projectName,
          activityName,
          receiveRules,
          activityRules,
          startTime,
          endTime,
          status,
          coupons,
        },
      } = data;
      // error状态显示与否
      const startTimeStr = getDateStr(startTime);
      const endTimeStr = getDateStr(endTime);
      jqRulesContentRecive.text(`领取规则：${receiveRules || ''}`);
      jqRulesContentTime.text(`有效期：${startTimeStr}-${endTimeStr}`);
      jqRulesContentRules.text(`${activityRules || ''}`);
      // 活动未开始
      if (status === 'NOT_START' || status === 'NOT_ENABLED') {
        jqActiveTime.html(`开始时间：${startTimeStr || ''}`);
        openError();
      }
      // 活动已结束
      if (status === 'EXPIRED') {
        jqActiveInfo.html('很抱歉，活动结束了下次赶早呦～');
        jqActiveTime.html('');
        openError();
      }
      // 活动已关闭
      if (status === 'CLOSED' || status === 'FINISHED' || status === 'TEMP') {
        jqActiveInfo.html('很抱歉，活动暂时关闭了～');
        jqActiveTime.html('');
        openError();
      }
      if (projectName) {
        const newProjectName = projectName.replace('龙湖冠寓', '');
        jqProjectName.html(newProjectName);
      }
      // select赋值
      jqProjectDesc.html(activityName);
      // jqRulesContent.html(activityRules);
      let str = '';
      coupons.forEach(item => {
        str += `<div class="select-list ${item.receiveAmount === item.relationAmount ? 'disabled' : ''}" ban="${item.receiveAmount === item.relationAmount ? 'ban' : 'allow'}" val="${item.couponNumber}">
        <div class="select-list-first" ban="${item.receiveAmount === item.relationAmount ? 'ban' : 'allow'}" val="${item.couponNumber}">签约租期大于等于${item.leaseTerm}个月</div>
        <div class="select-list-second" ban="${item.receiveAmount === item.relationAmount ? 'ban' : 'allow'}" val="${item.couponNumber}">免租${item.reduce}天</div>
        <div class="select-list-button" ban="${item.receiveAmount === item.relationAmount ? 'ban' : 'allow'}" val="${item.couponNumber}">领取</div>
        </div>`;
      });
      jqWelfareBox.html(str);
      const jqSelectList = $('.select-list');
      jqSelectList.on('click', (e) => {
        if ($(e.target).attr('ban') === 'ban') return;
        jqSelectList.removeClass('active');
        $(e.target).addClass('active');
        selectValue = $(e.target).attr('val');
        const item = coupons.filter(coupon => coupon.couponNumber.toString() === selectValue)[0];
        $('.tel-content-percent').show();
        $('.tel-content-percent').html(`<div class="tel-content-percent-first">签约租期大于等于${item.leaseTerm}个月</div>
        <div class="tel-content-percent-second">免租${item.reduce}天</div>`);
        jqSelectModal.hide();
        jqModalCover.hide();
        $('.tel-content-choose').hide();
        $('.tel-content-percent').show();
        $('.click-toggle-coupon').show();
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
        $(document).scrollTop(scrollTop);
      });
    },
    complete: () => {
      // jqSend.attr('disabled', null);
    },
    error: () => {
      xhs.showToast({ content: '接口报错' });
    },
  });
}

function openSelect() {
  jqModalCover.show();
  jqSelectModal.show();
  const jqSelectButton = $('.select-button');
  scrollTop = $(document).scrollTop();
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.left = 0;
  document.body.style.right = 0;
  jqSelectButton.on('click', () => {
    closeModal();
  });
}

function sendCode() {
  if (isSendCode) return;
  const value = checkPhone(jqTel.val());
  if (value) {
    $.ajax({
      url: '/coupon_api/api/verification_code',
      type: 'get',
      data: {
        phone: jqTel.val(),
      },
      beforeSend: () => {
        jqSend.attr('disabled', 'disabled');
      },
      success(data) {
        if (data.code !== 0) return xhs.showToast({ content: data.msg || '失败' });
        xhs.showToast({ content: '发送成功!' });
        timeSet();
      },
      complete: () => {
        // jqSend.attr('disabled', null);
      },
      error: () => {
        jqSend.attr('disabled', null);
        xhs.showToast({ content: '接口报错' });
      },
    });
  }
}
function reciveCoupon() {
  if (!isSendCode) return xhs.showToast({ content: '请先发送验证码' });
  if (jqInput.val() === '') return xhs.showToast({ content: '验证码不能为空!' });
  if (jqInput.val().length !== 6) return xhs.showToast({ content: '验证码格式不对!' });
  if (!selectValue) return xhs.showToast({ content: '请选择福利!' });
  if (jqTel.val() === '') return xhs.showToast({ content: '手机号不能为空!' });
  const value = {
    activityNumber, // 活动编码
    couponNumber: selectValue, // 优惠券编码
    phone: jqTel.val(), // 手机号
    verificationCode: jqInput.val(), // 验证码
  };
  $.ajax({
    url: '/coupon_api/api/discount/receive',
    dataType: 'json',
    contentType: 'application/json',
    type: 'post',
    data: JSON.stringify(value),
    beforeSend: () => {
      jqRecive.attr('disabled', 'disabled');
    },
    success(data) {
      if (data.code !== 0) return xhs.showToast({ content: data.msg || '失败' });
      showModal();
    },
    complete: () => {
      jqRecive.attr('disabled', null);
    },
    error: () => {
      xhs.showToast({ content: '接口报错' });
    },
  });
}

// function closeError() {
//   jqErrorModal.hide();
//   jqErrorCover.hide();
// }

function openError() {
  jqErrorModal.show();
  jqErrorCover.show();
}

function openApp() {
  jqModal.hide();
  jqModalCover.hide();
  window.location = 'guanyu://';
  setTimeout(() => {
    window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
  }, 2000);
}

$(() => {
  // 请求数据
  getActiveDetail();
  // 打开选择弹窗
  jqWelfare.on('click', openSelect);
  // 关闭弹窗
  jqSure.on('click', openApp);
  // 关闭弹窗
  jqModalCover.on('click', closeModal);
  // 领取折扣券
  jqRecive.on('click', reciveCoupon);
  // 获取验证码
  jqSend.on('click', sendCode);
  // 解决ios兼容问题
  jqInput.on('focus', () => { document.body.style.height = '100%'; });
  // 解决ios兼容问题
  jqTel.on('focus', () => { document.body.style.height = '100%'; });
});
