import React, { Fragment } from 'react';
import { Toast, Picker, List } from 'antd-mobile';
import axios from 'axios';
import { parse } from 'qs';
import moment from 'moment';
import { getAppAuthInfo } from '@guanyu/xiaoguan-h5-tools';
import styles from './managerDaily.less';
import arrow from '../assets/arrow.png';

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateAry: [],
      projectId: parse(window.location.href.split('?')[1]).projectId,
      nowDateValue: '',
      nowDateLabel: '',
      data: {
        cm: true, // 是否店长
        name: '',
        projectName: '',
        cmDaily: {
          quota: [], // 指标看板集合
          coWorkDailyList: [], // 运营官工作情况集合
        },
        // cmDaily: {
        //   quota: [{ key: 'incom', label: '到访', count: '101' }], // 指标看板集合
        //   coWorkDailyList: [{
        //     name: '运营官名字',
        //     toDayArrive: 3, // 今日到访
        //     toDayReserve: 3, // 今日交定
        //     toDaySign: 3, // 今日新签
        //     toDayCustomer: 3, // 今日新建客户
        //     monthSign: 30, // 本月新签
        //     monthReserve: 50, // 本月交定
        //     targetNum: 100, // 新签目标
        //     percent: '70', // 百分比
        //     noTarget: true,
        //   }], // 运营官工作情况集合
        // }, // 店长日报
        coDaily: {
          quota: [{ key: 'incom', label: '到访', count: '101' }], // 指标看板集合
          inventoryList: [{
            avatarUrl: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/webapp/qBNZQiUsQOg.jpg', // 头像地址
            customerId: 10, // 客户ID
            arriveStatus: '未到店', // 客户信息：未到店 | 未签约
            name: '张先生', // 客户姓名
            weChatNo: '李', // 微信号
            customerLabel: '门店公客', // 门店公客客户标签
            operator: '运营官名称', // 运营官名称
            phone: '186****9878', // 手机号
            time: '2020-06-26', // 创建时间
            channelName: '', // //客户来源
            followTypeName: '本次联系方式',
            customerLevelName: '意向等级',
            customerHouseName: '意向户型',
            customerBudgetName: '入住预算',
            customerResistanceName: '抗性原因',
            content: '跟进时间',
            appointTimeStr: '07月07日 星期二 09:17',
          }],
        }, // 运营官日报
      },
    };
  }

  componentDidMount() {
    document.title = '店长日报';
    const arr = [];
    for (let i = 0; i < 7; i += 1) {
      arr.push({
        label: `${moment().subtract(i, 'days').month() + 1}月${moment().subtract(i, 'days').date()}日日报`,
        value: moment().subtract(i, 'days').valueOf(),
      });
    }
    this.setState({
      dateAry: arr,
      nowDateValue: arr[0].value,
      nowDateLabel: arr[0].label,
    }, () => {
      axios.defaults.headers.common.Authorization = `Bearer ${getAppAuthInfo() && getAppAuthInfo().access_token}`;
      // axios.defaults.headers.common.Authorization = `Bearer app1846502f41e946b5b8c77733a9aa290c`;
      this.getData();
    });
  }

  getData = () => {
    Toast.loading('加载中...', 0);
    const { nowDateValue, projectId } = this.state;
    const params = {
      projectId,
      dailyTime: nowDateValue,
    };
    axios.post('/crm/app/v2/inventory/daily', params, {
      validateStatus(status) {
        return status < 500;
      },
    }).then((res = {}) => {
      Toast.hide();
      const { data = {} } = res || {};
      const { data: subData = {}, status = '', msg = '' } = data || {};
      const { name = '' } = subData || {};
      window.maiaCanvasBrush({
        watermark_txt: name,
        watermark_fontsize: 28,
        watermark_x_space_ratio: 3,
        watermark_angle: -30,
        watermark_x: 40,
        watermark_show_threshold: 0.1,
        watermark_color: 'rgba(222, 222, 222, 0.4)',
      });
      if (status === 'ok') {
        this.setState({
          data: subData,
        });
      } else {
        Toast.fail(msg, 3);
      }
    }).catch(() => {
      Toast.hide();
      Toast.fail('系统错误', 3);
    });
  }

  render() {
    const {
      data = {},
      dateAry,
      nowDateValue,
      nowDateLabel,
    } = this.state;
    const {
      // name = '',
      projectName = '',
      cmDaily = {},
    } = data;

    const {
      quota = [],
      coWorkDailyList = [],
    } = cmDaily || {};
    return (
      <div className={styles.container}>
        <div
          className={styles['total-container']}
        >
          <div
            className={styles['top-container']}
          >
            <div
              className={styles['left-container']}
            >
              <div
                className={styles['blue-block']}
              />
              <div
                className={styles.title}
              >
                {projectName}
              </div>
            </div>
            <div
              className={styles['right-container']}
            >
              <div
                className={styles.title}
              >
                {nowDateLabel}
                <img src={arrow} alt="" />
                <Picker
                  data={dateAry}
                  value={[nowDateValue]}
                  cols={1}
                  onChange={(e) => {
                    if (nowDateValue === e[0]) return;
                    this.setState({
                      nowDateValue: e[0],
                      nowDateLabel: dateAry.filter((item) => {
                        return item.value === e[0];
                      })[0].label,
                    }, () => {
                      this.getData();
                    });
                  }}
                >
                  <List.Item arrow="horizontal">日报日期</List.Item>
                </Picker>
              </div>
            </div>
          </div>
          <div
            className={styles['bottom-container']}
          >
            {
              Array.isArray(quota) && quota.map((item, index) => {
                return (
                  <div
                    className={styles['item-container']}
                    key={String(index)}
                  >
                    <div
                      className={styles.number}
                    >
                      {item.count}
                    </div>
                    <div
                      className={styles.label}
                    >
                      {item.label}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        {
          Array.isArray(coWorkDailyList) && coWorkDailyList.map((item, index) => {
            return (
              <div
                className={styles['manager-container']}
                key={String(index)}
              >
                <div
                  className={styles['top-container']}
                >
                  {item.name}
                </div>
                <div
                  className={styles['title-container']}
                >
                  <div
                    className={styles['blue-block']}
                  />
                  <div
                    className={styles.title}
                  >
                    本日
                  </div>
                </div>
                <div
                  className={styles['bottom-container']}
                >
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.number}
                    >
                      {item.toDayCustomer}
                    </div>
                    <div
                      className={styles.label}
                    >
                      P1客储
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.number}
                    >
                      {item.toDayArrive}
                    </div>
                    <div
                      className={styles.label}
                    >
                      P2客储
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.number}
                    >
                      {item.toDayReserve}
                    </div>
                    <div
                      className={styles.label}
                    >
                      P3客储
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.number}
                    >
                      {item.toDaySign}
                    </div>
                    <div
                      className={styles.label}
                    >
                      P4客储
                    </div>
                  </div>
                </div>
                <div
                  className={styles['title-container']}
                >
                  <div
                    className={styles['blue-block']}
                  />
                  <div
                    className={styles.title}
                  >
                    本月
                  </div>
                </div>
                {
                  item.noTarget ? (
                    <div
                      className={styles.noTarget}
                    >
                      未设置本月目标
                    </div>
                  ) : (
                    <Fragment>
                      <div
                        className={styles['label-container']}
                      >
                        <div
                          className={styles['item-container']}
                        >
                          <div
                            className={`${styles.dots} ${styles.gray}`}
                          />
                          <div
                            className={styles.label}
                          >
                            新签目标:
                          </div>
                          <div
                            className={styles.value}
                          >
                            {item.targetNum}
                          </div>
                        </div>
                        <div
                          className={styles['item-container']}
                        >
                          <div
                            className={`${styles.dots} ${styles.blue}`}
                          />
                          <div
                            className={styles.label}
                          >
                            新签:
                          </div>
                          <div
                            className={styles.value}
                          >
                            {item.monthSign}
                          </div>
                        </div>
                        <div
                          className={styles['item-container']}
                        >
                          <div
                            className={styles.label}
                          >
                            交定:
                          </div>
                          <div
                            className={styles.value}
                          >
                            {item.monthReserve}
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles['progress-container']}
                      >
                        <div
                          className={styles['progress-warpper']}
                        >
                          <div
                            className={styles.progress}
                            style={{
                              width: `${item.percent}%`,
                            }}
                          />
                        </div>
                        <div
                          className={styles.label}
                        >
                          {`${item.percent}%`}
                        </div>
                      </div>
                    </Fragment>
                  )
                }

              </div>
            );
          })
        }
      </div>
    );
  }
}

export default BasicLayout;
