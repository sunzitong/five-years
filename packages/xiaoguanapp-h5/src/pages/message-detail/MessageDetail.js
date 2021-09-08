import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { parse } from 'qs';
import styles from './style.less';

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.notice,
}))
class MessageDetail extends React.Component {
  state = {
    messageDetail: {},
  };

  componentDidMount() {
    document.title = '消息详情sztszt';
    this.getMessageDetail();
  }

  // 获取详情
  getMessageDetail = () => {
    const { id } = parse(window.location.href.split('?')[1]);
    const { dispatch } = this.props;
    dispatch({
      type: 'notice/messageDetail',
      payload: {
        id,
      },
    }).then((res) => {
      const { status, data } = res || {};
      if (status === 'ok') {
        this.setState({ messageDetail: data || {} });
      }
    });
  }

  render() {
    const {
      messageDetail: {
        createTime = '',
        title = '',
        detailContents = {},
      },
    } = this.state;
    const contentProps = {
      className: styles.content,
      dangerouslySetInnerHTML: { __html: detailContents.App_B },
    };
    return (
      <div id="noticeWrapper" className={styles.noticeWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{createTime ? moment(createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
        <div id="contentWrapper">
          <div {...contentProps} />
        </div>
      </div>
    );
  }
}

export default MessageDetail;
