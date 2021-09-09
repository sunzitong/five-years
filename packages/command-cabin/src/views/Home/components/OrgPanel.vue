<template>
  <div class="org-panel">
    <template v-if="response">
      <div class="row">
        <div
          class="item region"
          :class="{
            active:
              store.global.dataLevel === DataLevels.GROUP &&
              orgIds[0] === response.orgId,
          }"
          @click="setDataOrgId(DataLevels.GROUP, response.orgId)"
        >
          {{ response.orgName }}
        </div>
      </div>
      <div class="row" v-for="item in response.childList" :key="item.orgId">
        <div
          class="item region"
          :class="{
            active:
              store.global.dataLevel === DataLevels.AREA &&
              orgIds[0] === item.orgId,
          }"
          @click="setDataOrgId(DataLevels.AREA, item.orgId)"
        >
          {{ item.orgName }}
        </div>
        <div
          class="item cities"
          :class="{
            active:
              store.global.dataLevel === DataLevels.CITY &&
              orgIds[0] === item.orgId,
          }"
        >
          <div
            class="city"
            :class="{ active: orgIds[1] === city.orgId }"
            v-for="city in item.childList"
            :key="city.orgId"
            @click="setDataOrgId(DataLevels.CITY, item.orgId, city.orgId)"
          >
            {{ city.orgName }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import {
  fetchOrgTree,
  OrgTreeReturn,
} from "@/service/bigScreen/mainBoard/orgTree";
import {
  DataLevels,
  DateScopes,
} from "@/service/analysis/commandCabin/publicEnum";

@Component
export default class OrgPanel extends Base {
  DateScopes = DateScopes;
  DataLevels = DataLevels;
  response: OrgTreeReturn | null = null;

  // 区域或全国ID,城市ID
  orgIds: [number?, number?] = [];

  created() {
    this.orgIds = [this.store.global.orgId];
  }
  async mounted() {
    const response = await fetchOrgTree();
    if (response?.status === "ok") {
      this.response = response.data;
    }
  }

  // 设置区域范围和ID
  setDataOrgId(level: DataLevels, regionId: number, cityId?: number) {
    this.store.global.dataLevel = level;
    this.orgIds = [regionId, cityId];
    if (level === DataLevels.GROUP || level === DataLevels.AREA) {
      this.store.global.orgId = regionId;
    }
    if (level === DataLevels.CITY && cityId) {
      this.store.global.orgId = cityId;
    }
  }
}
</script>

<style lang="scss" scoped>
.org-panel {
  position: absolute;
  bottom: 120%;
  right: 20px;
  min-width: 1040px;
  min-height: 400px;
  box-sizing: border-box;
  padding: 2px 18px;
  background: rgba(11, 31, 81, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  color: #fff;
  border-top: 2px solid #1b4986;
  overflow: hidden;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, #1b4986 -0.9%, rgba(0, 0, 0, 0) 90.47%);
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
}
.row {
  display: flex;
  flex-flow: row nowrap;
  margin: 28px 0;
  .region {
    width: 184px;
  }
  .cities {
    flex: 1;
    min-width: 780px;
    justify-content: flex-start;
    .city {
      position: relative;
      padding: 0 30px;
      color: #fff;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 2px;
        height: 24px;
        background: #445da5;
      }
      &.active {
        color: #01f5f1;
      }
      transition: 300ms;
    }
    .city:nth-child(1)::before {
      content: none;
    }
  }
}
.item {
  @extend %flex-center;
  margin: 0 10px;
  height: 72px;
  border: 2px solid #445da5;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 28px;
  letter-spacing: 2.5px;
  &.active {
    color: #01f5f1;
    border: 2px solid rgba(0, 222, 255, 0.7);
  }
  transition: 300ms;
}
</style>
