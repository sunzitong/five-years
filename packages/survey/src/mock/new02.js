

import Mock from 'mockjs';

Mock.mock(/new02$/, () => ({
  "status": "ok",
  "msg": "ok",
  "data": {
    "id": 16,
    "headPicPath": null,
    "hasTwoDimensionalCodeSharing":1,
    "introduction": "您的反馈是我们成长的动力！",
    "questionnaireDesc": null,
    "surveyTitle": "冠寓入住体验调研",
    "entryAddressUrl": null,
    "termOfValidity": "0",
    "questionList": [
          {
            "questionId": 1,
            "questionTitle": "下列长租公寓品牌，请问您知道或听说过哪些？",
            "questionNo": "1",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "魔方",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "冠寓",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "泊寓",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "YOU+",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "红璞",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "新派",
                    "key": 6
                },{
                    "optionsType": 1,
                    "value": "城家",
                    "key": 7
                },{
                    "optionsType": 1,
                    "value": "自如寓",
                    "key": 8
                },{
                    "optionsType": 1,
                    "value": "领域国际",
                    "key": 9
                },{
                    "optionsType": 1,
                    "value": "窝趣",
                    "key": 10
                },{
                    "optionsType": 1,
                    "value": "V+SPACE",
                    "key": 11
                },{
                    "optionsType": 1,
                    "value": "未来域",
                    "key": 12
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "其他",
                    "key": 13
                }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 2,
            "questionTitle": "对于一个长租公寓品牌，您觉得以下哪些方面表现比较重要？",
            "questionNo": "2",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "出行方便",
                    "key": 1
                  },{
                    "optionsType": 1,
                    "value": "配套完善",
                    "key": 2
                  },{
                    "optionsType": 1,
                    "value": "线上缴费",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "智能门禁，生活便利",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "丰富多样的社群活动",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "租户问题响应积极，处理有效",
                    "key": 6
                },{
                    "optionsType": 1,
                    "value": "房间干净隔音好",
                    "key": 7
                },{
                    "optionsType": 1,
                    "value": "保安对出入人员管控严格",
                    "key": 8
                },{
                    "optionsType": 1,
                    "value": "装修使用环保材料",
                    "key": 9
                },{
                    "optionsType": 1,
                    "value": "24小时智能安全监控",
                    "key": 10
                },{
                    "optionsType": 1,
                    "value": "wifi速度快",
                    "key": 11
                },{
                    "optionsType": 1,
                    "value": "家庭设施能满足使用",
                    "key": 12
                },{
                    "optionsType": 1,
                    "value": "租户素质高",
                    "key": 13
                },{
                    "optionsType": 1,
                    "value": "大企业出品有保障",
                    "key": 14
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "其他",
                    "key": 15
                }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 3,
            "questionTitle": "对于冠寓，下列描述最符合您对它的感觉4个标签是？",
            "questionNo": "3",
            "isNeed": true,
            "checkList": [
                {
                    "optionsType": 1,
                    "value": "真诚，值得信赖",
                    "key": 1
                },
                {
                    "optionsType": 1,
                    "value": "高端，有尊崇感",
                    "key": 2
                },
                {
                    "optionsType": 1,
                    "value": "专业，有品质感",
                    "key": 3
                },
                {
                    "optionsType": 1,
                    "value": "安心，有安全感",
                    "key": 4
                },
                {
                    "optionsType": 1,
                    "value": "便捷，省心",
                    "key": 5
                },
                {
                    "optionsType": 1,
                    "value": "有认同感，归属感",
                    "key": 6
                },
                {
                    "optionsType": 1,
                    "value": "温暖，贴心",
                    "key": 7
                },
                {
                    "optionsType": 1,
                    "value": "健康，舒适",
                    "key": 8
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "其他",
                    "key": 9
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
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "太冷淡",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "不温馨",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "太单调",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "毫无新意",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "太普通",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "太土",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "显冷清",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "俗不可耐",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "没有任何拍照欲望",
                            "key": 9
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 10
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
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "色彩明亮",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "年轻活泼",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "富有活力",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "富有感染力",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "紧贴潮流",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "时尚适合年轻人",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "休闲",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "简洁明快",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "紧跟潮流有网红趋势",
                            "key": 9
                        },{
                            "optionsType": 1,
                            "value": "温馨如家",
                            "key": 10
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 11
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 4,
            "questionTitle": "请您对公区的装修设计风格进行评分。",
            "questionNo": "4",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "面积小",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "娱乐设施少",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "健身器材少",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "形同虚设毫无兴趣，设施设备品质太差",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "缺少人性化的设施设计（比如插头等）",
                            "key": 5
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 6
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
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "设计人性化",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "功能实用",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "使用方便",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "设施齐全",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "功能齐全",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "趣味十足",
                            "key": 6
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 7
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 5,
            "questionTitle": "请您对公区的功能设计进行评分。",
            "questionNo": "5",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "不温馨",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "色彩搭配不好看",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "材质差",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "太简陋",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "勉勉强强",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "没什么感觉",
                            "key": 6
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 7
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
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "色彩搭配好看",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "有质感",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "小清新文艺范儿",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "温馨",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "人性化",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "有点家感觉",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "疯狂打call",
                            "key": 7
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 8
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 6,
            "questionTitle": "请您对室内装修风格进行评分。",
            "questionNo": "6",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "家具质量差",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "品牌差",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "拉帘衣柜不能接受",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "储藏空间太少",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "板材有异味",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "想全换掉",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "不太够用",
                            "key": 7
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 8
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
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "色彩协调",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "便于整理",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "品质好",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "简单实用",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "都喜欢",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "想买",
                            "key": 6
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 7
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 7,
            "questionTitle": "请您对室内家具配置进行评分。",
            "questionNo": "7",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "家电品牌差型号差",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "家电老旧不好用",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "家电能耗高",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "品牌档次低",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "质量差",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "热水器容量小",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "空调效果不好",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "冰箱太小",
                            "key": 8
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 9
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "配置全",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "满足基本需求",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "完全够用",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 8,
            "questionTitle": "请您对室内家电配置进行评分。",
            "questionNo": "8",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "房间味道大",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "隔音差",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "墙体裂缝/脱落",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "墙体渗漏",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "卫生间渗漏",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "地板质量差",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "门质量差",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "窗户质量差",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "门锁质量差",
                            "key": 9
                        },{
                            "optionsType": 1,
                            "value": "马桶质量差",
                            "key": 10
                        },{
                            "optionsType": 1,
                            "value": "台盆质量差",
                            "key": 11
                        },{
                            "optionsType": 1,
                            "value": "下水道反味",
                            "key": 12
                        },{
                            "optionsType": 1,
                            "value": "下水道经常堵塞",
                            "key": 13
                        },{
                            "optionsType": 1,
                            "value": "插座质量差",
                            "key": 14
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 15
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "材料好",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "品质感佳",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "物超所值",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "良心品质",
                            "key": 4
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 5
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 9,
            "questionTitle": "请您对室内装修工程质量进行评分。",
            "questionNo": "9",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "无信号也不能打电话",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "只能打电话没有4G",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "信号不稳定时有时无",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "4G上网速度慢",
                            "key": 4
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 5
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "网速快",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "信号稳定",
                            "key": 2
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 3
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 10,
            "questionTitle": "请您对公寓内手机网络质量进行评分。",
            "questionNo": "10",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "宽带经常断网",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "宽带网速不够",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "宽带网络信号不稳定",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "网速快",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "网络稳定",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "够用",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 11,
            "questionTitle": "请您对公寓内局域网络进行评分。",
            "questionNo": "11",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "服务态度差",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "服务效率低",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "服务意识差",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "服务承诺未达成",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "服务热情",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "服务响应快",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "服务意识强",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 12,
            "questionTitle": "请您对门店运营官的服务进行评分。",
            "questionNo": "12",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "公区脏乱",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "楼道脏乱",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "公寓内垃圾清理不及时",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "公区异味",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "楼道异味",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "电梯内部脏乱",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "公共厨房脏乱",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "入住空房卫生差",
                            "key": 8
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 9
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "公区整洁",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "楼道干净",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "公区无异味",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "公共厨房干净整洁",
                            "key": 4
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 5
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 13,
            "questionTitle": "请您对公寓内卫生环境进行评分。",
            "questionNo": "13",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "没有保安",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "没有使用门禁",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "经常有陌生人出入",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "经常有快递出入",
                            "key": 4
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 5
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "保安认真负责",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "有门禁管控",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "对陌生人出入有管理",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 14,
            "questionTitle": "请您对公寓内安保状况进行评分",
            "questionNo": "14",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "周边餐饮少",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "周边购物场所少",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "周边没有生活超市",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "周边娱乐场所少",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "没有公交地铁站",
                            "key": 5
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 6
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "就餐选择性多",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "购物方便",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "交通方便",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 15,
            "questionTitle": "请您对公寓周边生活配套进行评分。",
            "questionNo": "15",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "questionId": 16,
            "questionTitle": "请问您是否有过报事或投诉？",
            "questionNo": "16",
            "optionList": [
                {
                    "checkShowId": [
                      161
                    ],
                    "value": "是",
                    "key": 1
                },
                {
                    "checkShowId": [18],
                    "value": "否",
                    "key": 2
                }
            ],
            "isNeed": true,
            "questionType": "radio",
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "解决不了实际问题",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "服务效率低",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "服务态度差",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "服务效率高",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "有责任心",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "服务态度好",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 161,
            "questionTitle": "请您对最近一次参与的报事与投诉质量进行评分。",
            "questionNo": "16.1",
            "questionType": "score",
            "isNeed": true,
            "isShow": false
        },
        {
            "questionId": 17,
            "questionTitle": "请问您最近一个月参与过公寓内的社群活动的次数是？",
            "questionNo": "17",
            "optionList": [
                {
                    "checkShowId": [171],
                    "value": "1次",
                    "key": 1
                },
                {
                    "checkShowId": [171],
                    "value": "2次",
                    "key": 2
                },
                {
                    "checkShowId": [171],
                    "value": "3次",
                    "key": 3
                },
                {
                    "checkShowId": [],
                    "value": "从来没参加过",
                    "key": 4
                }
            ],
            "isNeed": true,
            "questionType": "radio",
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "参与人太少",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "不是我喜欢的内容",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "活动时间安排的不好",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "活动环节参与性不强",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "活动组织差",
                            "key": 5
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 6
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
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "主题有吸引力",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "参与感强",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "时间安排合理",
                            "key": 3
                        },
                        {
                            "optionsType": 1,
                            "value": "设计组织周密",
                            "key": 4
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 5
                        }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 171,
            "questionTitle": "请您对社群活动进行评分",
            "questionNo": "17.1",
            "questionType": "score",
            "isNeed": true,
            "isShow": false
        },
        {
            "questionId": 18,
            "questionTitle": "请问您希望公寓内举办那些社群活动",
            "questionNo": "18",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "棋牌",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "聚餐",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "游戏",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "交友",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "迎新",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "技能培训",
                    "key": 6
                },{
                    "optionsType": 1,
                    "value": "读书会",
                    "key": 7
                },{
                    "optionsType": 1,
                    "value": "户外运动",
                    "key": 8
                },{
                    "optionsType": 1,
                    "value": "旅游",
                    "key": 9
                },
                {
                    "placeholder": "请填写其他选项内容",
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
            "questionId": 19,
            "questionTitle": "除了目前现有的服务，以下哪类服务您还希望增加？",
            "questionNo": "19",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "保洁",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "软装服务",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "搬家",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "会员关联商户优惠",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "社保代缴",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "洗衣",
                    "key": 6
                },{
                    "optionsType": 1,
                    "value": "用车",
                    "key": 7
                },{
                    "optionsType": 1,
                    "value": "保险",
                    "key": 8
                },{
                    "optionsType": 1,
                    "value": "健康",
                    "key": 9
                },{
                    "optionsType": 1,
                    "value": "票务",
                    "key": 10
                },{
                    "optionsType": 1,
                    "value": "二收转买转卖",
                    "key": 11
                },{
                    "optionsType": 1,
                    "value": "购物平台引入",
                    "key": 12
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "其他",
                    "key": 13
                }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 20,
            "questionTitle": "除了现有公寓内的商户，您还希望增加哪些类型商户？",
            "questionNo": "20",
            "isNeed": true,
            "checkList": [
                {
                    "optionsType": 1,
                    "value": "超市",
                    "key": 1
                },
                {
                    "optionsType": 1,
                    "value": "食堂",
                    "key": 2
                },
                {
                    "optionsType": 1,
                    "value": "咖啡厅",
                    "key": 3
                },
                {
                    "optionsType": 1,
                    "value": "快餐店",
                    "key": 4
                },
                {
                    "optionsType": 1,
                    "value": "桌游厅",
                    "key": 5
                },
                {
                    "optionsType": 1,
                    "value": "培训活动",
                    "key": 6
                },
                {
                    "optionsType": 1,
                    "value": "鲜花礼品店",
                    "key": 7
                },
                {
                    "optionsType": 1,
                    "value": "网吧",
                    "key": 8
                },
                {
                    "optionsType": 1,
                    "value": "音乐餐吧",
                    "key": 9
                },
                {
                    "optionsType": 1,
                    "value": "宠物店",
                    "key": 10
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "其他",
                    "key": 11
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
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "出行不方便",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "配套不完善",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "线上缴费不便利",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "生活不便利",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "社群活动单一 ",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "租户问题响应不积极",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "处理无效",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "房间不干净",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "隔音不好",
                            "key": 9
                        },{
                            "optionsType": 1,
                            "value": "保安对出入人员管控不严格",
                            "key": 10
                        },{
                            "optionsType": 1,
                            "value": "装修使用材料不放心",
                            "key": 11
                        },{
                            "optionsType": 1,
                            "value": "无24小时智能安全监控",
                            "key": 12
                        },{
                            "optionsType": 1,
                            "value": "wifi速度慢",
                            "key": 13
                        },{
                            "optionsType": 1,
                            "value": "家庭设施不能满足使用",
                            "key": 14
                        },{
                            "optionsType": 1,
                            "value": "租户素质不高",
                            "key": 15
                        },{
                            "optionsType": 1,
                            "value": "企业品牌无保障",
                            "key": 16
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 17
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
                    "isNeed": true,
                    "checkList": [
                      {
                        "optionsType": 1,
                        "value": "出行方便",
                        "key": 1
                      },{
                        "optionsType": 1,
                        "value": "配套完善",
                        "key": 2
                      },{
                        "optionsType": 1,
                        "value": "线上缴费",
                        "key": 3
                    },{
                        "optionsType": 1,
                        "value": "智能门禁，生活便利",
                        "key": 4
                    },{
                        "optionsType": 1,
                        "value": "丰富多样的社群活动",
                        "key": 5
                    },{
                        "optionsType": 1,
                        "value": "租户问题响应积极，处理有效",
                        "key": 6
                    },{
                        "optionsType": 1,
                        "value": "房间干净隔音好",
                        "key": 7
                    },{
                        "optionsType": 1,
                        "value": "保安对出入人员管控严格",
                        "key": 8
                    },{
                        "optionsType": 1,
                        "value": "装修使用环保材料",
                        "key": 9
                    },{
                        "optionsType": 1,
                        "value": "24小时智能安全监控",
                        "key": 10
                    },{
                        "optionsType": 1,
                        "value": "wifi速度快",
                        "key": 11
                    },{
                        "optionsType": 1,
                        "value": "家庭设施能满足使用",
                        "key": 12
                    },{
                        "optionsType": 1,
                        "value": "租户素质高",
                        "key": 13
                    },{
                        "optionsType": 1,
                        "value": "大企业出品有保障",
                        "key": 14
                    },
                    {
                        "placeholder": "请填写其他选项内容",
                        "optionsType": 2,
                        "wordLimit": 100,
                        "value": "其他",
                        "key": 15
                    }
                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 21,
            "questionTitle": "请您对入住冠寓后整体的体验进行评分",
            "questionNo": "21",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        7
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "个人客观原因",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "性价比不好",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "交通不便利",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "服务态度不好",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "配置设备不完善",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "不安全",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "邻里关系不好",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "社群活动太少",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "周边餐饮配套少",
                            "key": 9
                        },{
                            "optionsType": 1,
                            "value": "周边购物配套少",
                            "key": 10
                        },{
                            "optionsType": 1,
                            "value": "房间味道大",
                            "key": 11
                        },{
                            "optionsType": 1,
                            "value": "运营官态度差",
                            "key": 12
                        },{
                            "optionsType": 1,
                            "value": "房间面积小",
                            "key": 13
                        },{
                            "optionsType": 1,
                            "value": "公区面积小",
                            "key": 14
                        },{
                            "optionsType": 1,
                            "value": "公区娱乐设备少",
                            "key": 15
                        },{
                            "optionsType": 1,
                            "value": "公区健身器材少",
                            "key": 16
                        },{
                            "optionsType": 1,
                            "value": "楼道卫生差",
                            "key": 17
                        },{
                            "optionsType": 1,
                            "value": "公区卫生差",
                            "key": 18
                        },{
                            "optionsType": 1,
                            "value": "安保措施差",
                            "key": 19
                        },{
                            "optionsType": 1,
                            "value": "维修效率低",
                            "key": 20
                        },{
                            "optionsType": 1,
                            "value": "水电费太高",
                            "key": 21
                        },{
                            "optionsType": 1,
                            "value": "租金太贵",
                            "key": 22
                        },{
                            "optionsType": 1,
                            "value": "房间隔音差",
                            "key": 23
                        },{
                            "optionsType": 1,
                            "value": "周边噪音大",
                            "key": 24
                        },{
                            "optionsType": 1,
                            "value": "施工质量差",
                            "key": 25
                        },{
                            "optionsType": 1,
                            "value": "装修用材差",
                            "key": 26
                        },{
                            "optionsType": 1,
                            "value": "家具配置少",
                            "key": 27
                        },{
                            "optionsType": 1,
                            "value": "家电配置少",
                            "key": 28
                        },{
                            "optionsType": 1,
                            "value": "缴费不方便",
                            "key": 29
                        },{
                            "optionsType": 1,
                            "value": "没有什么社群活动",
                            "key": 30
                        },{
                            "optionsType": 1,
                            "value": "网络质量差",
                            "key": 31
                        },{
                            "optionsType": 1,
                            "value": "水电表计数不准确",
                            "key": 32
                        },{
                            "optionsType": 1,
                            "value": "收纳空间少",
                            "key": 33
                        },{
                            "optionsType": 1,
                            "value": "热水器容量低",
                            "key": 34
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 35
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
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "性价比高",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "交通便利",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "公区功能设计好",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "房间设计漂亮",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "运营官服务热情",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "有安全保障",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "邻里关系好",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "周边配套齐全",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "公寓活动棒棒哒",
                            "key": 9
                        },{
                            "optionsType": 1,
                            "value": "安全有保障",
                            "key": 10
                        },{
                            "optionsType": 1,
                            "value": "干净整洁",
                            "key": 11
                        },{
                            "optionsType": 1,
                            "value": "报修服务及时",
                            "key": 12
                        },{
                            "optionsType": 1,
                            "value": "投诉处理及时",
                            "key": 13
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 14
                        }

                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 22,
            "questionTitle": "如果到期您有多大意愿继续租住冠寓？",
            "questionNo": "22",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        6
                    ],
                    "subTitle": "23.1 请问您不愿意推荐的主要原因是什么？（多选）",
                    "isNeed": true,
                    "checkList": [
                        {
                          "optionsType": 1,
                          "value": "交通不方便",
                          "key": 1
                      },{
                          "optionsType": 1,
                          "value": "周边餐饮配套少",
                          "key": 2
                      },{
                          "optionsType": 1,
                          "value": "周边购物配套少",
                          "key": 3
                      },{
                          "optionsType": 1,
                          "value": "房间味道大",
                          "key": 4
                      },{
                          "optionsType": 1,
                          "value": "运营官态度差",
                          "key": 5
                      },{
                          "optionsType": 1,
                          "value": "房间面积小",
                          "key": 6
                      },{
                          "optionsType": 1,
                          "value": "公区面积小",
                          "key": 7
                      },{
                          "optionsType": 1,
                          "value": "公区娱乐设备少",
                          "key": 8
                      },{
                          "optionsType": 1,
                          "value": "公区健身器材少",
                          "key": 9
                      },{
                          "optionsType": 1,
                          "value": "楼道卫生差",
                          "key": 10
                      },{
                          "optionsType": 1,
                          "value": "公区卫生差",
                          "key": 11
                      },{
                          "optionsType": 1,
                          "value": "安保措施差",
                          "key": 12
                      },{
                          "optionsType": 1,
                          "value": "维修效率低",
                          "key": 13
                      },{
                          "optionsType": 1,
                          "value": "水电费太高",
                          "key": 14
                      },{
                          "optionsType": 1,
                          "value": "租金太贵",
                          "key": 15
                      },{
                          "optionsType": 1,
                          "value": "房间隔音差",
                          "key": 16
                      },{
                          "optionsType": 1,
                          "value": "周边噪音大",
                          "key": 17
                      },{
                          "optionsType": 1,
                          "value": "施工质量差",
                          "key": 18
                      },{
                          "optionsType": 1,
                          "value": "装修用材差",
                          "key": 19
                      },{
                          "optionsType": 1,
                          "value": "家具配置少",
                          "key": 20
                      },{
                          "optionsType": 1,
                          "value": "家电配置少",
                          "key": 21
                      },{
                          "optionsType": 1,
                          "value": "缴费不方便",
                          "key": 22
                      },{
                          "optionsType": 1,
                          "value": "没有什么社群活动",
                          "key": 23
                      },{
                          "optionsType": 1,
                          "value": "网络质量差",
                          "key": 24
                      },{
                          "optionsType": 1,
                          "value": "水电表计数不准确",
                          "key": 25
                      },{
                          "optionsType": 1,
                          "value": "收纳空间少",
                          "key": 26
                      },{
                          "optionsType": 1,
                          "value": "热水器容量低",
                          "key": 27
                      },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 28
                        }
                    ],
                    "checkLimit": 0
                },
                {
                    "area": [
                        7,
                        8
                    ],
                    "subTitle": "23.1 我们在哪些方面做出改善会让您愿意推荐？（多选）",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "改善运营官态度",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "增加公区健身器材",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "增加公区娱乐设备",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "公区卫生需要提升",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "楼道卫生需要提升",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "多组织公寓活动",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "增加安保措施",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "提升维修速度",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "降低周边噪音影响",
                            "key": 9
                        },{
                            "optionsType": 1,
                            "value": "降低公寓内噪音",
                            "key": 10
                        },{
                            "optionsType": 1,
                            "value": "提升施工质量",
                            "key": 11
                        },{
                            "optionsType": 1,
                            "value": "优化装修用材",
                            "key": 12
                        },{
                            "optionsType": 1,
                            "value": "增加电器配置",
                            "key": 13
                        },{
                            "optionsType": 1,
                            "value": "增加家具配置",
                            "key": 14
                        },{
                            "optionsType": 1,
                            "value": "缴费更方便",
                            "key": 15
                        },{
                            "optionsType": 1,
                            "value": "增加收纳空间",
                            "key": 16
                        },{
                            "optionsType": 1,
                            "value": "增加热水器容量",
                            "key": 17
                        },{
                            "optionsType": 1,
                            "value": "提升网络质量",
                            "key": 18
                        },{
                            "optionsType": 1,
                            "value": "提升网络带宽",
                            "key": 19
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 20
                        }

                    ],
                    "checkLimit": 0
                },
                {
                    "area": [
                        9,
                        10
                    ],
                    "subTitle": "23.1 请问您推荐的主要理由是什么？（多选）",
                    "isNeed": true,
                    "checkList": [
                          {
                            "optionsType": 1,
                            "value": "公寓位置好",
                            "key": 1
                        },{
                            "optionsType": 1,
                            "value": "公区超赞",
                            "key": 2
                        },{
                            "optionsType": 1,
                            "value": "房间设计漂亮",
                            "key": 3
                        },{
                            "optionsType": 1,
                            "value": "公区设计漂亮",
                            "key": 4
                        },{
                            "optionsType": 1,
                            "value": "运营官服务热情",
                            "key": 5
                        },{
                            "optionsType": 1,
                            "value": "周边配套齐全",
                            "key": 6
                        },{
                            "optionsType": 1,
                            "value": "公寓活动棒棒哒",
                            "key": 7
                        },{
                            "optionsType": 1,
                            "value": "安全有保障",
                            "key": 8
                        },{
                            "optionsType": 1,
                            "value": "干净整洁",
                            "key": 9
                        },{
                            "optionsType": 1,
                            "value": "报修服务及时",
                            "key": 10
                        },{
                            "optionsType": 1,
                            "value": "投诉处理及时",
                            "key": 11
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 12
                        }

                    ],
                    "checkLimit": 0
                }
            ],
            "questionId": 23,
            "questionTitle": "如果您的朋友或家人有租房打算，您在多大程度上愿意将冠寓推荐给TA？（0分表示非常不愿意，10分表示非常愿意）",
            "questionNo": "23",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "questionId": 24,
            "questionTitle": "如有其他建议，请您提出：",
            "questionNo": "24",
            "isNeed": false,
            "wordLimit": 1000,
            "placeholder": "请填写其他选项内容",
            "questionType": "input",
            "isShow": true
        }
    ]
},
    "timestamp": 1534418194164
}
));






