import {
  resideDreamPlanIndex,
  loginSendVerificationCode,
  login,
} from '../services';

export default {

  state: {
  },

  effects: {
    *resideDreamPlanIndex({ payload }, { call }) {
      const response = yield call(resideDreamPlanIndex, payload);
      return response;
    },
    *loginSendVerificationCode({ payload }, { call }) {
      const response = yield call(loginSendVerificationCode, payload);
      return response;
    },
    *login({ payload }, { call }) {
      const response = yield call(login, payload);
      return response;
    },
  },

  reducers: {
  },
};
