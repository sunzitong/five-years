/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114858
 *
 * 门店屏-现场监控
 * @createBy baishiqiang
 * @updateAt 2021/9/29 11:1:24
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/monitor/locationList";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: [
    {
      imageUrl: "", //缩略图url
      cameraId: "", //摄像头ID
      location: "", //位置描述(三个空间名称)
    },
  ],
};
