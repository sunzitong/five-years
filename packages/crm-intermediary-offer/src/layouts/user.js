import React from 'react';
import styles from './user.less';

function UserLayout(props) {
  const { children } = props;
  return (
    <div className={styles.user}>
      {children}
    </div>
  );
}

export default UserLayout;
