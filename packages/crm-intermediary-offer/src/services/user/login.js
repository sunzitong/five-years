import CreateApi from '@/utils/createAPI';

// 保存或者更新问题
export const login = CreateApi('/crm/agency/login', 'GET');
// 验证码
export const sendCode = CreateApi('/crm/agency/sendCode', 'GET');
