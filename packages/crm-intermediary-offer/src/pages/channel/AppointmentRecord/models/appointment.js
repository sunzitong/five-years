
import { appointmentList } from '@/services/channel/appointmentRecord/appointmentRecord';
import requestError from '@/utils/requestError';

export default {
  state: {
    pageNum: 1,
    pageSize: 15,
    pageTotal: 0,
    appointmentList: [],
  },

  effects: {
    *getAppointmentListFetch({ payload }, { call, put }) {
      const response = yield call(appointmentList, payload);
      if (!requestError(response)) return;
      const { data = {} } = response || {};
      yield put({
        type: 'appointmentList',
        payload: data,
      });
      return response;
    },
  },

  reducers: {
    appointmentList(state, action) {
      let { appointmentList: oldList } = state;
      const { pageNum, pageSize, total, list } = action.payload || {};
      if (pageNum === 1) {
        oldList = list;
      } else {
        oldList = oldList.concat(list);
      }
      return {
        ...state,
        pageNum,
        pageSize,
        pageTotal: total,
        appointmentList: oldList,
      };
    },
  },
};
