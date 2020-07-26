<template>
  <div
    class="mkd-previewer"
    v-html="html"
  />
</template>

<script>
import '../assets/style/github-markdown.css'
import compiler from '../utils/compiler'

export default {
  props: {
    value: {
      type:String,
      default: ''
    },
  },
  computed: {
    html() {
      return compiler.render(this.value)
    }
  },
  mounted() {


  }
}
</script>

<style lang="scss">
.mkd-previewer {
  padding: 8px 16px;
  border-left: 2px solid #eee;
  word-break: break-all;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #eee;
    border-radius: 3px;
  }
}
</style>