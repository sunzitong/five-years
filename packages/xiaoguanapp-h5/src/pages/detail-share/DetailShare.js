import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import 'utils/imagePreview';
import { parse } from 'qs';
import styles from './style.less';

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.notice,
}))
class DetailShare extends React.Component {
  state = {
    noticeDetail: {},
  };

  componentDidMount() {
    document.querySelector('#noticeWrapper').onclick = (e) => {
      if (e.target.nodeName === 'IMG') {
        const { src } = e.target;
        // 图片点击预览，滑动切换
        const imgArr = [];
        Array.from(document.querySelectorAll('#noticeWrapper img')).forEach((item) => {
          if (item.src.includes('http')) {
            imgArr.push(item.src);
          }
        });
        window.previewImage.start({
          urls: imgArr,
          current: src,
        });
      }
    };
    this.getNoticeDetail();
  }

  // 获取详情
  getNoticeDetail = () => {
    const { id } = parse(window.location.href.split('detail-share?')[1]);
    const { dispatch } = this.props;
    dispatch({
      type: 'notice/shareDetail',
      payload: {
        id,
      },
    }).then((res) => {
      const { status, data } = res || {};
      if (status === 'ok') {
        const { noticeTemplateStatus } = data || {};
        document.title = noticeTemplateStatus === 'Important' ? '重要公告' : '上线公告';
        this.setState({ noticeDetail: data || {} });
      }
    });
  }

  render() {
    const {
      noticeDetail: {
        createTime = '',
        noticeContents: {
          title = '',
          content,
          pics,
        } = {},
      },
    } = this.state;
    const contentProps = {
      className: styles.content,
      dangerouslySetInnerHTML: { __html: content },
    };
    return (
      <div id="noticeWrapper" className={styles.noticeWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{createTime ? moment(createTime).format('YYYY年MM月DD日') : ''}</span>
        <div id="contentWrapper">
          <div {...contentProps} />
          <div className={styles.imgs}>
            {
              (pics || []).map(pic => <img src={pic} key={pic} alt="" />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DetailShare;
