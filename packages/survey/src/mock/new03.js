

import Mock from 'mockjs';

Mock.mock(/new03$/, () => ({
  "status": "ok",
  "msg": "ok",
  "data": {
    "id": 16,
    "headPicPath": null,
    "hasTwoDimensionalCodeSharing":1,
    "introduction": "Thank you for filling out the Net Promoter Score (NPS) Survey. Your prompt reply will be highly appreciated by us .It is anonymous and confidential",
    "questionnaireDesc": null,
    "surveyTitle": "冠寓NPS调研问卷 NPS and Follow-up Questionnaire",
    "entryAddressUrl": null,
    "termOfValidity": "0",
    "questionList": [
          {
            "questionId": 1,
            "questionTitle": "请问您知道或听说过以下哪个品牌？Which brand(s) are you familiar with?",
            "questionNo": "1",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "（MoFang）",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "(GUANYU)",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "(PORT)",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "YOU+",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "(HOMEPLUS)",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "(CYPA)",
                    "key": 6
                },{
                    "optionsType": 1,
                    "value": "（CJIA）",
                    "key": 7
                },{
                    "optionsType": 1,
                    "value": "(ZIROOM)",
                    "key": 8
                },{
                    "optionsType": 1,
                    "value": "(WOWQU)",
                    "key": 9
                },{
                    "optionsType": 1,
                    "value": "V+SPACE",
                    "key": 10
                },{
                    "optionsType": 1,
                    "value": "(COMING SPACE)",
                    "key": 11
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "other",
                    "key": 12
                }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 2,
            "questionTitle": "如果您租住公寓以下哪些因素比较重要？ Which factors are the most important when you choice one apartment.",
            "questionNo": "2",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "Convenient transportation, complete supporting facilities",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "Online payment, intelligent access control, life convenience",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "Diverse community activities",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "Quick and effective response to tenant problems",
                    "key": 8
                },{
                    "optionsType": 1,
                    "value": "The rooms are clean and sound proof.",
                    "key": 10
                },{
                    "optionsType": 1,
                    "value": "Strict security control of entry and exit personnel.",
                    "key": 11
                },{
                    "optionsType": 1,
                    "value": "Eco-friendly materials for decoration",
                    "key": 12
                },{
                    "optionsType": 1,
                    "value": "24 hours intelligent safety monitoring",
                    "key": 13
                },{
                    "optionsType": 1,
                    "value": "Fast WiFi",
                    "key": 14
                },{
                    "optionsType": 1,
                    "value": "Furniture are able to meet the needs.",
                    "key": 15
                },{
                    "optionsType": 1,
                    "value": "Famous enterprises produce guarantee.",
                    "key": 19
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "other",
                    "key": 20
                }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 3,
            "questionTitle": "您觉得冠寓符合以下哪种气质? Which of the following qualities is desirable in a GUANYU?",
            "questionNo": "3",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "Sincere and trustworthy",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "Premium and respectable",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "Professional and good value ",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "Have sense of security.",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "Convenient and free from worry",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "Have sense of belonging.",
                    "key": 6
                },{
                    "optionsType": 1,
                    "value": "Warm and intimate",
                    "key": 7
                },{
                    "optionsType": 1,
                    "value": "Healthy and comfortable",
                    "key": 8
                },
                {
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "other",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 4,
            "questionTitle": "公寓公区设计风格很好满足了您对房间设计上的需求。You are satisfied with the design type of public area。",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 5,
            "questionTitle": "公寓公区功能设计很好满足了您对生活上的需求。You are satisfied with the function of the public area？",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 6,
            "questionTitle": "公寓房间设计风格很好满足了您对房间设计上的需求。You are satisfied with the room style ？",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 7,
            "questionTitle": "公寓房间功能设计很好满足了您对生活上的需求。The room function design meets your needs.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 8,
            "questionTitle": "公寓房间配置的家电很好满足了您对生活上的需求。The appliances in the room meets your needs.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 9,
            "questionTitle": "房间工程质量很好。The project quality is of good.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 10,
            "questionTitle": "公寓内手机信号很好。The mobile phone signal in the apartment is very good.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 11,
            "questionTitle": "公寓内网络质量很好。The quality of the network in the apartment is very good.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 12,
            "questionTitle": "运营官服务很好满足了您的服务请求。The housekeep meets your requirements.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 13,
            "questionTitle": "公寓卫生很好满足了您的服务品质需求。Hygienic quality meets your requirements.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 14,
            "questionTitle": "公寓安保很好满足了您对安全的需求。The security meets your residential safety needs.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 15,
            "questionTitle": "公寓周边生活配套满足了您对生活上的需求。The apartment surrounding life meets your requirements.",
            "questionNo": "15",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "questionId": 16,
            "questionTitle": "请问您是否有过申请维修或投诉？Have you ever applied for maintenance or complaint?",
            "questionNo": "16",
            "optionList": [
                {
                    "checkShowId": [161],
                    "value": "Yes ",
                    "key": 1
                },
                {
                    "checkShowId": [],
                    "value": "No",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 161,
            "questionTitle": "请您对最近一次申请维修或是投诉质量进行评价。Please evaluate the quality of the latest application for maintenance or complaint.",
            "questionNo": "16.1",
            "questionType": "score",
            "isNeed": true,
            "isShow": false
        },
        {
            "questionId": 17,
            "questionTitle": "请问您最近一个月参与过公寓内的社群活动的次数是？How many times have you participated in community activities in your apartment last month?",
            "questionNo": "17",
            "optionList": [
                {
                    "checkShowId": [171],
                    "value": "Once ",
                    "key": 1
                },
                {
                    "checkShowId": [171],
                    "value": "Twice",
                    "key": 2
                },
                {
                    "checkShowId": [171],
                    "value": "Thrice or more",
                    "key": 3
                },
                {
                    "checkShowId": [],
                    "value": "Never",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 171,
            "questionTitle": "公寓组织的活动很好满足了您对社交娱乐的需求。The activities of the apartment organization meet your needs for social entertainment.",
            "questionNo": "17.1",
            "questionType": "score",
            "isNeed": true,
            "isShow": false
        },
        {
            "questionId": 18,
            "questionTitle": "请问您希望公寓内举办那些活动? What kind of activities do you like in Apartments?",
            "questionNo": "18",
            "isNeed": true,
            "checkList": [
                  {
                      "optionsType": 1,
                      "value": "Chess",
                      "key": 1
                  },{
                      "optionsType": 1,
                      "value": "Dinner party",
                      "key": 2
                  },{
                      "optionsType": 1,
                      "value": "Play game",
                      "key": 3
                  },{
                      "optionsType": 1,
                      "value": "Reading Society",
                      "key": 4
                  },{
                      "optionsType": 1,
                      "value": "Outdoor sport",
                      "key": 5
                  },{
                      "optionsType": 1,
                      "value": "Tourism",
                      "key": 6
                  },{
                      "placeholder": "请填写其他选项内容",
                      "optionsType": 2,
                      "wordLimit": 100,
                      "value": "other",
                      "key": 7
                  }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 19,
            "questionTitle": "除了目前现有的服务，以下哪类服务您还希望增加？ Which of the following services would you like to improve?",
            "questionNo": "19",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "Cleaning service",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "Soft service",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "House-moving",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "Ticketing",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "Insurance",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "Laundry service",
                    "key": 6
                },{
                    "optionsType": 1,
                    "value": "auto service",
                    "key": 7
                },{
                    "optionsType": 1,
                    "value": "Medical service",
                    "key": 8
                },{
                    "optionsType": 1,
                    "value": "Online shopping ",
                    "key": 9
                },{
                  "placeholder": "请填写其他选项内容",
                  "optionsType": 2,
                  "wordLimit": 100,
                  "value": "other",
                  "key": 10
              }
            ],
            "checkLimit": 0,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 20,
            "questionTitle": "除了现有公寓内的商户，您还希望增加哪些类型商户？ What type of extra service do you wish to additional?",
            "questionNo": "20",
            "isNeed": true,
            "checkList": [
                  {
                    "optionsType": 1,
                    "value": "Supermarket",
                    "key": 1
                },{
                    "optionsType": 1,
                    "value": "Fast food restaurant",
                    "key": 2
                },{
                    "optionsType": 1,
                    "value": "Café",
                    "key": 3
                },{
                    "optionsType": 1,
                    "value": "Table swimming hall",
                    "key": 4
                },{
                    "optionsType": 1,
                    "value": "Flower/Gift shop",
                    "key": 5
                },{
                    "optionsType": 1,
                    "value": "Pet shop",
                    "key": 6
                },{
                    "placeholder": "请填写其他选项内容",
                    "optionsType": 2,
                    "wordLimit": 100,
                    "value": "other",
                    "key": 7
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 21,
            "questionTitle": "请您对冠寓的整体满意度作出评价。Please evaluate your overall satisfaction with GUANYU.",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 22,
            "questionTitle": "如果到期您有多大意愿继续租住冠寓？Are you willing to continue to rent GUANYU?",
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
                        10
                    ],
                    "checkList": [
                      {
                          "placeholder": "请具体描述您的观点",
                          "optionsType": 2,
                          "wordLimit": 100,
                          "value": "other",
                          "key": 1
                      }
                    ]
                }
            ],
            "questionId": 23,
            "questionTitle": "您向朋友或同事推荐冠寓的可能性有多大？How likely are you to recommend GUANYU to your colleagues or friends?",
            "questionNo": "23",
            "questionType": "score",
            "isNeed": true,
            "isShow": true
        },
        {
            "questionId": 24,
            "questionTitle": "如有其他建议，请您提出：Kindly let us know if you have any other suggestions:",
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






