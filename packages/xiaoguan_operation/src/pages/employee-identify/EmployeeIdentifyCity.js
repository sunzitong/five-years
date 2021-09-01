import React, { Component } from 'react';
import { List, InputItem, Icon, Button, Toast } from 'antd-mobile';
import { connect, routerRedux } from 'dva';
import { createForm } from 'rc-form';
import { wantArray } from 'utils/utils';
import styles from './style.less';

@createForm()
@connect(({ employeeIdentify, loading }) => ({
  employeeIdentify,
  loading: loading.effects['employeeIdentify/employeeCity'],
}))
class EmployeeIdentify extends Component {
  constructor(props) {
    super(props);
    document.title = '企业员工认证';
    this.state = {
      responseList: [],
    };
  }

  componentDidMount() {
    this.getList();
  }

  // 获取列表数据
  getList = () => {
    const { dispatch } = this.props;
    Toast.loading('加载中...', 3, () => { }, false);
    dispatch({
      type: 'employeeIdentify/employeeCity',
      payload: { page: { pageNum: 1, pageSize: 10 } },
    }).then((res) => {
      const { status, msg = '数据请求失败', data } = res || {};
      const { cityCompanys: { items } } = data;
      if (status === 'ok') {
        this.setState({
          responseList: [{ id: '', name: '全部区域' }, ...items],
        }, () => {
          Toast.hide();
        });
      } else {
        Toast.fail(msg);
      }
    });
  }

  handleSearch = () => {
    const { form: { validateFields } } = this.props;
    const { responseList } = this.state;
    Toast.loading('加载中...', 30, () => { }, false);
    validateFields((err, fieldValues) => {
      const { search } = fieldValues;
      if (search === '') {
        this.getList();
      } else {
        const data = responseList.filter(item => item.name.includes(search));
        this.setState({
          responseList: data,
        }, () => {
          Toast.hide();
        });
      }
    });
  }

  // 城市切换
  handleClickCity = (id) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/?city=${id}`));
  }

  render() {
    const { form: { getFieldProps } } = this.props;
    const { responseList } = this.state;
    return (
      <div className={styles.listCity}>
        <div className={styles.topSearch}>
          <List>
            <InputItem
              {...getFieldProps('search')}
              placeholder="请输入城市"
              labelNumber={2}
              clear
            >
              <Icon type="search" />
            </InputItem>
          </List>
          <Button
            activeStyle={false}
            onClick={this.handleSearch}
          >
            搜索
          </Button>
        </div>
        <div className={styles.employees}>
          {wantArray(responseList).map((item, index) => {
            return (
              <List
                onClick={() => this.handleClickCity(item.id)}
                key={String(index)}
              >
                {item.name}
              </List>
            );
          })}
        </div>
      </div>
    );
  }
}

export default EmployeeIdentify;
