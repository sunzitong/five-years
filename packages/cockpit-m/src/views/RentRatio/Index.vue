<template>
  <div class="page_rent_ratio">
    <main class="page_details">
      <MainIndicatorPanel />
      <OccupancyRateTrends />
      <ProCard title="原因分析" v-if="!!reasonList.length">
        <ItemLayoutPlane :data="reasonList" />
      </ProCard>
      <ProCard title="可选提升方案" v-if="!!solveList.length">
        <ItemLayoutPlane :data="solveList" />
      </ProCard>
    </main>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import MainIndicatorPanel from "./components/MainIndicatorPanel.vue";
import OccupancyRateTrends from "./components/OccupancyRateTrends.vue";
import { queryRentRatio } from "@/service";
import { iwant } from "@guanyu/shared";
import ProCard from "@/components/ProCard.vue";
import ItemLayoutPlane from "@/components/ItemLayout/ItemLayoutPlane.vue";

@Component({
  components: {
    MainIndicatorPanel,
    OccupancyRateTrends,
    ProCard,
    ItemLayoutPlane,
  },
})
export default class RentRatio extends Base {
  get reasonList() {
    const reasonData = iwant.array(this.store.rentData?.reason);
    return reasonData.map((el) => {
      return {
        title: el.note,
        desc: el.noteRemark,
        level: el.matchDegree,
        levelDesc: el.matchDegreeDesc,
      };
    });
  }

  get solveList() {
    const solveData = iwant.array(this.store.rentData?.solve);
    return solveData.map((el) => {
      return {
        title: el.note,
        desc: el.noteRemark,
        level: el.matchDegree,
        levelDesc: el.matchDegreeDesc,
      };
    });
  }

  mounted() {
    this.queryData();
  }

  async queryData() {
    const projectId = iwant.string(this.$route.query.projectId);
    if (!projectId) {
      return;
    }
    const response = await queryRentRatio({ projectId });
    if (response?.status === "ok") {
      this.store.rentData = response.data ?? {};
      console.log("response", this.store.rentData);
    }
  }
}
</script>
