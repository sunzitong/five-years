/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114348
 *
 * 门店列表获取
 * @createBy baishiqiang
 * @updateAt 2021/9/13 16:5:6
 * @method GET
 */

exports.path = "/analysis/commandCabin/projectList";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: [
    {
      groupOrgId: 1, //国家组织ID
      groupName: "中国", //国家名称
      areaId: 10, //大区ID
      areaName: "华北区域", //大区名称
      regionId: 81, //地区ID
      regionName: "北京地区", //地区名称
      cityId: 1, //城市ID
      cityName: "北京", //城市名称
      projectId: 98, //门店ID
      projectName: "龙湖冠寓北京酒仙桥店", //门店名称
      phId: "L-BJ00-BJJXQ00.01", //分期ID
      optStatus: "Normal", //经营状态
      transactionModel: "MediumAsset",
      openMonth: 48, //开放时间
      orgId: 40005, //组织ID
      areaOrgId: 10001, //大区组织ID
      regionOrgId: 20001, //地区组织ID
      cityOrgId: 30003, //城市组织ID
    },
    {
      groupOrgId: 1,
      groupName: "全国",
      areaId: 14,
      areaName: "西南区域",
      regionId: 43,
      regionName: "成都地区",
      cityId: 235,
      cityName: "成都",
      projectId: 84,
      projectName: "龙湖冠寓成都时代店",
      phId: "L-CD00-CDSDT00.08",
      optStatus: "Normal",
      transactionModel: "HeavyAsset",
      openMonth: 54,
      orgId: 40006,
      areaOrgId: 10002,
      regionOrgId: 20002,
      cityOrgId: 30004,
    },
    {
      groupOrgId: 1,
      groupName: "全国",
      areaId: 10,
      areaName: "华北区域",
      regionId: 81,
      regionName: "北京地区",
      cityId: 1,
      cityName: "北京",
      projectId: 347,
      projectName: "龙湖冠寓北京总部基地店",
      phId: "L-BJ00-BJZBD00.01",
      optStatus: "Normal",
      transactionModel: "MediumAsset",
      openMonth: 28,
      orgId: 40007,
      areaOrgId: 10001,
      regionOrgId: 20001,
      cityOrgId: 30003,
    },
  ],
};
