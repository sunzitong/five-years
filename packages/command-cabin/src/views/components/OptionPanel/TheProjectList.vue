<template>
  <div class="option-panel animate__animated animate__fadeIn" v-show="show">
    <div
      v-for="group in resOrgTree"
      :key="group.orgId"
      class="org-wrap animate__animated animate__fadeInLeft"
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
              active: area.areaOrgId === currentArea.orgId,
            }"
          >
            <div class="inner">
              <div
                class="city"
                :class="{ active: city.orgId === currentCity.orgId }"
                v-for="city in area.childList"
                :key="city.orgId"
                @click="setCurrentOrg(area, city)"
              >
                {{ city.orgName }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="project-wrap animate__animated animate__fadeInRight">
      <div class="row">
        <div class="col left active">
          <div class="inner">{{ currentCity.orgName }}</div>
          <div class="arrow">
            <van-icon name="arrow" />
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="project-list" ref="projectScroll" @scroll="onScroll">
        <div class="row" v-for="project in projectList" :key="project.phId">
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
      <div class="scroll" v-if="projectList.length > 13">
        <div
          class="scroll__button scroll--up"
          :class="{ disabled: disabledScroll === 'up' }"
          @click="scrollProject(true)"
        >
          <van-icon name="arrow-up" />
        </div>
        <div
          class="scroll__button scroll--down"
          :class="{ disabled: disabledScroll === 'down' }"
          @click="scrollProject(false)"
        >
          <van-icon name="arrow-down" />
        </div>
      </div>
      <AnimationForward :size="12" v-if="projectList.length > 4" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
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
import AnimationForward from "@/components/AnimationForward/Index.vue";
import {
  fetchProjectList,
  ProjectListItemReturn,
} from "@/service/analysis/commandCabin/projectList";

@Component({
  components: { AnimationForward },
})
export default class TheProjectList extends Base {
  @Ref() projectScroll!: HTMLDivElement;
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
   * 区域
   */
  currentArea: { orgId?: number; orgName?: string } = {};
  /**
   * 城市
   */
  currentCity: { orgId?: number; orgName?: string } = {};

  created() {
    // 城市
    const {
      cityOrgId,
      cityName,
      areaOrgId,
      areaName,
    } = this.store.global.project;
    this.currentCity = {
      orgId: cityOrgId,
      orgName: cityName,
    };
    this.currentArea = {
      orgId: areaOrgId,
      orgName: areaName,
    };
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
  setCurrentOrg(area: OrgTreeItemReturn, city: OrgTreeItemReturn) {
    this.currentArea = {
      orgId: area.orgId,
      orgName: area.orgName,
    };
    this.currentCity = {
      orgId: city.orgId,
      orgName: city.orgName,
    };
  }

  /**
   * 当前城市门店列表
   */
  get projectList() {
    const all = iwant.array(this.resProjectList);
    setTimeout(() => {
      const active = this.projectScroll.querySelector<HTMLElement>(
        ".right.active"
      );
      console.log(2222);

      this.projectScroll.scrollTo(
        0,
        active?.offsetTop ? active?.offsetTop - 10 : 0
      );
    });
    return all.filter((item) => item.cityOrgId === this.currentCity.orgId);
  }

  /**
   * 设置门店
   */
  setProject(project: ProjectListItemReturn) {
    this.store.global.project = project;
    this.$emit("update:show", false);
  }

  /**
   * 滚动门店列表
   */
  scrollProject(revert: boolean) {
    this.projectScroll.scrollBy({ left: 0, top: revert ? -100 : 100 });
  }

  /**
   * 禁用滚动按钮
   */
  disabledScroll: "up" | "down" | null = "up";

  /**
   * 滚动门店列表事件
   */
  onScroll() {
    if (this.projectScroll.scrollTop <= 0) {
      this.disabledScroll = "up";
    } else if (
      this.projectScroll.scrollHeight - this.projectScroll.scrollTop <=
      this.projectScroll.clientHeight
    ) {
      this.disabledScroll = "down";
    } else {
      this.disabledScroll = null;
    }
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
/* 门店选择相关 */
.readonly {
  pointer-events: none;
}
.option-panel {
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
    /* fix shadow overflow */
    padding-right: 1px;
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

.scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  &__button {
    margin: 3px 0;
    width: 60px;
    height: 100px;
    font-size: 40px;
    color: #01f5f1;
    background: rgba(56, 196, 255, 0.3);
    backdrop-filter: blur(20px);
    cursor: pointer;
    border-radius: 2px;
    @extend %flex-center;
    &.disabled {
      background: rgba(56, 196, 255, 0.1);
      color: #3e6997;
    }
  }
}
</style>
