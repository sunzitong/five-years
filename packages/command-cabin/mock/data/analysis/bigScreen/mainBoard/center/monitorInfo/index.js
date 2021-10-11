/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114782
 *
 * 指挥中心-现场监控详情
 * @createBy wuyao
 * @updateAt 2021/10/11 14:57:30
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/center/monitorInfo";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    projectId: 84, //门店id
    projectName: "酒仙桥店", //门店名称
    position: "大门口", //位置区域
    pictureUrl: "http://", //图片地址
    problem: "人员离岗", //问题描述
    showTime: "2021-09-23 12:34:23", //发现时间
    reformTime: "2021-09-23 12:34:23", //整改时间
    cameraId: "34534tewrtert", //摄像头id
    problemPictureUrls: [
      "https://goyoo-assets.longfor.com/prod/CMS/Gfx-42OIAHQz5etMhx6z0A.jpg?x-oss-process=image/resize,h_288/interlace,1/format,jpg",
      "https://goyoo-assets.longfor.com/prod/CMS/Gfx-42OIAHQz5etMhx6z0A.jpg?x-oss-process=image/resize,h_288/interlace,1/format,jpg",
      "https://goyoo-assets.longfor.com/prod/CMS/Gfx-42OIAHQz5etMhx6z0A.jpg?x-oss-process=image/resize,h_288/interlace,1/format,jpg",
    ], //问题图片地址
    contacts: [
      {
        roleName: "社区经理",
        name: "康玉乾",
        phone: "18923450000",
      },
    ], //联系人
  },
};
