import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import attachment from 'assets/attachment.png';
import 'utils/imagePreview';
import { parse } from 'qs';
import postMessage from 'utils/postMessage';
import styles from './style.less';

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.notice,
}))
class NoticeDetail extends React.Component {
  state = {
    noticeDetail: {},
  };

  componentDidMount() {
    // 设置分享按钮
    postMessage(JSON.stringify(
      {
        action: 'SetNavButtons',
        data: {
          right: [{
            image: 'share_icon',
            js: 'detailShare()',
          }],
        },
      }
    ));
    // 分享点击回调
    window.detailShare = () => {
      const { noticeDetail: { shareUrl, shareTitle, shareImg, shareText } } = this.state;
      postMessage(JSON.stringify(
        {
          action: 'ShowSharePanel',
          data: {
            url: shareUrl,
            title: shareTitle,
            text: shareText,
            image: shareImg,
          },
        }
      ));
    };
    document.querySelector('#noticeWrapper').onclick = (e) => {
      if (e.target.nodeName === 'IMG') {
        const { src } = e.target;
        const imgArr = [];
        Array.from(document.querySelectorAll('img')).forEach((item) => {
          if (item.src.includes('http')) {
            imgArr.push(item.src);
          }
        });
        // 图片点击预览，滑动切换
        if (src.includes('http')) {
          postMessage(JSON.stringify(
            {
              action: 'PreviewImages',
              data: {
                urls: imgArr,
                index: imgArr.indexOf(src),
                origin: `0,${(document.body.clientHeight / 2) - (e.target.height / 2)}`,
                size: 750,
              },
            }
          ));
        }
      }
    };
    this.getNoticeDetail();
  }

  // 获取详情
  getNoticeDetail = () => {
    const { noticeId } = parse(window.location.href.split('?')[1]);
    const { dispatch } = this.props;
    dispatch({
      type: 'notice/noticeDetail',
      payload: {
        noticeId,
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
          attachments,
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
        <div className={styles.files}>
          {
            (attachments || []).map((item) => {
              const { uid, name, url } = item;
              return (
                <div className={styles.fileItem} key={uid}>
                  <img src={attachment} download={name} alt="" />
                  <a href={url}>{`${name}(点击下载)`}</a>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default NoticeDetail;
