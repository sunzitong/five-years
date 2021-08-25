import React from 'react';
import styles from './index.less';

class Shadow extends React.Component {
  render() {
    const { children, classname } = this.props;
    return (
      <div
        className={styles['shadow-container']}
      >
        <div
          className={`${styles.container} ${classname}`}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Shadow;
