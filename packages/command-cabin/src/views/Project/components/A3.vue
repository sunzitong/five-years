<template>
  <div class="box">
    <van-row class="title">
      <van-col span="12" class="th">姓名</van-col>
      <van-col span="12" class="th">角色</van-col>
    </van-row>
    <van-row v-for="(item, index) in list" :key="index" class="row">
      <van-col span="12" class="td name">
        {{ item.name }}
        <div class="icon">
          <Icon
            type="call"
            color="#7BE7A1"
            @click.native="phoneIndex = index"
          />
          <transition name="fade">
            <div class="phone" v-if="phoneIndex === index">13333333333</div>
          </transition>
        </div>
      </van-col>
      <van-col span="12" class="td role">{{ item.role }}</van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";

@Component({
  components: { Icon },
})
export default class A3 extends Vue {
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
  width: 764px;
  height: 300px;
  box-sizing: border-box;
  font-family: PingFang SC;
  font-size: 30px;
  color: #fff;
  text-align: center;
  position: relative;
}
.title {
  background: #24386d;
  font-size: 30px;
  color: $light;
  line-height: 74px;
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
