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
          <van-row
            v-for="(item, index) in list"
            :key="index"
            class="row"
            animated
          >
            <van-col span="8" class="td name">
              {{ item.name }}
              <div class="icon">
                <Icon
                  type="call"
                  color="#7BE7A1"
                  @click.native="phoneIndex = index"
                />
                <transition name="fade">
                  <div class="phone" v-if="phoneIndex === index">
                    13333333333
                  </div>
                </transition>
              </div>
            </van-col>
            <van-col span="8" class="td">{{ item.role }}</van-col>
            <van-col span="8" class="td">{{ item.role }}</van-col>
          </van-row>
        </template>
      </Animationend>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import Animationend from "@/components/Animationend/Index.vue";

@Component({
  components: { Icon, Animationend },
})
export default class A4 extends Vue {
  phoneIndex = -1;
  list = [
    { name: "方唐镜", role: "C6", showPhone: false },
    { name: "方唐镜", role: "C6", showPhone: false },
    { name: "方唐镜", role: "C6", showPhone: false },
    { name: "方唐镜", role: "C6", showPhone: false },
  ];
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
