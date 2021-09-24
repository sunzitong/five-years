import './requery.less';
import './index.less';

const { $ } = window;
const phone = $('#phone');
const codeBtn = $('#codeBtn');
const code = $('#code');
const btn = $('#btn');
let countdown = 60;

// 获取验证码
function requestCode() {
  const res = /^1\d{10}$/;
  if (phone.val() === '') return myFunction('手机号不能为空!');
  if (!res.test(phone.val())) return myFunction('手机号不正确');
  $.ajax({
    url: '/coupon_api/api/verification_code',
    type: 'get',
    data: {
      phone: phone.val(),
    },
    beforeSend: () => {
      codeBtn.attr('disabled', 'disabled');
    },
    success(data) {
      if (data.code !== 0) return myFunction(data.msg || '失败');
      myFunction('发送成功!');
      settime();
    },
    complete: () => {
      codeBtn.attr('disabled', null);
    },
    error: () => {
      myFunction('接口报错');
    },

  });
}

// 领取折扣券
function requestBtn() {
  if (codeBtn.val() === '') return myFunction('验证码不能为空!');
  const value = {
    activityNumber: 201909034436, // 活动编码
    channel: 'xianyu', //  渠道
    couponNumber: 124942, // 优惠券编码
    couponType: 2, // 1优惠券2折扣券
    phone: phone.val(), // 手机号
    verificationCode: code.val(), // 验证码
  };
  $.ajax({
    url: '/coupon_api/api/coupon/receive',
    dataType: 'json',
    contentType: 'application/json',
    type: 'post',
    data: JSON.stringify(value),
    beforeSend: () => {
      btn.attr('disabled', 'disabled');
    },
    success(data) {
      if (data.code !== 0) return myFunction(data.msg || '失败');
      $('#phoneId').html(phone.val());
      $('#playOk').fadeIn();
      $('.protective').fadeIn();
      $('body,html').animate({ scrollTop: 0 }, 0);
    },
    complete: () => {
      btn.attr('disabled', null);
    },
    error: () => {
      myFunction('接口报错');
    },
  });
}

// 完成
function requestComplete() {
  phone.val('');
  code.val('');
  $('#playOk').fadeOut();
  $('.protective').fadeOut();
}

function settime() {
  if (countdown === 0) {
    codeBtn.attr('disabled', false);
    codeBtn.val('发送验证码');
    codeBtn.attr('style', 'color:#343434');
    countdown = 60;
    return;
  } else {
    codeBtn.attr('disabled', true);
    codeBtn.val(countdown);
    codeBtn.attr('style', 'color:#c1c1c1');
    // eslint-disable-next-line no-plusplus
    countdown--;
  }
  setTimeout(() => {
    settime();
  }, 1000);
}

// 提示
function myFunction(txt) {
  const x = $('.snackbarBox');
  const tig = $('#tig');
  tig.html(txt);
  x.addClass('show');
  x.removeClass('hide');
  setTimeout(() => {
    x.removeClass('show');
    x.addClass('hide');
  }, 3000);
}

$(() => {
  // 获取验证码
  $('#codeBtn').on('click', requestCode);

  // 领取折扣券
  $('#btn').on('click', requestBtn);

  // 完成
  $('.playBtn').on('click', requestComplete);
});
