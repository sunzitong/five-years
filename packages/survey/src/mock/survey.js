import Mock from 'mockjs';

Mock.mock(/survey$/, () => ({
  "status": "ok",
  "msg": "ok",
  "data": {
    "id": 16,
    "headPicPath": null,
    'hasTwoDimensionalCodeSharing':1,
    "introduction": null,
    "questionnaireDesc": null,
    "isOnlyCustomer": true,
    // "userCode": true,
    "surveyTitle": "新增问卷名字001",
    "questionList": [
        {
            "questionId": 1,
            "questionTitle": "您此次看房是否提前进行了预约",
            "questionNo": "1",
            "optionList": [
                {
                    "checkShowId": [
                        11,
                        12
                    ],
                    "value": "是",
                    "key": 1
                },
                {
                    "checkShowId": [13],
                    "value": "否",
                    "key": 2
                }
            ],
            "isNeed":false,
            "questionType": "radio",
            "isShow": true
        },
        {
            "questionId": 11,
            "questionTitle": "请您对本次看房预约流程进行打分",
            "questionNo": "1.1",
            "questionType": "score",
            "isNeed":false,
            "isShow": false,
            "scoreList": [
                {
                    "area": [
                        0,
                        6
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkLimit": 3,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ]
                },
                {
                    "area": [
                        7,
                        10
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkLimit": 3,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "房间有屎222蟑螂",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 3
                        },
                        {
                            "placeholder": "请填写其他选项内容",
                            "optionsType": 2,
                            "wordLimit": 100,
                            "value": "其他",
                            "key": 4
                        }
                    ]
                }
            ]
        },
        {
          "scoreList": [
              {
                  "area": [
                      0,
                      6
                  ],
                  "subTitle": "",
                  "isNeed": true,
                  "checkList": [
                      {
                          "optionsType": 1,
                          "value": "房间有屎蟑螂",
                          "key": 1
                      },
                      {
                          "optionsType": 1,
                          "value": "房间有屎蟑螂",
                          "key": 2
                      },
                      {
                          "optionsType": 1,
                          "value": "房间有屎蟑螂",
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
                  "checkLimit": 3
              },
              {
                  "area": [
                      7,
                      10
                  ],
                  "subTitle": "",
                  "isNeed": true,
                  "checkList": [
                      {
                          "optionsType": 1,
                          "value": "房间有屎蟑螂",
                          "key": 1
                      },
                      {
                          "optionsType": 1,
                          "value": "房间有屎蟑螂",
                          "key": 2
                      },
                      {
                          "optionsType": 1,
                          "value": "房间有屎蟑螂",
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
                  "checkLimit": 3
              }
          ],
          "questionId": 12,
          "questionTitle": "请您对本次看房预约流程进行打分",
          "questionNo": "1.2",
          "questionType": "score",
          "isNeed":false,
          "isShow": false
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        6
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
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
                    "checkLimit": 3
                },
                {
                    "area": [
                        7,
                        10
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
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
                    "checkLimit": 3
                }
            ],
            "questionId": 13,
            "questionTitle": "请您对本次看房预约流程进行打分",
            "questionNo": "1.3",
            "questionType": "score",
            "isNeed":false,
            "isShow": false
        },
        {
            "scoreList": [
                {
                    "area": [
                        0,
                        6
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
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
                    "checkLimit": 3
                },
                {
                    "area": [
                        7,
                        10
                    ],
                    "subTitle": "",
                    "isNeed": true,
                    "checkList": [
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 1
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
                            "key": 2
                        },
                        {
                            "optionsType": 1,
                            "value": "房间有屎蟑螂",
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
                    "checkLimit": 3
                }
            ],
            "questionId": 2,
            "questionTitle": "请您对本次看房预约流程进行打分",
            "questionNo": "2",
            "questionType": "score",
            "isNeed":false,
            "isShow": true
        },
        {
            "questionId": 3,
            "questionTitle": "本次看房服务体验打分(10分制,最多选3项)",
            "questionNo": "3",
            "isNeed": false,
            "checkList": [
                {
                    "optionsType": 1,
                    "value": "房间还有屎蟑螂",
                    "key": 1
                },
                {
                    "optionsType": 1,
                    "value": "房间还有屎蟑螂",
                    "key": 2
                },
                {
                    "optionsType": 1,
                    "value": "房间还有屎蟑螂",
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
            "checkLimit": 3,
            "questionType": "check",
            "isShow": true
        },
        {
            "questionId": 4,
            "questionTitle": "本次看房服务体验打分(10分制,最多选3项)",
            "questionNo": "4",
            "isNeed": false,
            "wordLimit": 100,
            "placeholder": "请填写其他选项内容",
            "questionType": "input",
            "isShow": true
        }
    ],
    "entryAddressUrl": null,
    "termOfValidity": "0"
},
    "timestamp": 1534418194164
}
));






