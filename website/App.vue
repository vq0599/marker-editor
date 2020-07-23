<template>
  <marker-editor v-model="value" />
</template>

<script>
import MarkerEditor from '../src/index'
import { defaultValue } from './demo'

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