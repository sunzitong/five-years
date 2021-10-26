import { delay } from 'roadhog-api-doc';

const data = {
  status: 'ok',
  msg: 'ok',
  data: 'ok',
  timestamp: 1571708704511,
};

const channelData = {
  status: 'ok',
  msg: 'ok',
  data: [
    {
      id: 0,
      name: '北京',
      next: [
        {
          id: 10,
          name: '链家',
        },
        {
          id: 20,
          name: '贝壳',
        },
      ],
    },
    {
      id: 1,
      name: '上海',
      next: [
        {
          id: 2,
          name: '我爱我家',
        },
        {
          id: 3,
          name: '麦田',
        },
      ],
    },
  ],
  timestamp: 1571708704511,
};

const proxy = {
  'GET /crm/agency/channel': channelData,
  'POST /crm/agency/entryAgency': data,
};

export default delay(proxy, 1000);
