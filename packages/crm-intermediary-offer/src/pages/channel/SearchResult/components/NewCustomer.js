import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { List, Result, Toast, WhiteSpace, DatePicker } from 'antd-mobile';
import { images } from '@/utils/images';
import cls from '../index.less';

const API = {
  appoint: 'searchResult/makeAnAppointmentFetch',
};
@createForm()
@connect(({ searchResult, loading }) => ({
  searchResult,
  loading: loading.effects[API.appoint],
}))
class NewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAppointment = this.handleAppointment.bind(this);
  }

  /**
   * 预约请求
   */
  sendAppointment(payload) {
    const { dispatch, getResult, location, loading } = this.props;
    if (loading) return;
    dispatch({
      type: API.appoint,
      payload: {
        ...location.query,
        time: (new Date(payload.time)).getTime(),
      },
    }).then((res) => {
      if (!res) return false;
      getResult(res.data);
    });
  }

  /**
   * 预约校验并提交
   */
  handleAppointment() {
    const { form: { validateFields } } = this.props;
    validateFields({ first: true }, (err, values) => {
      if (err) {
        const [first] = Object.values(err);
        Toast.info(first.errors[0].message, 2);
        return false;
      }
      this.sendAppointment(values);
    });
  }

  render() {
    const { form: { getFieldProps, getFieldValue } } = this.props;
    return (
      <div className={cls.resultWrap}>
        <Result
          img={<img className={cls.resIcon} src={images.head} alt="" />}
          message={
            <div className={cls.resultTips}>
              该客户是一个新客
              <br />
              可以预约冠寓到店看房店
            </div>}
        />
        <WhiteSpace />
        <List className={cls.resultListWrap}>
          <DatePicker
            {
              ...getFieldProps('time', {
                rules: [
                  { required: true, message: '请选择预约日期' },
                ],
              })
            }
            minDate={new Date()}
          >
            <List.Item>
              <span className={cls.store}>预约日期</span>
            </List.Item>
          </DatePicker>
        </List>
        <div className={cls.interval} />
        {
          getFieldValue('time') ? (
            <a onClick={this.handleAppointment} className={cls.buttonAppoint}>预约看房</a>) : (
              <a className={[cls.buttonAppoint, cls.disabled].join(' ')}>预约看房</a>
          )
        }
      </div>
    );
  }
}


/**
 * 默认属性
 */
NewCustomer.defaultProps = {
  getResult: () => {},
};

/**
 * 检验属性
 */
NewCustomer.propTypes = {
  getResult: PropTypes.func,
};

export default NewCustomer;
