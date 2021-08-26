import React from 'react';
import styles from './index.less';

function BasicLayout(props) {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

export default BasicLayout;
