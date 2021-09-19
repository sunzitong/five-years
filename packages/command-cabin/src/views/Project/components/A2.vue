<template>
  <Spin class="box" :loading="loading">
    <van-tabs v-model="active">
      <van-tab
        v-for="(group, name) in response"
        :key="name"
        :title="group.title"
        :name="name"
      >
        <div class="content">
          <van-row class="title">
            <van-col
              v-for="col in group.cols"
              :key="col.value"
              :span="group.span"
              class="th"
            >
              {{ col.text }}
            </van-col>
          </van-row>
          <div class="list">
            <Animationend
              :height="270"
              :dataSource="group.list"
              :scrollMinCount="3"
            >
              <template v-slot="{ list }">
                <van-row
                  v-for="item in list"
                  :key="item.id"
                  class="row"
                  animated
                >
                  <van-col
                    v-for="col in group.cols"
                    :key="col.value"
                    :span="group.span"
                    class="td name"
                  >
                    <template v-if="col.value === 'person'">
                      <div class="person">
                        {{ formatValue(item[col.value]) }}
                      </div>
                      <div class="icon" @click.stop="telClick(item)">
                        <Icon type="call" color="#7BE7A1" :size="54" />
                        <BlurBox
                          class="tel-tips value__letter"
                          :height="70"
                          v-if="item.id == telId"
                        >
                          {{ sepNumber(item.tel, " ", 4) }}
                        </BlurBox>
                      </div>
                    </template>
                    <template v-else>
                      {{ formatValue(item[col.value]) }}
                    </template>
                  </van-col>
                </van-row>
              </template>
            </Animationend>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import Animationend from "@/components/Animationend/Index.vue";
import { Base, IFetch } from "@/views/Base";
import { iwant, uuid } from "@guanyu/shared";
import {
  fetchGroupInfo,
  Group,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation/groupInfo";
import BlurBox from "@/components/BlurBox/Index.vue";
import { StoreKey, useStore } from "@/store";

type Item = Group & { id: string };

@Component({
  components: { Icon, Animationend, BlurBox },
})
export default class A2 extends Base implements IFetch {
  /**
   * 经营团队
   * 设计团队
   * 施工团队
   */
  active = "businessGroups";

  response = {
    businessGroups: {
      title: "经营团队",
      list: [] as Item[],
      span: 12,
      cols: [
        {
          value: "person",
          text: "姓名",
        },
        {
          value: "specialty",
          text: "角色",
        },
      ],
    },
    designGroups: {
      title: "设计团队",
      list: [] as Item[],
      span: 8,
      cols: [
        {
          value: "person",
          text: "姓名",
        },
        {
          value: "specialty",
          text: "专业",
        },
        {
          value: "company",
          text: "单位",
        },
      ],
    },
    constructGroups: {
      title: "施工团队",
      list: [] as Item[],
      span: 8,
      cols: [
        {
          value: "person",
          text: "姓名",
        },
        {
          value: "specialty",
          text: "专业",
        },
        {
          value: "company",
          text: "单位",
        },
      ],
    },
  };

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchGroupInfo, {
      key: StoreKey.ProjectGroupInfo,
      params: { phId: this.store.global.project.phId },
    });
    if (response?.status === "ok") {
      for (const key in this.response) {
        const list = iwant
          .array(response.data[key])
          .map((item) => ({ ...item, id: uuid() }));
        this.response[key].list = list;
      }
    }
    return response;
  }

  telId = "";

  mounted() {
    this.$root.$el.addEventListener("click", this.telClear);
  }

  beforeDestroy() {
    this.$root.$el.removeEventListener("click", this.telClear);
  }

  telClick(item: Item) {
    this.telId = item.id;
  }

  telClear() {
    this.telId = "";
  }
}
</script>
<style lang="scss" scoped>
.box {
  color: #90a4c3;
  ::v-deep {
    .van-tabs__wrap {
      height: auto;
    }
    .van-tabs__nav {
      background: none;
      height: 92px;
    }
    .van-tab {
      flex: 0 0 264px;
      color: #90a4c3;
      &--active {
        color: #5180e4;
        background: linear-gradient(
          180deg,
          rgba(83, 214, 255, 0) 0%,
          rgba(81, 128, 228, 0.1) 100%
        );
      }
    }
    .van-tab__text {
      font-size: 40px;
      line-height: 1;
    }
    .van-tabs__line {
      height: 2px;
      background: #5180e4;
      width: 264px;
      box-shadow: 0px 0px 10px rgba(81, 128, 228, 0.6);
    }
  }
}

.content {
  position: relative;
  margin-top: 20px;
  border-radius: 0 0 14px 14px;
  font-size: 40px;
  text-align: center;
}
.title {
  background: #0e173c;
  color: #fff;
  line-height: 74px;
}
.list {
  height: 270px;
  overflow: auto;
}
.th,
.td {
  @extend %flex-center;
  height: 90px;
}
.row {
  &:nth-child(odd) {
    background: rgba(14, 23, 60, 0.3);
  }
  &:nth-child(even) {
    background: rgba(14, 23, 60, 0.8);
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
