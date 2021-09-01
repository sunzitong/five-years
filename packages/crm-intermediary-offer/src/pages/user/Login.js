import React, { Fragment } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import router from 'umi/router';
import { Flex, List, InputItem, Toast } from 'antd-mobile';
import { images } from '@/utils/images';
import { setAuthInfo } from '@/utils/saveAuth';
import cls from './login.less';

const API = {
  login: 'login/getLoginFetch',
  code: 'login/getCodeFetch',
};
const TIME = 60;

@connect(({ login, loading }) => ({
  login,
  loading: loading.effects[API.login],
  getCodeLoading: loading.effects[API.code],
}))
@createForm()
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetCode = this.handleGetCode.bind(this);
    this.hasGeted = false;
    this.state = {
      codeButtonClicked: false,
      time: TIME,
    };
  }

  /**
   * 倒计时
   */
  handleTimeout() {
    let { time } = this.state;
    let timer = null;
    const SPEED = 1000;
    const next = () => {
      timer = setTimeout(() => {
        if (time <= 1) {
          clearTimeout(timer);
          this.setState({ time: TIME, codeButtonClicked: false });
          timer = null;
          return false;
        } else {
          this.setState({ time: time -= 1 }, next);
        }
      }, SPEED);
    };
    this.setState({ codeButtonClicked: true });
    timer = setTimeout(next, 1000);
  }

  /**
   * 获取验证码
   */
  handleGetCode() {
    const { form: { validateFields }, dispatch, getCodeLoading } = this.props;
    const { codeButtonClicked } = this.state;
    if (getCodeLoading || codeButtonClicked) return false;
    validateFields(['phone'], { first: true }, (err, values) => {
      if (err) {
        const [first] = Object.values(err);
        Toast.info(first.errors[0].message, 2);
        return false;
      }

      dispatch({
        type: API.code,
        payload: values,
      }).then((res) => {
        if (res && res.status === 'ok') {
          this.handleTimeout();
          this.hasGeted = true;
          Toast.info('验证码发送成功');
        }
      });
    });
  }

  /**
   * 登陆接口
   */
  handleLogin(values) {
    const { dispatch } = this.props;
    Toast.loading('登录中...');
    // setTimeout(Toast.info('33...', 3), 9000);
    dispatch({
      type: API.login,
      payload: {
        ...values,
      },
    }).then((res) => {
      if (res && res.status === 'ok') {
        setAuthInfo(Object.assign(res.data, { time: res.timestamp }));
        router.push('/');
        Toast.hide();
      }
    });
  }

  /**
   * 校验数据并提交
   */
  handleSubmit() {
    const { form: { validateFields } } = this.props;

    validateFields({ first: true }, (err, values) => {
      if (err) {
        const [first] = Object.values(err);
        Toast.info(first.errors[0].message, 2);
        return false;
      }
      this.handleLogin(values);
    });
  }

  render() {
    const { form: { getFieldProps } } = this.props;
    const { state } = this;
    return (
      <Fragment>
        <div className={cls.topArea} style={{ ...images.user }} />
        <div className={cls.loginArea}>
          <List>
            <InputItem
              {
                ...getFieldProps('phone', {
                  rules: [
                    { required: true, message: '请输入手机号' },
                    { pattern: /^1\d{10}/, message: '请输入正确的手机号' },
                  ],
                }
                )
              }
              maxLength={11}
              clear
              placeholder="请输入手机号码"
            />
          </List>
          <List>
            <Flex justify="between">
              <Flex.Item>
                <InputItem
                  {
                    ...getFieldProps('code', {
                      rules: [
                        { required: true, message: '请输入验证码' },
                      ],
                    })
                  }
                  clear
                  placeholder="请输入验证码"
                />
              </Flex.Item>
              <a onClick={this.handleGetCode} className={cls.codeBtn}>
                {state.codeButtonClicked ? `${state.time}s` : (
                  this.hasGeted ? '重新获取' : '获取验证码'
                )}
              </a>
            </Flex>
          </List>
          <a onClick={this.handleSubmit} className={cls.buttonLogin}>登 录</a>
        </div>
      </Fragment>
    );
  }
}

export default Login;
