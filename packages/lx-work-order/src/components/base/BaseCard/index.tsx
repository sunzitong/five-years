import React, { Fragment } from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import BaseListItem from '../BaseListItem';
import { CardPropsType } from 'antd-mobile/lib/card/PropsType';
import cls from './index.less';

/**
 * 列表元素排列方式
 */
type ListItemType = 'vertical' | 'horizontal';

export interface DataItemProps {
  /**
   * 排列方式
   */
  type?: ListItemType;
  /**
   * 标题
   */
  label?: string;
  /**
   * 值
   */
  value?: string | React.ReactNode;
  /**
   * 其他值
   */
  [key: string]: any;
}

export interface BaseCardProps extends CardPropsType {
  /**
   * Card 标题
   */
  title?: React.ReactNode | string;
  /**
   * Card 数据
   * [{ label: '表头', value: '内容' }]
   */
  data: DataItemProps[];
  /**
   * 列表内元素的
   */
  itemType?: 'vertical' | 'horizontal';
}

const BaseCard: React.FC<BaseCardProps> = props => {
  const { children, title, data, itemType = 'vertical', ...others } = props;
  return (
    <div className={cls.baseCard} {...others}>
      <h2>{title}</h2>
      {data.map(item => {
        return (
          <BaseListItem
            key={item.label}
            type={item.type || itemType}
            extra={item.value}
          >
            {item.label}
          </BaseListItem>
        );
      })}
      {children ? children : null}
    </div>
  );
};

export default BaseCard;
