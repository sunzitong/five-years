import Mock from 'mockjs';

Mock.mock(/new01-02$/, () => ({
	"status": "ok",
	"msg": "ok",
	"data": {
		"id": 16,
		"headPicPath": null,
		"hasTwoDimensionalCodeSharing": 1,
		"introduction": "您的反馈是我们成长的动力！",
		"questionnaireDesc": null,
		"surveyTitle": "冠寓入住体验调研",
		"entryAddressUrl": null,
		"termOfValidity": "0",
		"isOnlyCustomer": 1,
		"questionList": [{
				"questionId": 1,
				"questionTitle": "请问您对搬入时房间内卫生环境是否满意？",
				"questionNo": "1",
				"questionType": "score",
				"isNeed": false,
				"isShow": true,
				"scoreList": [{
						"area": [
							0,
							7
						],
						"subTitle": "",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "地面脏乱",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "有异味",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "家具乱摆放",
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
						"checkList": [{
								"optionsType": 1,
								"value": "干净整洁",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "无异味",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "家具摆放整齐",
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
				]
			},
			{
				"questionId": 2,
				"questionTitle": "请您对室内家具配置进行评价？",
				"questionNo": "2",
				"questionType": "score",
				"isNeed": false,
				"isShow": true,
				"scoreList": [{
						"area": [
							0,
							7
						],
						"subTitle": "",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "家具质量差",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "品牌差",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "拉帘衣柜不能接受",
								"key": 3
							}, {
								"optionsType": 1,
								"value": "储藏空间太少",
								"key": 4
							}, {
								"optionsType": 1,
								"value": "不温馨",
								"key": 5
							}, {
								"optionsType": 1,
								"value": "缺乏生活气息",
								"key": 6
							}, {
								"optionsType": 1,
								"value": "板材有异味",
								"key": 7
							}, {
								"optionsType": 1,
								"value": "想全换掉",
								"key": 8
							}, {
								"optionsType": 1,
								"value": "不太够用",
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
						"checkLimit": 0
					},
					{
						"area": [
							8,
							10
						],
						"subTitle": "我们在哪些方面做出改善会让您更愿意推荐？",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "色彩协调",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "便于整理",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "品质好",
								"key": 3
							}, {
								"optionsType": 1,
								"value": "简单实用",
								"key": 4
							}, {
								"optionsType": 1,
								"value": "都喜欢",
								"key": 5
							}, {
								"optionsType": 1,
								"value": "想买",
								"key": 6
							},
							{
								"placeholder": "请具体描述您的观点",
								"optionsType": 2,
								"wordLimit": 100,
								"value": "其他",
								"key": 7
							}
						],
						"checkLimit": 0
					}
				]
			},
			{
				"questionId": 3,
				"questionTitle": "请您对户内家电配置进行评价？",
				"questionNo": "3",
				"questionType": "score",
				"isNeed": false,
				"isShow": true,
				"scoreList": [{
						"area": [
							0,
							7
						],
						"subTitle": "",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "家电品牌差型号差",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "家电老旧不好用",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "家电能耗高",
								"key": 3
							}, {
								"optionsType": 1,
								"value": "品牌档次低",
								"key": 4
							}, {
								"optionsType": 1,
								"value": "质量差",
								"key": 5
							}, {
								"optionsType": 1,
								"value": "热水器容量小",
								"key": 6
							}, {
								"optionsType": 1,
								"value": "空调效果不好",
								"key": 7
							}, {
								"optionsType": 1,
								"value": "冰箱太小",
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
					},
					{
						"area": [
							8,
							10
						],
						"subTitle": "",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "配置全",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "满足基本需求",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "完全够用",
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
				]
			},
			{
				"questionId": 4,
				"questionTitle": "如果您的朋友或家人有租房打算，您在多大程度上愿意将冠寓推荐给TA？",
				"questionNo": "4",
				"questionType": "score",
				"isNeed": false,
				"isShow": true,
				"scoreList": [{
						"area": [
							0,
							6
						],
						"subTitle": "请问您不愿意推荐的主要原因是什么？",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "交通不方便",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "周边餐饮配套少",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "周边购物配套少",
								"key": 3
							}, {
								"optionsType": 1,
								"value": "房间味道大",
								"key": 4
							}, {
								"optionsType": 1,
								"value": "运营官态度差",
								"key": 5
							}, {
								"optionsType": 1,
								"value": "房间面积小",
								"key": 6
							}, {
								"optionsType": 1,
								"value": "公区面积小",
								"key": 7
							}, {
								"optionsType": 1,
								"value": "公区娱乐设备少",
								"key": 8
							}, {
								"optionsType": 1,
								"value": "公区健身器材少",
								"key": 9
							}, {
								"optionsType": 1,
								"value": "楼道卫生差",
								"key": 10
							}, {
								"optionsType": 1,
								"value": "公区卫生差",
								"key": 11
							}, {
								"optionsType": 1,
								"value": "安保措施差",
								"key": 12
							}, {
								"optionsType": 1,
								"value": "维修效率低",
								"key": 13
							}, {
								"optionsType": 1,
								"value": "水电费太高",
								"key": 14
							}, {
								"optionsType": 1,
								"value": "租金太贵",
								"key": 15
							}, {
								"optionsType": 1,
								"value": "房间隔音差",
								"key": 16
							}, {
								"optionsType": 1,
								"value": "周边噪音大",
								"key": 17
							}, {
								"optionsType": 1,
								"value": "施工质量差",
								"key": 18
							}, {
								"optionsType": 1,
								"value": "装修用材差",
								"key": 19
							}, {
								"optionsType": 1,
								"value": "家具配置少",
								"key": 20
							}, {
								"optionsType": 1,
								"value": "家电配置少",
								"key": 21
							}, {
								"optionsType": 1,
								"value": "缴费不方便",
								"key": 22
							}, {
								"optionsType": 1,
								"value": "没有什么社群活动",
								"key": 23
							}, {
								"optionsType": 1,
								"value": "网络质量差",
								"key": 24
							}, {
								"optionsType": 1,
								"value": "水电表计数不准确",
								"key": 25
							}, {
								"optionsType": 1,
								"value": "收纳空间少",
								"key": 26
							}, {
								"optionsType": 1,
								"value": "热水器容量低",
								"key": 27
							},
							{
								"placeholder": "请具体描述您的观点",
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
						"subTitle": "我们在哪些方面做出改善会让您愿意推荐？（多选）",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "改善运营官态度",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "增加公区健身器材",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "增加公区娱乐设备",
								"key": 3
							}, {
								"optionsType": 1,
								"value": "公区卫生需要提升",
								"key": 4
							}, {
								"optionsType": 1,
								"value": "楼道卫生需要提升",
								"key": 5
							}, {
								"optionsType": 1,
								"value": "多组织公寓活动",
								"key": 6
							}, {
								"optionsType": 1,
								"value": "增加安保措施",
								"key": 7
							}, {
								"optionsType": 1,
								"value": "提升维修速度",
								"key": 8
							}, {
								"optionsType": 1,
								"value": "降低周边噪音影响",
								"key": 9
							}, {
								"optionsType": 1,
								"value": "降低公寓内噪音",
								"key": 10
							}, {
								"optionsType": 1,
								"value": "提升施工质量",
								"key": 11
							}, {
								"optionsType": 1,
								"value": "优化装修用材",
								"key": 12
							}, {
								"optionsType": 1,
								"value": "增加电器配置",
								"key": 13
							}, {
								"optionsType": 1,
								"value": "增加家具配置",
								"key": 14
							}, {
								"optionsType": 1,
								"value": "缴费更方便",
								"key": 15
							}, {
								"optionsType": 1,
								"value": "增加收纳空间",
								"key": 16
							}, {
								"optionsType": 1,
								"value": "增加热水器容量",
								"key": 17
							}, {
								"optionsType": 1,
								"value": "提升网络质量",
								"key": 18
							}, {
								"optionsType": 1,
								"value": "提升网络带宽",
								"key": 19
							},
							{
								"placeholder": "请具体描述您的观点",
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
						"subTitle": "请问您推荐的主要理由是什么？（多选）",
						"isNeed": false,
						"checkList": [{
								"optionsType": 1,
								"value": "公寓位置好",
								"key": 1
							}, {
								"optionsType": 1,
								"value": "公区超赞",
								"key": 2
							}, {
								"optionsType": 1,
								"value": "房间设计漂亮",
								"key": 3
							}, {
								"optionsType": 1,
								"value": "公区设计漂亮",
								"key": 4
							}, {
								"optionsType": 1,
								"value": "运营官服务热情",
								"key": 5
							}, {
								"optionsType": 1,
								"value": "周边配套齐全",
								"key": 6
							}, {
								"optionsType": 1,
								"value": "公寓活动棒棒哒",
								"key": 7
							}, {
								"optionsType": 1,
								"value": "安全有保障",
								"key": 8
							}, {
								"optionsType": 1,
								"value": "干净整洁",
								"key": 9
							}, {
								"optionsType": 1,
								"value": "报修服务及时",
								"key": 10
							}, {
								"optionsType": 1,
								"value": "投诉处理及时",
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
						"checkLimit": 0
					}
				]
			},
			{
				"questionId": 5,
				"questionTitle": "整体入住过程中，冠寓的产品和服务最能打动您的地方或您最不满意的地方是什么？（填写框，不限字数）",
				"questionNo": "5",
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






