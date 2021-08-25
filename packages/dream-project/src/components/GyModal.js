import React from 'react';
import { connect } from 'dva';
import styles from './gyModal.less';

@connect(({ global }) => ({
  global,
}))
class GyModal extends React.Component {

  render() {
    const {
      title = '',
      content = '',
      cancelText = '取消',
      confirmText = '确认',
      cancelColor = '#666666',
      confirmColor = '#F18D00',
      success = () => { },
      fail = () => { },
      visible = false,
      iSsingleBtn = false,
      shadowCallBack = () => { },
    } = this.props;
    const { global: { isFullScreen } } = this.props;
    return (
      <div
        className={styles['modal-container']}
        style={{
          display: visible ? 'flex' : 'none',
        }}
        onClick={() => {
          shadowCallBack();
        }}
      >
        <div
          className={styles['box-container']}
          style={{
            marginTop: isFullScreen ? `-206PX` : `-78PX`
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={styles['title-container']}
          >
            {title}
          </div>
          <div
            className={styles['content-container']}
          >
            {content}
          </div>
          <div
            className={styles['button-container']}
          >
            {
              !iSsingleBtn && (
                <div
                  className={styles['button']}
                  style={{
                    color: cancelColor,
                  }}
                  onClick={() => {
                    fail();
                  }}
                >
                  {cancelText}
                </div>
              )
            }
            <div
              className={styles['button']}
              style={{
                color: confirmColor,
              }}
              onClick={() => {
                success();
              }}
            >
              {confirmText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GyModal;
