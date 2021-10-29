import React from 'react';
import { connect } from 'dva';
import axios from 'axios';
import styles from './index.less';

// function BasicLayout(props) {
//   const { children } = props;
//   return (
//     <div className={styles.wrapper}>
//       {children}
//     </div>
//   );
// }

@connect(({ global }) => ({
  global,
}))
class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { sessionId } = this.props.global;
    axios.defaults.headers.common.Authorization = sessionId;
    this.commonConfig();
  }

  commonConfig = async () => {
    // Toast.loading('加载中...', 0);
    const { dispatch } = this.props;
    const res = await dispatch({
      type: 'global/commonConfig',
    });
    if (!res) return;
    // Toast.hide();
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.wrapper}>
        {children}
      </div>
    );
  }
}

export default BasicLayout;
