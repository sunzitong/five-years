import * as message from 'services/message/message.js';

export default {
  state: {},

  effects: {
    *messageDetail({ payload }, { call }) {
      return yield call(message.messageDetail, payload);
    },
  },

  reducers: {
  },
};
