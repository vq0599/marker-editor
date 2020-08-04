<template>
  <div class="mkd-nav">
    <div class="mkd-nav-edit">
      <button
        v-for="({ key, label }) in actions"
        :key="key"
        class="mkd-nav-btn"
        :title="label"
        @click="onAction(key)"
      >
        <icon :name="key" />
      </button>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
import { Actions, ActionsEnum } from '../utils/constants'
import cmeditor from '../utils/editor-action'

export default {
  components: {
    Icon,
  },
  data() {
    return {
      actions: Actions
    }
  },
  methods: {
    onAction(key) {
      switch (key) {
      case ActionsEnum.Bold:
      case ActionsEnum.Italic:
        cmeditor.insertInline(key)
        break;
      default:
        break;
      }
    },
  }
}
</script>

<style lang="scss">
.mkd-nav {
  height: 40px;
  padding: 0 8px;
  background: #444;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-edit {
    display: flex;
  }

  &-btn {
    outline: 0;
    background: none;
    border: none;
    cursor: pointer;
    height: 28px;
    width: 28px;
    & + & {
      margin-left: 10px;
    }

    &:hover {
      svg {
        color: #fff;
      }
    }

    svg {
      transition: .2s;
      font-size: 16px;
      color: #ccc;
    }
  }
}
</style>