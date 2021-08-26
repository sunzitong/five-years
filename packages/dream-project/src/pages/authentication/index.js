import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import moment from 'moment';
import { Picker, List, DatePicker, Toast } from 'antd-mobile';
// import { getAppAuthInfo } from '@guanyu/guanyu-h5-tools';
// import axios from 'axios';
import { parse, stringify } from 'qs';
import search from 'assets/search.png';
import clear from 'assets/clear.png';
import empty from 'assets/empty.png';
import add from 'assets/add.png';
import unCheckedSrc from 'assets/unChecked.png';
import checkedSrc from 'assets/checked.png';
import grayArrowRight from 'assets/gray_arrow_right.png';
import check from 'assets/check.png';
import Shadow from '@/components/Shadow';
import RulePopup from '@/components/RulePopup';
import GyModal from '@/components/GyModal';
import styles from './index.less';

@connect(({ global, authentication }) => ({
  global, authentication,
}))
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    // const searchObj = parse(props.location.search.replace('?', ''));
    this.isMiniProgram = navigator.userAgent.includes('miniProgram');
    this.state = {
      name: '',
      idNumber: '',
      voucherUrl: '',
      schoolName: '',
      showSchoolList: false,
      schoolList: [],
      schoolSearchValue: '',
      checked: true,
      initialData: {},
      showStudentInfoImg: false,
      showAuthorization: false,
      formDisable: false,
      sameTip: '',
      showNoteConfirm: false,
      showSameConfirm: false,
      newId: '',
      tabList: [
        { key: 0, value: '正确示例' },
        { key: 1, value: '错误示例' },
      ],
      current: 0,
      cityList: [],
    };
  }

  componentDidMount() {
    this.getCityList();
    const { form: { setFieldsValue }, global: { id = '' } } = this.props;
    const searchObj = parse(window.location.href.split('?')[1]);
    const { sourceType = '' } = searchObj;
    let sourcetype = '';
    switch (sourceType) {
      case 'DISCOUNTS': {
        sourcetype = '选择身份优惠页';
        break;
      }
      case 'PERSONAL': {
        sourcetype = '个人资料页';
        break;
      }
      case 'AUTHENTICATION': {
        sourcetype = '签约实人认证页';
        break;
      }
      default:
        sourcetype = '签约实人认证页';
    }
    window.zhuge.track('认证学生身份页', {
      sourcetype,
    });
    this.setShareMessage();
    if (sessionStorage.getItem('formData')) {
      setTimeout(() => {
        const formData = JSON.parse(sessionStorage.getItem('formData'));
        const { schoolName = '', voucherUrl = '', graduationTime = '', name, idNumber } = formData;
        this.setState({
          initialData: formData,
          schoolName,
          voucherUrl,
          name,
          idNumber,
        });
        setFieldsValue({
          graduationTime: moment(graduationTime).toDate(),
        });
      }, 0);
      return;
    }
    if (id) {
      this.queryStudentAuthInfoById();
    }
    this.getAuthenticationResult();
  }

  // 请求城市列表
  getCityList = async () => {
    const { dispatch } = this.props;
    const res = await dispatch({
      type: 'authentication/getCityList',
    });
    if (!res) return;
    const { data = [] } = res.data || {};
    const newCityList = [];
    if (!Array.isArray(data)) return;
    data.forEach((item) => {
      const cityInfo = {
        label: item.name,
        value: item.id,
      };
      newCityList.push(cityInfo);
    });
    this.setState({
      cityList: newCityList || [],
    });
  }

  setShareMessage = () => {
    const { global: { isMiniProgram } } = this.props;
    if (isMiniProgram) {
      window.wx.miniProgram.postMessage({
        data: {
          title: '住梦计划',
          imageUrl: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/CMS/X0-tj0DpRlc.jpeg',
          path: 'pages/index/index',
        },
      });
    }
  }

  getAuthenticationResult = async () => {
    const { dispatch, form: { setFieldsValue }, global: { id = '' } } = this.props;
    const res = await dispatch({
      type: 'authentication/getAuthenticationResult',
    });
    if (!res) return;
    // Toast.hide();
    const { data = {} } = res;
    const { data: newData = {} } = data || {};
    const { authenticationState = {}, authenticationInfo = {} } = newData || {};
    const { state = '' } = authenticationState;
    const { name = '', idNumber = '', idType = '' } = authenticationInfo;
    if (id) return;
    if (+state === 2 || +state === 3) {
      this.setState({
        formDisable: true,
        name,
        idNumber,
      }, () => {
        setFieldsValue({
          idType: [+idType === 0 ? 'ID' : 'PASSPORT'],
        });
      });
    }
  }


  queryStudentAuthInfoById = async () => {
    Toast.loading('加载中...', 0);
    const { global: { id = '' } } = this.props;
    const { dispatch, form: { setFieldsValue } } = this.props;
    const res = await dispatch({
      type: 'authentication/queryStudentAuthInfoById',
      payload: {
        id,
      },
    });
    if (!res) return;
    Toast.hide();
    const { data = {} } = res;
    const { data: newData = {} } = data || {};
    const { studentAuthInfo = {} } = newData || {};
    const { schoolName = '', voucherUrl = '', graduationTime = '', name, idNumber = '' } = studentAuthInfo;
    this.inputRef.value = schoolName;
    this.setState({
      initialData: studentAuthInfo,
      name,
      schoolName,
      voucherUrl,
      idNumber,
      checked: true,
    });
    setFieldsValue({
      graduationTime: moment(graduationTime).toDate(),
    });
  }

  upLoad = async () => {
    const formData = new FormData();
    formData.append('file', this.ref.files[0]);
    const { dispatch } = this.props;
    Toast.loading('上传中...', 0);
    const res = await dispatch({
      type: 'global/uploadPic',
      payload: formData,
    });
    if (!res) return;
    Toast.hide();
    const { data = {} } = res;
    const { data: newData = {} } = data;
    const [voucherUrl] = newData;
    this.setState({
      voucherUrl,
      showStudentInfoImg: false,
    });
  }

  inputSubscriptions = async () => {
    const inputValue = this.inputRef.value;
    this.setState({
      schoolSearchValue: inputValue,
    });
    if (this.loackAssociate) {
      return false;
    }
    this.searchSchool(inputValue);
  }

  searchSchool = async (inputValue) => {
    const { dispatch } = this.props;
    const res = await dispatch({
      type: 'global/searchSchool',
      payload: {
        search: inputValue,
      },
    });
    if (!res) return;
    const { data = {} } = res;
    const { data: newData = {} } = data || {};
    const { items = [] } = newData;
    this.setState({
      schoolList: items,
    });
  }

  aduit = (confirmed = false) => {
    const { dispatch, form, global } = this.props;
    const { validateFields } = form;
    const { schoolName, voucherUrl, checked, name, idNumber } = this.state;
    const { cityList } = this.state;
    validateFields(async (err, field) => {
      const { id } = global;
      const { graduationTime, idType, educationType, cityId } = field;
      // 根据当前选中的id设置城市信息
      let curCityNameObj = { label: '' };
      if (cityList.length) {
        curCityNameObj = cityList.find((item) => {
          return cityId[0] === item.value;
        }) || { label: '' };
      }
      if (!name) {
        Toast.info('请填写姓名', 3, () => { }, false);
        return;
      }
      if (!idNumber) {
        Toast.info('请填证件号码', 3, () => { }, false);
        return;
      }
      if (idType[0] === 'ID' && (+idNumber.length !== 15 && +idNumber.length !== 18)) {
        Toast.info('请填证15位或18位证件号码', 3, () => { }, false);
        return;
      }
      if (!schoolName) {
        Toast.info('请填写毕业学校', 3, () => { }, false);
        return;
      }
      if (!graduationTime) {
        Toast.info('请填写毕业时间', 3, () => { }, false);
        return;
      }
      if (!cityId) {
        Toast.info('请选择城市', 3, () => { }, false);
        return;
      }
      if (!voucherUrl) {
        Toast.info('请上传身份凭证', 3, () => { }, false);
        return;
      }
      if (!checked) {
        Toast.info('请阅读并同意用户声明', 3, () => { }, false);
        return;
      }
      Toast.loading('提交中...', 0);
      const res = await dispatch({
        type: 'authentication/applyStudentAuth',
        payload: {
          cityId: cityId[0],
          cityName: curCityNameObj.label,
          id,
          name,
          idType: idType[0],
          idNumber,
          schoolName,
          educationType: educationType[0],
          voucherUrl,
          graduationTime: moment(graduationTime).format('YYYY-MM-DD'),
          confirmed,
        },
      });
      if (!res) return;
      Toast.hide();
      const { data = {} } = res;
      const { code = '', data: newData = {}, message = '' } = data;
      const { studentAuthInfo = {}, alertInfo = {}, message: subMessage = '' } = newData || {};
      const { id: newId = '' } = studentAuthInfo || {};
      if (+code === 10000) {
        // 当用户编辑学生认证信息时，如果提交信息和上次提交信息一致, alertInfo，showDialogs为true则弹框提示：取消/确认，提示内容dialogsMsg
        if (alertInfo.showDialogsType === 'INFORMATION_CONSISTENCY') {
          this.setState({
            showSameConfirm: true,
            sameTip: alertInfo.dialogsMsg,
          });
        } else {
          this.setState({
            showNoteConfirm: true,
            newId,
          });
        }
      } else {
        Toast.fail(subMessage || message || '系统错误', 3);
      }
    });
  }

  comfirmCallBack = () => {
    const { dispatch, global } = this.props;
    const { isMiniProgram } = global;
    const { newId } = this.state;
    if (isMiniProgram) {
      dispatch({
        type: 'global/setId',
        payload: {
          id: newId,
        },
      });
      const searchObj = parse(window.location.href.split('?')[1]);
      searchObj.id = newId;
      setTimeout(() => {
        router.push(`/fe/dream-project/layout/index?${stringify(searchObj)}`);
      }, 0);
    } else {
      const searchObj = parse(window.location.href.split('?')[1]);
      const { fromHomepage = '' } = searchObj;
      if (fromHomepage) {
        searchObj.id = newId;
        router.push(`/fe/dream-project/layout/index?${stringify(searchObj)}`);
      } else {
        window.location = 'guanyu://navigation/back';
      }
    }
  }

  aduitConfirmCallBack = () => {
    this.aduit(true);
  }

  storageFormData = () => {
    const { form } = this.props;
    const { validateFields } = form;
    const { schoolName, voucherUrl, name, idNumber } = this.state;
    validateFields(async (err, field) => {
      const { graduationTime, idType, educationType, cityId } = field;
      const formData = {
        cityId,
        name,
        idTypeName: idType[0],
        idNumber,
        schoolName,
        educationTypeName: educationType[0],
        voucherUrl,
        graduationTime: moment(graduationTime).format('YYYY-MM-DD'),
      };
      sessionStorage.setItem('formData', JSON.stringify(formData));
    });
  }

  render() {
    const { global: { educationTypeList, idTypeList, isMiniProgram, isFullScreen, system, newData: popupData = {} }, form: { getFieldProps, getFieldValue } } = this.props;
    const { imgExampleRight = {}, imgExampleWrong = {}, graduationStartTime = '', graduationEndTime = '' } = popupData;
    const { voucherUrl, schoolName, showSchoolList, schoolSearchValue, schoolList, checked, initialData, showStudentInfoImg, showAuthorization, name, idNumber, formDisable, showNoteConfirm, showSameConfirm, sameTip, tabList, current, cityList } = this.state;
    let idTypeText = '';
    let educationTypeText = '';
    let graduationTimeText = '请选择毕业时间';
    if (idTypeList.length) {
      idTypeText = getFieldValue('idType') && getFieldValue('idType')[0] ? idTypeList.filter((item) => {
        return getFieldValue('idType')[0] === item.value;
      })[0].label : idTypeList[0].label;
    }
    // 根据当前选中的id设置城市信息
    let curCityName = '';
    if (cityList.length) {
      curCityName = getFieldValue('cityId') && getFieldValue('cityId')[0] ? cityList.filter((item) => {
        return getFieldValue('cityId')[0] === item.value;
      })[0].label : '';
    }

    if (educationTypeList.length) {
      educationTypeText = getFieldValue('educationType') && getFieldValue('educationType')[0] ? educationTypeList.filter((item) => {
        return getFieldValue('educationType')[0] === item.value;
      })[0].label : educationTypeList[0].label;
    }
    if (getFieldValue('graduationTime')) {
      graduationTimeText = moment(getFieldValue('graduationTime')).format('YYYY年M月');
    }
    return (
      <div
        className={styles.container}
        style={{
          paddingBottom: isFullScreen ? '34pt' : '1pt',
        }}
      >
        <div
          style={!showSchoolList ? { display: 'block' } : { display: 'none' }}
        >
          <div
            className={styles['form-container']}
          >
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.label}
              >
                姓名
              </div>
              <input
                disabled={formDisable}
                type="text"
                value={name}
                maxLength={100}
                className={styles.value}
                placeholder="输入姓名"
                onChange={(e) => {
                  this.setState({
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles['sub-item-container']}
              >
                <div
                  className={styles['left-container']}
                >
                  <div
                    className={styles.label}
                  >
                    证件类型
                  </div>
                  <div
                    className={styles.value}
                  >
                    {
                      idTypeText
                    }
                  </div>
                </div>
                <img src={grayArrowRight} alt="" />
              </div>
              <Picker
                data={idTypeList}
                cols={1}
                disabled={formDisable}
                {...getFieldProps('idType', {
                  initialValue: [initialData.idTypeName || (idTypeList[0] && idTypeList[0].value)],
                  onChange: (e) => {
                    if (getFieldValue('idType')[0] === e[0]) return;
                    this.setState({
                      idNumber: '',
                    });
                  },
                })}
              >
                <List.Item arrow="horizontal">证件类型</List.Item>
              </Picker>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles.label}
              >
                证件号码
              </div>
              <input
                disabled={formDisable}
                type="text"
                maxLength={18}
                className={styles.value}
                placeholder="输入您的证件号码"
                value={idNumber}
                onChange={(e) => {
                  if (getFieldValue('idType') && (getFieldValue('idType')[0] === 'ID')) {
                    if (e.target.value.length <= 17) {
                      this.setState({
                        idNumber: e.target.value.replace(/[^0-9]/g, ''),
                      });
                    } else {
                      this.setState({
                        idNumber: e.target.value.replace(/[^0-9xX]/g, ''),
                      });
                    }
                  } else {
                    this.setState({
                      idNumber: e.target.value.replace(/[^a-zA-z0-9]/g, ''),
                    });
                  }
                }}
              />
            </div>
            <div
              className={styles['item-container']}
              onClick={() => {
                window.zhuge.track('选择学校页');
                this.setState({
                  showSchoolList: true,
                }, () => {
                  if (!schoolName) return;
                  this.searchSchool(schoolName);
                });
              }}
            >
              <div
                className={styles.label}
              >
                毕业院校名
              </div>
              <div
                className={styles.value}

                style={!schoolName ? { color: '#999999' } : {}}
              >
                {schoolName || '请输入您的学校全名'}
              </div>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles['sub-item-container']}
              >
                <div
                  className={styles['left-container']}
                >
                  <div
                    className={styles.label}
                  >
                    毕业时间
                  </div>
                  <div
                    className={styles.value}
                    style={!getFieldValue('graduationTime') ? { color: '#999999' } : {}}
                  >
                    {graduationTimeText}
                  </div>
                </div>
                <img src={grayArrowRight} alt="" />
              </div>
              <DatePicker
                mode="month"
                // format='YYYY-MM-DD HH:mm'
                minDate={moment(graduationStartTime).toDate()}
                maxDate={moment(graduationEndTime).toDate()}
                {...getFieldProps('graduationTime', {
                })}
              >
                <List.Item arrow="horizontal">毕业时间</List.Item>
              </DatePicker>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles['sub-item-container']}
              >
                <div
                  className={styles['left-container']}
                >
                  <div
                    className={styles.label}
                  >
                    学历学位
                  </div>
                  <div
                    className={styles.value}
                  >
                    {educationTypeText}
                  </div>
                </div>
                <img src={grayArrowRight} alt="" className={styles.icon} />
              </div>
              <Picker
                data={educationTypeList}
                cols={1}
                {...getFieldProps('educationType', {
                  // initialValue: [educationTypeList[0] && educationTypeList[0].value],
                  initialValue:
                    [initialData.educationTypeName || (educationTypeList[0] && educationTypeList[0].value)],
                })}
              >
                <List.Item arrow="horizontal">学历学位</List.Item>
              </Picker>
            </div>
            <div
              className={styles['item-container']}
            >
              <div
                className={styles['sub-item-container']}
              >
                <div
                  className={styles['left-container']}
                >
                  <div
                    className={styles.label}
                  >
                    入住城市
                  </div>
                  <div
                    className={styles.value}
                    style={!curCityName ? { color: '#999999' } : {}}
                  >
                    {
                      curCityName || '请选择城市'
                    }
                  </div>
                </div>
                <img src={grayArrowRight} alt="" />
              </div>
              <Picker
                data={cityList}
                cols={1}
                {...getFieldProps('cityId', {
                  initialValue: [initialData.cityId],
                })}
              >
                <List.Item arrow="horizontal">入住城市</List.Item>
              </Picker>
            </div>
          </div>
          <div
            className={styles['upload-text']}
          >
            上传学生/毕业生身份凭证
          </div>
          <form
            // encType='multipart/form-data'
            className={styles['voucher-container']}
          >
            {
              voucherUrl ? (
                <div
                  className={styles.uploaded}
                  style={{
                    backgroundImage: `url(${voucherUrl})`,
                  }}
                  onClick={() => {
                    this.setState({
                      showStudentInfoImg: true,
                    });
                  }}
                >
                  <div
                    className={styles.shadow}
                  >
                    <img src={check} alt="" className={styles.check} />
                    凭证已上传
                  </div>
                </div>
              ) : (
                <div
                  className={styles['no-upload']}
                  onClick={() => {
                    this.setState({
                      showStudentInfoImg: true,
                    });
                  }}
                >
                  <img src={add} alt="" className={styles.add} />
                  上传凭证
                </div>
              )
            }
          </form>
          <div
            className={styles['statement-container']}
          >
            <img
              src={checked ? checkedSrc : unCheckedSrc}
              alt=""
              className={styles.uncheck}
              onClick={() => {
                this.setState({
                  checked: !checked,
                });
              }}
            />
            <div
              className={styles.label}
            >
              我已阅读并同意
            </div>
            <span
              onClick={() => {
                this.setState({
                  showAuthorization: true,
                });
              }}
            >
              《用户授权声明》
            </span>
          </div>
          <div
            className={styles['aduit-btn']}
            onClick={() => {
              window.zhuge.track('认证学生身份页-提交审核按钮');
              this.aduit(false);
            }}
          >
            提交审核
          </div>
        </div>
        <div
          className={styles['school-container']}
          style={showSchoolList ? { display: 'flex' } : { display: 'none' }}
        >
          <div
            className={styles['search-container']}
          >
            <div
              className={styles['input-container']}
            >
              <img src={search} alt="" className={styles.search} />
              <input
                maxLength={50}
                // type="text"
                className={styles.input}
                ref={(ref) => {
                  this.inputRef = ref;
                }}
                type="search"
                // placeholder="搜索房间号、客户手机号或管家姓名"
                onCompositionStart={() => {
                  this.loackAssociate = true;
                }}
                onCompositionUpdate={() => {
                  this.loackAssociate = true;
                }}
                onCompositionEnd={() => {
                  this.loackAssociate = false;
                  this.inputSubscriptions();
                }}
                onInput={() => {
                  this.inputSubscriptions();
                }}
              />
              {
                this.inputRef && this.inputRef.value && (
                  <img
                    src={clear}
                    alt=""
                    className={styles.clear}
                    onClick={() => {
                      this.inputRef.value = '';
                      this.searchSchool('');
                    }}
                  />
                )
              }
            </div>
            <div
              className={styles['cancel-btn']}
              onClick={() => {
                this.setState({
                  showSchoolList: false,
                });
              }}
            >
              取消
            </div>
          </div>
          {
            schoolSearchValue && schoolList.length === 0 ? (
              <div
                className={styles['empty-container']}
              >
                <img src={empty} alt="" className={styles.empty} />
                <div
                  className={styles.label}
                >
                  没有找到匹配的学校名称
                </div>
                <div
                  className={styles['add-school']}
                  onClick={() => {
                    this.setState({
                      schoolName: schoolSearchValue,
                      showSchoolList: false,
                    });
                  }}
                >
                  添加学校
                </div>
              </div>
            ) : (
              <div
                className={styles['list-container']}
              >
                {
                    schoolList.map((item) => {
                      const { id = '', schoolName: schoolname = '' } = item;
                      return (
                        <div
                          key={id}
                          className={styles['item-container']}
                          onClick={() => {
                            this.inputRef.value = schoolname;
                            this.setState({
                              schoolName: schoolname,
                              showSchoolList: false,
                            });
                          }}
                        >
                          <div
                            className={styles.container}
                          >
                            {schoolname}
                          </div>
                        </div>
                      );
                    })
                  }
              </div>
            )
          }
        </div>
        {/* showStudentInfoImg */}
        {showStudentInfoImg && (
          <Shadow>
            <div className={styles['tab-switch']}>
              {tabList.map((item, index) => {
                return (
                  <div
                    key={item.key}
                    className={`${styles['tab-list']} ${index === current ? styles.cur : ''}`}
                    onClick={() => {
                      this.setState({
                        current: index,
                      });
                    }}
                  >
                    <span>{item.value}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.h120} />
            {current === 0 && (
              <div className={styles['examples-box']}>
                <p className={styles.tips}>{imgExampleRight.remind}</p>
                {
                  Array.isArray(imgExampleRight.items) && imgExampleRight.items.map((item, index) => {
                    return (
                      <div key={String(index)} className={styles['examples-cont']}>
                        <h3>
                          {item.title}
                          <span>{item.remark}</span>
                        </h3>
                        <div className={styles.examples}>
                          <img src={item.img} alt="" />
                        </div>
                        <div className={styles['button-box']}>
                          {
                            Array.isArray(item.items) && item.items.map((btn, btnIndex) => {
                              return (<a href={btn.url} key={String(btnIndex)} className={styles.button}>{btn.title}</a>);
                            })
                          }
                        </div>
                      </div>
                    );
                  })
                }
                {imgExampleRight.remark && (<p className={styles['error-tips']}>{imgExampleRight.remark}</p>)}
              </div>
            )}
            {current === 1 && (
              <div className={styles['error-cont']}>
                <p className={styles.tips}>{imgExampleWrong.remind}</p>
                <div className={styles['error-box']}>
                  {
                    Array.isArray(imgExampleWrong.items) && imgExampleWrong.items.map((item, index) => {
                      return (
                        <div key={String(index)} className={styles['error-list']}>
                          <h4>{item.title}</h4>
                          <div className={styles['error-img']}>
                            <img src={item.img} alt="" />
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
                {imgExampleWrong.remark && (<p className={styles['error-tips']}>{imgExampleWrong.remark}</p>)}
              </div>
            )}
            <div className={`${styles['footer-button']} ${isFullScreen ? styles.screen : ''}`}>
              <div
                className={styles.cancel}
                onClick={() => {
                  this.setState({
                    showStudentInfoImg: false,
                  });
                }}
              >
                取消
              </div>
              <div className={styles.upload}>
                {
                  system === 'isAndroid' && isMiniProgram ? (
                    <div
                      className={styles.inputer}
                      onClick={() => {
                        Toast.info('很抱歉，由于微信平台限制部分设备存在无法上传图片的问题，请使用冠寓app进行上传验证。', 3, () => { }, false);
                      }}
                    />
                  ) : (
                    <input
                      type="file"
                      name="img"
                      id="voucher"
                      accept="image/*"
                      onChange={this.upLoad}
                      ref={(ref) => {
                        this.ref = ref;
                      }}
                    />
                  )
                }
                上传有效学籍/学历凭证
              </div>
            </div>
          </Shadow>
        )}
        {
          showAuthorization && (
            <RulePopup
              onClose={() => {
                this.setState({
                  showAuthorization: false,
                });
              }}
              classname={styles['shadow-class']}
            >
              <div
                className={styles['shadow-inside-container-auth']}
              >
                <div
                  className={styles['title-container']}
                >
                  用户授权声明
                </div>
                <div
                  className={styles.content}
                >
                  重要提示：为方便龙湖冠寓（冠寓商业管理有限公司及其分公司、子公司，以下简称“冠寓”）向客户（以下简称“您”）提供服务与权益，请您在申请“住梦计划”身份认证前仔细阅读并同意以下授权条款。
                  如您不能同意或者无法准确理解本声明中的任何内容，请您不要进行后续操作。您的申请行为即视为您已阅读并同意本声明的全部内容，以及与本声明有关的已经发布或者将来发布的各项规则、条款、操作流程、公告或通知。
                  <br />
                  1、您理解并同意，如不收集您的一些必要信息，冠寓将无法认证、识别您是否符合享受“住梦计划”的条件，无法客观判断您的履约能力和意愿，也无法履行法律或监管要求的法定义务。为了依法合规的为您提供更好的服务，请您同意并授权冠寓收集您填写不限于以下信息：姓名、身份证号、手机号、学校、学籍、毕业时间、学生证或毕业证照片等。
                  <br />
                  2、您理解并同意，为了对您的身份进行识别和验证，冠寓将会查看和审核您提交的个人信息。
                  <br />
                  3、您理解并同意，为了更好的向您提供服务，冠寓将向您发送服务状态的通知及活动相关信息。
                  <br />
                  4、本声明包括根据法律法规或经您同意或授权的其他内容。
                  <br />
                  5、您同意本协议中的授权不可撤回或撤销，并长期有效。
                  <br />
                  6、您同意，因履行本授权声明发生纠纷的，任何一方应向本授权声明履行地即北京市朝阳区人民法院提起诉讼。
                  <br />
                  本声明未尽条款，将适用《龙湖冠寓隐私政策》，您已阅读并充分了解《龙湖冠寓隐私政策》的全部内容，并同意遵守。
                </div>
              </div>
            </RulePopup>
          )
        }
        <GyModal
          iSsingleBtn
          visible={showNoteConfirm}
          title="提示"
          content="恭喜您，提交成功! 审核结果将在1个工作日内通过短信进行通知。"
          confirmText="确定"
          cancelColor="#F18D00"
          confirmColor="#F18D00"
          success={() => {
            this.setState({
              showNoteConfirm: false,
            }, () => {
              this.comfirmCallBack();
            });
          }}
        />
        <GyModal
          visible={showSameConfirm}
          title="提示"
          content={sameTip}
          cancelText="取消"
          confirmText="确定"
          cancelColor="#666666"
          confirmColor="#F18D00"
          success={() => {
            this.setState({
              showSameConfirm: false,
            }, () => {
              this.aduitConfirmCallBack();
            });
          }}
          fail={() => {
            this.setState({
              showSameConfirm: false,
            });
          }}
        />
      </div>
    );
  }
}


export default createForm()(Homepage);
