/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113546
 *
 * 门店基本信息模块
 * @createBy zhangyao03
 * @updateAt 2021/10/9 10:9:43
 * @method GET
 */

exports.path =
  "/analysis/bigScreen/projectBoard/basicInformation/projectBaseInfo";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    phId: "L-CD00-CDCDL00.01", //项目分期id
    transactionModel: "重资产", //资产类型描述
    transactionModelType: "HeavyAsset", //资产类型
    openRoomNum: 111, //开业间数
    businessArea: 111.2, //底商面积
    workstationNum: 111, //工位数
    parkingSpaceNum: 111, //车位个数
    valueAddedPoint: 111, //增值点位
    acquireTime: "2021-01-01", //获取时间（重资产用）
    investmentLink:
      "https://uat-longtou-c3.longfor.com/hub/#/areaProjectInvestment?projectCode=CN20210723001&command=CommandBunker&token=TVRZek1qUTBOemd4T1RnMU9UQTBNV1l5TnpObExUUm1NRFF0TkRaaU5pMWhPVEl3TFdZNU1qRTVZVFk0T1RjM1pBPT0%3D", //投资任务书链接 https://uat-longtou-c3.longfor.com/hub/#/areaProjectInvestment?projectCode=CN1101000020180402242470&command=CommandBunker&token=TVRZek1qUTBOemd4T1RnMU9UQTBNV1l5TnpObExUUm1NRFF0TkRaaU5pMWhPVEl3TFdZNU1qRTVZVFk0T1RjM1pBPT0%3D
    customerProperty: "重庆三快", //客户性质
    cooperationMode: "委托管理", //合作模式
    rentalArea: 123.2, //租赁面积(m2)
    useLandNature: "", //用地性质
    propertyRightNature: "", //产权性质,
    years: 10, //年限
    projectStartTime: "2021-01-01", //开始时间
    projectEndTime: "2031-01-01", //结束时间
  },
};
