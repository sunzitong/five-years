import React from 'react';
import { Card } from 'antd-mobile';
import PropTypes from 'prop-types';
import { HeadTitle, BodyList, Status } from './weiget';
import styles from './index.less';

class ItemCustomer extends React.Component {
  render() {
    const { body, headTitle, headExtra, onClick } = this.props;
    return (
      <Card full style={{ marginTop: 0 }} className={styles.hasActive} onClick={onClick}>
        <Card.Header
          title={<HeadTitle title={headTitle} />}
          extra={<Status value={headExtra.value}>{headExtra.label}</Status>}
        />
        <Card.Body>
          <BodyList data={body} />
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    );
  }
}

/**
 * 默认属性
 */
ItemCustomer.defaultProps = {
  onClick: () => {},
  /** body 数据 */
  body: [],
  /** 头部标题 */
  headTitle: '',
  /** 右侧状态 */
  headExtra: {
    label: '',
    value: '',
  },
};

/**
 * 检验属性
 */
ItemCustomer.propTypes = {
  onClick: PropTypes.func,
  headTitle: PropTypes.string,
  headExtra: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  body: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
    })
  ),
};

export default ItemCustomer;
