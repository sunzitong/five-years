import React from 'react';
import styles from './index.css';

function BasicLayout(props) {
  const { children } = props;
  return (
    <div className={styles.normal}>
      {children}
    </div>
  );
}

export default BasicLayout;
