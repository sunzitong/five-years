import { delay } from 'roadhog-api-doc';
import { Random, mock } from 'mockjs';

const appointmentList = {
  status: 'ok',
  msg: 'ok',
  data: {
    pageNum: 1,
    pageSize: 15,
    size: 1,
    orderBy: null,
    startRow: 1,
    endRow: 1,
    total: 1,
    pages: 1,
    list: Random.range(0, 15).map((item, index) => {
      const { statusDesc } = mock({ 'statusDesc|1': ['成交', '失效'] });
      const i = index + 1;
      return {
        id: i,
        projectName: `门店名称${i}`,
        time: 1583227174213,
        phone: Random.integer(10000000000, 19999999999),
        statusDesc,
        status: statusDesc === '成交' ? 'CLINCH' : 'INVALID',
      };
    }),
    firstPage: 1,
    prePage: 0,
    nextPage: 0,
    lastPage: 1,
    isFirstPage: true,
    isLastPage: true,
    hasPreviousPage: false,
    hasNextPage: false,
    navigatePages: 8,
    navigatepageNums: [1],
  },
  timestamp: 1547609643680,
};

const proxy = {
  'GET /crm/agency/appointmentList': appointmentList,
};

export default delay(proxy, 1000);
