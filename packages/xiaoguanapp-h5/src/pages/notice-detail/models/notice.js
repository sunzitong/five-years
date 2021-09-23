import * as notice from 'services/notice/notice.js';

export default {
  state: {},

  effects: {
    *noticeDetail({ payload }, { call }) {
      return yield call(notice.noticeDetail, payload);
    },
  },

  reducers: {
  },
};
