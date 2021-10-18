<template>
  <div class="option-panel animate__animated animate__fadeIn" v-show="show">
    <div v-for="group in resOrgTree" :key="group.orgId">
      <div class="row" v-if="!group.isHidden">
        <div
          class="col left"
          :class="{
            active:
              store.global.dataLevel === DataLevels.GROUP &&
              orgIds[0] === group.orgId,
          }"
          @click="setOrgTree(DataLevels.GROUP, group)"
        >
          <div class="inner">{{ group.orgName }}</div>
        </div>
      </div>
      <template v-for="area in group.childList">
        <div class="row" :key="area.orgId" v-if="area.childList">
          <div
            class="col left"
            :class="{
              active:
                store.global.dataLevel === DataLevels.AREA &&
                orgIds[0] === area.orgId,
            }"
            @click="setOrgTree(DataLevels.AREA, area)"
          >
            <div class="inner">{{ area.orgName }}</div>
            <div class="arrow">
              <van-icon name="arrow" />
              <van-icon name="arrow" />
            </div>
          </div>
          <div
            class="col right"
            :class="{
              active:
                store.global.dataLevel === DataLevels.CITY &&
                orgIds[0] === area.orgId,
            }"
          >
            <div class="inner">
              <div
                class="city"
                :class="{ active: orgIds[1] === city.orgId }"
                v-for="city in area.childList"
                :key="city.orgId"
                @click="setOrgTree(DataLevels.CITY, area, city)"
              >
                {{ city.orgName }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { iwant } from "@guanyu/shared";
import {
  DataLevels,
  DateScopes,
} from "@/service/analysis/commandCabin/publicEnum/enums";
import {
  fetchOrgTree,
  OrgTreeItemReturn,
} from "@/service/analysis/commandCabin/orgTree";
import { StoreKey, useStore } from "@/store";

@Component
export default class TheOrgTree extends Base {
  DateScopes = DateScopes;
  DataLevels = DataLevels;
  /**
   * 区域数据
   */
  resOrgTree: OrgTreeItemReturn[] | null = null;
  @Prop({ default: false, type: Boolean }) show!: false;

  /**
   * 区域或全国ID,城市ID
   */
  orgIds: [number?, number?] = [];

  created() {
    // 城市
    if (this.store.global.orgTree.orgLevel === 3) {
      this.orgIds = [
        // this.store.global.orgTree.parentOrgId, // 地区ID不是大区ID
        undefined,
        this.store.global.orgTree.orgId,
      ];
    } else {
      this.orgIds = [this.store.global.orgTree.orgId, undefined];
    }
  }

  mounted() {
    this.fetchOrgData();
  }
  /**
   * 请求区域门店数据
   */
  async fetchOrgData() {
    // 获取区域数据
    const resOrgTree = await useStore(fetchOrgTree, { key: StoreKey.OrgTree });
    if (resOrgTree?.status === "ok") {
      this.resOrgTree = iwant.array(resOrgTree.data);
    }
  }
  /**
   * 设置区域范围和ID
   */
  setOrgTree(
    level: DataLevels,
    region: OrgTreeItemReturn,
    city?: OrgTreeItemReturn
  ) {
    this.orgIds = [region.orgId, city?.orgId];
    this.store.global.dataLevel = level;
    if (level === DataLevels.GROUP || level === DataLevels.AREA) {
      this.store.global.orgTree = region;
    }
    if (level === DataLevels.CITY && city) {
      this.store.global.orgTree = city;
    }
    this.$emit("update:show", false);
  }
}
</script>

<style lang="scss" scoped>
.option-panel {
  box-sizing: border-box;
  padding: 32px 60px;
  overflow: hidden;
  color: #90a4c3;
  background: rgba(14, 23, 60, 0.9);
  backdrop-filter: blur(10px);
}
.row {
  display: flex;
  flex-flow: row nowrap;
  margin: 28px 0;
  .left {
    width: 208px;
    box-shadow: 0 0 0 2px #274e86;
    background: rgba(17, 48, 105, 0.8);
    height: 72px;
    font-size: 36px;
    margin-right: 44px;
    position: relative;
    .inner {
      width: 100%;
      text-align: center;
      border-radius: 2px;
    }
    .arrow {
      position: absolute;
      font-size: 20px;
      height: 100%;
      top: 0;
      right: -23px;
      letter-spacing: -14px;
      @extend %flex-center;
    }

    &.active,
    &:hover {
      color: #fff;
      box-shadow: 0 0 0 2px #01f5f1;
      background: none;
      .inner {
        background: linear-gradient(
          181.24deg,
          rgba(1, 245, 241, 0) 10.4%,
          rgba(1, 245, 241, 0.48) 117.09%
        );
      }
      .arrow {
        color: #01f5f1;
      }
    }
  }
  .right {
    flex: 1;
    width: 638px;
    font-size: 30px;
    justify-content: flex-start;
    box-shadow: 0 0 0 1px rgba(17, 48, 105, 0.8);
    &.active,
    &:hover {
      box-shadow: 0 0 0 1px rgba(77, 137, 247, 0.8);
    }
    .inner {
      display: flex;
      width: 100%;
      background: rgba(17, 48, 105, 0.8);
      border-radius: 2px;
      flex-flow: row wrap;
    }
    .city {
      position: relative;
      padding: 0 20px;
      &.active,
      &:hover {
        color: #01f5f1;
      }
      transition: 300ms;
    }
  }
}
.col {
  display: flex;
  line-height: 60px;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 4px;
  letter-spacing: 2px;
  transition: 300ms;
  cursor: pointer;
}
.fade-enter-active {
  animation: 200ms fadeIn 600ms;
}
.fade-leave-active {
  animation: 200ms fadeOut;
}
.option-panel {
  --animate-duration: 200ms;
}
</style>
