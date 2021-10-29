import CreateApi from '@/utils/createAPI';

// 预约
export const makeAnAppointment = CreateApi('/crm/agency/makeAnAppointment', 'POST');
