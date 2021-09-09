<template>
  <div class="box">
    <van-row class="title">
      <van-col span="8" class="th">姓名</van-col>
      <van-col span="8" class="th">专业</van-col>
      <van-col span="8" class="th">角色</van-col>
    </van-row>
    <div class="list">
      <Animationend :height="224" :dataSource="list" :scrollMinCount="3">
        <template v-slot="{ list }">
          <van-row v-for="item in list" :key="item.id" class="row" animated>
            <van-col span="8" class="td name">
              <div class="person">
                {{ item.person }}
              </div>
              <div class="icon" @click.stop="telClick(item)">
                <Icon type="call" color="#7BE7A1" />
                <BlurBox
                  class="tel-tips value__letter"
                  :height="70"
                  v-if="item.id == telId"
                >
                  {{ sepNumber(item.tel, " ", 4) }}
                </BlurBox>
              </div>
            </van-col>
            <van-col span="8" class="td">{{ item.specialty }}</van-col>
            <van-col span="8" class="td">{{ item.company }}</van-col>
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
import { iwant, uuid } from "@guanyu/shared";
import {
  fetchGroupInfo,
  Group,
} from "@/service/bigScreen/projectBoard/basicInformation/groupInfo";
import BlurBox from "@/components/BlurBox/Index.vue";

type Item = Group & { id: string };

@Component({
  components: { Icon, Animationend, BlurBox },
})
export default class A4 extends Base {
  telId = "";
  list: Item[] = [];
  async created() {
    const response = await fetchGroupInfo({
      projectId: this.store.global.projectId,
    });
    if (response?.status === "ok") {
      this.list = iwant
        .array(response.data.businessGroups)
        .map((item) => ({ ...item, id: uuid() }));
    }
  }

  mounted() {
    this.$root.$el.addEventListener("click", this.telClear);
  }

  unmounted() {
    this.$root.$el.removeEventListener("click", this.telClear);
  }

  telClick(item: Item) {
    this.telId = item.person;
  }

  telClear() {
    this.telId = "";
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
.person {
  min-width: 4em;
}
.icon {
  display: flex;
  margin-left: 10px;
  position: relative;
  .tel {
    position: absolute;
    left: 0;
    bottom: 100%;
  }
}
.tel-tips {
  position: absolute;
  left: 120%;
  top: 0;
  bottom: 0;
  margin: auto;
  &::v-deep {
    .app-blur-box__content {
      @extend %flex-center;
    }
  }
}
</style>
