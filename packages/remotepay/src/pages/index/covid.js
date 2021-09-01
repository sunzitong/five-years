import qs from 'qs';
import './covid.less';
// import './mpicker.css';
// import '../../mock/mock';


const { $, location: { search } } = window;


const paramObj = qs.parse(search.substring(1));
const { o: openId } = paramObj;
$(() => {
  let payLoading = false;
  let roomId = '';
  let roomNumber = '';
  const errorToast = {
    name: '请输入您的姓名',
    roomId: '请选择您的房间号',
    idNo: '请输入您的证件号',
  };

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

  // 点击发起支付
  $('.toPayButton').on('click', () => {
    if (payLoading) return;
    payLoading = true;
    const formValuesArr = $('form').serializeArray();
    const formValues = {};
    formValuesArr.forEach(item => {
      formValues[item.name] = item.value;
    });
    formValues.openId = openId;
    const values = {
      ...formValues,
      roomId,
      roomNumber,
    };

    if (!values.name) {
      createToast(errorToast.name);
      payLoading = false;
      return;
    }

    if (!values.roomId) {
      createToast(errorToast.roomId);
      payLoading = false;
      return;
    }

    const params = {
      method: 'post',
      url: '/covid/doPay',
      params: { ...values },
      callback: (result) => {
        if (result.status !== 'ok') {
          createToast(result.msg);
          return;
        }
        payLoading = false;
        const { data: { payParam } } = result;
        localStorage.setItem('callbackHTML', payParam);
        window.location.href = `${window.location.protocol}//${window.location.hostname}/fe/remotepay/pay.html`;
      },
    };

    requset(params);
  });


  // 获取房间列表
  const getDetail = () => {
    const params = {
      method: 'get',
      url: '/covid/rooms/list',
      callback: (res = {}) => {
        const result = res;
        $('.loading').hide();
        if (result.status !== 'ok') {
          createToast(result.msg);
          return;
        }
        const { data } = res;
        $('#picker').mPicker({
          level: 3,
          dataJson: data,
          Linkage: true,
          rows: 6,
          idDefault: true,
          splitStr: '-',
          header: '<div class="mPicker-header"><div class="header-nav"><span>楼栋号</span><span>楼层号</span><span>房间号</span></div></div>',
          confirm(json) {
            // console.info('当前选中json：', json);
            // console.info('【json里有不带value时】');
            // console.info('选中的id序号为：', json.ids);
            // console.info('选中的value为：', json.values);
            const idsArr = json.ids.split('-');
            const roomItems = data[idsArr[0]].child[idsArr[1]].child[idsArr[2]];
            roomId = roomItems.id;
            roomNumber = roomItems.name;
          },
          // cancel(json) {
          //   console.info('当前选中json：', json);
          // },
        });
      },
    };

    requset(params);
  };

  // 获取房间价格
  const getPrice = () => {
    const params = {
      method: 'get',
      url: '/covid/getPrice',
      callback: (res = {}) => {
        const result = res;
        $('.loading').hide();
        if (result.status !== 'ok') {
          createToast(result.msg);
          return;
        }
        const { data } = res;
        const { isolationDay, roomPrice, payAmount } = data;
        $('.isolationPrice').html(`房费：${roomPrice}元/天`);
        $('.isolationDay').html(`天数: ${isolationDay}天`);
        $('.isolationPayAmount').html(`¥ ${payAmount}`);
      },
    };

    requset(params);
  };

  getPrice();
  // 获取房间列表
  getDetail();
});
