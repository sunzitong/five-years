import CreateApi from '@/utils/createAPI';

// 门店数据
export const projectList = CreateApi('/crm/agency/projectNameList', 'GET');
