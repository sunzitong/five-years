import * as notice from 'services/notice/notice.js';

export default {
  state: {},

  effects: {
    *shareDetail({ payload }, { call }) {
      return yield call(notice.shareDetail, payload);
    },
  },

  reducers: {
  },
};
