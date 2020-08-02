<template>
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    class="mkd-icon"
    :name="name"
    :style="{ fontSize: size }"
    v-html="html"
  />
</template>>
<script>
import iconInner from '../utils/icon-inner'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: undefined,
    }
  },
  computed: {
    html() {
      return iconInner[this.name]
    }
  }
}
</script>

<style lang="scss">
.mkd-icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>