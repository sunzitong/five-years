import CreateApi from '@/utils/createAPI';

// 保存或者更新问题
export const appointmentList = CreateApi('/crm/agency/appointmentList', 'GET');
