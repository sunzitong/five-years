import React from 'react';
import router from 'umi/router';
import PageHeader from '@/components/PageHeader';
import NewCustomer from './components/NewCustomer';
import Success from './components/Success';
import Booked from './components/Booked';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    // 如果路由上没有手机号及门店id返回查询页面
    const { location: { query } } = props;
    if (!query.phone || !query.projectId) {
      router.push('/workbench');
    }

    this.SUCCESS = 'SUCCESS';
    this.FAILD = 'FAILD';
    this.NORMAL = 'NORMAL';

    this.state = {
      status: this.NORMAL,
    };

    this.handleResult = this.handleResult.bind(this);
  }

  /**
   * 获取预约结果
   */
  handleResult(res) {
    const status = res === true ? this.SUCCESS : this.FAILD;
    this.setState({ status });
  }

  render() {
    const { status } = this.state;
    const { location } = this.props;
    return (
      <PageHeader
        navBarTitle="查询结果"
      >
        {status === this.NORMAL && (
          <NewCustomer location={location} getResult={this.handleResult} />
        )}
        {status === this.SUCCESS && <Success />}
        {status === this.FAILD && <Booked />}
      </PageHeader>
    );
  }
}

export default SearchResult;
