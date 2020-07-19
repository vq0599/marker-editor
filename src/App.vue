<template>
  <div
    class="mkd"
    :style="{ height }"
  >
    <mkd-nav />
    <div class="mkd-body">
      <mkd-editor
        :value="value"
        :autofocus="autofocus"
        @input="v => $emit('input', v)"
      />
      <mkd-previewer
        :value="value"
        :class="previewerClass"
      />
    </div>
  </div>
</template>

<script>
import MkdEditor from './components/Editor'
import MkdPreviewer from './components/Previewer'
import MkdNav from './components/Nav'

export default {
  components: {
    MkdNav,
    MkdEditor,
    MkdPreviewer,
  },
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
    height: {
      type: [String, Number],
      default: '100vh',
    },
    previewerClass: {
      type: String,
      default: 'markdown-body'
    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>

<style lang="scss">
.mkd {
  * {
    box-sizing: border-box;
  }
  font-size: 14px;

  &-body {
    height: calc(100% - 40px);
    display: flex;
  }

  &-editor,
  &-previewer {
    width: 50%;
  }
}
</style>