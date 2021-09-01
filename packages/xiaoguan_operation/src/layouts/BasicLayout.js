import React from 'react';
import loadingImg from 'assets/loading.gif';
import styles from './style.less';

class BasicLayout extends React.Component {
  render() {
    const { children, loading } = this.props;
    return (
      <div>
        {
          loading ? (
            <div className={styles.loading}>
              <div className={styles.mask}>
                <img src={loadingImg} alt="" />
                <div className={styles.loadingWords}>加载中...</div>
              </div>
            </div>
          ) : null
        }
        { children }
      </div>
    );
  }
}

export default BasicLayout;
