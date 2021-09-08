import * as services from 'services/key-account';

export default {
  state: {},

  effects: {
    *save({ payload }, { call }) {
      return yield call(services.save, payload);
    },
    *info({ payload }, { call }) {
      return yield call(services.info, payload);
    },
  },

  reducers: {
  },
};
