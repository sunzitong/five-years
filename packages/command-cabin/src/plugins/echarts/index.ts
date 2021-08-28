import * as echarts from "echarts/core";

import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  LineChart,
  LineSeriesOption,
  GaugeChart,
  GaugeSeriesOption,
  GraphSeriesOption,
  BarSeriesOption,
  CustomChart,
  CustomSeriesOption,
  PieChart,
  MapChart,
  MapSeriesOption,
} from "echarts/charts";

import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | GaugeSeriesOption
  | GraphSeriesOption
  | BarSeriesOption
  | CustomSeriesOption
  | MapSeriesOption
>;

// 注册必须的组件
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
  MarkLineComponent,
  BarChart,
  GaugeChart,
  CustomChart,
  PieChart,
  MapChart,
]);

export default echarts;
