import React from 'react';
import { List } from 'antd-mobile';
import ListItem, { ListItemProps } from 'antd-mobile/lib/list/ListItem';
import cls from './index.less';
/**
 * 列表元素排列方式
 */
type ListItemType = 'vertical' | 'horizontal';

export interface BaseListItemProps extends ListItemProps {
  /**
   * 排列方式
   */
  type?: ListItemType;
}

const BaseCard: React.FC<BaseListItemProps> = props => {
  const { children, extra, type = 'vertical' } = props;
  return (
    <List className={[cls.baseList].join(' ')}>
      <ListItem
        className={[
          cls.baseListItem,
          type === 'vertical' ? '' : cls.baseListItemHorizontal,
        ].join(' ')}
        extra={extra}
      >
        {children}
      </ListItem>
    </List>
  );
};

export default BaseCard;
