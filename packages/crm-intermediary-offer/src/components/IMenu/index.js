import React from 'react';
import { Menu, ActivityIndicator, Drawer } from 'antd-mobile';
import PropTypes from 'prop-types';
import cls from './index.less';


class IMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  onChange = (value) => {
    const { onChange, data } = this.props;
    const labels = [];
    const options = [];
    data.forEach((dataItem) => {
      const [lev1, lev2] = value;
      if (dataItem.value === lev1) {
        const { label } = dataItem;
        labels.push(label);
        options.push(dataItem);
        if (Array.isArray(dataItem.children) && lev2) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === lev2) {
              labels.push(cItem.label);
              options.push(cItem);
            }
          });
        }
      }
    });
    onChange(labels, options);
  };

  handleClick = (e) => {
    const { show } = this.state;
    e.preventDefault(); // Fix event propagation on Android
    this.setState({ show: !show });
  };

  render() {
    const { show } = this.state;
    const { open, value, children, loading, data } = this.props;
    const menuEl = (
      <Menu
        className={cls.menu}
        data={data}
        value={value}
        onChange={this.onChange}
        height={document.documentElement.clientHeight}
      />
    );
    const loadingEl = (
      <div
        style={{
          width: '100%',
          height: document.documentElement.clientHeight,
          display: 'flex',
          background: 'rgba(244,246,247,1)',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </div>
    );
    return (
      <div className={show ? 'menu-active' : ''}>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          sidebarStyle={{ width: '100%' }}
          sidebar={show ? (loading ? loadingEl : menuEl) : null}
          open={open}
        >
          {children}
        </Drawer>
      </div>
    );
  }
}


/**
 * 默认属性
 */
IMenu.defaultProps = {
  onChange: () => {},
  value: [],
  data: [],
  loading: false,
};

/**
 * 检验属性
 */
IMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.isRequired,
    value: PropTypes.isRequired,
    children: PropTypes.isRequired,
  })),
  onChange: PropTypes.func,
  value: PropTypes.array,
  loading: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

export default IMenu;
