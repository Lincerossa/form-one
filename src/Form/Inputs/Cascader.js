import React from 'react'
import { Cascader } from 'antd'

function filter(inputValue, path) {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}

export default (props) => {
  const { items } = props
  if (!items || !items.length) return null

  return (
    <Cascader
      options={items}
      showSearch={{ filter }}
      {...props}
    />
  )
}
