import CreateApi from '@/utils/createAPI';

// 确认渠道
export const entryAgency = CreateApi('/crm/agency/entryAgency', 'POST');
// 渠道数据
export const channelData = CreateApi('/crm/agency/channel', 'GET');
