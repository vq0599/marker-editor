<template>
  <div
    ref="$"
    class="mkd-previewer"
    v-html="html"
  />
</template>

<script>
import '../assets/style/github-markdown.css'
import compiler from '../utils/compiler'
import { eventBus, eventTypes } from '../utils/event-bus'
import animateScrollTo from 'animated-scroll-to'
import debounce from 'lodash.debounce'

export default {
  props: {
    value: {
      type:String,
      default: ''
    },
  },
  data() {
    return {
      line: 0,
    }
  },
  computed: {
    html() {
      return compiler.render(this.value)
    }
  },
  mounted() {
    this.initScrollListener()
  },
  methods: {
    initScrollListener() {
      eventBus.$on(eventTypes.scrollTo, debounce(this.scrollToLine, 10))
    },
    scrollToLine({ line, percent }) {
      const $line = this.$refs.$.querySelector(`.source-line[data-line='${line}']`)
      if (!$line || percent < 0) return

      const scrollY = $line.offsetTop + $line.clientHeight * percent

      console.log(scrollY)

      animateScrollTo(scrollY, {
        elementToScroll: this.$refs.$,
      })
    }
  }
}
</script>

<style lang="scss">
.mkd-previewer {
  position: relative;
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