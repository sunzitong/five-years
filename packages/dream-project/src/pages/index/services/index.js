import CreateApi from 'utils/createAPI';

// 住梦计划频道首页
export const resideDreamPlanIndex = CreateApi('/app-server/api/v1/studentAuth/resideDreamPlanIndex', 'get');

// 发送登录短信验证码
export const loginSendVerificationCode = CreateApi('/gymwebsite/api/v1/user/loginSendVerificationCode', 'post', true);

// 登录
export const login = CreateApi('/gymwebsite/api/v1/user/login', 'post', true);
