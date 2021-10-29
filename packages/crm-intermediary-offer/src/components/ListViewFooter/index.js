import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ListViewFooter.less';

const P = PropTypes;

class ListViewFooter extends Component {
  render() {
    const { loading, pageNum, pageTotal } = this.props;
    const noData = pageTotal === 0;
    const noMore = pageNum === pageTotal && pageTotal !== 0;
    return (
      <div className={styles.listViewFooter}>
        {loading ? '加载中...' : (noData ? '暂无数据' : (noMore ? '没有更多了' : '　'))}
      </div>
    );
  }
}

PropTypes.defaultValue = {
  loadingText: '加载中...',
  noDataText: '暂无数据',
  noMoreText: '没有更多了',
  loading: false,
  pageNum: 1,
  pageTotal: -1,
};

PropTypes.propTypes = {
  loadingText: P.string,
  noDataText: P.string,
  noMoreText: P.string,
  loading: P.boolean,
  pageNum: P.number,
  pageTotal: P.number,
};

export default ListViewFooter;
