import { makeAnAppointment } from '@/services/channel/searchResult/searchResult';
import requestError from '@/utils/requestError';

export default {
  state: {
  },

  effects: {
    *makeAnAppointmentFetch({ payload }, { call }) {
      const response = yield call(makeAnAppointment, payload);
      if (!requestError(response)) return false;
      return response;
    },
  },

  reducers: {
  },
};
