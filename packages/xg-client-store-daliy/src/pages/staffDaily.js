import React from 'react';
import { Toast, Picker, List } from 'antd-mobile';
import axios from 'axios';
import moment from 'moment';
import { parse } from 'qs';
import { getAppAuthInfo } from '@guanyu/xiaoguan-h5-tools';
import styles from './staffDaily.less';
import phone from '../assets/phone.png';
import arrow from '../assets/arrow.png';

class StaffDaily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: parse(window.location.href.split('?')[1]).projectId,
      dateAry: [],
      nowDateValue: '',
      nowDateLabel: '',
      name: '',
      quota: [],
      // quota: [{ key: 'incom', label: '到访', count: '101' }], // 指标看板集合
      inventoryList: [],
      // inventoryList: [{
      //   avatarUrl: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/webapp/qBNZQiUsQOg.jpg', // 头像地址
      //   customerId: 10, // 客户ID
      //   arriveStatus: '未到店', // 客户信息：未到店 | 未签约
      //   name: '张先生', // 客户姓名
      //   weChatNo: '李', // 微信号
      //   customerLabel: '门店公客', // 门店公客客户标签
      //   operator: '运营官名称', // 运营官名称
      //   phone: '186****9878', // 手机号
      //   time: '2020-06-26', // 创建时间
      //   channelName: '', // //客户来源
      //   followTypeName: '本次联系方式',
      //   customerLevelName: '',
      //   customerHouseName: '意向户型',
      //   customerBudgetName: '入住预算',
      //   customerResistanceName: '抗性原因',
      //   content: '跟进时间',
      //   appointTimeStr: '07月07日 星期二 09:17',
      //   hidden: false,
      // }, {
      //   avatarUrl: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/webapp/qBNZQiUsQOg.jpg', // 头像地址
      //   customerId: 11, // 客户ID
      //   arriveStatus: '未到店', // 客户信息：未到店 | 未签约
      //   name: '张先生', // 客户姓名
      //   weChatNo: '李', // 微信号
      //   customerLabel: '门店公客', // 门店公客客户标签
      //   operator: '运营官名称', // 运营官名称
      //   phone: '186****9878', // 手机号
      //   time: '2020-06-26', // 创建时间
      //   channelName: '', // //客户来源
      //   followTypeName: '本次联系方式',
      //   customerLevelName: '意向等级',
      //   customerHouseName: '意向户型',
      //   customerBudgetName: '入住预算',
      //   customerResistanceName: '抗性原因',
      //   content: '跟进时间',
      //   appointTimeStr: '07月07日 星期二 09:17',
      //   hidden: false,
      // }],
    };
  }

  componentDidMount() {
    document.title = '运营官日报';
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
      const { name = '', coDaily = {} } = subData || {};
      const {
        quota = [],
        inventoryList = [],
      } = coDaily || {};
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
          name,
          quota,
          inventoryList: inventoryList.map((item) => {
            return {
              ...item,
              hidden: false,
            };
          }),
        });
      } else {
        Toast.fail(msg, 3);
      }
    }).catch(() => {
      Toast.hide();
      Toast.fail('系统错误', 3);
    });
  }

  toggle = (status, customerId) => {
    const { inventoryList = [] } = this.state;
    let newInventoryList;
    if (status === 'expand') {
      newInventoryList = inventoryList.map((item) => {
        return {
          ...item,
          hidden: customerId === item.customerId ? false : item.hidden,
        };
      });
    } else {
      newInventoryList = inventoryList.map((item) => {
        return {
          ...item,
          hidden: customerId === item.customerId ? true : item.hidden,
        };
      });
    }
    this.setState({
      inventoryList: newInventoryList,
    });
  }

  render() {
    const {
      dateAry,
      nowDateValue,
      nowDateLabel,
      name,
      quota,
      inventoryList,
    } = this.state;
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
                {name}
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
          Array.isArray(inventoryList) && inventoryList.map((item, index) => {
            return (
              <div
                className={`${styles['customer-container']} ${item.hidden ? styles.hidden : ''}`}
                key={String(index)}
              >
                <div
                  className={styles['header-container']}
                >
                  <div
                    className={styles['protrait-container']}
                  >
                    <img src={item.avatarUrl} alt="" />
                  </div>
                  <div
                    className={styles['info-container']}
                  >
                    <div
                      className={styles['top-container']}
                    >
                      <div
                        className={styles.title}
                      >
                        {item.name}
                      </div>
                      {
                        item.operator && (
                          <div
                            className={styles.name}
                          >
                            {item.operator}
                          </div>
                        )
                      }
                      <div
                        className={styles.date}
                      >
                        {item.time}
                      </div>
                    </div>
                    <div
                      className={styles['mid-container']}
                    >
                      <img src={phone} alt="" />
                      <div
                        className={styles['phone-number']}
                      >
                        {item.phone}
                      </div>
                    </div>
                    <div
                      className={styles['bottom-container']}
                    >
                      {`客户信息:${item.arriveStatus} | ${item.channelName}`}
                    </div>
                  </div>
                </div>
                <div
                  className={styles['content-container']}
                >
                  <div
                    className={styles['title-container']}
                  >
                    <div
                      className={styles['blue-block']}
                    />
                    <div
                      className={styles.title}
                    >
                      客户描摹信息
                    </div>
                  </div>
                  <div
                    className={`${styles['item-container']} ${item.hidden ? styles.hidden : ''}`}
                  >
                    <div
                      className={styles.title}
                    >
                      意向等级:
                    </div>
                    <div
                      className={styles.value}
                    >
                      {item.customerLevelName || '--'}
                    </div>
                    {
                      item.hidden && (
                        <div
                          className={styles.btn}
                          onClick={() => {
                            this.toggle('expand', item.customerId);
                          }}
                        >
                          展开
                        </div>
                      )
                    }
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.title}
                    >
                      意向户型:
                    </div>
                    <div
                      className={styles.value}
                    >
                      {item.customerHouseName || '--'}
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.title}
                    >
                      入住预算:
                    </div>
                    <div
                      className={styles.value}
                    >
                      {item.customerBudgetName || '--'}
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.title}
                    >
                      抗性原因:
                    </div>
                    <div
                      className={styles.value}
                    >
                      {item.customerResistanceName || '--'}
                    </div>
                  </div>
                  <div
                    className={`${styles['title-container']} ${styles.mt36}`}
                  >
                    <div
                      className={styles['blue-block']}
                    />
                    <div
                      className={styles.title}
                    >
                      跟进信息
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.title}
                    >
                      预约看房时间:
                    </div>
                    <div
                      className={styles.value}
                    >
                      {item.appointTimeStr || '--'}
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.title}
                    >
                      本次联系方式:
                    </div>
                    <div
                      className={styles.value}
                    >
                      {item.followTypeName || '--'}
                    </div>
                  </div>
                  <div
                    className={styles['item-container']}
                  >
                    <div
                      className={styles.title}
                    >
                      跟进内容:
                    </div>
                    <div
                      className={styles.value}
                    >
                      {item.content || '--'}
                    </div>
                  </div>
                  <div
                    className={styles['expand-container']}
                    onClick={() => {
                      this.toggle('fold', item.customerId);
                    }}
                  >
                    收起
                  </div>
                </div>
              </div>
            );
          })
        }
        {/* <div
          className={styles['customer-container']}
        >
          <div
            className={styles['header-container']}
          >
            <div
              className={styles['protrait-container']}
            >
              <img src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/webapp/qBNZQiUsQOg.jpg" alt="" />
            </div>
            <div
              className={styles['info-container']}
            >
              <div
                className={styles['top-container']}
              >
                <div
                  className={styles.title}
                >
                  客户姓名
                </div>
                <div
                  className={styles.name}
                >
                  张伟伟
                </div>
                <div
                  className={styles.date}
                >
                  07-01 14:00
                </div>
              </div>
              <div
                className={styles['mid-container']}
              >
                <img src={phone} alt="" />
                <div
                  className={styles['phone-number']}
                >
                  156****8900
                </div>
              </div>
              <div
                className={styles['bottom-container']}
              >
                客户信息:未到店 | 未签约 | 冠寓三网
              </div>
            </div>
          </div>
          <div
            className={styles['content-container']}
          >
            <div
              className={styles['title-container']}
            >
              <div
                className={styles['blue-block']}
              />
              <div
                className={styles.title}
              >
                客户描摹信息
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.title}
              >
                意向等级:
              </div>
              <div
                className={styles.value}
              >
                A(3天可成交)
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.title}
              >
                意向户型:
              </div>
              <div
                className={styles.value}
              >
                大户型
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.title}
              >
                入住预算:
              </div>
              <div
                className={styles.value}
              >
                4000-5400
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.title}
              >
                抗性原因:
              </div>
              <div
                className={styles.value}
              >
                干净卫生、安全管理、隔音隔热、邻居 素质、公区配套、社群活动、其他
              </div>
            </div>
            <div
              className={`${styles['title-container']} ${styles.mt36}`}
            >
              <div
                className={styles['blue-block']}
              />
              <div
                className={styles.title}
              >
                客户描摹信息
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.title}
              >
                预约看房时间:
              </div>
              <div
                className={styles.value}
              >
                6月29日 星期一 14:00
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.title}
              >
                本次联系方式:
              </div>
              <div
                className={styles.value}
              >
                微信咨询
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.title}
              >
                跟进内容:
              </div>
              <div
                className={styles.value}
              >
                跟进内容跟进内容跟进内容跟进内容跟 跟进跟进内容跟进内容跟进内
              </div>
            </div>
            <div
              className={styles['expand-container']}
            >
              收起
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default StaffDaily;
