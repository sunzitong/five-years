<template>
  <div class="org-panel" v-if="show">
    <div
      class="org-tree animate__animated animate__fadeInLeft"
      v-show="showOrgTree"
    >
      <div v-for="group in resOrgTree" :key="group.orgId">
        <div class="row" v-if="type === 'orgTree'">
          <div
            class="col left"
            :class="{
              active:
                store.global.dataLevel === DataLevels.GROUP &&
                orgIds[0] === group.orgId,
            }"
            @click="setDataOrgId(DataLevels.GROUP, group)"
          >
            {{ group.orgName }}
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
                readonly: type === 'project',
              }"
              @click="setDataOrgId(DataLevels.AREA, area)"
            >
              {{ area.orgName }}
            </div>
            <div
              class="col right"
              :class="{
                active:
                  false &&
                  store.global.dataLevel === DataLevels.CITY &&
                  orgIds[0] === area.orgId,
              }"
            >
              <div
                class="city"
                :class="{ active: orgIds[1] === city.orgId }"
                v-for="city in area.childList"
                :key="city.orgId"
                @click="setDataOrgId(DataLevels.CITY, area, city)"
              >
                {{ city.orgName }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div
      class="project-list animate__animated animate__fadeInRight"
      v-show="!showOrgTree"
    >
      <Icon
        type="arrow-left"
        color="#fff"
        :size="35"
        @click.native="$set(orgIds, '1', undefined)"
        class="icon-back"
      />
      <div
        class="row"
        v-for="(project, index) in projectList"
        :key="project.projectId"
      >
        <div class="col left readonly">
          <span v-if="index === 0">{{ project.cityName }}</span>
        </div>
        <div class="col right" @click="setProject(project)">
          <span
            class="city"
            :class="{
              active: store.global.project.projectId === project.projectId,
            }"
          >
            {{ project.projectName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Base from "@/views/Base";
import { iwant } from "@guanyu/shared";
import Icon from "@/components/Icon/Index.vue";
import {
  DataLevels,
  DateScopes,
} from "@/service/analysis/commandCabin/publicEnum";
import {
  fetchOrgTree,
  OrgTreeItemReturn,
} from "@/service/analysis/commandCabin/orgTree";
import {
  fetchProjectList,
  ProjectListItemReturn,
} from "@/service/analysis/commandCabin/projectList";

@Component({
  components: { Icon },
})
export default class OrgPanel extends Base {
  DateScopes = DateScopes;
  DataLevels = DataLevels;
  resOrgTree: OrgTreeItemReturn[] | null = null;
  resProjectList: ProjectListItemReturn[] | null = null;

  @Prop({ required: true }) type!: "project" | "orgTree";
  @Prop({ default: false }) show!: false;

  // 区域或全国ID,城市ID
  orgIds: [number?, number?] = [];

  // 显示隐藏区域选择
  get showOrgTree() {
    if (!this.resOrgTree) return false;
    if (this.type === "project" && this.projectList.length) return false;
    return true;
  }

  // 当前城市门店列表
  get projectList() {
    const all = iwant.array(this.resProjectList);
    return all.filter((item) => item.cityOrgId === this.orgIds[1]);
  }

  created() {
    // 城市
    if (this.store.global.orgTree.orgLevel === 3) {
      this.orgIds = [
        // this.store.global.orgTree.parentOrgId, // 地区ID不是大区ID
        undefined,
        this.store.global.orgTree.orgId,
      ];
    }
  }

  mounted() {
    this.fetchData();
  }

  async fetchData() {
    // 获取区域数据
    const resOrgTree = await fetchOrgTree();
    if (resOrgTree?.status === "ok") {
      this.resOrgTree = iwant.array(resOrgTree.data);
    }
    // 获取门店数据
    const resProjectList = await fetchProjectList();
    if (resProjectList?.status === "ok") {
      this.resProjectList = iwant.array(resProjectList.data);
    }
  }

  // 设置区域范围和ID
  setDataOrgId(
    level: DataLevels,
    region: OrgTreeItemReturn,
    city?: OrgTreeItemReturn
  ) {
    this.orgIds = [region.orgId, city?.orgId];
    if (this.type === "orgTree") {
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

  // 设置门店
  setProject(project: ProjectListItemReturn) {
    this.store.global.project = project;
    this.$emit("update:show", false);
  }
}
</script>

<style lang="scss" scoped>
.org-panel {
  position: absolute;
  bottom: 120%;
  right: 20px;
  min-width: 1040px;
  /* min-height: 400px; */
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
  .left {
    width: 184px;
  }
  .right {
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
      &.active,
      &:hover {
        color: #01f5f1;
      }
      transition: 300ms;
    }
    .city:nth-child(1)::before {
      content: none;
    }
  }
}
.col {
  @extend %flex-center;
  margin: 0 10px;
  height: 72px;
  border: 2px solid #445da5;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 28px;
  letter-spacing: 2.5px;
  &.active,
  &:hover {
    color: #01f5f1;
    border: 2px solid rgba(0, 222, 255, 0.7);
  }
  transition: 300ms;
  cursor: pointer;
}
.project-list {
  box-sizing: border-box;
  padding: 24px 12px;
  max-height: 1000px;
  overflow: auto;
  .icon-back {
    cursor: pointer;
  }
  .right {
    box-sizing: border-box;
    padding-left: 30px;
  }
}
.readonly {
  border: none !important;
  pointer-events: none;
}
.fade-enter-active {
  animation: 200ms fadeIn 600ms;
}
.fade-leave-active {
  animation: 200ms fadeOut;
}
.org-panel {
  --animate-duration: 200ms;
}
</style>
