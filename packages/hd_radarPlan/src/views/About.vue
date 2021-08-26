<template>
  <div class="clues">
    <img src="../assets/Goyoo-banner.png" alt="" class="clues-img" />
    <img src="../assets/clues-ready.png" alt="" class="clues-ready-top" />
    <div class="each-clue">
      <div class="clues-name">楼宇位置</div>
      <div class="clues-content">北京朝阳区安贞路安贞大厦</div>
      <div class="clues-name">租赁区域</div>
      <div class="clues-content">1500m²</div>
      <div class="clues-name">业务联系人</div>
      <div class="clues-content">顾里 15888888888</div>
      <img src="../assets/clues-all.png" alt="" class="clues-all" />
    </div>
    <div class="each-clue">
      <div class="clues-name">楼宇位置</div>
      <div class="clues-content">北京朝阳区安贞路安贞大厦</div>
      <div class="clues-name">租赁区域</div>
      <div class="clues-content">1500m²</div>
      <div class="clues-name">业务联系人</div>
      <div class="clues-content">顾里 15888888888</div>
      <img src="../assets/clues-all.png" alt="" class="clues-all" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'clue',
  data() {
    return {
      age: '轩辕秦风',
    };
  },
  created() {
    this.getInitClues();
  },
  methods: {
    getInitClues() {
      // 该页面背景颜色应该为一个图片！！！！
    },
  },
};
</script>
<style lang="less">
.clues {
  height: 100%;
  flex-direction: row;
  background: #072E6F;
  position: relative;
  padding-top: 45px;
  .clues-img {
    width: 87px;
    height: 18px;
    position: absolute;
    left: 18px;
    top: 20px;
  }
  .clues-ready-top {
    display: block;
    width: 140px;
    height: 60px;
    margin: 0 auto;
  }
  .each-clue {
    width: 299px;
    height: 126px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 14px 0px rgba(93, 151, 242, 1) inset;
    border-radius: 4px;
    margin: 20px auto;
    padding: 20px 23px;
    position: relative;
    .clues-name {
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      color: #666666;
      font-family: 'PingFangSC-Regular,PingFang SC';
      font-weight: 400;
    }
    .clues-content {
      height: 20px;
      line-height: 20px;
      color: #333333;
      font-size: 14px;
      font-weight: 400;
      font-family: 'PingFangSC-Regular,PingFang SC';
      margin-bottom: 10px;
    }
    .clues-all {
      width: 47px;
      height: 47px;
      position: absolute;
      right: 18px;
      bottom: 18px;
    }
  }
}
</style>
