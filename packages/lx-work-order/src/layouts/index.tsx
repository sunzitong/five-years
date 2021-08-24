import React, { useEffect } from 'react';
import { useLocation, useRequest } from 'umi';
import maiaCanvasBrush from '@longfor/canvasbrush';
import { reportOrderDetail } from '@/services/workOrder';
import 'normalize.css';
import cls from './index.less';

const Layout: React.FC<{}> = props => {
  const { children = '' } = props;
  const values: any = useLocation();
  const {
    query: { id, oa },
  } = values;

  const { data } = useRequest(() => {
    const { hash } = location;
    const oaAccount = hash ? hash.substr(hash.indexOf('&oa') + 4) : oa;
    return reportOrderDetail({ todoId: id, oa: oaAccount });
  });
  const account = data?.data?.oaAccount ?? '';
  useEffect(() => {
    const brush = maiaCanvasBrush({
      watermark_txt: account,
      watermark_color: 'rgba(187, 187, 187, 0.2)',
      watermark_fontsize: 16,
      watermark_angle: -15,
    });
    return () => {
      brush.remove();
    };
  }, [data]);
  return <div className={cls.layout}>{children || ''}</div>;
};
export default Layout;
