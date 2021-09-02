import * as echarts from "echarts/core";

import {
  MapChart,
  LineSeriesOption,
  MapSeriesOption,
  CustomSeriesOption,
  BarSeriesOption,
  BarChart,
} from "echarts/charts";

import {
  TitleComponent,
  ToolboxComponent,
  VisualMapComponent,
  TooltipComponent,
  GeoComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  LineSeriesOption | BarSeriesOption | CustomSeriesOption | MapSeriesOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
  MapChart,
  VisualMapComponent,
  ToolboxComponent,
  GeoComponent,
  GridComponent,
  BarChart,
]);

export default echarts;
