import React from 'react';
import { Flex, WhiteSpace } from 'antd-mobile';
import styles from './index.less';

/**
 * 过滤null
 */
export const filterValue = (any) => {
  if (any === null) return '';
  return any;
};

/**
 * 简易map
 * @param {Array} array
 * @param {Function} fn
 */
export const simpleMap = (array, fn) => {
  if (!Array.isArray(array)) return [];
  return array.map(fn);
};

/**
 * 卡片body 列表
 */
export const column = (props, index) => {
  const { label, value } = props;
  return (
    <React.Fragment key={label}>
      {index === 0 && <WhiteSpace size="lg" />}
      <Flex align="start">
        <div className={styles.listItemBodyLabel}>
          {label}
          ：
        </div>
        <Flex.Item className={styles.listItemBodyValue}>{filterValue(value)}</Flex.Item>
      </Flex>
      <WhiteSpace size="lg" />
    </React.Fragment>
  );
};

/**
 * 卡片body 列表
 */
export const BodyList = (props) => {
  return simpleMap(props.data, column);
};

/**
 * 卡片头部title
 */
export const HeadTitle = (props) => {
  const { title } = props;
  return <div className={styles.listItemHeadTitle}>{title}</div>;
};

/**
 * 卡片头部extra
 */
export const HeadExtra = (props) => {
  const { title } = props;
  return <span>{title}</span>;
};

/**
 * 卡片右上角状态默认为建议工单
 */
export const Status = (props,) => {
  const { mapColor = {
    // 成交
    CLINCH: '#09B88D',
    // 失效
    INVALID: '##9B9B9B',
  }, value, children } = props;
  const style = {
    color: mapColor[value],
  };
  return <span style={style} className={styles.listItemStatus}>{children}</span>;
};
