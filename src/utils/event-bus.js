import Vue from 'vue'

export const eventBus = new Vue()


export const eventTypes = {
  previewerScrollTo: 'previewScrollTo',
  editorScrollTo: 'editorScrollTo',
}