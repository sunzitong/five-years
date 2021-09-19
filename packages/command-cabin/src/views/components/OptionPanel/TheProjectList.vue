<template>
  <div class="panel animate__animated animate__fadeIn" v-show="show">
    <div
      v-for="group in resOrgTree"
      :key="group.orgId"
      class="animate__animated animate__fadeInLeft"
    >
      <template v-for="area in group.childList">
        <div class="row" :key="area.orgId" v-if="area.childList">
          <div class="col left readonly">
            <div class="inner">{{ area.orgName }}</div>
            <div class="arrow">
              <van-icon name="arrow" />
              <van-icon name="arrow" />
            </div>
          </div>
          <div
            class="col right"
            :class="{
              active: areaId === area.orgId,
            }"
          >
            <div class="inner">
              <div
                class="city"
                :class="{ active: cityId === city.orgId }"
                v-for="city in area.childList"
                :key="city.orgId"
                @click="setOrgTree(area, city)"
              >
                {{ city.orgName }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      class="project-wrap animate__animated animate__fadeInRight"
      v-if="cityId"
    >
      <div class="row">
        <div class="col left active">
          <div class="inner">{{ store.global.orgTree.orgName }}</div>
          <div class="arrow">
            <van-icon name="arrow" />
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="project-list">
        <div
          class="row"
          v-for="project in projectList"
          :key="project.projectId"
        >
          <div class="col left"></div>
          <div
            class="col right"
            :class="{
              active: project.projectId === store.global.project.projectId,
            }"
          >
            <div class="inner active" @click="setProject(project)">
              {{ project.projectName }}
            </div>
          </div>
        </div>
      </div>
      <AnimationForward :size="12" />
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
} from "@/service/analysis/commandCabin/publicEnum";
import {
  fetchOrgTree,
  OrgTreeItemReturn,
} from "@/service/analysis/commandCabin/orgTree";
import { StoreKey, useStore } from "@/store";
import AnimationForward from "@/components/AnimationForward/Index.vue";
import {
  fetchProjectList,
  ProjectListItemReturn,
} from "@/service/analysis/commandCabin/projectList";

@Component({
  components: { AnimationForward },
})
export default class TheProjectList extends Base {
  DateScopes = DateScopes;
  DataLevels = DataLevels;
  /**
   * 区域数据
   */
  resOrgTree: OrgTreeItemReturn[] | null = null;
  /**
   * 门店数据
   */
  resProjectList: ProjectListItemReturn[] | null = null;
  @Prop({ default: false, type: Boolean }) show!: false;

  /**
   * 区域或全国ID
   */
  areaId: number | null = null;
  /**
   * 城市ID
   */
  cityId: number | null = null;

  created() {
    // 城市
    if (this.store.global.orgTree.orgLevel === 3) {
      this.cityId = this.store.global.orgTree.orgId;
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
    // 获取门店数据
    const resProjectList = await useStore(fetchProjectList, {
      key: StoreKey.ProjectList,
    });
    if (resProjectList?.status === "ok") {
      this.resProjectList = iwant.array(resProjectList.data);
    }
  }
  /**
   * 设置区域范围和ID
   */
  setOrgTree(area: OrgTreeItemReturn, city: OrgTreeItemReturn) {
    this.areaId = area.orgId;
    this.cityId = city.orgId;
    this.store.global.dataLevel = DataLevels.CITY;
    this.store.global.orgTree = city;
  }

  /**
   * 当前城市门店列表
   */
  get projectList() {
    const all = iwant.array(this.resProjectList);
    return all.filter((item) => item.cityOrgId === this.cityId);
  }

  /**
   * 设置门店
   */
  setProject(project: ProjectListItemReturn) {
    this.store.global.project = project;
    this.$emit("update:show", false);
  }
}
</script>

<style lang="scss" scoped>
.panel {
  box-sizing: border-box;
  padding: 32px 60px;
  overflow: hidden;
  color: #90a4c3;
  background: rgba(14, 23, 60, 0.9);
  backdrop-filter: blur(20px);
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
.panel {
  --animate-duration: 200ms;
}
/* 门店选择相关 */
.readonly {
  pointer-events: none;
}
.panel {
  display: flex;
}
.project-wrap {
  margin-left: 46px;
  position: relative;
  margin-top: 26px;
  .row {
    width: 890px;
    &:nth-child(1) {
      margin-top: 2px;
    }
  }
  .project-list {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: auto;
    .left {
      opacity: 0;
    }
    .right {
      height: 100%;
      .inner {
        padding: 0 26px;
      }
    }
  }
  .right.active {
    color: #01f5f1;
  }
}
/* 动画 */
.forward-bar {
  position: absolute;
  left: 10px;
  bottom: 50%;
}
</style>
