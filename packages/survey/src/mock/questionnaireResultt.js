import Mock from 'mockjs';

Mock.mock(/questionnaireResultt$/, () => (
  {
    "code": 200,
    "status": "ok",
    "data": {
        "id": 26,
        "introduction": "您的反馈是我们成长的动力！",
        "questionnaireDesc": "冠寓入住体验调研已入住(90天)",
        "resultList": [
            {
            'options': [
              {
                'key': 1,
                'optionsType': 1,
                'value': "工作变更",
              }
            ],
            'questionId': 0,
            'questionType': "check",
            },
            {
                "score": 1,
                "questionId": 1,
                "options": [
                    {
                        "optionsType": 1,
                        "value": "服务热情",
                        "key": 0
                    }
                ],
                "questionType": "score"
            },
            {
                "score": 2,
                "questionId": 2,
                "options": [
                    {
                        "optionsType": 1,
                        "value": "公区整洁",
                        "key": 0
                    }
                ],
                "questionType": "score"
            },
            {
                "score": 7,
                "questionId": 3,
                "options": [
                    {
                        "optionsType": 1,
                        "value": "有门禁管控",
                        "key": 1
                    }
                ],
                "questionType": "score"
            },
            {
                "score": 4,
                "questionId": 4,
                "options": [
                    {
                        "optionsType": 1,
                        "value": "良心品质",
                        "key": 3
                    }
                ],
                "questionType": "score"
            },
            {
                "score": 10,
                "questionId": 5,
                "options": [
                    {
                        "optionsType": 1,
                        "value": "网速快",
                        "key": 0
                    }
                ],
                "questionType": "score"
            },
            {
                "score": 10,
                "questionId": 6,
                "options": [
                    {
                        "optionsType": 1,
                        "value": "周边配套齐全",
                        "key": 5
                    }
                ],
                "questionType": "score"
            },
            {
                "questionId": 7,
                "options": [
                    {
                        "value": "1次",
                        "key": 2
                    }
                ],
                "questionType": "radio"
            },
            {
                "score": 10,
                "questionId": 8,
                "options": [
                    {
                        "optionsType": 1,
                        "value": "参与感强",
                        "key": 1
                    }
                ],
                "questionType": "score"
            },
            {
                "input": "so good",
                "questionId": 9,
                "questionType": "input"
            }
        ],
        "surveyTitle": "冠寓入住体验调研",
        "questionList": [
            {
              "questionTitle": "请问您本次什么原因离开冠寓大家庭呢？",
              "questionId": 0,
              "questionNo": "1",
              "questionType": "check",
              "isNeed": true,
              "isShow": true,
              "checkList": [
                  {
                  "key": 0,
                  "optionsType": 1,
                  "value": "买房"
                }, {
                  "key": 1,
                  "optionsType": 1,
                  "value": "工作变更"
                }, {
                  "key": 2,
                  "optionsType": 1,
                  "value": "回老家"
                  }, {
                  "key": 3,
                  "optionsType": 1,
                  "value": "产品硬件原因"
                }, {
                  "key": 4,
                  "optionsType": 1,
                  "value": "软件服务原因"
                }, {
                  "key": 5,
                  "optionsType": 2,
                  "value": "其他"
                },
              ]
            },
            {
                "scoreList": [
                    {
                        "area": [
                            0,
                            7
                        ],
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "服务态度差",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "服务效率低",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "服务意识差",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "服务承诺未达成",
                                "key": 3
                            },
                            {
                                "optionsType": 2,
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
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "服务热情",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "服务响应快",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "服务意识强",
                                "key": 2
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 3
                            }
                        ],
                        "checkLimit": 0
                    }
                ],
                "questionId": 1,
                "questionTitle": "请您对门店运营官的服务进行评价。",
                "questionNo": "1",
                "isNeed": true,
                "questionType": "score",
                "isShow": true
            },
            {
                "scoreList": [
                    {
                        "area": [
                            0,
                            7
                        ],
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "公区脏乱",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "楼道脏乱",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "公寓内垃圾清理不及时",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "公区异味",
                                "key": 3
                            },
                            {
                                "optionsType": 1,
                                "value": "楼道异味",
                                "key": 4
                            },
                            {
                                "optionsType": 1,
                                "value": "电梯内部脏乱",
                                "key": 5
                            },
                            {
                                "optionsType": 1,
                                "value": "公共厨房脏乱",
                                "key": 6
                            },
                            {
                                "optionsType": 2,
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
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "公区整洁",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "楼道干净",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "公区无异味",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "公共厨房干净整洁",
                                "key": 3
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 4
                            }
                        ],
                        "checkLimit": 0
                    }
                ],
                "questionId": 2,
                "questionTitle": "请您对公寓内卫生环境进行评价。",
                "questionNo": "2",
                "isNeed": true,
                "questionType": "score",
                "isShow": true
            },
            {
                "scoreList": [
                    {
                        "area": [
                            0,
                            7
                        ],
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "没有保安",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "没有使用门禁",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "经常有陌生人出入",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "经常有快递出入",
                                "key": 3
                            },
                            {
                                "optionsType": 2,
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
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "保安认真负责",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "有门禁管控",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "对陌生人出入有管理",
                                "key": 2
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 3
                            }
                        ],
                        "checkLimit": 0
                    }
                ],
                "questionId": 3,
                "questionTitle": "请您对公寓内安保状况进行评价。",
                "questionNo": "3",
                "isNeed": true,
                "questionType": "score",
                "isShow": true
            },
            {
                "scoreList": [
                    {
                        "area": [
                            0,
                            7
                        ],
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "房间味道大",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "隔音差",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "墙体裂缝/脱落",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "墙体渗漏",
                                "key": 3
                            },
                            {
                                "optionsType": 1,
                                "value": "卫生间渗漏",
                                "key": 4
                            },
                            {
                                "optionsType": 1,
                                "value": "地板质量差",
                                "key": 5
                            },
                            {
                                "optionsType": 1,
                                "value": "门质量差",
                                "key": 6
                            },
                            {
                                "optionsType": 1,
                                "value": "窗户质量差",
                                "key": 7
                            },
                            {
                                "optionsType": 1,
                                "value": "门锁质量差",
                                "key": 8
                            },
                            {
                                "optionsType": 1,
                                "value": "马桶质量差",
                                "key": 9
                            },
                            {
                                "optionsType": 1,
                                "value": "台盆质量差",
                                "key": 10
                            },
                            {
                                "optionsType": 1,
                                "value": "下水道反味",
                                "key": 11
                            },
                            {
                                "optionsType": 1,
                                "value": "下水道经常堵塞",
                                "key": 12
                            },
                            {
                                "optionsType": 1,
                                "value": "插座质量差",
                                "key": 13
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 14
                            }
                        ],
                        "checkLimit": 0
                    },
                    {
                        "area": [
                            8,
                            10
                        ],
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "材料好",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "品质感佳",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "物超所值",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "良心品质",
                                "key": 3
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 4
                            }
                        ],
                        "checkLimit": 0
                    }
                ],
                "questionId": 4,
                "questionTitle": "请您对公寓内装修工程质量进行评价。",
                "questionNo": "4",
                "isNeed": true,
                "questionType": "score",
                "isShow": true
            },
            {
                "scoreList": [
                    {
                        "area": [
                            0,
                            7
                        ],
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "宽带经常断网",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "宽带网速不够",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "宽带网络信号不稳定",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "手机网络信号弱",
                                "key": 3
                            },
                            {
                                "optionsType": 2,
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
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "网速快",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "网络稳定",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "够用",
                                "key": 2
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 3
                            }
                        ],
                        "checkLimit": 0
                    }
                ],
                "questionId": 5,
                "questionTitle": "请您对公寓内网络质量进行评价。",
                "questionNo": "5",
                "isNeed": true,
                "questionType": "score",
                "isShow": true
            },
            {
                "scoreList": [
                    {
                        "area": [
                            0,
                            6
                        ],
                        "subTitle": "请问您不愿意推荐的主要原因是什么？（多选）",
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "交通不方便",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "周边餐饮配套少",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "周边购物配套少",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "房间味道大",
                                "key": 3
                            },
                            {
                                "optionsType": 1,
                                "value": "运营官态度差",
                                "key": 4
                            },
                            {
                                "optionsType": 1,
                                "value": "房间面积小",
                                "key": 5
                            },
                            {
                                "optionsType": 1,
                                "value": "公区面积小",
                                "key": 6
                            },
                            {
                                "optionsType": 1,
                                "value": "公区娱乐设备少",
                                "key": 7
                            },
                            {
                                "optionsType": 1,
                                "value": "公区健身器材少",
                                "key": 8
                            },
                            {
                                "optionsType": 1,
                                "value": "楼道卫生差",
                                "key": 9
                            },
                            {
                                "optionsType": 1,
                                "value": "公区卫生差",
                                "key": 10
                            },
                            {
                                "optionsType": 1,
                                "value": "安保措施差",
                                "key": 11
                            },
                            {
                                "optionsType": 1,
                                "value": "维修效率低",
                                "key": 12
                            },
                            {
                                "optionsType": 1,
                                "value": "水电费太高",
                                "key": 13
                            },
                            {
                                "optionsType": 1,
                                "value": "租金太贵",
                                "key": 14
                            },
                            {
                                "optionsType": 1,
                                "value": "房间隔音差",
                                "key": 15
                            },
                            {
                                "optionsType": 1,
                                "value": "周边噪音大",
                                "key": 16
                            },
                            {
                                "optionsType": 1,
                                "value": "施工质量差",
                                "key": 17
                            },
                            {
                                "optionsType": 1,
                                "value": "装修用材差",
                                "key": 18
                            },
                            {
                                "optionsType": 1,
                                "value": "家具配置少",
                                "key": 19
                            },
                            {
                                "optionsType": 1,
                                "value": "家电配置少",
                                "key": 20
                            },
                            {
                                "optionsType": 1,
                                "value": "缴费不方便",
                                "key": 21
                            },
                            {
                                "optionsType": 1,
                                "value": "没有什么社群活动",
                                "key": 22
                            },
                            {
                                "optionsType": 1,
                                "value": "网络质量差",
                                "key": 23
                            },
                            {
                                "optionsType": 1,
                                "value": "水电表计数不准确",
                                "key": 24
                            },
                            {
                                "optionsType": 1,
                                "value": "收纳空间少",
                                "key": 25
                            },
                            {
                                "optionsType": 1,
                                "value": "热水器容量低",
                                "key": 26
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 27
                            }
                        ],
                        "checkLimit": 0
                    },
                    {
                        "area": [
                            7,
                            8
                        ],
                        "subTitle": "我们在哪些方面做出改善会让您愿意推荐？（多选）",
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "改善运营官态度",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "增加公区健身器材",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "增加公区娱乐设备",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "公区卫生需要提升",
                                "key": 3
                            },
                            {
                                "optionsType": 1,
                                "value": "楼道卫生需要提升",
                                "key": 4
                            },
                            {
                                "optionsType": 1,
                                "value": "多组织公寓活动",
                                "key": 5
                            },
                            {
                                "optionsType": 1,
                                "value": "增加安保措施",
                                "key": 6
                            },
                            {
                                "optionsType": 1,
                                "value": "提升维修速度",
                                "key": 7
                            },
                            {
                                "optionsType": 1,
                                "value": "降低周边噪音影响",
                                "key": 8
                            },
                            {
                                "optionsType": 1,
                                "value": "降低公寓内噪音",
                                "key": 9
                            },
                            {
                                "optionsType": 1,
                                "value": "提升施工质量",
                                "key": 10
                            },
                            {
                                "optionsType": 1,
                                "value": "优化装修用材",
                                "key": 11
                            },
                            {
                                "optionsType": 1,
                                "value": "增加电器配置",
                                "key": 12
                            },
                            {
                                "optionsType": 1,
                                "value": "增加家具配置",
                                "key": 13
                            },
                            {
                                "optionsType": 1,
                                "value": "缴费更方便",
                                "key": 14
                            },
                            {
                                "optionsType": 1,
                                "value": "增加收纳空间",
                                "key": 15
                            },
                            {
                                "optionsType": 1,
                                "value": "增加热水器容量",
                                "key": 16
                            },
                            {
                                "optionsType": 1,
                                "value": "提升网络质量",
                                "key": 17
                            },
                            {
                                "optionsType": 1,
                                "value": "提升网络带宽",
                                "key": 18
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 19
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
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "公寓位置好",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "公区超赞",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "房间设计漂亮",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "公区设计漂亮",
                                "key": 3
                            },
                            {
                                "optionsType": 1,
                                "value": "运营官服务热情",
                                "key": 4
                            },
                            {
                                "optionsType": 1,
                                "value": "周边配套齐全",
                                "key": 5
                            },
                            {
                                "optionsType": 1,
                                "value": "公寓活动棒棒哒",
                                "key": 6
                            },
                            {
                                "optionsType": 1,
                                "value": "安全有保障",
                                "key": 7
                            },
                            {
                                "optionsType": 1,
                                "value": "干净整洁",
                                "key": 8
                            },
                            {
                                "optionsType": 1,
                                "value": "报修服务及时",
                                "key": 9
                            },
                            {
                                "optionsType": 1,
                                "value": "投诉处理及时",
                                "key": 10
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 11
                            }
                        ],
                        "checkLimit": 0
                    }
                ],
                "questionId": 6,
                "questionTitle": "如果您的朋友或家人有租房打算,您在多大程度上愿意将冠寓推荐给TA？",
                "questionNo": "6",
                "isNeed": true,
                "questionType": "score",
                "isShow": true
            },
            {
                "questionId": 7,
                "questionTitle": "请问您参与过公寓内的社群活动次数？",
                "questionNo": "7",
                "isNeed": true,
                "optionList": [
                    {
                        "checkShowId": [],
                        "value": "没有",
                        "key": 1
                    },
                    {
                        "checkShowId": [
                            8
                        ],
                        "value": "1次",
                        "key": 2
                    },
                    {
                        "checkShowId": [
                            8
                        ],
                        "value": "2次",
                        "key": 3
                    },
                    {
                        "checkShowId": [
                            8
                        ],
                        "value": "3次以上",
                        "key": 4
                    }
                ],
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
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "参与人太少",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "不是我喜欢的内容",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "活动时间安排的不好",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "活动环节参与性不强",
                                "key": 3
                            },
                            {
                                "optionsType": 1,
                                "value": "活动组织差",
                                "key": 4
                            },
                            {
                                "optionsType": 2,
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
                        "isNeed": true,
                        "checkList": [
                            {
                                "optionsType": 1,
                                "value": "主题有吸引力",
                                "key": 0
                            },
                            {
                                "optionsType": 1,
                                "value": "参与感强",
                                "key": 1
                            },
                            {
                                "optionsType": 1,
                                "value": "时间安排合理",
                                "key": 2
                            },
                            {
                                "optionsType": 1,
                                "value": "设计组织周密",
                                "key": 3
                            },
                            {
                                "optionsType": 2,
                                "value": "其他",
                                "key": 4
                            }
                        ],
                        "checkLimit": 0
                    }
                ],
                "questionId": 8,
                "questionTitle": "请您对社群活动进行评价。",
                "questionNo": "7.1",
                "isNeed": true,
                "questionType": "score",
                "isShow": false
            },
            {
                "questionId": 9,
                "questionTitle": "整体入住过程中，冠寓的产品和服务最能打动您的地方或您最不满意的地方是什么？（填写框，不限字数）",
                "questionNo": "8",
                "isNeed": false,
                "placeholder": "请具体描述您的观点",
                "wordLimit": 1000,
                "questionType": "input",
                "isShow": true
            }
        ],
        "termOfValidity": "2"
    },
    "msg": "",
    "msgDetail": "",
    "requestId": "38323fa0-600e-465d-90f3-87fd61a7aded",
    "startTime": 1570690880721
}
));






