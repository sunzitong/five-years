<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import growingio from '../utils/gio'
export default {
  beforeMount () {
    growingio()
  }
}
</script>
