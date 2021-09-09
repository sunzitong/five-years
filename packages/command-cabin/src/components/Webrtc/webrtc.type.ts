export type PlayerConfig = {
  /**
   * 应用名称
   * @requires false
   * @example "智慧工地"
   */
  applicationName?: string;

  /**
   * 用户ID
   * @requires false
   * @example "80810"
   */
  userId?: string;

  /**
   * 网关名称
   * @requires false
   * @example "沈阳天奕项目-售楼处"
   */
  gatewayName?: string;

  /**
   * 网关ID
   * @requires false
   * @example "14224190498200008 603"
   */
  gatewayId?: string;

  /**
   * 子设备名称
   * @requires false
   * @example "开元子设备"
   */
  deviceName?: string;

  /**
   * 子设备ID
   * @requires false
   * @example "0c89f84fe9bd791775ce9c578cf4d7bc"
   */
  deviceId?: string;

  /**
   * 播放器宽度
   * @default 480
   * @requires false
   * @example "示例:480、'480'、 '480px'、'100%'"
   */
  width?: string | number;

  /**
   * 播放器高度
   * @default 270
   * @requires false
   * @example "示例:270、'270'、 '270px'、'100%'"
   */
  hegiht?: string | number;

  /**
   * 播放器布局方式
   * @default "fill"
   * @requires false
   * @example "可选值: "fill" 铺满、 "contain" 自适应"
   */
  videoLayoutType?: "fill" | "contain";

  /**
   * 播放器布局方式
   * @default "playReq"
   * @requires false
   * @example "可选值: "playReq" 直播 "playBackReq" 回放"
   */
  command?: "playReq" | "playBackReq";

  /**
   * 需要播放的点位ID
   * @default "无"
   * @requires true
   * @example "uat: '2732fd4ef83f5669018 8b750366668ac'; prod: '782dba6fe505c10d0d 58ff19defef671'"
   */
  cameraId: string;

  /**
   * 水印
   * @default "无"
   * @requires true
   * @example "admin"
   */
  watermark: string;

  /**
   * 回放开始时间 - command为 playBackReq时必选， 播放器播放参数
   * @default "无"
   * @requires true
   * @example "格式:‘YYYY-MM- DD hh:mm:ss’ 示例:‘2020-08-01 13:14:51’"
   */
  startTime: string;

  /**
   * 回放结束时间 - command为 playBackReq时必选， 播放器播放参数
   * @default "无"
   * @requires true
   * @example "格式:‘YYYY-MM- DD hh:mm:ss’ 示例:‘2020-08-01 13:14:51’"
   */
  endTime: string;

  /**
   * webrtc播放时的编码方 式
   * @default "vp8"
   * @example "可选值:"vp8"、 "h264"
   */
  encoding: "vp8" | "h264";

  /**
   * webrtc播放时的编码方 式
   * @default 1
   * @example "可选值:0 高清、1"
   */
  channel: 0 | 1;

  /**
   * 环境配置
   * @default "prod"
   * @example "可选值:prod: iot生 产环境、uat: iot uat 环境、sit: iot sit环境"
   */
  env: "prod" | "uat" | "sit";

  /**
   * 播放超时时长，单位秒
   * @default 15
   * @example "15"
   */
  videoOverTime: number;

  /**
   * 播放失败重试次数
   * @default 8
   * @example "8"
   */
  maxReConnect: number;

  /**
   * 是否自动播放
   * @default true
   * @example "true"
   */
  autoplay: boolean;

  /**
   * 是否显示码流类型切换按钮
   * @default true
   * @example "true"
   */
  toggleChannelAbility: boolean;

  /**
   * 是否显示云台控制按钮
   * @default false
   * @example "true"
   */
  ptzAbility: boolean;

  /**
   * 是否显示播放时长
   * @default true
   * @example "true"
   */
  showTimeEle: boolean;

  /**
   * 封面图
   * @default ""
   * @example ""
   */
  poster: string;

  /**
   * 访问标识
   * @default ""
   * @example "huiyan"
   */
  accessChannel: string;
};
