import React from 'react';
import { connect } from 'dva';
import { Modal, Toast } from 'antd-mobile';
import PageHeader from '@/components/PageHeader';
import { images } from '@/utils/images';
// import Link from 'umi/link';
import IMenu from '@/components/IMenu';
import cls from './index.less';

const API = {
  // 提交渠道
  postChannel: 'workbenches/entryAgencyFetch',
  // 渠道数据
  channelData: 'workbenches/channelDataFetch',
};

@connect(({ common, workbenches, loading }) => ({
  common,
  workbenches,
  loading: loading.effects[API.postChannel],
  channelLoading: loading.effects[API.channelData],
}))
class WorkBenches extends React.Component {
  constructor(props) {
    super(props);
    const { common: { getAuthInfo } } = props;
    const { channelName } = getAuthInfo();
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.state = {
      // 从缓存中取值
      channelName,
      open: !channelName,
    };
  }

  componentDidMount() {
    this.getChannelData();
  }

  /**
   * 获取渠道数据
   */
  getChannelData() {
    const { dispatch } = this.props;
    dispatch({
      type: API.channelData,
      payload: {},
    });
  }

  /**
   * 发送选择地区
   */
  sendEntryAgency(id) {
    const { dispatch } = this.props;
    dispatch({
      type: API.postChannel,
      payload: {
        id,
      },
    }).then((res) => {
      if (!res) return;
      Toast.success('渠道确认成功');
    });
  }

  /**
   * 选择menu后
   */
  handleMenuChange(val, options) {
    const { common: { setAuthInfo } } = this.props;
    const [city, store = ''] = val;
    const [cityInfo, storeInfo] = options;
    const { value: storeId } = storeInfo || {};
    const channelName = `${city}(${store})`;
    Modal.alert('确认渠道', `您选择了${[city, store].join('-')}，请确认，确认后将无法更改`, [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          this.setState({
            open: false,
            channelName,
          });
          // 更新storage
          setAuthInfo({
            channelId: storeInfo.value,
            channelName,
            districtId: cityInfo.value,
          });
          this.sendEntryAgency(storeId);
        },
      },
    ]);
  }

  render() {
    const { open, channelName } = this.state;
    const { channelLoading, workbenches: { channelData } } = this.props;
    return (
      <IMenu
        open={open}
        data={channelData}
        loading={channelLoading}
        onChange={this.handleMenuChange}
      >
        <PageHeader
          navBarTitle="工作台"
        >
          <div className={cls.workbenches}>
            <h2 className={cls.title}>
              渠道：
              {channelName}
            </h2>
            <ul className={cls.list}>
              <li className={cls.store} style={{ ...images.bannerStore }}>
                <a href="/fe/crm-intermediary-offer/workbench"><span className={cls.none}>预约到店</span></a>
              </li>
              <li className={cls.record} style={{ ...images.bannerRecord }}>
                <a href="/fe/crm-intermediary-offer/appointment"><span className={cls.none}>预约记录</span></a>
              </li>
            </ul>
          </div>
        </PageHeader>
      </IMenu>
    );
  }
}

export default WorkBenches;
