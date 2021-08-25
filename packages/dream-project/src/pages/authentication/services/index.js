import CreateApi from 'utils/createAPI';

// 认证
export const applyStudentAuth = CreateApi('/app-server/api/v1/studentAuth/applyStudentAuth', 'post', true);

// 获取认证信息-回显
export const queryStudentAuthInfoById = CreateApi('/app-server/api/v1/studentAuth/queryStudentAuthInfoById', 'get');

// 获取实人认证结果
export const getAuthenticationResult = CreateApi('/app-server/api/v1/authentication/getAuthenticationResult', 'get');

// 获取城市列表
export const getCityList = CreateApi('/app-server/api/v1/city/cityList', 'get');
