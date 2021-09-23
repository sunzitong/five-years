<template>
  <div class="page">
    <div class="page__total">
      共
      <span>{{ total }}</span>
      页
    </div>
    <Paginate
      :page-count="total"
      container-class="page__paginate"
      :margin-pages="1"
      :page-range="5"
      :click-handler="clickCallback"
    >
      <template v-slot:prevContent>
        <div class="prev">
          <van-icon name="play" />
        </div>
      </template>
      <template v-slot:nextContent>
        <div class="next">
          <van-icon name="play" />
        </div>
      </template>
    </Paginate>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Paginate from "vuejs-paginate";

/**营造台账宽表 */
@Component({
  components: { Paginate },
})
export default class Page extends Vue {
  @Prop({ default: 0 }) total!: number;

  @Prop() value!: number;

  clickCallback(value: number) {
    this.$emit("change", value);
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  &__total {
    color: #fff;
    margin-right: 40px;
    span {
      margin: 0 0.5em;
    }
  }
}

.page__paginate {
  @extend %flex-center;
  font-size: 40px;
  color: #e4f8ff;
  .prev,
  .next {
    @extend %flex-center;
    width: 120px;
    height: 66px;
    background: #164569;
    backdrop-filter: blur(20px);
    color: #01f5f1;
    font-size: 32px;
    margin: auto 32px;
  }
  .prev {
    transform: rotate(180deg);
  }
  &::v-deep {
    li {
      margin: auto -10px;
      min-width: 3em;
      text-align: center;
    }
    .active {
      color: #01f5f1;
    }
    .disabled {
      .prev,
      .next {
        background: rgba(56, 196, 255, 0.1);
        color: #3e6997;
      }
      color: #3e6997;
    }
  }
}
</style>
