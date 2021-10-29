
import { entryAgency, channelData } from '@/services/channel/workbenches/workbenches';
import requestError from '@/utils/requestError';
import { formatFields } from '@/utils/library';

export default {
  state: {
    channelData: [],
  },

  effects: {
    *entryAgencyFetch({ payload }, { call }) {
      const response = yield call(entryAgency, payload);
      if (!requestError(response)) return;
      return response;
    },
    *channelDataFetch({ payload }, { call, put }) {
      const response = yield call(channelData, payload);
      if (!requestError(response)) return;
      const data = formatFields(response.data);
      yield put({
        type: 'channelData',
        payload: data,
      });
      response.data = data;
      return response;
    },
  },

  reducers: {
    channelData(state, action) {
      return {
        ...state,
        channelData: action.payload,
      };
    },
  },
};
