<template>
  <marker-editor
    v-model="value"
  />
  <!-- previewer-class="markdown-next" -->
</template>

<script>
import MarkerEditor from '../../src/index'
import { defaultValue } from '../utils/demo'
import '../../src/assets/style/github-markdown.css'

export default {
  components: {
    MarkerEditor,
  },
  data() {
    return {
      value: defaultValue,
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>