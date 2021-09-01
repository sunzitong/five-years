import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import router from 'umi/router';
import { List, InputItem, Picker, Toast } from 'antd-mobile';
import PageHeader from '@/components/PageHeader';
import cls from './index.less';

const API = {
  // 查询接口
  search: 'workbench/isSneakByPhoneAndProjectIdFetch',
  // 门店列表
  projectList: 'common/projectListFetch',
};

@createForm()
@connect(({ common, workbench, loading }) => ({
  common,
  workbench,
  loading: loading.effects[API.search],
}))
class WorkBench extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getProjectList();
  }

  /**
   * 获取门店列表
   */
  getProjectList() {
    const { dispatch } = this.props;
    dispatch({
      type: API.projectList,
      payload: {},
    });
  }

  /**
   * 发送查询请求
   */
  sendSearch(payload) {
    const { dispatch, loading, common: { projectList } } = this.props;
    const [value] = payload.projectId;
    const project = projectList.filter(item => item.value === value);
    const [{ value: projectId, label: projectName }] = project;
    if (loading) return;
    const query = {
      ...payload,
      projectId,
      projectName,
    };
    dispatch({
      type: API.search,
      payload: query,
    }).then((res) => {
      if (!res) return false;
      // 查到预约记录
      if (res.data) {
        Toast.fail('该客户已被其他渠道预约，无法预约');
      } else {
        // 没有预约记录
        router.push({
          pathname: '/search-result',
          query,
        });
      }
    });
  }

  /**
   * 提交信息校验
   */
  handleSubmit() {
    const { form: { validateFields } } = this.props;
    validateFields({ first: true }, (err, values) => {
      if (err) {
        const [first] = Object.values(err);
        Toast.info(first.errors[0].message, 2);
        return false;
      }
      this.sendSearch(values);
    });
  }

  render() {
    const { form: { getFieldProps }, common: { projectList } } = this.props;
    return (
      <PageHeader
        navBarTitle="工作台"
      >
        <div className={[cls.loginArea, cls.searchArea].join(' ')}>
          <List>
            <InputItem
              {...getFieldProps('phone', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1\d{10}/, message: '请输入正确的手机号' },
                ],
              })}
              maxLength={11}
              clear
              placeholder="请输入手机号号码查询"
            />
          </List>
          <List>
            <Picker
              cols={1}
              data={projectList}
              title="预约门店"
              {...getFieldProps('projectId', {
                rules: [
                  { required: true, message: '请选择门店' },
                ],
              })}
            >
              <List.Item><span className={cls.store}>预约门店</span></List.Item>
            </Picker>
          </List>
        </div>
        <a onClick={this.handleSubmit} className={cls.buttonSearch}>查 询</a>
      </PageHeader>
    );
  }
}

export default WorkBench;
