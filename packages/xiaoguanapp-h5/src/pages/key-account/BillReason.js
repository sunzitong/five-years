import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Flex, Button, TextareaItem, List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
// import { parse } from 'qs';
// import styles from './style.less';

// 接口地址
const API_SAVE = 'reason/save';

@connect(({ reason, loading }) => ({
  reason,
  loading: loading.effects[API_SAVE],
}))
@createForm()
class DetailShare extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params } } = props;
    const { id } = params || {};
    this.id = id;

    this.state = {
      errMsg: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.setState = () => {};
  }

  // 请求接口 - 完成
  requestSave = () => {
    const { id: orderId } = this;
    const { dispatch, form: { validateFields } } = this.props;

    validateFields((err, values) => {
      if (err) {
        this.setState({ errMsg: '请填写未到账原因' });
        return;
      }

      Toast.loading('', 100);

      const payload = { ...values, orderId };

      dispatch({ type: API_SAVE, payload }).then((response) => {
        const { status, msg } = response || {};
        if (status === 'ok') {
          Toast.success('操作成功');
          // 返回上一页
          window.location.href = 'xiaoguan://navigation/back';
          return;
        }

        Toast.fail(msg);
      });
    });
  }

  render() {
    const { form: { getFieldProps } } = this.props;
    const { errMsg } = this.state;

    return (
      <div>
        <WhiteSpace />
        <List
          renderHeader={() => {
            return (
              <p style={{ fontSize: '0.34rem', margin: 0 }}>
                <i style={{ color: '#f5222d', paddingRight: 8, fontStyle: 'normal' }}>*</i>
                填写未到账原因
              </p>
            );
          }}
        >
          <TextareaItem
            {...getFieldProps('remark', {
              onChange: (val) => {
                if (val.trim() !== '') {
                  this.setState({ errMsg: '' });
                }
              },
              rules: [{ required: true, message: '请填写未到账原因' }],
            })}
            placeholder="原因不得多于100个字"
            rows={6}
            count={100}
          />
        </List>
        {
          errMsg
            ? (
              <List
                renderHeader={() => {
                  return (
                    <p style={{ fontSize: '0.32rem', color: '#f5222d', margin: 0 }}>{errMsg}</p>
                  );
                }}
              />
            )
            : null
        }
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <Flex>
            <Flex.Item>
              <Button
                onClick={() => {
                  // 返回上一页
                  window.location.href = 'xiaoguan://navigation/back';
                }}
              >
                取消
              </Button>
            </Flex.Item>
            <Flex.Item><Button type="primary" onClick={this.requestSave}>完成</Button></Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

export default DetailShare;
