

import Mock from 'mockjs';

Mock.mock(/new01$/, () => ({
  "status": "ok",
  "msg": "ok",
  "data": {
    "id": 16,
    "headPicPath": null,
    'hasTwoDimensionalCodeSharing':1,
    "introduction": "您的反馈是我们成长的动力！",
    "questionnaireDesc": null,
    "surveyTitle": "冠寓签约体验调研",
    "entryAddressUrl": null,
    "termOfValidity": "0",
    "isOnlyCustomer": 1,
    "questionList": [
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": false,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "签约服务人员态度差",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "签约流程繁琐",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "签约服务人员讲解不清楚",
                            "key": 3
                        },
                        {
                            "placeholder": "请具体描述您的观点",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                },
                {
                    "area": [
                        8,
                        10
                    ],
                    "subTitle": "",
                    "isNeed": false,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "签约讲解细致专业",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "签约服务人员态度好",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "签约流程便捷",
                            "key": 3
                        },
                        {
                            "placeholder": "请具体描述您的观点",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 1,
            "questionTitle": "请您对本次签约流程进行打分？（0-10分制，标签区分两类，每类可多选）",
            "questionNo": "1",
            "questionType": "score",
            "isNeed": false,
            "isShow": true
        },
        {
            "questionId": 2,
            "questionTitle": "如果我们组织社群活动，您想参加哪类活动呢",
            "questionNo": "2",
            "isNeed": false,
            "checkList": [
                {
                    "optionsType": 1,
                    "value": "打游戏",
                    "key": 1
                },
                {
                    "optionsType": 1,
                    "value": "吃吃喝喝",
                    "key": 2
                },
                {
                    "optionsType": 1,
                    "value": "读书",
                    "key": 3
                },
                {
                    "optionsType": 1,
                    "value": "看电影",
                    "key": 4
                },
                {
                    "optionsType": 1,
                    "value": "二手东东交易",
                    "key": 5
                },
                {
                    "optionsType": 1,
                    "value": "运动",
                    "key": 6
                },
                {
                    "optionsType": 1,
                    "value": "品酒会",
                    "key": 7
                },
                {
                    "optionsType": 1,
                    "value": "棋牌",
                    "key": 8
                },
                {
                    "optionsType": 1,
                    "value": "迎新会",
                    "key": 9
                },
                {
                    "optionsType": 1,
                    "value": "交友",
                    "key": 10
                },
                {
                    "optionsType": 1,
                    "value": "生日会",
                    "key": 11
                },
                {
                    "placeholder": "请具体描述您的观点",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "其他",
                    "key": 12
                }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 3,
            "questionTitle": "大咖红人速来报道，您是以下哪类大咖，快来告诉我。",
            "questionNo": "3",
            "isNeed": false,
            "checkList": [
                {
                    "optionsType": 1,
                    "value": "我是自由职业者（可以带领大家玩的那种）",
                    "key": 1
                },
                {
                    "optionsType": 1,
                    "value": "宝宝是抖音",
                    "key": 2
                },
                {
                    "optionsType": 1,
                    "value": "西瓜视频的最火达人",
                    "key": 3
                },
                {
                    "optionsType": 1,
                    "value": "请叫我映客",
                    "key": 4
                },
                {
                    "optionsType": 1,
                    "value": "斗鱼最仙主播",
                    "key": 5
                },
                {
                    "optionsType": 1,
                    "value": "微博",
                    "key": 6
                },
                {
                    "optionsType": 1,
                    "value": "豆瓣",
                    "key": 7
                },
                {
                    "optionsType": 1,
                    "value": "知乎大V说的就是我",
                    "key": 8
                },
                {
                    "optionsType": 1,
                    "value": "哎，我就是个素人",
                    "key": 9
                },
                {
                    "placeholder": "请具体描述您的观点",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "其他",
                    "key": 10
                }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        6
                    ],
                    "subTitle": "",
                    "isNeed": false,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "性价比不高",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "公区设计一般",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "公区功能少",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "样板间设计一般",
                            "key": 4
                        },
                        {
                            "optionsType": 1,
                            "value": "服务人员态度差",
                            "key": 5
                        },
                        {
                            "optionsType": 1,
                            "value": "安保措施差",
                            "key": 6
                        },
                        {
                            "optionsType": 1,
                            "value": "电器配置少",
                            "key": 7
                        },
                        {
                            "optionsType": 1,
                            "value": "电器品质差",
                            "key": 8
                        },
                        {
                            "optionsType": 1,
                            "value": "家具配置少",
                            "key": 9
                        },
                        {
                            "optionsType": 1,
                            "value": "家具品质差",
                            "key": 10
                        },
                        {
                            "placeholder": "请具体描述您的观点",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 11
                        }
                    ],
                    "checkLimit": 0
                },
                {
                    "area": [
                        7,
                        8
                    ],
                    "subTitle": "我们在哪些方面做出改善会让您更愿意推荐？",
                    "isNeed": false,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "改善服务人员态度",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "增加公区健身器材",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "增加公区娱乐设备",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "公区卫生需要提升",
                            "key": 4
                        },
                        {
                            "optionsType": 1,
                            "value": "楼道卫生需要提升",
                            "key": 5
                        },
                        {
                            "optionsType": 1,
                            "value": "增加安保措施",
                            "key": 6
                        },
                        {
                            "optionsType": 1,
                            "value": "增加电器配置",
                            "key": 7
                        },
                        {
                            "optionsType": 1,
                            "value": "增加家具配置",
                            "key": 8
                        },
                        {
                            "optionsType": 1,
                            "value": "丰富生活配套",
                            "key": 9
                        },
                        {
                            "optionsType": 1,
                            "value": "价格再优惠一些",
                            "key": 10
                        },
                        {
                            "optionsType": 1,
                            "value": "优化样板间设计风格",
                            "key": 11
                        },
                        {
                            "optionsType": 1,
                            "value": "优化公区设计风格",
                            "key": 12
                        },
                        {
                            "placeholder": "请具体描述您的观点",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 13
                        }
                    ],
                    "checkLimit": 0
                },
                {
                    "area": [
                        9,
                        10
                    ],
                    "subTitle": "请问您推荐的主要理由是什么？（多选）",
                    "isNeed": false,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "公寓位置好",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "公区超赞",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "房间漂亮",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "人员服务热情",
                            "key": 4
                        },
                        {
                            "optionsType": 1,
                            "value": "周边配套齐全",
                            "key": 5
                        },
                        {
                            "optionsType": 1,
                            "value": "安全有保障",
                            "key": 6
                        },
                        {
                            "optionsType": 1,
                            "value": "干净整洁",
                            "key": 7
                        },
                        {
                            "optionsType": 1,
                            "value": "性价比高",
                            "key": 8
                        },
                        {
                            "placeholder": "请具体描述您的观点",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 9
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 4,
            "questionTitle": "如果您的朋友或家人打算租房，您是否愿意将冠寓推荐给Ta？（0-10分制，标签可多选）",
            "questionNo": "4",
            "questionType": "score",
            "isNeed": false,
            "isShow": true
        },
        {
            "questionId": 5,
            "questionTitle": "冠寓的产品和服务最能打动您的地方或您最不满意的地方是什么？（填写框，不限字数）",
            "questionNo": "5",
            "isNeed": false,
            "wordLimit": 1000,
            "placeholder": "请具体描述您的观点",
            "questionType": "input",
            "isShow": true
        }
    ],
},
    "timestamp": 1534418194164
}
));






