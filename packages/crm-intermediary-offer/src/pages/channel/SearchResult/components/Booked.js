import React from 'react';
import Link from 'umi/link';
import { Result } from 'antd-mobile';
import { images } from '@/utils/images';
import cls from '../index.less';

class Booked extends React.Component {
  render() {
    return (
      <div className={cls.resultWrap}>
        <Result
          img={<img className={cls.resIcon} src={images.iconBooked} alt="" />}
          message={<div className={cls.resultTips}>该客户已被其他渠道预约</div>}
        />
        <div className={cls.interval} />
        <Link
          to="/"
          className={cls.buttonAppoint}
        >
          返回首页
        </Link>
      </div>
    );
  }
}

export default Booked;
