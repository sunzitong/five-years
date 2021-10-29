<template>
  <div class="about">
    <cube-button>About</cube-button>
    <h1 @click="add">This is an about page</h1>
  </div>
</template>
<script>
  // @ is an alias to /src

  export default {
    name: 'About',
    components: {
    },
    data() {
      return {
        num: 0
      }
    },
    methods: {
      add() {
        this.num++
      }
    }
  }
</script>
