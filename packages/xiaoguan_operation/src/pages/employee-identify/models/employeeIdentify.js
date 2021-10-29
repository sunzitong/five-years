import * as employeeIdentify from '../services/employeeIdentify';

export default {
  namespace: 'employeeIdentify',

  state: {},

  effects: {
    // 企业员工认证列表
    *identifyList({ payload }, { call }) {
      return yield call(employeeIdentify.identifyList, payload);
    },
    // 详情
    *identifyDetail({ payload }, { call }) {
      return yield call(employeeIdentify.identifyDetail, payload);
    },
    // 审核
    *employeeAudit({ payload }, { call }) {
      return yield call(employeeIdentify.employeeAudit, payload);
    },
    // 地区
    *employeeCity({ payload }, { call }) {
      return yield call(employeeIdentify.employeeCity, payload);
    },
    // 数量
    *identifyNumber({ payload }, { call }) {
      return yield call(employeeIdentify.identifyNumber, payload);
    },
  },

  reducers: {},
};
