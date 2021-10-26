<template>
  <div class="">
    <div class="main-content"  v-if="showMain">
      <div class="header">
        <img src="../assets/header02.jpg" alt="">
        <div class="header-title">
          <h2>{{initData.surveyTitle}}</h2>
          <p v-if="initData.introduction.length <= 50">{{initData.introduction}}</p>
        </div>
      </div>
      <p v-if="initData.introduction.length > 50" class="position-content-title">{{initData.introduction}}</p>
        <div :class="isAnswer?'bottom':''">
          <div  v-if="question.isShow" v-for="question in initData.questionList" :key="question.questionId" :id="'question_' + question.questionId" class="question-list">

            <!-- 题型1 -->
            <div v-if="question.questionType == 'radio'" >
              <h3>{{question.questionNo + '、' + question.questionTitle}}</h3>
              <div class="radio-box">
                <div class="radio" @click="radioActive(question.optionList,radio)" :class="radio.active" v-for="(radio, index) in question.optionList" :index="index" :key="radio.key">
                  <i class="radio-ico"></i>
                  <label for="">{{radio.value}}</label>
                </div>
              </div>
            </div>


            <!-- 题型2 -->
            <div v-if="question.questionType == 'score'">
              <!-- 标题 -->
              <h3>{{question.questionNo + '、' + question.questionTitle}}</h3>
              <div class="score">
                <!-- 星星 -->
                <ul class="star-list">
                  <li v-for="(star, index) in question.score + 1" :key="star.key" @click="starActive(question,index)" :index="index"  class="active"></li>
                  <li v-for="(star, index) in 10 - question.score" :key="star.key" @click="starActive(question,question.score + index + 1)" :index="question.score + index"></li>
                </ul>

                <!-- 分数 -->
                <ul class="score-list">
                  <li v-if="question.showTip"  v-for="(score,index) in 11" :class ="(question.score == score - 1)?'active':''" :index="index" :key="score.key">
                    {{score-1}}
                  </li>
                </ul>

                <!-- 满意度展示 -->
                <ul class="satisfy-list">
                  <li>{{scoreLeft}}</li>
                  <li>{{scoreRight}}</li>
                </ul>
              </div>

              <!-- 子题 -->
              <div class="tag-list"  v-if="tagList.isShow || isAnswer" v-for="(tagList,tagIndex) in question.scoreList" :key="tagList.id">
                  <h4>{{tagList.subTitle}}</h4>
                  <ul class="check-list">
                    <li v-for="(check,index) in tagList.checkList" :class="{'active':check.active}" @click="checkActive(question.questionId,check,index,tagIndex)" :key="check.key" :type="check.type">{{check.value}}</li>
                  </ul>
                  <!-- 答案的展示有所不同 -->
                  <ul v-if="isAnswer" class="check-list">
                    <li  class="active"  :key="tagList.key" :type="tagList.optionsType">{{tagList.value}}</li>
                  </ul>
                <!-- 其他 -->
                <textarea name="" class="other" maxlength="100" v-if="question.showOther" v-model="question.input"></textarea>
              </div>
            </div>



            <!-- 题型3 -->
            <div v-if="question.questionType == 'check'">
              <!-- 标题 -->
              <h3>{{question.questionNo + '、' + question.questionTitle}}</h3>

              <!-- 子题 -->
              <div class="tag-list">
                <h4>{{tagList.subTitle}}</h4>
                <ul class="check-list">
                  <li v-for="(check,index) in question.checkList" :class="{'active':check.active}" @click="checkActive(question.questionId,check,index,'')" :key="check.key" :type="check.type">{{check.value}}</li>
                </ul>
              </div>

              <!-- 其他 -->
              <textarea name="" class="other" maxlength="100" v-if="question.showOther" v-model="question.input"></textarea>
            </div>

            <!-- 题型4 -->
            <div v-if="question.questionType == 'input'">
              <h3>{{question.questionNo + '、' + question.questionTitle}}</h3>
              <textarea name="" :placeholder="question.placeholder" class="other" maxlength="question.wordLimit" v-model="question.input"></textarea>
            </div>
          </div>
        </div>
<!-- NKJNJK -->
      <span v-if="!isAnswer" class="submit-btn" @click="submitForm">提交</span>
    </div>

    <div class="error-page" v-if="showErrorPage">
        <img src="../assets/error.png" alt="">
        <h2>{{errorMessage}}</h2>
        <span v-if="errorLink != ''" class="link-button" onClick="window.location.href = 'http://m.iguanyu.com'">去官网看看</span>
    </div>
    <!-- <div class="success-page" v-if="showSuccess"> -->
    <div class="success-page" v-if="showSuccess && successData.rewardExist === true">
        <img src="../assets/success-icon.png" alt="">
        <h2>感谢您的反馈，您将获得{{successData.rewardValue}}积分</h2>
       <p>积分将在24小时到账,如若长时间未发放<br/>请联系客服中心：400-001-1166</p>
       <!-- <span class="link-button" v-if="linkButton" @click="jumpToBackUrl">返回</span> -->
    </div>
    <div class="success-page" v-if="showSuccess && successData.rewardExist === false">
        <img src="../assets/success-icon.png" alt="">
        <h2>感谢您的反馈</h2>
       <p>您的反馈是我们进步的动力</p>
    </div>
    <transition name="fade">
      <toast :title="toastMsg" v-if="isShowToast"></toast>
    </transition>

    <!-- 手机号校验是否是租客弹窗 -->
    <div class="fixed" v-if="showFixed"></div>
    <div class="popup" v-if="showPopup">
      <div class="popup-content">
        <i class="close-button" @click="closeButton"></i>
        <div class="phone-input">
          <input type="text" class="phone-number" placeholder="请输入手机号" v-model="phoneNumber">
          <span class="phone-tip" v-if="phoneTip != ''">{{phoneTip}}</span>
        </div>
        <div class="verification-code">
          <div class="code-input-wrap">
            <input type="text" class="code-input" v-model="code">
          </div>
          <span class="code-button" @click="sendCode">{{ssssscode}}</span>
          <span class="phone-tip" v-if="codeTip != ''">{{codeTip}}</span>
        </div>
        <span class="confirm" @click="confirm">确认</span>
      </div>
    </div>
    <div :class="isAnswer?'mask':''"></div>
  </div>
</template>

<script>
import '../style/reset.css';
import '../mock/new01-02';
import '../mock/questionnaireResult';
// import '../mock/submitMock';
// import '../mock/phone';
import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import toast from '../components/toast.vue';
require.config({
    paths: {
        mock: '../mock/new01-02',
        // mock: '../mock/questionnaireResultt',
        // mock: '../mock/phone',
        // mock: '../mock/submitMock',
    }
})
// import '../styles/style.css';
export default {
  name: 'name',
  components:{
      toast,
  },
  data () {
    return {
      submitValue:{
        "questionList":{
            "score":8
        },
      },
      toastMsg:'提示提示提示提示',
      msg: 'Welcome to Your Vue.js App',
      scoreLeft: '非常不满意',
      scoreRight: '满意',
      scoreList: [1,2,3,4,5,6,7,8,9],
      initData:{
        introduction:"",
        questionList: [
          { optionList:[] },
          { scoreList: [
            { checkList: [] }
          ] },
          {checkList: []}
        ],
      },
      timestampStartTime: {},
      saveData:'',
      ins: '100',
      tagList: false,
      isShow: false,
      starNum: 0,
      totalSelectObject: {},
      userId: false,
      showErrorPage:false,
      errorMessage:"",
      showMain:true,
      showSuccess:false,
      linkButton: true,
      isShowToast: false,
      positionTitle: false,
      positionContentTitle: false,
      errorLink:"http://baidu.com",
      params:{

      },
      dataToSubmit:[],
      phoneNumber: '',
      paramsGetCode: {
        phone: '',
        questionnaireCode:''
      },
      paramsCheck: {
        phone: '',
        questionnaireCode:'',
        verificationCode: ''
      },
      code: '',
      phoneTip: '',
      codeTip: '',
      ssssscode: '发送验证码',
      showPopup: false,
      showFixed: false,
      canClick: true,
      totalTime: 10,
      disabled: false,
      successData: {},
      isAnswer: false,
    }
  },

  beforeMount(){
    // 获取url参数
    this.questionnaireCode = this.$route.query.questionnaireCode
    this.isPreview = this.$route.query.isPreview

    // 是否想查看答案
    const routeParams = this.$route.query
    this.isAnswer = routeParams.isAnswer
    this.id = routeParams.id
    this.params = {
      "questionnaireCode":this.questionnaireCode,
    }
    if(this.isAnswer){
      this.params.id = this.id;
    }

    if(this.$route.query.customerCode){
      this.params.customerCode = this.$route.query.customerCode
    }
    this.getData();


    // this.timestamp();

  },
  mounted(){
    // 替换title字段
    this.$nextTick(()=>{
      // document.getElementById('title').innerHTML = this.initData.surveyTitle
      // document.getElementById('title').innerHTML = '冠寓客户调研问卷'
    })
  },

  methods: {

    //验证码倒计时
    countDown(){
      if (!this.canClick){
        return
      }  //改动的是这两行代码
      this.canClick = false
      let that = this
      this.ssssscode = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        that.totalTime--
        that.ssssscode = that.totalTime + 's后重新发送'
        if (that.totalTime < 0) {
        window.clearInterval(clock)
        that.ssssscode = '重新发送验证码'
        that.totalTime = 10
        that.canClick = true  //这里重新开启
        }
      },1000)
    },


    // 关闭弹窗
    closeButton(){
        this.showPopup = false
        this.showFixed = false
    },

    // 发送验证码校验
    sendCode(){
      // alert('111');
      if(this.phoneNumber == ''){
        this.phoneTip = "请输入手机号"
        return
      }else
      if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))){
        this.phoneTip = "请输入合法的手机号"
        return
      }else{
        this.phoneTip = ""
      }
      this.paramsGetCode.phone = this.phoneNumber;
      this.paramsGetCode.questionnaireCode = this.questionnaireCode
      console.log(this.questionnaireCode);
      if(this.canClick == false){
        return
      }
      //手机号校验
      axios.post("/evaluation/sms/send_verification_code",this.paramsGetCode).then( res => {
        if(res.data.status === "ok"){
          this.showToast(res.data.msg)
          // alert('此手机号是租客,并发送验证码成功')
          this.countDown();
        }else{
          this.showToast(res.data.msg)
          // alert('您还不是租客，不能答此问卷')
          return
        }
      })
    },

    // 弹窗确认并提交以及提交前校验
    confirm(){
      if(this.phoneNumber == ''){
        this.phoneTip = "请输入手机号"
        return
      }else
      if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))){
        this.phoneTip = "请输入合法的手机号"
        return
      }else{
        this.phoneTip = ""
      }
      if( this.code == "" ){
        this.codeTip = "请输入验证码"
        return
      }
      //短信验证码验证
      this.paramsCheck.phone = this.phoneNumber;
      this.paramsCheck.questionnaireCode = this.questionnaireCode
      this.paramsCheck.verificationCode = this.code
      axios.post("/evaluation/sms/valid_verification_code",this.paramsCheck).then( res => {
        console.log(res);
        if(res.data.status === "ok"){
            // this.showToast(res.data.msg)
            // alert('提交成功')
            this.submitForm();
        }else{
          this.showToast(res.data.msg)
        }
      })
    },

    //弹窗提示定时消失
    showToast(toastMsg){
      this.toastMsg = toastMsg;
      this.isShowToast = true;
      var self = this
      setTimeout(function(){
          self.isShowToast = false;
      },2000)
    },

    // 星星打分
    starActive(question,num){
      //  console.log(questionId);
      // console.log(num)
      //星星总数
      question.score = num
      question.showTip = true

      //将对应得分的题目显示出来
      question.scoreList.map((scoreArea)=>{
        if(num >= scoreArea.area[0] && num <= scoreArea.area[1]){
          scoreArea.isShow = true
        } else {
          scoreArea.isShow = false
        }
      })
    },


    // 单选
    radioActive (optionList,thisRadio) {
      var relativeQuizList=[]
      optionList.map((option)=>{
        option.active = ""
        
        option.checkShowId && option.checkShowId.map((checkShowId)=>{
            relativeQuizList.push(checkShowId)
        })
      })
      thisRadio.active = 'active'
      relativeQuizList.map((quizId)=>{
        //相应quizId要隐藏
        this.initData.questionList.map((question)=>{
          if(question.questionId == quizId){
            question.isShow = false
          }
        })
      })
      //选中的radio对应的隐藏题要展示
      thisRadio.checkShowId && thisRadio.checkShowId.map((quizId)=>{
        this.initData.questionList.map((question)=>{
          if(question.questionId == quizId){
            question.isShow = true
          }
        })
      })
      //console.log(this.initData);

    },
    changePage(type,errMsg){
      if(type == "error"){
        this.showErrorPage = true;
        this.showMain = false;
        this.showSuccess = false;
        this.errorMessage = errMsg
      }
      if(type == "success"){
        this.showErrorPage = false;
        this.showMain = false;
        this.showSuccess = true;
      }
    },

    getData(){
          // console.log(this.$route.query.isPreview)

      // 判断问卷是否是预览状态
      let isPreviews = ()=>{
         if(this.$route.query.isPreview){
           return "/evaluation/questionnaire/preview"
          //  return "http://femgpam.xicp.net/evaluation/questionnaire/preview"
         }
         else if(this.$route.query.isAnswer){
           return "/evaluation/questionnaire_res/look"
          //  return "http://femgpam.xicp.net/evaluation/questionnaire/preview"
         }
         else{
          return "/evaluation/questionnaire/show_detail"
          // return "http://femgpam.xicp.net/evaluation/questionnaire/show_detail"
         }
      }
      // 请求接口数据
      axios.post(isPreviews(),this.params).then( res => {
      // axios.post("../mock/new01-02",this.params).then( res => {
      // axios.post("../mock/questionnaireResult",this.params).then( res => {
        if(res.data && res.data.status === "ok"){
          // 如果是查看问卷结果，要处理一下请求会来的数据
          if(this.isAnswer){
            var newQuestionList = this.formatResult(res.data.data, 'questionList');
            var newResultList = this.formatResult(res.data.data, 'resultList');
            res.data.data.questionList = newResultList.map((item)=>{
              const question = newQuestionList.find(q=>q.questionId === item.questionId);
              return {
                ...question,
                result: item,
              }
            })
          }

          this.initData = res.data.data;
          this.timestampStartTime = res.data;
          //判断项目是否公开
          if(this.initData.hasTwoDimensionalCodeSharing == 0 && this.isPreview != "true"){
            if(!this.$route.query.customerCode){
              this.changePage("error","此问卷只允许租客填写")
            }
          }

          res.data.data.questionList.map((question)=>{

            // 题型二
            if(question.questionType == "score"){
              // let tagListTmp = {}
              
              // 如果是查看答案
              if(this.isAnswer){

                // 准备查看答案需要的值
              const result = question.result || {};
              const answerScore = result.score || -1;
              const answerInput = result.input;
              const answerChildren = this.formatResult(result, 'options');
              const answerShowOther = answerInput && true;
              const answerShowTip = answerScore>-1  && true;
                 Vue.set(question,'score',answerScore);

                // 是否展示分数
                Vue.set(question,'showTip',answerShowTip);
                // 处理子题展示
                Vue.set(question,'scoreList',answerChildren);
                //  question.scoreList.forEach((scoreItem)=>{
                //   Vue.set(scoreItem,'isShow',true);
                //   Vue.set(checkList,'isShow',true);
                //   scoreItem.checkList.forEach((child)=>{
                //     child.active = true;
                //   })
                // })
                // 是否展示input框，input有值就展示
                Vue.set(question,'showOther',answerShowOther);
                Vue.set(question,'input',answerInput);
              } else {
              question.scoreList.map((score)=>{
                Vue.set(score,'isShow',false);
              })
              Vue.set(question,'score',-1);
              Vue.set(question,'showTip',false);
              Vue.set(question,'showOther',false);
              Vue.set(question,'input','');
            }
            }
            // 题型一
            else if(question.questionType == "radio"){
              // let questionListShow = {};

              if(this.isAnswer){
                const result = question.result || {};
                const QoptionList = this.formatResult(result, 'options')
                Vue.set(question,'optionList',QoptionList);
                question.optionList.forEach((option)=>{
                  Vue.set(option,'active','active');
                })
              }else{
              question.optionList.map((option)=>{
                Vue.set(option,'active','');
              })
                // 是否展示隐藏题
              Vue.set(question,'showOther',false);
            }
            }
            // 题型四
            else if(question.questionType == "input"){
              if(this.isAnswer){
              const result = question.result || {};
              Vue.set(question,'input',result.input);
              }else{
              Vue.set(question,'input','');
            }
            }
            // 题型三
            else if(question.questionType == "check"){
              if(this.isAnswer){
                const result = question.result || {};
                const options = this.formatResult(result, 'options')
                Vue.set(question,'checkList',options);
                question.checkList.forEach(item=>{
                  Vue.set(item,'active',true);
                })
              }
            }
          })
          //判断是否在有效期
          if(!this.$route.query.isPreview && !this.isAnswer){
            if(res.data.data.termOfValidity == 1 || res.data.data.termOfValidity == 4 || res.data.data.termOfValidity == 5 ){
              this.changePage("error","调查尚未开始")
            }else if(res.data.data.termOfValidity == 3){
              this.changePage("error","调查已经结束")
            }
          }
        }else{
          this.changePage("error",res.data.msg)
        }
      }).catch((e)=>{
        console.log('错误提示:', e);
        this.changePage("error", '网络故障')
      })
    },

    //多选
    checkActive(questionId,check,index,scoreIndex){
      if(check.active){
          Vue.set(check,'active',false);
      }else{
          Vue.set(check,'active',true);
      }
      var flag = true
      var checkSelTmp = 0
      this.initData.questionList.map((question)=>{
        if(question.questionId == questionId){
          if(scoreIndex === ''){
            question.checkList.map((chk)=>{
              if(chk.active){
                checkSelTmp++
              }
            })
            if(checkSelTmp > question.checkLimit && question.checkLimit > 0){
              flag = false
              return false
            }
          }
          else{
            question.scoreList[scoreIndex].checkList.map((chk)=>{
              if(chk.active){
                checkSelTmp++
              }
            })
            if(checkSelTmp > question.scoreList[scoreIndex].checkLimit && question.scoreList[scoreIndex].checkLimit > 0){
              flag = false
              return false
            }
          }
        }

      })
      if(!flag){
        Vue.set(check,'active',false);
        this.showToast("最多选择"+ (checkSelTmp-1) + "个标签")
        return
      }
      if(check.optionsType == 2){
        if(check.active == true){
          this.initData.questionList.map((question)=>{
            if(question.questionId == questionId){
              question.showOther = true
              // console.log(question)
            }
          })
        }
        else{
          this.initData.questionList.map((question)=>{
            if(question.questionId == questionId){
              question.showOther = false
            }
          })

        }
      }
    },
    // 取值并返回数据 工具函数返回数组
    formatResult(question={}, result){
      const newResult = question[result];
      return Array.isArray(newResult)?newResult:[];
    },
    //返回地址跳转
    jumpToBackUrl(){
       window.location.href = this.initData.entryAddressUrl
    },
    //submitForm 提交
    submitForm(){
      console.log(JSON.parse(JSON.stringify(this.dataToSubmit)), 99)

      if(this.disabled == true){
        return
      }
      this.disabled = true
      // 重置dataToSubmit
      this.dataToSubmit = []
      // 根据this.initData遍历questionlist
      var flag = true;
      //这里需要改成for map不能跳出
      //this.initData.questionList.map((question,quizIndex)=>{
      for(var i = 0;i < this.initData.questionList.length;i++){
        var quizTmp = this.initData.questionList[i]
        if(quizTmp.isShow == false){
          continue
        }
        if(quizTmp.questionType == "radio"){
          //必填校验
          var mustFlag = false
          //先把框架构建出来
          let questiontmp = {
            "questionId": quizTmp.questionId,
            "questionType": quizTmp.questionType,
            "options":[]
          }
          //radio的被选择项，在initData里面，找active=="active"的 整理进来
          quizTmp.optionList.map((option)=>{
            if(option.active == "active"){
              mustFlag = true
              //只要option.key 和value
              const radiotmp = {
                "key": option.key,
                "value": option.value
              }
              questiontmp.options.push(radiotmp);
            }
          })
          //这里需要前置判断是否需要必填
          if(!mustFlag && quizTmp.isNeed == true){
            this.showToast("请选择题目"+ quizTmp.questionNo +"的单选选项")
            flag=false;
            break
          }
          this.dataToSubmit.push(questiontmp)
        }

        if(quizTmp.questionType == "score"){
          let tagFlag = false
          let thisTagList = []
          //先把框架构建出来
          // questiontmp = {}
          let questiontmp = {
            "questionId": quizTmp.questionId,
            "questionType": quizTmp.questionType,
            "options":[]
          }
          //score填进去
          questiontmp.score = quizTmp.score
          //在当前展示的tagList中，把选中的options拼进去
          //把textArea的值扔到里面
          quizTmp.scoreList.map((tagList)=>{
            if(tagList.isShow == true){
              thisTagList = tagList
              tagList.checkList.map((check)=>{
                if(check.active == true){
                  tagFlag = true
                  var checkTmp = {
                    "optionsType":check.optionsType,
                    "key":check.key
                  }
                  if(check.optionsType==1){
                    checkTmp.value = check.value
                  }
                  if(check.optionsType ==2){
                    //这里需要v-model 到对应question.input
                    checkTmp.value = quizTmp.input
                  }
                  questiontmp.options.push(checkTmp)
                }
              })
            }
          })

          //这里需要前置判断得分是否必填
          if(quizTmp.score == -1 && quizTmp.isNeed == true){
            this.showToast("请选择题目"+ quizTmp.questionNo +"的得分")
            flag = false
            break
          }
          if(!tagFlag && thisTagList.isNeed == true){
            this.showToast("请选择题目"+ quizTmp.questionNo +"的多选选项")
            flag = false
            break
          }

          this.dataToSubmit.push(questiontmp)

        }
        //多选题
        if(quizTmp.questionType == "check"){
          var tagFlag = false
          //先把框架构建出来
          let questiontmp = {
            "questionId": quizTmp.questionId,
            "questionType": quizTmp.questionType,
            "options":[]
          }
          //把checkList里面active为true的拉出来
          quizTmp.checkList.map((check)=>{
            if(check.active == true){
              tagFlag = true
              var checkTmp = {
                "optionsType":check.optionsType,
                "key":check.key
              }
              if(check.optionsType==1){
                checkTmp.value = check.value
              }
              if(check.optionsType ==2){
                //这里需要v-model 到对应question.input
                checkTmp.value = quizTmp.input
              }
              questiontmp.options.push(checkTmp)
            }
          })
          //这里需要前置判断是否需要必填
          if(!tagFlag && quizTmp.isNeed == true){
            this.showToast("请选择题目"+ quizTmp.questionNo +"的多选选项")
            flag = false
            break
          }
          this.dataToSubmit.push(questiontmp)
        }
        // 填空题
        if(quizTmp.questionType == "input"){
          // let inputFlag = false
          //先把框架构建出来
          let questiontmp = {
            "questionId": quizTmp.questionId,
            "questionType": quizTmp.questionType,
            "input":quizTmp.input
          }
          //这里需要前置判断是否需要必填
          if(quizTmp.isNeed == true && quizTmp.input ==""){
            this.showToast("请填写题目"+ quizTmp.questionNo +"的内容")
            flag = false
            break
          }
          this.dataToSubmit.push(questiontmp)
        }
      }
      // console.log(this.dataToSubmit)

      //判断flag、有问题跳出
      if(!flag){
        this.disabled = false
        return
      }
      if(this.$route.query.isPreview){
        this.disabled = false
        this.showToast('预览页面模拟提交成功')
        return
      }
      // 判断游客是否可填写
      if(this.initData.isOnlyCustomer == true && !this.$route.query.customerCode && this.showPopup == false && this.showFixed == false){
          this.showPopup = true
          this.showFixed = true
          this.disabled = false
          return
      }
      // 时间戳时间格式化
      var startTime = moment(this.timestampStartTime.startTime).format('YYYY-MM-DD HH:mm:ss');
      // console.log(moment(this.timestampStartTime.timestamp).format('YYYY-MM-DD HH:mm:ss'));
      // console.log(moment(1534418194164).format('YYYY-MM-DD HH:mm:ss'));

      // 需要提交的东西
      var submitData = {
        "questionnaireCode":this.questionnaireCode,
        // "shopInfo":2,
        "questionList":this.dataToSubmit,
        "startTime": startTime,
        // "submitTime": 5  提交时间，暂定不提
        "customerCode": "PHONE---" + this.phoneNumber
      }
      // 判断是否有customerCode
      if(this.$route.query.customerCode){
        Vue.set(submitData,'customerCode',this.$route.query.customerCode);
      }
      console.log(JSON.stringify(submitData))

      console.log(this.disabled)
      // if(true){
      //   this.$router.push({path: '/success'})
      // }

      // 提交
    axios.defaults.headers.post['Content-Type']='application/json;charse=UTF-8';
          axios({
            method: 'post',
            data: submitData,
            // transformRequest:[function () {
            //   return JSON.stringify(submitData)
            // }],
            url: '/evaluation/questionnaire/submit'
            // url: '../mock/submitMock'
            // url: 'http://femgpam.xicp.net/evaluation/questionnaire/submit'
          }).then((res) => {
            if (res.data.status == 'ok') {
              this.closeButton();
              this.changePage("success")
              this.successData = res.data.data
              console.log(res.data)
              console.log(res.data.data)
              console.log(this.successData)
              if(this.initData.entryAddressUrl == null || this.initData.entryAddressUrl == ''){
                this.linkButton = false
              }
            }else{
              this.disabled = false
              this.changePage("error",res.data.msg);
            }
            // if(res.data.status == 'system_error'){
            //   this.disabled = false
            //   this.changePage("error",res.data.msg);
            // }
          }).catch((res) => {
            this.disabled = false
            console.log(res);
          })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.mask{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: rgba(0,0,0,0.1);
}

.fixed{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 5;
}
.popup{
  position: fixed;
  z-index: 100;
  left: 0;
  top: 26%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .popup-content{
    background-color: #fff;
    border: 1px solid #ededed;
    border-radius: 5px;
    padding: 60px 20px 28px 20px;
    position: relative;
    .close-button{
      width: 26px;
      height: 26px;
      background: url(../assets/close.png) 0 0 no-repeat;
      background-size: 100%;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      top: 12px;
      font-size: 18px;
      text-align: center;
      font-style: normal;
      font-family: SimSun;
    }
    .phone-input{
      position: relative;
      .phone-number{
        border: none;
        border-bottom: 1px solid #cbcbcb;
        font-size: 16px;
        line-height: 42px;
        width: 100%
      }  
    }
    .phone-tip{
      font-size: 12px;
      color: red;
      position: absolute;
      left: 0;
      top: 46px;
    }
    .verification-code{
      margin-top: 20px;
      position: relative;
      display: flex;
      .code-input-wrap{
        flex-grow: 2;
        padding-right: 20px;
        input{
          border: none;
          border-bottom: 1px solid #cbcbcb;
          line-height: 42px;
          width: 100%;
        } 
      }
    }
    .code-button{
      margin-top: 4px;;
        line-height: 36px;
        padding-top: 4px;
        font-size: 14px;
        border: 1px solid #dfdfdf;
        border-radius: 3px;
        padding: 0 10px;
        color: #555;
        flex-grow: 1;
        text-align: center;
      &:after{
        content: " ";
          display: block;
          line-height: 0;
          height: 0;
          visibility: hidden;
          clear: both;
      }
          
    }
    .confirm{
      margin-top: 44px;
      border-radius: 5px;
      background-color: green;
      color: #fff;
      width: 100%;
      line-height: 42px;
      border: 1px solid #ededed;
      display: block;
      font-size: 16px;
      text-align: center;
    }  
  }  
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .4s;
} 
.fade-enter, .fade-leave-to{
  opacity :0;
}
input,input:focus,input{
  &:active{
    user-select: text;
  }
} 
.success-page, .error-page{
  padding-top: 80px;
  text-align: center;
  padding: 80px 15px 0 15px;
  img{
    width: 92px;
    height: 100px;
    margin: 0  auto;
    display: block;
  }   
  h2{
    font-size: 19px;
    color: #4A4A4A;
    font-weight: normal;
    text-align: center;
    padding-top: 33px;
    // padding-bottom: px;
  }   
  p{
    font-size: 14px;
    color: #b9b9b9;
    text-align: center;
  }  
  .link-button{
    font-size: 18px;
    color: #ffffff;
    height: 46px;
    line-height: 46px;
    border-radius: 3px;
    background: green;
    text-align: center;
    display: block;
    margin-top: 20px;
  }   
}
.header{
  position: relative;
  img{
    width: 100%;
  }  
  .header-title{
    box-sizing: border-box;
    padding: 12px 10px 8px 10px;
    position: absolute;
    left: 0;
    top: 46%;
    width: 86%;
    color: #fff;
    background: rgba(250,138,0,0.8);
    h2{
      font-size: 22px;
      line-height: 22px;
    }  
    p{
      font-size: 14px;
      padding-top: 6px;
      max-height: 90px;
      overflow: hidden;
    }
  } 
}
.bottom {
    margin-bottom: 20px;
  }
.position-content-title{
  font-size: 14px;
  padding: 10px 15px 0 15px;
  text-indent: 2em;
} 
.question-list{
  padding: 20px 18px 0 18px;
  h3{
    font-size: 16px;
    color: #444;
    line-height: 24px;
  } 
  .radio-box{
    .radio{
      margin-top: 15px;
      border: solid 1px #dde5ed;
      position: relative;
      padding-left: 50px;
      line-height: 40px;
      font-size: 14px;
      border-radius: 4px;
      .radio-ico{
        border: 1px solid #dde5ed;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        position: absolute;
        left: 20px;
        top: 10px;
      }
      &.active{
        border-color: rgb(255, 204, 0);
          background-color: rgba(255, 204, 0, 0.2);
          box-shadow: 0 2px 5px 0 rgba(255, 204, 0, 0.4);
          .radio-ico{
            border-color: rgb(255, 204, 0);
            &:after{
              content: '';
              display: block;
              width: 8px;
              height: 8px;
              background: rgb(255, 204, 0);
              border-radius: 50%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }  
          } 
      } 
    }
  }
}
.score{
  margin-top: 8px;
  margin-bottom: 4px;
  .star-list{
    display: flex;
    margin-bottom: 10px;
    li{
      flex: 1;
      margin: 0 5px;
      height: 25px;
      background: #fff;
      background: url(../assets/star.png) 0 0 no-repeat;
      background-size: 100%;
      &:first-child{
        margin-left: 0;
      } 
      &:last-child{
        margin-right: 0;
      }  
      &.active{
        background: url(../assets/starCur.png) 0 0 no-repeat;
        background-size: 100%;
      }
    } 
  } 
  .satisfy-list{
    overflow: hidden;
    li{
      font-size: 14px;
      color: #888;
      &:first-child{
        float: left;
      }  
      &:last-child{
        float: right;
      }
    }
  }
  .score-list{
    display: flex;
    position: relative;
    li{
      flex: 1;
      margin: 0 5px 5px 5px;
      text-align: center;
      font-size: 14px;
      color: #666;
      &.active{
        color: #f8d40b;
        font-weight: bold;
      }  
      &:first-child{
        margin-left: 0;
      }
      &:last-child{
        margin-right: 0;
      } 
    }
  }
} 
.tag-list{
  h4{
    font-size: 14px;
    font-weight: normal;
    margin-top: 6px;
    margin-bottom: 4px;
    font-weight: bold;
  }  
}
.submit-btn{
  background: #ffa42f;
  border: 1px solid #f6a43c;
  border-radius: 4px;
  margin: 15px;
  line-height: 44px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  display: block;
  &:hover{
    background: #feac43;
    box-shadow: 0 3px 5px 0 rgba(255, 204, 0, 0.5);
  } 
}
.check-list{
  display: flex;
  flex-wrap: wrap;
  margin: 0 -6px 0 -6px;
  li{
    flex-grow: 0;
    margin: 4px;
    padding: 3px 16px;
    font-size: 14px;
    line-height: 28px;
    border: solid 1px #dde5ed;
    border-radius: 2px;
    &:last-child{
      margin-right: 0;
    }  
    &.active{
      background-color: rgba(255,204,0,0.2);
        color: #666;
        border: 1px solid #fc0;
        box-shadow: 0 2px 5px 0 rgba(255,204,0,0.4);
    }  
  }
}
.other{
  border: solid 1px #dde5ed;
  width: 100%;
  resize: none;
  height: 60px;
  margin-top: 10px;
  padding-left: 12px;
  padding-top: 8px;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 2px;
}
  
</style>
