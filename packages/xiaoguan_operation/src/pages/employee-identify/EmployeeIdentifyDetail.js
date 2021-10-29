import React, { Component } from 'react';
import { connect } from 'dva';
import { Toast, Card, Button, Modal, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import postMessage from 'utils/postMessage';
import BasicLayout from 'layouts/BasicLayout';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { formatValue } from 'utils/utils';
import styles from './style.less';

@createForm()
@connect(({ employeeIdentify, loading }) => ({
  employeeIdentify,
  loading: loading.effects['employeeIdentify/identifyDetail'],
}))
class EmployeeIdentifyDetail extends Component {
  constructor(props) {
    super(props);
    document.title = '企业员工认证详情';
    this.state = {
      detail: {},
    };
  }

  componentDidMount() {
    this.getDetail();
  }

  // 获取详情
  getDetail = () => {
    const { match: { params: { id } = {} }, dispatch } = this.props;
    dispatch({
      type: 'employeeIdentify/identifyDetail',
      payload: { id },
    }).then((res) => {
      const { status, msg, data } = res || {};
      if (status === 'ok') {
        this.setState({
          detail: data,
        });
      } else {
        Toast.fail(msg);
      }
    });
  }

  // 顶部
  renderTop = () => {
    const {
      detail: {
        id = '',
        createAt = '',
        authenticationState,
        authenticationStateName = '',
        opinion = '',
      },
    } = this.state;
    return (
      <div className={styles.top}>
        <Card full>
          <Card.Header
            title={
              (
                <div className={styles.topTitle}>
                  <div>{id}</div>
                  <span>{createAt}</span>
                </div>
              )
            }
            extra={
              <span
                style={{ color: authenticationState === 'FAIL' ? '#c82a29' : 'unset' }}
                className={styles.status}
              >
                {authenticationStateName}
              </span>
            }
          />
          <Card.Body
            hidden={!opinion}
            style={{ color: authenticationState === 'FAIL' ? '#c82a29' : '#858585' }}
          >
            {`审批意见：${opinion}`}
          </Card.Body>
        </Card>
      </div>
    );
  }

  // 图片预览功能
  imagePreview = (e, urls, index = 0) => {
    postMessage(JSON.stringify(
      {
        action: 'PreviewImages',
        data: {
          urls,
          index,
          origin: `0,${(document.body.clientHeight / 2) - (e.target.height / 2)}`,
          size: 750,
        },
      }
    ));
  }

  // 中间信息
  renderMiddle = () => {
    const {
      detail: {
        employeeName,
        mobile,
        companyName,
        authenticationType = '',
        authenticationTypeName,
        email,
        proofMaterial = '',
        attachmentUrls,
        auditorName,
        auditTime,
        operatorName,
        createAt,
      },
    } = this.state;
    return (
      <div className={styles.middle}>
        <Card full>
          <Card.Header title="认证信息" />
          <Card.Body>
            <div className={styles.items}>
              <div className={styles.item}>
                <div className={styles.itemDesc}>姓名</div>
                <div className={styles.itemVal}>{formatValue(employeeName)}</div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemDesc}>手机号</div>
                <div className={styles.itemVal}>{formatValue(mobile)}</div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemDesc}>认证企业</div>
                <div className={styles.itemVal}>{formatValue(companyName)}</div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemDesc}>认证类型</div>
                <div className={styles.itemVal}>{formatValue(authenticationTypeName)}</div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemDesc}>提交人</div>
                <div className={styles.itemVal}>{formatValue(operatorName)}</div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemDesc}>提交时间</div>
                <div className={styles.itemVal}>{formatValue(createAt)}</div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemDesc}>审核人</div>
                <div className={styles.itemVal}>{formatValue(auditorName)}</div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemDesc}>审核时间</div>
                <div className={styles.itemVal}>{formatValue(auditTime)}</div>
              </div>
              {/* 若租客填写通过邮箱认证，则展示认证邮箱字段，隐藏证明材料字段 */}
              {
                authenticationType === 'MAIL' && (
                  <div className={styles.item} style={{ border: 0 }}>
                    <div className={styles.itemDesc}>企业邮箱</div>
                    <div className={styles.itemVal}>{formatValue(email)}</div>
                  </div>
                )
              }
              {
                authenticationType !== 'MAIL' && (
                  <div className={styles.attachment}>
                    <div className={styles.attachmentDesc}>证明材料</div>
                    <div className={styles.attachments}>
                      {
                        proofMaterial && (
                          <img onClick={e => this.imagePreview(e, [proofMaterial])} src={proofMaterial} alt="证明材料" />
                        )
                      }
                    </div>
                  </div>
                )
              }
              {/* 当类型为工牌或在职证明认证时,展示企业预留样式 */}
              {
                authenticationType === 'CERT' && (
                  <div className={styles.attachment}>
                    <div className={styles.attachmentDesc}>企业预留样式</div>
                    <div className={styles.attachments}>
                      {
                        (attachmentUrls || []).map((url, index) => {
                          return (
                            <img
                              onClick={e => this.imagePreview(e, attachmentUrls, index)}
                              src={url}
                              key={url}
                              alt="企业预留样式"
                            />
                          );
                        })
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  // 审核
  @Bind()
  @Debounce(300)
  identify(auditState) {
    const {
      form: { validateFields, setFieldsValue },
      dispatch,
      match: { params: { id } },
    } = this.props;
    validateFields((err, fieldValues) => {
      if (err) {
        if (auditState === 'REFUSE') {
          const { opinion: { errors = [] } } = err;
          return Toast.fail(errors.map(v => v.message).join(','));
        }
      }
      const { opinion } = fieldValues;
      dispatch({
        type: 'employeeIdentify/employeeAudit',
        payload: {
          opinion,
          auditState,
          id,
        },
      }).then((res) => {
        const { status, msg = '数据请求失败' } = res || {};
        if (status === 'ok') {
          Toast.success('审核成功');
        } else {
          Toast.fail(msg);
        }
        setFieldsValue({ opinion: '' });
        this.setState({ visible: false });
        this.getDetail();
      });
    });
  }

  // 审核弹窗
  renderModal = () => {
    const { visible } = this.state;
    const { form: { getFieldProps, getFieldError } } = this.props;
    const errors = getFieldError('required');
    return (
      <Modal
        visible={visible}
        title="审核意见"
        popup
        closable
        maskClosable={false}
        animationType="slide-up"
        className={styles.identifyModal}
        onClose={() => this.setState({ visible: false })}
      >
        <TextareaItem
          {
          ...getFieldProps('opinion', {
            rules: [
              { required: true, message: '请填写审核意见' },
            ],
          })
          }
          rows={4}
          count={200}
          placeholder="请输入审核意见"
        />
        { errors ? errors.join(',') : null}
        <div className={styles.buttons}>
          <Button onClick={() => this.identify('REFUSE')} type="primary">驳回</Button>
          <Button onClick={() => this.identify('PASS')} type="primary">通过</Button>
        </div>
      </Modal>
    );
  }

  render() {
    const { detail: { authenticationState, audit = false } } = this.state;
    const { loading } = this.props;
    return (
      <BasicLayout loading={loading}>
        <div className={styles.detailWrapper}>
          {this.renderTop()}
          {this.renderMiddle()}
          {this.renderModal()}
          {
            (authenticationState === 'PENDING' && audit) ? (
              <div className={styles.bottom}>
                <Button type="primary" onClick={() => this.setState({ visible: true })}>审核</Button>
              </div>
            ) : null
          }
        </div>
      </BasicLayout>
    );
  }
}

export default EmployeeIdentifyDetail;
