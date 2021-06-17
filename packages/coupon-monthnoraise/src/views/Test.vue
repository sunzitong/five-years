<template>
  <div>
    <div class="container">
      <div class="child"></div>
    </div>
    <input type="text" />
  </div>
</template>

<script lang="ts">
/**
 * 说明: 代码能实现多少写多少, eslint和ts报错和警告可忽略
 */
import { Component } from "vue-property-decorator";
import Base from "./Base";
@Component({
  /**
   * 1. 补全代码, 使该vue组件具有 v-model 功能
   * 结合模板中的 <input type="text" />
   * PS:代码和 vue2 的 options api 用法一致
   */
  data() {
    return {};
  },
  props: [],
  methods: {},
})
export default class NotFound extends Base {
  /**
   * 2. 生成一个 [1,2,3...100] 的数组，并打乱顺序。
   */
  randomArray() {
    // return [];
  }

  /**
   * 3. 数组扁平化
   */
  flatArray() {
    const arr = [1, 2, 3, [4], [5, [6, 7, 8, [9]]]];
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  /**
   * 4. 数组根据id值去重
   */
  filterArray() {
    const arr = [
      { id: 1, value: 1 },
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 2, value: 2 },
    ];
    // return [
    //   { id: 1, value: 1 },
    //   { id: 2, value: 2 },
    // ];
  }

  /**
   * 5. 对象转数组
   */
  objToArr() {
    const obj = { name: "伽罗", sex: "女" };
    // return [
    //   { label: "name", value: "伽罗" },
    //   { label: "sex", value: "女" },
    // ];
  }

  /**
   * 6. 字符串下划线转驼峰
   */
  convertStr() {
    const str = "abc_abc_abc";
    // return 'abcAbcAbc';
  }
}
</script>

<style lang="scss">
.container {
  width: 300px;
  height: 300px;
}
.child {
  width: 100px;
  height: 100px;
}
/* 7. 使.container中的.child垂直水平居中 */

/* 方式1 */
.container {
}
.child {
}

/* 方式2 */
.container {
}
.child {
}
</style>
