import React, { Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import cls from './index.less';

class PageHeader extends React.Component {
  render() {
    const { navBarTitle = '', navBarWrap, children, ...others } = this.props;
    return (
      <Fragment>
        <div className={cls.navBarWrap} {...navBarWrap}>
          <NavBar
            mode="light"
            icon={<Icon color="#343434" type="left" />}
            onLeftClick={() => router.go(-1)}
            {...others}
          >
            <span style={{ color: '#343434' }}>{navBarTitle}</span>
          </NavBar>
        </div>
        <div className={cls.content}>
          {children}
        </div>
      </Fragment>
    );
  }
}

export default PageHeader;
