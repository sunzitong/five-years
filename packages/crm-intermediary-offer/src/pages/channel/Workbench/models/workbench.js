
import { isSneakByPhoneAndProjectId } from '@/services/channel/workbench/workbench';
import requestError from '@/utils/requestError';


export default {
  state: {
  },

  effects: {
    *isSneakByPhoneAndProjectIdFetch({ payload }, { call }) {
      const response = yield call(isSneakByPhoneAndProjectId, payload);
      if (!requestError(response)) return;
      return response;
    },
  },

  reducers: {
  },
};
