export const ActionsEnum = {
  Bold: 'bold',
  Italic: 'italic',
  Blockquote: 'blockquote',
  Image: 'image',
  Link: 'link',
  OrderedList: 'ordered-list',
  UnorderedList: 'unordered-list',
  TaskList: 'task-list',
  Table: 'table',
}

export const Actions = [
  { key: ActionsEnum.Bold, label: '加粗' },
  { key: ActionsEnum.Italic, label: '斜体' },
  { key: ActionsEnum.Blockquote, label: '引用' },
  { key: ActionsEnum.Image, label: '图片' },
  { key: ActionsEnum.Link, label: '链接' },
  { key: ActionsEnum.OrderedList, label: '有序列表' },
  { key: ActionsEnum.UnorderedList, label: '无序列表' },
  { key: ActionsEnum.TaskList, label: '任务列表' },
  { key: ActionsEnum.Table, label: '表格' },
]