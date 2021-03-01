import React from 'react'
import TreeSelect from 'antd/lib/tree-select'

const { SHOW_PARENT } = TreeSelect

export default (props) => {
  const { items, style } = props
  if (!items || !items.length) return null

  const tProps = {
    treeData: items,
    showCheckedStrategy: SHOW_PARENT,
    style: style || { width: '100%' },
    treeCheckable: true,
    showSearch: true,
    treeNodeFilterProp: "title",
    ...props,
  }

  return <TreeSelect {...tProps} />
}
