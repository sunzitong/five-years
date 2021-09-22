<template>
  <SelectWrap :value="store.global.orgTree.orgName" :title="$attrs.title">
    <template v-slot="{ active, toggle }">
      <OriTheOrgTree :show="active" @update:show="toggle(false)" />
    </template>
  </SelectWrap>
</template>

<script lang="ts">
import { Base } from "@/views/Base";
import { Component, Prop } from "vue-property-decorator";
import { default as OriTheOrgTree } from "../OptionPanel/TheOrgTree.vue";
import SelectWrap from "./SelectWrap.vue";

@Component({
  components: { OriTheOrgTree, SelectWrap },
  inheritAttrs: false,
})
export default class TheOrgTree extends Base {
  @Prop() value!: string;
}
</script>
