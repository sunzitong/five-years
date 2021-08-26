import {
  applyStudentAuth,
  queryStudentAuthInfoById,
  getAuthenticationResult,
  getCityList,
} from '../services';

export default {

  state: {
  },

  effects: {
    *applyStudentAuth({ payload }, { call }) {
      const response = yield call(applyStudentAuth, payload);
      return response;
    },
    *queryStudentAuthInfoById({ payload }, { call }) {
      const response = yield call(queryStudentAuthInfoById, payload);
      return response;
    },
    *getAuthenticationResult({ payload }, { call }) {
      const response = yield call(getAuthenticationResult, payload);
      return response;
    },
    *getCityList({ payload }, { call }) {
      const response = yield call(getCityList, payload);
      return response;
    },
  },

  reducers: {
  },
};
