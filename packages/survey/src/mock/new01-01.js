import Mock from 'mockjs';

Mock.mock(/new01-01$/, () => ({
	"status": "ok",
	"msg": "ok",
	"data": {
		"id": 16,
		"headPicPath": null,
		"hasTwoDimensionalCodeSharing": 1,
		"introduction": "您的反馈是我们成长的动力！",
		"questionnaireDesc": null,
		"surveyTitle": "冠寓预约看房体验调研",
		"entryAddressUrl": null,
		"termOfValidity": "0",
		"isOnlyCustomer": 1,
		"questionList": [{
				"questionTitle": "请您对本次看房服务体验进行评价？",
				"questionId": 1,
				"questionNo": "1",
				"questionType": "score",
				"isNeed": true,
				"isShow": true,
				"scoreList": [{
					"area": [0, 7],
					"isNeed": true,
					"checkLimit": 0,
					"checkList": [{
						"key": 0,
						"optionsType": 1,
						"value": "带看讲解不专业"
					}, {
						"key": 1,
						"optionsType": 1,
						"value": "服务人员态度差"
					}, {
						"key": 2,
						"optionsType": 1,
						"value": "公区卫生差"
					}, {
						"key": 3,
						"optionsType": 1,
						"value": "房间卫生差"
					}, {
						"key": 4,
						"optionsType": 1,
						"value": "公寓内有异味"
					}, {
						"key": 5,
						"optionsType": 1,
						"value": "样本间不吸引人"
					}, {
						"key": 6,
						"optionsType": 1,
						"value": "公区小"
					}, {
						"key": 7,
						"optionsType": 1,
						"value": "公区设施少"
					}, {
						"key": 8,
						"optionsType": 2,
						"value": "其他"
					}]
				}, {
					"area": [8, 10],
					"isNeed": true,
					"checkLimit": 0,
					"checkList": [{
						"key": 0,
						"optionsType": 1,
						"value": "讲解细致专业"
					}, {
						"key": 1,
						"optionsType": 1,
						"value": "服务人员态度好"
					}, {
						"key": 2,
						"optionsType": 1,
						"value": "公区卫生好"
					}, {
						"key": 3,
						"optionsType": 1,
						"value": "房间干净整洁"
					}, {
						"key": 4,
						"optionsType": 1,
						"value": "样本间吸引人"
					}, {
						"key": 5,
						"optionsType": 1,
						"value": "公区大"
					}, {
						"key": 6,
						"optionsType": 1,
						"value": "公区设施齐全"
					}, {
						"key": 7,
						"optionsType": 2,
						"value": "其他"
					}]
				}]
			}, {
				"questionTitle": "如果您的朋友或家人打算租房，您是否愿意将冠寓推荐给Ta？",
				"questionId": 2,
				"questionNo": "2",
				"questionType": "score",
				"isNeed": true,
				"isShow": true,
				"scoreList": [{
					"area": [0, 6],
					"isNeed": true,
					"checkLimit": 0,
					"checkList": [{
						"key": 0,
						"optionsType": 1,
						"value": "租金贵"
					}, {
						"key": 1,
						"optionsType": 1,
						"value": "公区设计一般"
					}, {
						"key": 2,
						"optionsType": 1,
						"value": "公区功能少"
					}, {
						"key": 3,
						"optionsType": 1,
						"value": "样板间设计一般"
					}, {
						"key": 4,
						"optionsType": 1,
						"value": "服务人员态度差"
					}, {
						"key": 5,
						"optionsType": 1,
						"value": "安保措施差"
					}, {
						"key": 6,
						"optionsType": 1,
						"value": "电器配置少"
					}, {
						"key": 7,
						"optionsType": 1,
						"value": "电器品质差"
					}, {
						"key": 8,
						"optionsType": 1,
						"value": "家具配置少"
					}, {
						"key": 9,
						"optionsType": 1,
						"value": "家具品质差"
					}, {
						"key": 10,
						"optionsType": 1,
						"value": "无租房需求"
					}, {
						"key": 11,
						"optionsType": 2,
						"value": "其他"
					}]
				}, {
					"area": [7, 8],
					"subTitle": "我们在哪些方面做出改善会让您更愿意推荐？",
					"isNeed": true,
					"checkLimit": 0,
					"checkList": [{
						"key": 0,
						"optionsType": 1,
						"value": "改善服务人员态度"
					}, {
						"key": 1,
						"optionsType": 1,
						"value": "增加公区健身器材"
					}, {
						"key": 2,
						"optionsType": 1,
						"value": "增加公区娱乐设备"
					}, {
						"key": 3,
						"optionsType": 1,
						"value": "公区卫生需要提升"
					}, {
						"key": 4,
						"optionsType": 1,
						"value": "楼道卫生需要提升"
					}, {
						"key": 5,
						"optionsType": 1,
						"value": "增加安保措施"
					}, {
						"key": 6,
						"optionsType": 1,
						"value": "增加电器配置"
					}, {
						"key": 7,
						"optionsType": 1,
						"value": "增加家具配置"
					}, {
						"key": 8,
						"optionsType": 1,
						"value": "丰富生活配套"
					}, {
						"key": 9,
						"optionsType": 1,
						"value": "价格再优惠一些"
					}, {
						"key": 10,
						"optionsType": 1,
						"value": "优化样板间设计风格"
					}, {
						"key": 11,
						"optionsType": 1,
						"value": "优化公区设计风格"
					}, {
						"key": 12,
						"optionsType": 2,
						"value": "其他"
					}]
				}, {
					"area": [9, 10],
					"subTitle": "请问您推荐的主要理由是什么？（多选）",
					"isNeed": true,
					"checkLimit": 0,
					"checkList": [{
						"key": 0,
						"optionsType": 1,
						"value": "公寓位置好"
					}, {
						"key": 1,
						"optionsType": 1,
						"value": "公区超赞"
					}, {
						"key": 2,
						"optionsType": 1,
						"value": "房间漂亮"
					}, {
						"key": 3,
						"optionsType": 1,
						"value": "人员服务热情"
					}, {
						"key": 4,
						"optionsType": 1,
						"value": "周边配套齐全"
					}, {
						"key": 5,
						"optionsType": 1,
						"value": "安全有保障"
					}, {
						"key": 6,
						"optionsType": 1,
						"value": "干净整洁"
					}, {
						"key": 7,
						"optionsType": 1,
						"value": "性价比高"
					}, {
						"key": 8,
						"optionsType": 2,
						"value": "其他"
					}]
				}]
			},
			{
				"questionId": 3,
				"questionTitle": "整体接待过程中，冠寓的产品和服务最能打动您的地方或您最不满意的地方是什么？（填写框，不限字数）",
				"questionNo": "3",
				"isNeed": false,
				"wordLimit": 1000,
				"placeholder": "请具体描述您的观点",
				"questionType": "input",
				"isShow": true
			}
		]
	},
	"timestamp": 1534418194164
}
));






