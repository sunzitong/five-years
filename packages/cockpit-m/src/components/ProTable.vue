<template>
  <div class="pro__table">
    <van-sticky @scroll.passive="scroll" :offset-top="toRpx(stickyTop, true)" />
    <table class="pro__table__layout">
      <thead class="pro__table__thead">
        <tr
          v-for="trIndex in 2"
          :key="trIndex"
          :class="{ sticky: trIndex == 1 && theadSticky }"
          :style="getTheadTrStyle(trIndex)"
        >
          <th
            class="pro__table__cell"
            v-for="(item, thIndex) of columns"
            :key="item.dataIndex || item.key"
            :class="item.className"
            :style="getThStyle(item, trIndex, thIndex)"
            :align="item.align"
            :colspan="item.colSpan"
            :ref="`th_${trIndex}`"
          >
            <SortIcon
              v-if="item.sortable"
              v-model="item.orderBy"
              @change="
                (sort) => {
                  handleSortChange(item.dataIndex, sort);
                }
              "
            >
              <template v-slot:label>
                <slot name="th" v-bind="item">{{ item.title }}</slot>
              </template>
            </SortIcon>
            <template v-else>
              <slot name="th" v-bind="item">{{ item.title }}</slot>
            </template>
          </th>
        </tr>
      </thead>
      <tbody class="pro__table__tbody">
        <template v-for="(rowData, index) of dataSource">
          <tr
            class="pro__table__row"
            :key="rowKey ? rowData[rowKey] : index"
            :class="getTrClass({ rowData, index, dataSource })"
            :style="getTrStyle({ rowData, index, dataSource })"
          >
            <td
              class="pro__table__cell"
              v-for="cellData in columns"
              :align="cellData.align"
              :colspan="cellData.colSpan"
              :key="cellData.dataIndex || cellData.key"
            >
              <slot
                name="extra"
                :cell="cellData"
                :cellKey="cellData.dataIndex"
                :row="rowData"
                :index="index"
                :defaultValue="columnsItemRender(rowData, cellData, index)"
              >
                <span>{{ columnsItemRender(rowData, cellData, index) }}</span>
              </slot>
              <slot
                name="icon"
                :cell="cellData"
                :row="rowData"
                :cellKey="cellData.dataIndex"
                :index="index"
              ></slot>
            </td>
          </tr>
          <!-- 为了加下划线 -->
          <tr
            v-if="index !== Math.max(0, dataSource.length - 1)"
            class="pro__table__row"
            :key="`${rowKey ? rowData[rowKey] : index}--hr`"
          >
            <td style="padding: 0 18px; height: 1px" :colspan="columns.length">
              <div style="border-bottom: 1px solid #fafafa"></div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <van-empty
      v-if="!dataSource || dataSource.length === 0"
      :image="emptyImage || 'search'"
      description="暂无数据"
      v-bind="emptyProps"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import SortIcon, { OrderBy } from "@/components/SortIcon.vue";
import { toRpx } from "@/utils/tools";

export interface ColumnsItem {
  title: string;
  key?: string;
  align?: "left" | "right" | "center";
  className?: string;
  colSpan?: number;
  dataIndex: string;
  sortable?: boolean;
  orderBy?: string;
  render?: (text: string, record: any, index: number) => any;
  width?: string | number;
}

@Component({
  components: {
    SortIcon,
  },
})
export default class ProTable extends Vue {
  toRpx = toRpx;
  /**
   * 空数据默认图片
   */
  @Inject() emptyImage!: string;
  /**
   * van-empty props
   */
  @Prop() emptyProps?: Record<string, any>;
  /**
   * 启用thead粘性布局
   */
  @Prop({ type: Boolean }) sticky!: boolean;
  /**
   * sticky模式的offsetTop距离
   */
  @Prop({ type: Number, default: 0 }) stickyTop!: number;
  /**
   * thead隐藏tr行的stickyclass
   */
  theadSticky = false;
  /**
   * vant-sticky触发
   */
  scroll({ isFixed }: { isFixed: boolean; scrollTop: number }) {
    this.theadSticky = this.sticky && isFixed;
  }
  /**
   * thead tr的top距离
   */
  getTheadTrStyle(trIndex: number) {
    if (trIndex === 1 && this.theadSticky) {
      return { top: toRpx(this.stickyTop, true) };
    }
    if (trIndex === 2) {
      return { opacity: this.theadSticky ? 0 : 1 };
    }
  }
  /**
   * thead th的宽度
   */
  getThStyle(item: Record<string, any>, trIndex: number, thIndex: number) {
    if (trIndex === 1 && this.theadSticky) {
      const { th_2 } = this.$refs;
      return { width: th_2[thIndex].getClientRects()[0].width + "px" };
    }
    if (trIndex === 2) {
      return { width: item.width };
    }
  }
  /**
   * 表格配置
   */
  @Prop({ default: () => [] }) columns!: ColumnsItem[];
  /**
   * 'id' 默认index
   */
  @Prop({ required: false }) rowKey!: string;
  /**
   * tbody tr className
   * 支持函数
   */
  @Prop() trClass!: any;
  /**
   * 每行数据tr的class
   */
  getTrClass(data: {
    rowData: Record<string, any>;
    index: number;
    dataSource: Record<string, any>[];
  }) {
    if (!this.trClass) return null;
    if (typeof this.trClass === "function") {
      return this.trClass(data);
    }
    return this.trClass;
  }
  /**
   * tbody tr style
   * 支持函数
   */
  @Prop() trStyle!: any;
  /**
   * 每行数据tr的style
   */
  getTrStyle(data: {
    rowData: Record<string, any>;
    index: number;
    dataSource: Record<string, any>[];
  }) {
    if (!this.trStyle) return null;
    if (typeof this.trStyle === "function") {
      return this.trStyle(data);
    }
    return this.trStyle;
  }
  /**
   * 数据源
   */
  @Prop({ default: () => [] }) dataSource!: Record<string, any>[];
  /**
   * 获取每列的宽度
   */
  get colWidths() {
    return this.columns.map((item) => item.width);
  }
  /**
   * 渲染单元表格数据
   */
  columnsItemRender(rowData: any, cellData: any) {
    const cellValue = [null, undefined, ""].includes(
      rowData[cellData.dataIndex]
    )
      ? "-"
      : rowData[cellData.dataIndex];
    return cellValue;
  }
  /**
   * 排序事件
   */
  handleSortChange(name: string, sort: OrderBy) {
    // 重置 colums 中非当前排序字段
    this.columns.forEach((item) => {
      if (item.dataIndex === name) return;
      item.orderBy = "";
    });

    this.dataSource.sort((a, b) => {
      const s1 = a[name];
      const s2 = b[name];
      // 如果是字符串
      if (typeof s1 === "string" && typeof s2 === "string") {
        // 转换数字失败
        if (Number.isNaN(+s1) || Number.isNaN(+s2)) {
          if (sort === "DESC") {
            return s1.charCodeAt(0) - s2.charCodeAt(0);
          }
          return s2.charCodeAt(0) - s1.charCodeAt(0);
        }
      }

      // 数字
      if (sort === "DESC") {
        return s1 - s2;
      }
      return s2 - s1;
    });
  }
}
</script>
<style lang="scss" scoped>
.pro__table,
.pro__table__contenter,
.pro__table__layout,
.pro__table__thead,
.pro__table__cell,
.pro__table__tbody,
.pro__table__thead {
  box-sizing: border-box;
  white-space: pre-wrap;
}

th.pro__table__cell {
  white-space: pre;
}

.pro__table__title {
  padding: 8px 18px;
  h3 {
    font-family: PingFang SC;
    font-weight: normal;
    font-size: 18px;
  }
}

.pro__table__layout {
  width: 100%;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0;
}

.pro__table__thead {
  > tr > th {
    color: #232832;
    font-weight: normal;
    font-family: PingFang SC;
    background: #f8faff;
  }
}

.pro__table__cell {
  position: relative;
  padding: 12px 5px;
  font-size: 12px;
  overflow-wrap: break-word;
  // border-bottom: 1px solid #fafafa;
}

.pro__table__tbody {
  > tr > td:last-child {
    padding-right: 10px;
  }
  > tr > td:first-child {
    max-width: 11em;
    padding-left: 18px;
    text-align: left;
  }
  .tooltip__wrapper {
    margin-left: 2px;
  }
}

.pro__table__thead {
  > tr > th:last-child {
    padding-right: 10px;
  }
  > tr > th:first-child {
    padding-left: 18px;
    text-align: left;
  }
}
/* sticky */
.pro__table__thead {
  tr:first-child {
    position: fixed;
    z-index: 10;
    display: none;
    &.sticky {
      display: table-row;
    }
  }
}
</style>
