
import Mock from 'mockjs';

Mock.mock(/questionnaireResult$/, () => (
  {
    "code":200,
    "status":"ok",
    "data":{
    "id":35,
    "introduction":"您的反馈是我们成长的动力！",
    "questionnaireDesc":"冠寓入住体验调研（缴费）",
    "resultList":[
    {
    "score":2,
    "questionId":1,
    "options":[
    {
    "optionsType":1,
    "value":"回答问题不清晰",
    "key":2
    }
    ],
    "questionType":"score"
    },
    {
    "score":1,
    "questionId":2,
    "options":[
    {
    "optionsType":1,
    "value":"楼道脏乱",
    "key":2
    }
    ],
    "questionType":"score"
    },
    {
    "score":2,
    "questionId":3,
    "options":[
    {
    "optionsType":1,
    "value":"没有使用门禁",
    "key":2
    }
    ],
    "questionType":"score"
    },
    {
    "score":1,
    "questionId":4,
    "options":[
    {
    "optionsType":1,
    "value":"网络信号差",
    "key":2
    },
    {
    "optionsType":1,
    "value":"手机信号差",
    "key":3
    },
    {
    "optionsType":1,
    "value":"网络设备差",
    "key":4
    }
    ],
    "questionType":"score"
    },
    {
    "score":2,
    "questionId":5,
    "options":[
    {
    "optionsType":1,
    "value":"卫生间渗漏",
    "key":5
    }
    ],
    "questionType":"score"
    },
    {
    "questionId":6,
    "options":[
    {
    "value":"没有",
    "key":1
    }
    ],
    "questionType":"radio"
    },
    {
    "score":2,
    "questionId":8,
    "options":[
    {
    "optionsType":1,
    "value":"周边购物配套少",
    "key":3
    },
    {
    "optionsType":1,
    "value":"维修效率低",
    "key":13
    },
    {
    "optionsType":1,
    "value":"网络质量差",
    "key":24
    }
    ],
    "questionType":"score"
    },
    {
    "input":"这是一个666测试",
    "questionId":9,
    "questionType":"input"
    }
    ],
    "surveyTitle":"冠寓入住体验调研",
    "questionList":[
    {
    "scoreList":[
    {
    "area":[
    0,
    7
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"服务态度不友好",
    "key":1
    },
    {
    "optionsType":1,
    "value":"回答问题不清晰",
    "key":2
    },
    {
    "optionsType":1,
    "value":"专业知识薄弱",
    "key":3
    },
    {
    "optionsType":1,
    "value":"服务人员形象不佳",
    "key":4
    },
    {
    "optionsType":1,
    "value":"态度敷衍没耐心",
    "key":5
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":6
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    8,
    10
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"信得信任",
    "key":1
    },
    {
    "optionsType":1,
    "value":"服务态度专业友好",
    "key":2
    },
    {
    "optionsType":1,
    "value":"解决问题及反馈及时",
    "key":3
    },
    {
    "optionsType":1,
    "value":"回答讲解清晰",
    "key":4
    },
    {
    "optionsType":1,
    "value":"熟悉公寓及小区相关信息",
    "key":5
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":6
    }
    ],
    "checkLimit":0
    }
    ],
    "questionId":1,
    "questionTitle":"请您对公寓的运营官的服务进行评价。（0-10分制，标签区分两类，每类可多选）",
    "questionNo":" 1",
    "isNeed":true,
    "questionType":"score",
    "isShow":true
    },
    {
    "scoreList":[
    {
    "area":[
    0,
    7
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"公区脏乱",
    "key":1
    },
    {
    "optionsType":1,
    "value":"楼道脏乱",
    "key":2
    },
    {
    "optionsType":1,
    "value":"公寓内垃圾清理不及时",
    "key":3
    },
    {
    "optionsType":1,
    "value":"公区异味",
    "key":4
    },
    {
    "optionsType":1,
    "value":"楼道异味",
    "key":5
    },
    {
    "optionsType":1,
    "value":"电梯内部脏乱",
    "key":6
    },
    {
    "optionsType":1,
    "value":"公共厨房脏乱",
    "key":7
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":8
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    8,
    10
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"公区干净整洁",
    "key":1
    },
    {
    "optionsType":1,
    "value":"楼道干净整洁",
    "key":2
    },
    {
    "optionsType":1,
    "value":"公寓内垃圾清理及时",
    "key":3
    },
    {
    "optionsType":1,
    "value":"公区无异味",
    "key":4
    },
    {
    "optionsType":1,
    "value":"楼道无异味",
    "key":5
    },
    {
    "optionsType":1,
    "value":"电梯内部干净整洁",
    "key":6
    },
    {
    "optionsType":1,
    "value":"公共厨房干净整洁",
    "key":7
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":8
    }
    ],
    "checkLimit":0
    }
    ],
    "questionId":2,
    "questionTitle":"请您对公寓内卫生环境进行评价。（0-10分制，标签区分两类，每类可多选）",
    "questionNo":"2",
    "isNeed":true,
    "questionType":"score",
    "isShow":true
    },
    {
    "scoreList":[
    {
    "area":[
    0,
    7
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"夜间没有保安",
    "key":1
    },
    {
    "optionsType":1,
    "value":"没有使用门禁",
    "key":2
    },
    {
    "optionsType":1,
    "value":"经常有外卖上楼",
    "key":3
    },
    {
    "optionsType":1,
    "value":"楼道内有小广告",
    "key":4
    },
    {
    "optionsType":1,
    "value":"经常有快递出入",
    "key":5
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":6
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    8,
    10
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"保安认真负责",
    "key":1
    },
    {
    "optionsType":1,
    "value":"使用门禁",
    "key":2
    },
    {
    "optionsType":1,
    "value":"陌生人管理严格",
    "key":3
    },
    {
    "optionsType":1,
    "value":"快递出入管控严格",
    "key":4
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":5
    }
    ],
    "checkLimit":0
    }
    ],
    "questionId":3,
    "questionTitle":"请您对公寓内安保状况进行评价。（0-10分制，标签区分两类，每类可多选）",
    "questionNo":"3",
    "isNeed":true,
    "questionType":"score",
    "isShow":true
    },
    {
    "scoreList":[
    {
    "area":[
    0,
    7
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"网络不稳定",
    "key":1
    },
    {
    "optionsType":1,
    "value":"网络信号差",
    "key":2
    },
    {
    "optionsType":1,
    "value":"手机信号差",
    "key":3
    },
    {
    "optionsType":1,
    "value":"网络设备差",
    "key":4
    },
    {
    "optionsType":1,
    "value":"网速不够用",
    "key":5
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":6
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    8,
    10
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"网速稳定",
    "key":1
    },
    {
    "optionsType":1,
    "value":"网络信号好",
    "key":2
    },
    {
    "optionsType":1,
    "value":"网络设备质量好",
    "key":3
    },
    {
    "optionsType":1,
    "value":"网速快",
    "key":4
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":5
    }
    ],
    "checkLimit":0
    }
    ],
    "questionId":4,
    "questionTitle":"请您对公寓内网络质量进行评价（0-10分制，标签区分两类，每类可多选）",
    "questionNo":"4",
    "isNeed":true,
    "questionType":"score",
    "isShow":true
    },
    {
    "scoreList":[
    {
    "area":[
    0,
    7
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"房间味道大",
    "key":1
    },
    {
    "optionsType":1,
    "value":"隔音差",
    "key":2
    },
    {
    "optionsType":1,
    "value":"墙体裂缝/脱落",
    "key":3
    },
    {
    "optionsType":1,
    "value":"墙体渗漏",
    "key":4
    },
    {
    "optionsType":1,
    "value":"卫生间渗漏",
    "key":5
    },
    {
    "optionsType":1,
    "value":"地板质量差",
    "key":6
    },
    {
    "optionsType":1,
    "value":"门质量差",
    "key":7
    },
    {
    "optionsType":1,
    "value":"窗户质量差",
    "key":8
    },
    {
    "optionsType":1,
    "value":"门锁质量差",
    "key":9
    },
    {
    "optionsType":1,
    "value":"马桶质量差",
    "key":10
    },
    {
    "optionsType":1,
    "value":"台盆质量差",
    "key":11
    },
    {
    "optionsType":1,
    "value":"下水道反味",
    "key":12
    },
    {
    "optionsType":1,
    "value":"下水道经常堵塞",
    "key":13
    },
    {
    "optionsType":1,
    "value":"插座质量差",
    "key":14
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":15
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    8,
    10
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"材料好",
    "key":1
    },
    {
    "optionsType":1,
    "value":"品质感佳",
    "key":2
    },
    {
    "optionsType":1,
    "value":"物超所值",
    "key":3
    },
    {
    "optionsType":1,
    "value":"良心品质",
    "key":4
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":5
    }
    ],
    "checkLimit":0
    }
    ],
    "questionId":5,
    "questionTitle":"请您对公寓内房间工程质量进行评价。（0-10分制，标签区分两类，每类可多选）",
    "questionNo":"5",
    "isNeed":true,
    "questionType":"score",
    "isShow":true
    },
    {
    "questionId":6,
    "questionTitle":"请问您参与过公寓内的社群活动次数？",
    "questionNo":"6",
    "isNeed":true,
    "optionList":[
    {
    "checkShowId":{
    },
    "value":"没有",
    "key":1
    },
    {
    "checkShowId":[
    7
    ],
    "value":"1次",
    "key":2
    },
    {
    "checkShowId":[
    7
    ],
    "value":"2次",
    "key":3
    },
    {
    "checkShowId":[
    7
    ],
    "value":"3次以上",
    "key":4
    }
    ],
    "questionType":"radio",
    "isShow":true
    },
    {
    "scoreList":[
    {
    "area":[
    0,
    7
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"参与人太少",
    "key":1
    },
    {
    "optionsType":1,
    "value":"不是我喜欢的内容",
    "key":2
    },
    {
    "optionsType":1,
    "value":"活动时间安排的不好",
    "key":3
    },
    {
    "optionsType":1,
    "value":"活动环节参与性不强",
    "key":4
    },
    {
    "optionsType":1,
    "value":"活动组织差",
    "key":5
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":6
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    8,
    10
    ],
    "subTitle":"",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"主题有吸引力",
    "key":1
    },
    {
    "optionsType":1,
    "value":"参与感强",
    "key":2
    },
    {
    "optionsType":1,
    "value":"时间安排合理",
    "key":3
    },
    {
    "optionsType":1,
    "value":"设计组织周密",
    "key":4
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":5
    }
    ],
    "checkLimit":0
    }
    ],
    "questionId":7,
    "questionTitle":"请您对社群活动进行评价。（0-10分制，标签区分两类，每类可多选）",
    "questionNo":"6.1",
    "isNeed":true,
    "questionType":"score",
    "isShow":false
    },
    {
    "scoreList":[
    {
    "area":[
    0,
    6
    ],
    "subTitle":"请问您不愿意推荐的主要原因是什么？（多选）",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"交通不方便",
    "key":1
    },
    {
    "optionsType":1,
    "value":"周边餐饮配套少",
    "key":2
    },
    {
    "optionsType":1,
    "value":"周边购物配套少",
    "key":3
    },
    {
    "optionsType":1,
    "value":"房间味道大",
    "key":4
    },
    {
    "optionsType":1,
    "value":"运营官态度差",
    "key":5
    },
    {
    "optionsType":1,
    "value":"房间面积小",
    "key":6
    },
    {
    "optionsType":1,
    "value":"公区面积小",
    "key":7
    },
    {
    "optionsType":1,
    "value":"公区娱乐设备少",
    "key":8
    },
    {
    "optionsType":1,
    "value":"公区健身器材少",
    "key":9
    },
    {
    "optionsType":1,
    "value":"楼道卫生差",
    "key":10
    },
    {
    "optionsType":1,
    "value":"公区卫生差",
    "key":11
    },
    {
    "optionsType":1,
    "value":"安保措施差",
    "key":12
    },
    {
    "optionsType":1,
    "value":"维修效率低",
    "key":13
    },
    {
    "optionsType":1,
    "value":"水电费太高",
    "key":14
    },
    {
    "optionsType":1,
    "value":"租金太贵",
    "key":15
    },
    {
    "optionsType":1,
    "value":"房间隔音差",
    "key":16
    },
    {
    "optionsType":1,
    "value":"周边噪音大",
    "key":17
    },
    {
    "optionsType":1,
    "value":"施工质量差",
    "key":18
    },
    {
    "optionsType":1,
    "value":"装修用材差",
    "key":19
    },
    {
    "optionsType":1,
    "value":"家具配置少",
    "key":20
    },
    {
    "optionsType":1,
    "value":"家电配置少",
    "key":21
    },
    {
    "optionsType":1,
    "value":"缴费不方便",
    "key":22
    },
    {
    "optionsType":1,
    "value":"没有什么社群活动",
    "key":23
    },
    {
    "optionsType":1,
    "value":"网络质量差",
    "key":24
    },
    {
    "optionsType":1,
    "value":"水电表计数不准确",
    "key":25
    },
    {
    "optionsType":1,
    "value":"收纳空间少",
    "key":26
    },
    {
    "optionsType":1,
    "value":"热水器容量低",
    "key":27
    },
    {
    "optionsType":1,
    "value":"房间采光不好",
    "key":28
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":29
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    7,
    8
    ],
    "subTitle":"我们在哪些方面做出改善会让您愿意推荐？（多选）",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"改善运营官态度",
    "key":1
    },
    {
    "optionsType":1,
    "value":"增加公区健身器材",
    "key":2
    },
    {
    "optionsType":1,
    "value":"增加公区娱乐设备",
    "key":3
    },
    {
    "optionsType":1,
    "value":"公区卫生需要提升",
    "key":4
    },
    {
    "optionsType":1,
    "value":"楼道卫生需要提升",
    "key":5
    },
    {
    "optionsType":1,
    "value":"多组织公寓活动",
    "key":6
    },
    {
    "optionsType":1,
    "value":"增加安保措施",
    "key":7
    },
    {
    "optionsType":1,
    "value":"提升维修速度",
    "key":8
    },
    {
    "optionsType":1,
    "value":"降低周边噪音影响",
    "key":9
    },
    {
    "optionsType":1,
    "value":"降低公寓内噪音",
    "key":10
    },
    {
    "optionsType":1,
    "value":"提升施工质量",
    "key":11
    },
    {
    "optionsType":1,
    "value":"优化装修用材",
    "key":12
    },
    {
    "optionsType":1,
    "value":"增加电器配置",
    "key":13
    },
    {
    "optionsType":1,
    "value":"增加家具配置",
    "key":14
    },
    {
    "optionsType":1,
    "value":"缴费更方便",
    "key":15
    },
    {
    "optionsType":1,
    "value":"增加收纳空间",
    "key":16
    },
    {
    "optionsType":1,
    "value":"增加热水器容量",
    "key":17
    },
    {
    "optionsType":1,
    "value":"提升网络质量",
    "key":18
    },
    {
    "optionsType":1,
    "value":"提升网络带宽",
    "key":19
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":20
    }
    ],
    "checkLimit":0
    },
    {
    "area":[
    9,
    10
    ],
    "subTitle":"请问您推荐的主要理由是什么？（多选）",
    "isNeed":true,
    "checkList":[
    {
    "optionsType":1,
    "value":"价格合理",
    "key":1
    },
    {
    "optionsType":1,
    "value":"公寓位置好",
    "key":2
    },
    {
    "optionsType":1,
    "value":"公区超赞",
    "key":3
    },
    {
    "optionsType":1,
    "value":"房间设计漂亮",
    "key":4
    },
    {
    "optionsType":1,
    "value":"公区设计漂亮",
    "key":5
    },
    {
    "optionsType":1,
    "value":"运营官服务热情",
    "key":6
    },
    {
    "optionsType":1,
    "value":"周边配套齐全",
    "key":7
    },
    {
    "optionsType":1,
    "value":"公寓活动棒棒哒",
    "key":8
    },
    {
    "optionsType":1,
    "value":"安全有保障",
    "key":9
    },
    {
    "optionsType":1,
    "value":"干净整洁",
    "key":10
    },
    {
    "optionsType":1,
    "value":"报修服务及时",
    "key":11
    },
    {
    "optionsType":1,
    "value":"投诉处理及时",
    "key":12
    },
    {
    "optionsType":2,
    "value":"其他",
    "key":13
    }
    ],
    "checkLimit":0
    }
    ],
    "questionId":8,
    "questionTitle":"如果您的朋友或家人有租房打算，您在多大程度上愿意将冠寓推荐给TA？（0-10分制，标签可多选）",
    "questionNo":"7",
    "isNeed":true,
    "questionType":"score",
    "isShow":true
    },
    {
    "questionId":9,
    "questionTitle":"冠寓的产品和服务最能打动您的地方或您最不满意的地方是什么？（填写框，不限字数）",
    "questionNo":"8",
    "isNeed":false,
    "placeholder":"请具体描述您的观点",
    "wordLimit":1000,
    "questionType":"input",
    "isShow":true
    }
    ],
    "termOfValidity":"3"
    },
    "msg":"",
    "msgDetail":"",
    "requestId":"de0a0edd-59eb-4610-97b9-d29def76a23e",
    "startTime":1571906016061
    }
));