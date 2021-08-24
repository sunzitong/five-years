import React, { Fragment, useState } from 'react';
import { iwant } from '@guanyu/shared';
import cls from './index.less';

export interface contentProps {
  label: string;
  value: React.ReactNode;
}
export interface BaseStepsItemProps {
  /**
   * 标题
   */
  title: string;
  /**
   * 操作人
   */
  imgs: Array<any>;
  /**
   * 描述列表
   */
  descList: Array<any>;
  /**
   * 时间
   */
  time: string | number | Date;
}

export const BaseStepItem: React.FC<BaseStepsItemProps> = props => {
  const { title, imgs, time, descList } = props;
  const reviewImg = () => {
    const arr = iwant.array(imgs);
    console.log(arr);
    if (arr.length === 0) return;
    window.previewImage.start({
      urls: arr,
      current: arr[0],
    });
  };

  return (
    <div className={cls.baseStepItem}>
      <h3>{title}</h3>
      <div className={cls.baseStepItemContent}>
        <ul className={cls.baseStepItemUl}>
          {descList.map((item: any) => {
            return (
              <li key={item.name}>
                {item.name}: <span>{item.value}</span>
              </li>
            );
          })}
        </ul>

        <div className={cls.baseStepItemFooter}>
          {imgs && imgs.length ? <a onClick={reviewImg}>查看图片</a> : null}
          <div>{time}</div>
        </div>
      </div>
    </div>
  );
};

export interface BaseStepsProps {
  /**
   * 进度数组
   */
  data: BaseStepsItemProps[];
  /**
   * 默认展示条数
   */
  defaultShowSize?: number;
}

const BaseSteps: React.FC<BaseStepsProps> = props => {
  const { defaultShowSize = 3, data } = props;
  /**
   * 显示收起|展示
   */
  const [status, setStatus] = useState<boolean>(false);
  /**
   * 返回数组
   */
  const arr = iwant.array<BaseStepsItemProps>(data);
  /**
   * 是否显示展示、收起
   */
  const showToggle = arr.length > defaultShowSize;
  const showArr = status ? arr : arr.slice(0, defaultShowSize);

  return (
    <Fragment>
      <div className={cls.baseSteps}>
        {showArr.map((item, i) => {
          return (
            <BaseStepItem
              key={`${item.title}-${item.time}-${i.toString()}`}
              title={item.title}
              imgs={item.imgs}
              descList={item.descList}
              time={item.time}
            />
          );
        })}
      </div>
      {showToggle && (
        <div className={cls.baseStepsToggle}>
          <span onClick={() => setStatus(!status)}>
            {status ? '收起' : '展开'}
          </span>
        </div>
      )}
      {arr.length === 0 && '暂无数据'}
    </Fragment>
  );
};

export default BaseSteps;
