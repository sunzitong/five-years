<template>
  <div class="">
      <div class="toast">
        <span>{{title==''?"1234":title}}</span>
      </div>
  </div>
</template>

<script>
import '../style/reset.css';
// import Vue from 'vue'
export default {
  name: 'Toast',
  data(){
    return{
      // title: '1234'
    }
  },
  props:["title"],

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.toast{
  position: fixed;
  left: 50%;
  top: 46%;
  transform: translate(-50%, -50%);
  width: 100%;;
  box-sizing: border-box;
  text-align: center;
  z-index: 200;
  span{
    background: rgba(0,0,0,0.5);
    padding: 10px 20px;
    color: #fff;
    font-size: 16px;
    margin: 20px;
    display: inline-block;
    border-radius: 3px;
  } 
}
  
  
</style>
