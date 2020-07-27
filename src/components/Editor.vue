<template>
  <div
    ref="editer"
    class="mkd-editor"
  />
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'
import { eventBus, eventTypes } from '../utils/event-bus'

export default {
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
  cm: null,
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.cm = CodeMirror(this.$refs.editer, {
        value: this.value,
        mode:  "markdown",
        tabSize: 2,
        lineWrapping: true,
        scrollbarStyle: 'overlay', // overlay
        autofocus: this.autofocus,
      });

      this.cm.on('change', () => {
        const value = this.cm.doc.getValue()
        this.$emit('input', value)
      })

      this.cm.on('scroll', () => {
        const { top: scrollTop } = this.cm.getScrollInfo()
        const targetLine = this.cm.lineAtHeight(scrollTop, 'local');
        const { top: lineTop } = this.cm.charCoords({ line: targetLine, ch: 0 }, 'local')
        const { height: lineHeight } = this.cm.getLineHandle(targetLine);

        eventBus.$emit(eventTypes.scrollTo, {
          line: targetLine,
          percent: (scrollTop - lineTop) / lineHeight
        })
      })
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