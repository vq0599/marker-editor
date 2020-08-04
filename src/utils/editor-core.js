import CodeMirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'

import { ActionsEnum } from './constants'

const patterns = {
  [ActionsEnum.Bold]: {
    prefix: '**',
    suffix: '**',
  },
  [ActionsEnum.Italic]: {
    prefix: '*',
    suffix: '*',
  },
}




const defaultOptions = {
  mode:  "markdown",
  tabSize: 2,
  lineWrapping: true,
  scrollbarStyle: 'overlay',
}

class CMEditor {
  // ins = null;

  init($el, options) {
    const useOptions = Object.assign(defaultOptions, options)
    this.ins = CodeMirror($el, useOptions);
  }

  insertInline(key) {
    const pattern = patterns[key]
    const selection = this.ins.doc.getSelection()
    const { line: startLine, ch: startCh } = this.ins.doc.getCursor('from')
    const { line: endLine, ch: endCh } = this.ins.doc.getCursor('to')

    const cursorBeforeText = this.ins.doc.getRange(
      { line: startLine, ch: startCh - pattern.prefix.length },
      { line: startLine, ch: startCh },
    )

    const cursorAfterText = this.ins.doc.getRange(
      { line: endLine, ch: endCh },
      { line: endLine, ch: endCh + pattern.suffix.length },
    )

    // 取消选中
    if (pattern.prefix === cursorBeforeText && pattern.suffix === cursorAfterText) {
      this.ins.doc.replaceRange(
        selection,
        { line: startLine, ch: startCh - pattern.prefix.length },
        { line: endLine, ch: endCh + pattern.suffix.length },
      )

      this.ins.doc.setSelection(
        { line: startLine, ch: startCh - pattern.prefix.length },
        { line: endLine, ch: endCh - pattern.prefix.length },
      )
    } else {
      this.ins.doc.replaceSelection(`${pattern.prefix}${selection}${pattern.suffix}`)
      this.ins.doc.setSelection(
        { line: startLine, ch: startCh + pattern.prefix.length },
        { line: endLine, ch: endCh + pattern.prefix.length },
      )
    }
    this.ins.focus()
  }
}

export default new CMEditor()