import React from 'react';
import Link from 'umi/link';
import { Flex, Result } from 'antd-mobile';
import { images } from '@/utils/images';
import cls from '../index.less';

class Success extends React.Component {
  render() {
    return (
      <div className={cls.resultWrap}>
        <Result
          img={<img className={cls.resIcon} src={images.iconSucc} alt="" />}
          message={<div className={cls.resultTips}>预约成功</div>}
        />
        <div className={cls.interval} />
        <Flex className={cls.successButton}>
          <Flex.Item>
            <Link
              to="/appointment"
              className={cls.buttonAppoint}
            >
              查看记录
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link
              to="/"
              className={cls.buttonAppoint}
            >
              返回首页
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default Success;
