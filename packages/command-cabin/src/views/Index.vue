<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Index extends Vue {
  created() {
    // 禁止返回退出系统
    this.$router.push("/home");
  }
  render() {
    /* */
  }
}
</script>
