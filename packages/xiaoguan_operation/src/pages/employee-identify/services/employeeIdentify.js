import CreateApi from 'utils/createApi';

// 企业员工认证列表
export const identifyList = CreateApi('/crm/company/getAuthentications', 'POST');

// 详情
export const identifyDetail = CreateApi('/crm/company/getAuthenticationInfo', 'GET');

// 审核
export const employeeAudit = CreateApi('/crm/company/auditAuthentications', 'POST');

// 数量
export const identifyNumber = CreateApi('/crm/company/countAuthentications', 'POST');

// 城市
export const employeeCity = CreateApi('/api/proj/projectList', 'POST');
