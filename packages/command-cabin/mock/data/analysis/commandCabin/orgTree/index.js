/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114282
 *
 * 地区筛选（国家-大区-城市）
 * @createBy baishiqiang
 * @updateAt 2021-9-10 2:40:07 ├F10: PM┤
 * @method GET
 */

exports.path = "/analysis/commandCabin/orgTree";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: [
    {
      orgLevel: 0, //组织级别 0:国家 1:大区 2:地区 3:城市
      orgId: 1, //组织ID
      orgName: "中国", //组织名称
      parentOrgId: 0, //上一级组织ID
      childList: [
        //下一级组织
        {
          orgLevel: 1,
          orgId: 10001,
          orgName: "华北区域",
          parentOrgId: 1,
          childList: [
            {
              orgLevel: 3,
              orgId: 30003,
              orgName: "北京",
              parentOrgId: 20001,
              childList: null,
            },
          ],
        },
        {
          orgLevel: 1,
          orgId: 10002,
          orgName: "西南区域",
          parentOrgId: 1,
          childList: [
            {
              orgLevel: 3,
              orgId: 30004,
              orgName: "成都",
              parentOrgId: 20002,
              childList: null,
            },
          ],
        },
      ],
    },
  ],
};
