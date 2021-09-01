import React from 'react';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';
import { Flex, InputItem, Icon } from 'antd-mobile';
import cls from './index.less';

@createForm()
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: {},
    };
  }

  componentDidMount() {
    this.handleOnChange();
  }

  // 输入后同步状态 及时查询
  onChange(value) {
    this.setState({
      value: {
        phone: value,
      },
    });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.handleSubmit();
    }, 500);
  }


  handleOnChange(params) {
    // 没有参数为自动触发
    const type = !!params;
    const { value } = this.state;
    const { onChange } = this.props;
    onChange({
      ...value,
      ...params,
    }, type);
  }

  /**
   * 提交信息
   */
  handleSubmit() {
    // const { form: { validateFields } } = this.props;
    // validateFields((err, values) => {
    //   if (err) {
    //     const [first] = Object.values(err);
    //     Toast.info(first.errors[0].message, 2);
    //     return false;
    //   }
    // });
    const { value } = this.state;
    this.handleOnChange(value);
  }


  render() {
    const { form: { getFieldProps } } = this.props;
    const { value: { phone } } = this.state;
    return (
      <div className={cls.searchBar}>
        <Flex>
          <Flex.Item>
            <Flex className={cls.myinput}>
              <span style={{ color: '#C1C1C1', marginRight: 10 }}><Icon type="search" /></span>
              <Flex.Item>
                <InputItem
                  {...getFieldProps('phone')}
                  clear
                  value={phone}
                  maxLength={11}
                  placeholder="请输入客户手机号"
                  onChange={(val) => { this.onChange(val); }}
                />
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <a onClick={this.handleSubmit} className={cls.buttonSearch}>搜索</a>
        </Flex>
      </div>
    );
  }
}

/**
 * 默认属性
 */
SearchBar.defaultProps = {
  onChange: () => {},
};

/**
 * 检验属性
 */
SearchBar.propTypes = {
  onChange: PropTypes.func,
};

export default SearchBar;
