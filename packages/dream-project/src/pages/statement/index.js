import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { createForm } from 'rc-form';
import styles from './index.less';


@connect(({ global }) => ({
  global,
}))
class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }


  render() {
    const { global: { isFullScreen } } = this.props;
    return (
      <div
        className={styles.container}
        style={{
          paddingBottom: isFullScreen ? '34pt' : '1pt',
        }}
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
    );
  }
}


export default createForm()(Statement);
