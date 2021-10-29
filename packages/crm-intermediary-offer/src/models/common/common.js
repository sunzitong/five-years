import { projectList } from '@/services/common/common';
import { getAuthInfo, setAuthInfo } from '@/utils/saveAuth';
import { formatFields } from '@/utils/library';
import requestError from '@/utils/requestError';


export default {
  state: {
    // 保存设置
    getAuthInfo,
    setAuthInfo,
    projectList: [],
  },
  effects: {
    *projectListFetch({ payload }, { call, put }) {
      const response = yield call(projectList, payload);
      if (!requestError(response)) return;
      const { data } = response || {};
      // const { projects } = data || {};
      const list = formatFields(data, { label: 'name', value: 'id' });
      yield put({
        type: 'projectList',
        payload: list,
      });
      return list;
    },
  },
  reducers: {
    projectList(state, action) {
      return {
        ...state,
        projectList: action.payload,
      };
    },
  },
};
