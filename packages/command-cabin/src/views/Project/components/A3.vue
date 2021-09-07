<template>
  <div class="box">
    <van-row class="title">
      <van-col span="12" class="th">姓名</van-col>
      <van-col span="12" class="th">角色</van-col>
    </van-row>
    <div class="list">
      <Animationend :height="224" :dataSource="list" :scrollMinCount="3">
        <template v-slot="{ list }">
          <van-row
            v-for="(item, index) in list"
            :key="index"
            class="row"
            animated
          >
            <van-col span="12" class="td name">
              {{ item.person }}
              <div class="icon">
                <Icon
                  type="call"
                  color="#7BE7A1"
                  @click.native="phoneIndex = phoneIndex === index ? -1 : index"
                />
                <transition name="fade">
                  <div class="phone" v-if="phoneIndex === index">
                    {{ item.tel }}
                  </div>
                </transition>
              </div>
            </van-col>
            <van-col span="12" class="td role">{{ item.specialty }}</van-col>
          </van-row>
        </template>
      </Animationend>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import Animationend from "@/components/Animationend/Index.vue";
import Base from "@/views/Base";
import { iwant } from "@guanyu/shared";
import {
  fetchGroupInfo,
  GroupInfoReturn,
} from "@/service/bigScreen/projectBoard/basicInformation/groupInfo";

@Component({
  components: { Icon, Animationend },
})
export default class A3 extends Base {
  phoneIndex = -1;
  list: GroupInfoReturn["businessGroups"] = [];
  async created() {
    const response = await fetchGroupInfo({
      projectId: this.store.global.projectId,
    });
    if (response?.status === "ok") {
      this.list = iwant.array(response.data.businessGroups);
    }
  }
}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
.box {
  position: relative;
  width: 764px;
  height: 300px;
  margin-top: 16px;
  border-radius: 0 0 14px 14px;
  overflow: hidden;
  font-family: PingFang SC;
  font-size: 30px;
  color: #fff;
  text-align: center;
}
.title {
  background: #24386d;
  font-size: 30px;
  color: $light;
  line-height: 74px;
}
.list {
  height: 224px;
  overflow: auto;
}
.th,
.td {
  border-right: 1px solid #3e5290;
  @extend %flex-center;
  height: 74px;
  &:nth-last-child(1) {
    border: none;
  }
}
.row {
  border-bottom: 1px solid #3e5290;
  &:nth-last-child(1) {
    border: none;
  }
}
.icon {
  display: flex;
  margin-left: 10px;
  position: relative;
  .phone {
    position: absolute;
    left: 0;
    bottom: 100%;
  }
}
.fade-enter-active {
  animation: fadeIn 1s;
}
.fade-leave-active {
  animation: fadeOut 1s;
}
</style>
