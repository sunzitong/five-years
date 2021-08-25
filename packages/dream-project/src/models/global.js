import {
  commonConfig,
  searchSchool,
  uploadPic,
} from '@/services';
import { getAppAuthInfo, judgeSystem } from '@guanyu/guanyu-h5-tools';
import { judgeDevice } from '@guanyu/h5-tools';
import { parse } from 'qs';
import getCookie from '../utils/getCookie';


const searchObj = parse(window.location.href.split('?')[1]);

const isMiniProgram = navigator.userAgent.includes('miniProgram');

const visitSource = judgeDevice();

export default {

  state: {
    isMiniProgram,
    educationTypeList: [],
    newData: {},
    idTypeList: [],
    cityId: searchObj.cityId,
    cityName: searchObj.cityName,
    GyVirtualPhone: searchObj.GyVirtualPhone,
    id: searchObj.id,
    sessionId: visitSource === '小程序' ? searchObj.sessionId : visitSource === 'APP' ? (getAppAuthInfo() || {}).access_token : getCookie('GyAuthorization', document.cookie),
    isFullScreen: window && (navigator.userAgent.indexOf('iPhone') > -1) && window.screen.height >= 812 && window.devicePixelRatio >= 2,
    system: judgeSystem() || '',
  },

  effects: {
    *commonConfig({ payload }, { call, put }) {
      const response = yield call(commonConfig, payload);
      if (response) {
        const { data = {} } = response;
        const { data: newData = {} } = data || {};
        const { educationTypeList, idTypeList } = newData;
        yield put({
          type: 'saveCommonConfig',
          payload: {
            educationTypeList: educationTypeList.map(((item) => {
              const { name = '', desc = '' } = item;
              return {
                value: name,
                label: desc,
              };
            })),
            idTypeList: idTypeList.map(((item) => {
              const { name = '', desc = '' } = item;
              return {
                value: name,
                label: desc,
              };
            })),
            newData,
          },
        });
      }
      return response;
    },
    *searchSchool({ payload }, { call }) {
      const response = yield call(searchSchool, payload);
      return response;
    },
    *uploadPic({ payload }, { call }) {
      const response = yield call(uploadPic, payload);
      return response;
    },
  },

  reducers: {
    saveCommonConfig(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setId(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeConfirmStatsu(state, action) {
      const { confirm: { cancelCallBack, confirmCallBack } } = state;
      const { payload: { type } } = action;
      if (type === 'cancel') {
        setTimeout(() => {
          cancelCallBack();
        }, 200);
      }
      if (type === 'confirm') {
        setTimeout(() => {
          confirmCallBack();
        }, 200);
      }
      return {
        ...state,
        confirm: {
          ...state.confirm,
          ...action.payload,
        },
      };
    },
  },
};
