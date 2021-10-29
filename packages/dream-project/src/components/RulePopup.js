import React from 'react';
import closeModal from 'assets/closeModal.png';
import styles from './RulePopup.less';

class rulePopup extends React.Component {
  render() {
    const { children, classname, onClose = () => { } } = this.props;
    return (
      <div
        className={styles['rulePopup-container']}
      >
        <div
          className={`${styles.container} ${classname}`}
        >
          {children}
        </div>
        <img
          src={closeModal}
          alt=""
          className={styles.icon}
          onClick={() => {
            onClose();
          }}
        />
      </div>
    );
  }
}

export default rulePopup;
