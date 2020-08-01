<template>
  <div
    ref="editer"
    class="mkd-editor"
  />
</template>

<script>
import CodeMirror from 'codemirror'
import { eventBus, eventTypes } from '../utils/event-bus'
import debounce from 'lodash.debounce'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'

export default {
  scrollLock: false,
  cm: null,
  scrollTimer: null,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.init()
    this.initScrollListener()
  },
  methods: {
    init() {
      this.cm = CodeMirror(this.$refs.editer, {
        value: this.value,
        mode:  "markdown",
        tabSize: 2,
        lineWrapping: true,
        scrollbarStyle: 'overlay',
        autofocus: this.autofocus,
      });

      this.cm.on('change', this.onChange)

      this.cm.on('scroll', this.onScroll)
    },
    clearScrollLock: debounce(function () {
      this.scrollLock = false
    }, 300),
    scrollToLine({ line, percent }) {
      this.scrollLock = true
      const { top: lineTop } = this.cm.charCoords({ line: line, ch: 0 }, 'local')
      const { height: lineHeight } = this.cm.getLineHandle(line);
      const scrollY = lineTop + lineHeight * percent

      this.cm.scrollTo(null, scrollY)

      this.clearScrollLock()
    },
    initScrollListener() {
      eventBus.$on(eventTypes.editorScrollTo, debounce(this.scrollToLine, 10))
    },
    onScroll() {
      if (this.scrollLock) return
      const { top: scrollTop } = this.cm.getScrollInfo()
      const line = this.cm.lineAtHeight(scrollTop, 'local');
      const lineTop = this.cm.charCoords({ line: line, ch: 0 }, 'local').top - 4 // 4?: editor顶部的padding
      const { height: lineHeight } = this.cm.getLineHandle(line);
      const percent = (scrollTop - lineTop) / lineHeight
      eventBus.$emit(eventTypes.previewerScrollTo, { line, percent })
    },
    onChange() {
      const value = this.cm.doc.getValue()
      this.$emit('input', value)
    }
  },
}
</script>

<style lang="scss">
.mkd-editor {
  padding-left: 8px;
  .CodeMirror {
    height: 100%;
    overflow-y: hidden;

    .CodeMirror-overlayscroll-horizontal div, .CodeMirror-overlayscroll-vertical div {
      background: #eee;
    }
  }
}
</style>