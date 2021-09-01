import { delay } from 'roadhog-api-doc';
import { mock } from 'mockjs';

const data = {
  status: 'ok',
  msg: 'ok',
  ...mock({ 'data|1': [true, false] }),
  timestamp: 1571708704511,
};

const proxy = {
  'POST /crm/agency/makeAnAppointment': data,
};

export default delay(proxy, 1000);
