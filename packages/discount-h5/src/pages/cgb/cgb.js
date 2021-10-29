import '@/lib';
import './index.less';
import xhs from '../../utils/vhs-modal';
import * as tool from '../../utils/tool';

let timer;
const { $ } = window;
const jqSend = $('.send');
const jqInput = $('.cgb-input-code');
const jqRecive = $('.recive');
const jqInfo = $('.info');
const jqSure = $('.sure');
const jqModal = $('.cgb-modal');
const jqModalCover = $('.modal-cover');
const jqTel = $('.cgb-tel');
// const vConsole = new VConsole();
let isSendCode = false;

function showModal() {
  jqModal.show();
  jqModalCover.show();
  jqInfo.html(`请使用<span style="font-weight: 700"> ${jqTel.val()} </span>登录冠寓 APP 我的-优惠券 中查看。`);
  resetPageStatus();
}
function closeModal() {
  jqModal.hide();
  jqModalCover.hide();
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
  if (jqInput.val() === '') return xhs.showToast({ content: '验证码不能为空!' });
  if (jqTel.val() === '') return xhs.showToast({ content: '手机号不能为空!' });
  const codeNumber = tool.createCode('cgbBank');
  const value = {
    activityNumber: 202003104536, // 活动编码
    channel: 'cgb', //  渠道
    couponNumber: codeNumber, // 优惠券编码
    couponType: 2, // 1优惠券2折扣券
    phone: jqTel.val(), // 手机号
    verificationCode: jqInput.val(), // 验证码
  };
  $.ajax({
    url: '/coupon_api/api/coupon/receive',
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

function openApp() {
  jqModal.hide();
  jqModalCover.hide();
  // window.location = 'guanyu://';
  // setTimeout(() => {
  //   window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
  // }, 2000);
}

function resetScrollTop() {
  window.scroll(0, 0);
  document.body.style.height = 0;
}

$(() => {
  // 关闭弹窗
  jqSure.on('click', openApp);
  // 关闭弹窗
  jqModalCover.on('click', closeModal);
  // 领取折扣券
  jqRecive.on('click', reciveCoupon);
  // 获取验证码
  jqSend.on('click', sendCode);
  // 解决ios兼容问题
  jqInput.on('blur', resetScrollTop);
  // 解决ios兼容问题
  jqInput.on('focus', () => { document.body.style.height = '100%'; });
  // 解决ios兼容问题
  jqTel.on('blur', resetScrollTop);
  // 解决ios兼容问题
  jqTel.on('focus', () => { document.body.style.height = '100%'; });
});
