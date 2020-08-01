<template>
  <div
    ref="$"
    class="mkd-previewer"
    @scroll="onScroll"
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
  scrollLock: false,
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
      const html = compiler.render(this.value)
      return html
    },
    $previewer() {
      return this.$refs.$
    }
  },
  mounted() {
    this.initScrollListener()
  },
  methods: {
    initScrollListener() {
      eventBus.$on(eventTypes.previewerScrollTo, debounce(this.scrollToLine, 10))
    },
    clearScrollLock: debounce(function () {
      this.scrollLock = false
    }, 300),
    scrollToLine({ line, percent }) {

      this.scrollLock = true
      let currentLine = line
      /**
       * 一般情况：源码行数第L行 -> 滚动到预览对应的data-line=L就好~
       * 一些特殊的语法，源码有N行, 预览时却只会有一个节点。比如代码块：
       * 源码：从10行开始，15行结束，滚动位置L = 12
       * 渲染节点：<pre data-line="10", data-line-count="5"></pre>
       * 此时就不存在data-line="12"的节点，而是渲染向上寻找data-line="11"、data-line="10"...
       * percent为单行的滚动比值，根据data-line-count="5"换算成整个源码块的滚动比值
       */
      while (currentLine >= 0) {
        const $line = this.$refs.$.querySelector(`.source-line[data-line='${currentLine}']`)
        if ($line) {
          const lineCount = parseInt($line.dataset.lineCount) || 1
          const blockPercent = (percent + (line - currentLine)) / lineCount

          // 无对应内容的空行
          if (currentLine + lineCount - 1 < line) return
          const scrollY = $line.offsetTop + ($line.clientHeight * blockPercent)

          animateScrollTo(scrollY, { elementToScroll: this.$refs.$ })
          currentLine = -1
        } else {
          currentLine --
        }
      }

      this.clearScrollLock()
    },
    onScroll() {
      if (this.scrollLock) return
      const scrollTop = this.$previewer.scrollTop
      const $lines = this.$previewer.querySelectorAll('.source-line')

      for (let i = 0; i < $lines.length; i++) {
        const $line = $lines[i];
        const lineHeight = $line.offsetHeight
        const lineTop = $line.offsetTop
        const lineBottom = $line.offsetTop + lineHeight

        if (scrollTop >= lineTop && scrollTop <= lineBottom) {
          const currentLine = parseInt($line.dataset.line)
          const lineCount = parseInt($line.dataset.lineCount) || 1
          const blockPercent = (scrollTop - lineTop) / lineHeight
          const sourcePercent = blockPercent * lineCount + currentLine
          const percent = sourcePercent % 1
          const line = sourcePercent - percent
          eventBus.$emit(eventTypes.editorScrollTo, { line, percent })
          break;
        }

        // 减少无效渲染
        if (lineTop > scrollTop) break
      }
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