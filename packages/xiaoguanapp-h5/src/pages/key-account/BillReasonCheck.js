import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Flex, Button, TextareaItem, List, Toast } from 'antd-mobile';

// 接口地址
const API_INFO = 'reason/info';

@connect(({ reason, loading }) => ({
  reason,
  loading: loading.effects[API_INFO],
}))
class DetailShare extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params } } = props;
    const { id } = params || {};
    this.id = id;

    this.state = {
      responseData: '',
    };
  }

  componentDidMount() {
    this.requestInfo();
  }

  componentWillUnmount() {
    this.setState = () => { };
  }

  // 请求接口 - 完成
  requestInfo = () => {
    const { id } = this;
    const { dispatch } = this.props;
    const payload = { id, flag: true };
    Toast.loading('', 100);
    dispatch({ type: API_INFO, payload }).then((response) => {
      const { status, data, msg } = response || {};
      Toast.hide();
      if (status === 'ok') {
        this.setState({ responseData: data });
        return;
      }

      Toast.fail(msg || '获取信息失败');
    });
  }

  render() {
    const { responseData } = this.state;

    return (
      <div>
        <WhiteSpace />
        <List renderHeader={() => <p style={{ fontSize: '0.34rem', margin: 0 }}>未核销原因</p>}>
          <TextareaItem
            value={responseData}
            rows={6}
            disabled
          />
        </List>
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
                返回
              </Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

export default DetailShare;
