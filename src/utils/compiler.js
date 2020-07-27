import markdownIt from 'markdown-it'
import prism from 'prismjs'
import katex from 'markdown-it-katex'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import { escapeHtml, unescapeAll } from 'markdown-it/lib/common/utils'
const md = markdownIt({
  linkify: true,
  highlight: function (codeString, lang, line) {
    const codeHtml = prism.languages[lang]
      ? prism.highlight(codeString, prism.languages[lang], lang)
      : codeString

    return `<pre class="source-line" data-line="${line}"><code class="language-${lang}">${codeHtml}</code></pre>`
  }
})

md.use(katex, { throwOnError : false })

// add source line
md.renderer.rules.paragraph_open = injectLineNumbers;
md.renderer.rules.heading_open = injectLineNumbers;
md.renderer.rules.table_open = injectLineNumbers;
md.renderer.rules.list_item_open = injectLineNumbers;
md.renderer.rules.hr = injectLineNumbers;


// https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js
md.renderer.rules.fence = (tokens, idx, options) => {
  const token = tokens[idx]
  const info = token.info ? unescapeAll(token.info).trim() : '';
  const langName = info ? info.split(/\s+/g)[0] : ''
  const line = token.map ? token.map[0] : undefined
  const highlighted = options.highlight(token.content, langName, line) || escapeHtml(token.content);

  return highlighted + '\n';
}

// https://github.com/markdown-it/markdown-it/blob/5789a3fe9693aa3ef6aa882b0f57e0ea61efafc0/support/demo_template/index.js
function injectLineNumbers(tokens, idx, options, env, slf) {
  if (tokens[idx].map) {
    const line = tokens[idx].map[0];
    tokens[idx].attrJoin('class', 'source-line');
    tokens[idx].attrSet('data-line', line);
  }

  return slf.renderToken(tokens, idx, options, env, slf);
}



export default md
