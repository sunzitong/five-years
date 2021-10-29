import qs from 'qs';
import './index.less';
// import '../../mock/mock';

const { $, location: { search } } = window;


const paramObj = qs.parse(search.substring(1));
const { t: token, o: openId } = paramObj;
$(() => {
  let payLoading = false;
  // 判断是否为微信环境
  const getIsWxClient = () => {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger');
  };

  if ((getIsWxClient() > -1) && !openId) {
    const { location: { host } } = window;
    // 测试环境
    if (host === 'm.test109.iguanyu.com') {
      window.location.href = `http://pms.test109.gyapt.cn/webapp/go/wx?t=${token}`;
    }

    // 预上线
    if (host === 'm.staging.iguanyu.com') {
      window.location.href = `http://pms.test109.gyapt.cn/webapp/go/wx?t=${token}`;
    }


    // 线上环境跳转
    if (host === 'm.iguanyu.com') {
      window.location.href = `http://guanyu.longfor.com/webapp/go/wx?t=${token}`;
    }
  }

  // 请求
  const requset = ({ method, url, params, callback }) => {
    let requestparam = {};


    requestparam = {
      type: method,
      url,
      dataType: 'json',
      contentType: 'application/json',
      data: method === 'get' ? { ...params } : JSON.stringify(params),
      success(data) {
        callback(data);
      },
    };

    $.ajax({
      ...requestparam,
    });
  };

  // 创建toast
  const createToast = (text = '') => {
    const toast = $(`<div class="toast">${text}</div>`);
    $('body').append(toast);
    clearTimeout(timer);
    const timer = setTimeout(() => {
      $('.toast').remove();
      clearTimeout(timer);
    }, 5000);
  };

  // 调用详情接口
  const getDetail = () => {
    const params = {
      method: 'get',
      url: '/app-server/api/v1/h5Pay/getBillByToken',
      params: { token },
      callback: (res = {}) => {
        const result = res;
        $('.loading').hide();
        if (result.code !== 10000) {
          createToast(result.message);
          return;
        }

        const { data:
            {
              signUserName,
              roomNo,
              contractNo,
              amountInfo,
              projectName,
              staffName,
              expectPayDate,
              billDetailItem,
              billStatusName,
              isCheckout,
            },
        } = result;

          // 支付成功
        if (billStatusName === 'New' || billStatusName === 'PrePay') {
          $('.container').show();
        }

        // 支付完成
        if (billStatusName === 'Paid' || billStatusName === 'Finished') {
          $('.paySuccess').show();
          $('title').html('龙湖冠寓_已支付');
        }

        // 订单失效
        if (billStatusName === 'Invalid' || billStatusName === 'Inactive') {
          $('.payFail').show();
        }
        const { couponAmout = 0, finalAmount, carryAmount } = amountInfo;

        // 应收金额
        $('.amount').html(`¥${parseFloat(finalAmount).toFixed(2)}`);

        $('.payamout').html(`¥${parseFloat(finalAmount).toFixed(2)}`);

        // 门店信息
        $('.headerAddr').html(projectName);

        // 运营官
        $('.staffName').html(`运营官:${staffName}`);

        // 还款日期
        if (isCheckout) {
          $('.tips').html(`应于${expectPayDate}前完成付款，感谢您的配合，如不按时付款，将会影响您在冠寓的信用！冠寓app内支付，查看更详细账单。`);
        } else {
          $('.tips').html(`应于${expectPayDate}前完成付款，感谢您的配合！冠寓app内支付，查看更详细账单`);
        }

        // 签约人信息
        const sginInfo = [
          { name: '签约人', value: signUserName },
          { name: '房间号', value: roomNo },
          { name: '合同号', value: contractNo },
        ];

          // 退房账单明细
        const checkoutbill = billDetailItem.map(item => {
          return {
            name: item.fundTypeDesc,
            value: item.amount,
          };
        });

          // 账单明细
        const bill = [
          ...checkoutbill,
        ];

        if (carryAmount) {
          bill.push({ name: '结转金额', value: carryAmount });
        }

        if (couponAmout) {
          bill.push({ name: '优惠金额', value: couponAmout });
        }

        // 签约信息
        let htmlSinInfo = '';
        sginInfo.forEach(item => {
          htmlSinInfo += `<li>
                        <span class="labelTitle">${item.name}</span>
                        <span class="labelCon">${item.value}</span>
                    </li>`;
        });


        // 账单信息
        let billInfohtml = '';
        bill.forEach(item => {
          billInfohtml += `<li>
                  <span class="labelTitle">${item.name}</span>
                  <span class="labelCon">${item.value}</span>
              </li>`;
        });

        $('.sginInfo').html(htmlSinInfo);
        $('.BillInfo').html(billInfohtml);
      },
    };

    requset(params);
  };

  // 获取支付参数
  const getPayInfo = (call) => {
    const params = {
      method: 'get',
      url: '/app-server/api/v1/h5Pay/getPayOrderByToken',
      params: { token },
      callback: (data) => {
        payLoading = false;
        const result = data;
        if (result.code !== 10000) {
          createToast(result.message);
          return;
        }
        call(result.data);
      },
    };
    requset(params);
  };

    // 获取支付详情
  getDetail();

  // 点击发起支付
  $('.payButton').on('click', () => {
    // 支付
    if (payLoading) return;
    payLoading = true;
    const doPay = (data) => {
      const params = {
        method: 'post',
        url: '/app-server/api/v1/h5Pay/doPay',
        params: { ...data, openId },
        callback: (result) => {
          if (result.code !== 10000) {
            createToast(result.message);
            return;
          }
          const { data: { payParam } } = result;
          localStorage.setItem('callbackHTML', payParam);
          window.location.href = `${window.location.protocol}//${window.location.hostname}/fe/remotepay/pay.html`;
        },
      };
      requset(params);
    };
      // 支付参数
    getPayInfo(doPay);
  });
});
