<template>
  <div class="city-list-box">
    <h3><i class="map-icon"></i>{{cityName}}<span>当前城市</span></h3>
    <ul class="city-list">
      <li
        v-for="city in cityList"
        :key="city.id"
        @click="switchCity(city)">
        {{city.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'cityList',
  props: {
    cityList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    cityName: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  methods: {
    switchCity(city) {
      this.$emit('switchCity', city);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.city-list-box {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100%;
  height: 100%;
  background: #E5E5E5;
  overflow-y: scroll;
  h3 {
    font-size: 20px;
    line-height: 60px;
    color: #333333;
    font-weight: bold;
    padding: 0 16px;
    background: #ffffff;
    margin-bottom: 10px;
    i {
      width: 27px;
      height: 27px;
      display: inline-block;
      background: url(../assets/map-icon.png) 0 0 no-repeat;
      background-size: 27px 27px;
      vertical-align: -6px;
      margin-right: 5px;
    }
    span {
      font-size: 14px;
      color: #666666;
      font-weight: normal;
      padding-left: 10px;
    }
  }
  ul {
    background: #ffffff;
    box-sizing: border-box;
    padding: 0 20px;
    li {
      font-size: 17px;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08);
      line-height: 50px;
    }
  }
}
</style>
