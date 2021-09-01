import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListView, PullToRefresh, InputItem, Icon, Button, Tabs, Card, Toast } from 'antd-mobile';
import { connect, routerRedux } from 'dva';
import { createForm } from 'rc-form';
import FONT_SCALE from 'utils/font';
import styles from './style.less';

@createForm()
@connect(({ employeeIdentify, loading }) => ({
  employeeIdentify,
  loading: loading.effects['employeeIdentify/identifyList'],
}))
class EmployeeIdentify extends Component {
  constructor(props) {
    super(props);
    const { location: { query } } = props;
    this.city = Number(query?.city) || '';
    document.title = '企业员工认证';
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      responseList: [],
      list: [],
      tabs: [],
      dataSource,
      pageNum: 1,
      height: document.documentElement.clientHeight,
      identifyState: 0,
      initLoading: true, // 初次进入页面显示加载中
    };
  }

  componentDidMount() {
    const { height } = this.state;
    this.setState({
      // eslint-disable-next-line react/no-find-dom-node
      height: height - ReactDOM.findDOMNode(this.lv).offsetTop,
    });
    this.getList();
    this.getPendingNum();
    this.getCity();
  }

  // 获取列表数据
  getList = (direction) => {
    const { dispatch } = this.props;
    const { pageNum, identifyState, search } = this.state;
    dispatch({
      type: 'employeeIdentify/identifyList',
      payload: {
        pageSize: 6,
        pageNum,
        state: identifyState,
        search,
        cityDepartmentId: this.city,
      },
    }).then((res) => {
      const { status, msg = '数据请求失败', data } = res || {};
      if (status === 'ok') {
        const { list: listNew = [] } = data || {};
        const { list: listOld } = this.state;
        let dataList = [];
        // up 上滑，否则重新挂载请求数据
        if (direction !== 'up') {
          dataList = listNew;
          this.setState({ noMore: false });
        } else {
          dataList = listNew.length ? listOld.concat(listNew) : listOld;
          if (!listNew.length) {
            this.setState({
              noMore: true, // 没有更多了
            });
          }
        }
        this.setState({
          list: dataList,
        });
      } else {
        Toast.fail(msg);
      }
      this.setState({
        loadingRefresh: false,
        loadMore: false,
        initLoading: false,
      });
    });
  }

  // 获取城市
  getCity = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'employeeIdentify/employeeCity',
      payload: { page: { pageNum: 1, pageSize: 10 } },
    }).then((res) => {
      const { status, msg = '数据请求失败', data } = res || {};
      const { cityCompanys: { items } } = data;
      if (status === 'ok') {
        this.setState({
          responseList: [{ id: '', name: '全部区域' }, ...items],
        });
      } else {
        Toast.fail(msg);
      }
    });
  }

  // 获取待认证数量
  getPendingNum = () => {
    const { dispatch } = this.props;
    const { search } = this.state;
    dispatch({
      type: 'employeeIdentify/identifyNumber',
      payload: {
        search,
        cityDepartmentId: this.city,
      },
    }).then((res) => {
      const { status, data } = res || {};
      if (status === 'ok') {
        this.setState({
          tabs: data.map((item, index) => {
            return {
              title: (
                <p>
                  {item.label}
                  <span style={{ color: 'red' }}>{`(${item.count})`}</span>
                </p>
              ),
              key: index,
            };
          }),
        });
      }
    });
  }

  // 搜索
  handleSearch = () => {
    const { form: { validateFields } } = this.props;
    validateFields((err, fieldValues) => {
      const { search } = fieldValues;
      this.setState({
        search,
        list: [],
        pageNum: 1,
        initLoading: true,
      }, () => {
        this.getList();
      });
    });
  }

  // 城市切换
  handleClickCity = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/employee-identify-city/1'));
  }

  // 切换状态
  handleTabChange = ({ key }) => {
    this.setState({
      identifyState: key,
      list: [],
      initLoading: true,
    }, () => {
      this.getList();
    });
  }

  // 跳转详情
  toDetail = (id) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/employee-identify/${id}`));
  }

  // 单条数据
  renderRow = (rowData, sectionId, rowId) => {
    const {
      id = '',
      authenticationState,
      authenticationStateName = '',
      employeeName = '',
      mobile = '',
      companyName = '',
      audit = false,
    } = rowData;
    return (
      <Card key={rowId} full>
        <Card.Header
          title={id}
          extra={
            <span
              style={{ color: authenticationState === 'PENDING' ? '#c82a29' : 'unset' }}
            >
              {authenticationStateName}
            </span>
          }
        />
        <Card.Body onClick={() => this.toDetail(id)}>
          <div className={styles.item}>
            <span className={styles.itemDesc}>姓名：</span>
            <span className={styles.itemVal}>{employeeName}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemDesc}>电话：</span>
            <span className={styles.itemVal}>{mobile}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemDesc}>认证企业：</span>
            <span className={styles.itemVal}>{companyName}</span>
          </div>
        </Card.Body>
        {
          (authenticationState === 'PENDING' && audit) && (
            <Card.Footer
              style={{
                borderTop: '1px solid #EAEAEA',
                fontSize: '0',
              }}
              extra={
                <Button
                  type="primary"
                  size="small"
                  className={styles.btnAudit}
                  inline
                  onClick={() => {
                    this.toDetail(id);
                  }}
                >
                  去审核
                </Button>
              }
            />
          )
        }
        {
          authenticationState === 'FAIL' && (
            <Card.Footer
              style={{
                borderTop: '1px solid #EAEAEA',
                color: 'rgb(200, 42, 41)',
              }}
              content={(
                <div
                  className={styles.failcotent}
                >
                  员工信息编辑为正确信息，并保存，可触发再次审核
                </div>
              )}
            />
          )
        }
      </Card>
    );
  }

  // 下拉刷新
  handleRefresh = () => {
    this.setState({
      pageNum: 1,
      loadingRefresh: true,
    }, () => {
      this.getList();
    });
  }

  // 上滑加载
  handleEndReached = () => {
    const { pageNum, noMore } = this.state;
    if (noMore) return;
    this.setState({
      loadMore: true,
      pageNum: pageNum + 1,
    }, () => {
      this.getList('up');
    });
  }

  render() {
    const { form: { getFieldProps }, loading } = this.props;
    const {
      dataSource, list, height, loadingRefresh, tabs,
      loadMore, noMore, initLoading, responseList,
    } = this.state;
    const listSource = dataSource.cloneWithRows(list);
    let footerText = '';
    if (noMore) {
      footerText = '没有更多数据了';
    } else {
      footerText = (loadMore || initLoading) && loading ? '加载中...' : '';
    }
    const cityName = responseList.filter(item => item.id === this.city)[0];
    return (
      <div className={styles.listWrapper}>
        <div className={styles.topSearch}>
          <div onClick={this.handleClickCity}>
            {cityName?.name}
          </div>
          <List>
            <InputItem
              {...getFieldProps('search')}
              placeholder="请输入姓名、手机号"
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
        <Tabs
          tabs={tabs}
          tabBarActiveTextColor="#1890FF"
          tabBarInactiveTextColor="#858585"
          tabBarTextStyle={{
            fontSize: 26 * FONT_SCALE,
          }}
          tabBarUnderlineStyle={{
            borderWidth: 6 * FONT_SCALE,
            borderRadius: 4 * FONT_SCALE,
            width: 40 * FONT_SCALE,
            marginLeft: 55 * FONT_SCALE,
          }}
          onChange={this.handleTabChange}
        />
        <div className={styles.employees}>
          <ListView
            ref={(el) => { this.lv = el; }}
            dataSource={listSource}
            renderRow={this.renderRow}
            pageSize={6}
            pullToRefresh={
              <PullToRefresh
                refreshing={loadingRefresh}
                onRefresh={this.handleRefresh}
                distanceToRefresh={FONT_SCALE * 60}
              />
            }
            style={{ height }}
            onEndReached={this.handleEndReached}
            onEndReachedThreshold={10}
            renderFooter={
              () => (
                <div style={{ paddingBottom: 30 * FONT_SCALE, textAlign: 'center' }}>
                  {footerText}
                </div>
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default EmployeeIdentify;
