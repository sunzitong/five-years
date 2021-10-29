import CreateApi from '@/utils/createAPI';

// 查询预约门店
export const isSneakByPhoneAndProjectId = CreateApi('/crm/agency/isSneakByPhoneAndProjectId', 'GET');
