<template>
  <div class="page__e5a__e5b">
    <E5A :response="response" />
    <E5B :response="response" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import E5A from "./E5A.vue";
import E5B from "./E5B.vue";
import { fetchSentiment } from "@/service/analysis/bigScreen/mainBoard/managementSituation/sentiment";

@Component({
  components: {
    E5A,
    E5B,
  },
})
export default class E5 extends Base {
  /**
   * 返回数据
   */
  response = {};

  created() {
    this.fetch();
  }

  /**
   * 请求数据
   */
  async fetch() {
    const response = await fetchSentiment({
      dataLevel: "GROUP",
      levelId: 1,
      dateScope: "YEARLY",
    });

    if (response?.status === "ok") {
      this.response = response.data ?? {};
    }
  }
}
</script>

<style lang="scss" scoped></style>
