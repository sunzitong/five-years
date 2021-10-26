/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114926
 *
 * 解析token
 * @createBy xiejiabin
 * @updateAt 2021/10/2 15:3:23
 * @method GET
 */

exports.path = "/auth/token";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    userId: 2304,
    userName: "谢家斌",
    phone: "13001073515",
    roleId: 1,
    departmentIds: [1],
    cityDepartmentIds: [65],
    departmentType: "Group",
    projectIds: [516],
    authorities: ["department_view"],
    modules: ["HOME_PAGE"],
    cityIds: [124],
    oaAccount: "xiejiabin",
    enterpriseId: 1,
    userRoleOrgs: [
      {
        roleId: 1,
        roleName: "超级管理员",
        crossPos: 0,
        dmFlag: 0,
        departmentType: null,
        organizationInfos: [
          {
            id: 1,
            parentId: 0,
            name: "龙湖集团",
            orgType: null,
            outId: null,
          },
        ],
        primaryRole: true,
      },
    ],
    all: true,
  },
  timestamp: 1633156995719,
};
