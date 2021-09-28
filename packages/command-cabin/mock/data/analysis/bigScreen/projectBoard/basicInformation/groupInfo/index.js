/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113950
 *
 * 门店基本信息-团队信息
 * @createBy huyanan
 * @updateAt 2021-9-10 3:26:25 ├F10: PM┤
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/basicInformation/groupInfo";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    businessGroups: [
      //经营团队
      {
        person: "张三",
        tel: "13012345678",
        specialty: "社区运营官",
        company: null,
      },
    ],
    designGroups: [
      //设计团队
      {
        person: "张三",
        tel: "13012345678",
        specialty: "景观设计",
        company: "C3",
      },
    ],
    constructGroups: [
      //施工团队
      {
        person: "张三",
        tel: "13012345678",
        specialty: "景观施工",
        company: "C3",
      },
    ],
  },
};
