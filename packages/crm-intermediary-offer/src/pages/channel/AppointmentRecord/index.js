import React from 'react';
import { Flex, ListView, PullToRefresh } from 'antd-mobile';
import moment from 'moment';
import { connect } from 'dva';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/SearchBar';
import { wantArray } from '@/utils/library';
import ListViewFooter from '@/components/ListViewFooter';
import Items from '@/components/Items';
import cls from './index.less';

/**
 * 请求列表
 */
const API = {
  list: 'appointment/getAppointmentListFetch',
};

@connect(({ appointment, loading }) => ({
  appointment,
  loading: loading.effects[API.list],
}))
class AppointmentRecord extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      refreshing: false,
      dataSource,
      params: {},
      list: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getScrollWrapHeight();
    this.getPageData();
  }

  /**
   * 页面数据获取
   */
  getPageData(pageNum = 1, loadMore) {
    const { dispatch, appointment: { pageSize } } = this.props;
    const { state } = this;
    dispatch({
      type: API.list,
      payload: {
        pageNum,
        pageSize,
        ...state.params,
      },
    }).then((res) => {
      const { data } = res || {};
      let { list } = data || {};
      list = wantArray(list);
      if (loadMore) {
        list = [...state.list, ...list];
      }
      this.setState({
        refreshing: false,
        list,
      });
    });
  }

  /**
   * 获取设置滚动区域的调试
   */
  getScrollWrapHeight() {
    if (!this.emptyDiv) return false;
    const { top } = this.emptyDiv.getBoundingClientRect();
    this.setState({ height: document.documentElement.clientHeight - top });
  }

  /**
   * 列表触底
   */
  onEndReached = () => {
    const { appointment: { pageNum, pageCount } } = this.props;
    if (pageNum === pageCount) return;
    this.loadMore();
  }

  /**
   * 下拉刷新列表
   */
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.lv.scrollTo(0, 0);
    this.getPageData();
  };


  /**
   * 加载更多数据
   */
  loadMore = async () => {
    const { appointment: { pageNum } } = this.props;
    let current = pageNum;
    current += 1;
    await this.getPageData(current, true);
  }


  /**
 * 渲染ViewList页脚
 */
  renderFooter = () => {
    const { loading, appointment: { pageNum = 1, pageTotal = 0 } = {} } = this.props;
    return (
      <ListViewFooter
        loading={loading}
        pageNum={pageNum}
        pageTotal={pageTotal}
      />
    );
  }


  /**
   * 渲染列表单行
   */
  renderRow = (item) => {
    return (
      <Items.Customer
        body={[
          { label: '预约门店', value: item.projectName },
          { label: '预约时间', value: moment(item.time).format('YYYY-MM-DD HH:mm:ss') },
        ]}
        headExtra={{ label: item.statusDesc, value: item.status || 'a' }}
        headTitle={`${item.phone}`}
      />
    );
  }

  handleChange(params) {
    if (!params.phone) return;
    this.setState({ params }, () => {
      this.getPageData();
    });
  }

  render() {
    // const { appointment: { appointmentList } } = this.props;
    const { state } = this;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        className={cls.interval}
      />
    );

    return (
      <PageHeader
        navBarWrap={{ style: { marginBottom: 0 } }}
        navBarTitle="预约记录"
      >
        <div className={cls.appointmentRecord}>
          <Flex direction="column">
            <div className={cls.searchWrap}>
              <SearchBar onChange={this.handleChange} />
            </div>
            <Flex.Item style={{ width: '100%', height: state.height }}>
              <div
                ref={(el) => {
                  this.emptyDiv = el;
                }}
              />
              <ListView
                ref={(el) => {
                  this.lv = el;
                }}
                dataSource={state.dataSource.cloneWithRows(wantArray(state.list))}
                renderFooter={this.renderFooter}
                style={{
                  position: 'relative',
                  height: state.height,
                  overflow: 'auto',
                }}
                initialListSize={15}
                renderRow={this.renderRow}
                renderSeparator={separator}
                pageSize={15}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                pullToRefresh={<PullToRefresh
                  refreshing={state.refreshing}
                  onRefresh={this.onRefresh}
                  distanceToRefresh={window.devicePixelRatio * 40}
                  damping={200}
                />}
              />
            </Flex.Item>
          </Flex>
        </div>
      </PageHeader>
    );
  }
}

export default AppointmentRecord;
