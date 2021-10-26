
import { login, sendCode } from '@/services/user/login';
import requestError from '@/utils/requestError';

export default {
  state: {
  },
  effects: {
    *getLoginFetch({ payload }, { call }) {
      const response = yield call(login, payload);
      if (!requestError(response)) return;
      return response;
    },
    *getCodeFetch({ payload }, { call }) {
      const response = yield call(sendCode, payload);
      if (!requestError(response)) return;
      return response;
    },
  },
  reducers: {
  },
};
