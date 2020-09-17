import React from 'react'
import { Checkbox } from 'antd'

export default (props) => {
  const { items } = props
  if (!items || !items.length) return null

  return (
    <Checkbox.Group {...props}>
      {items.map((item) => <Checkbox key={item.value} {...item}>{item.label}</Checkbox>)}
    </Checkbox.Group>
  )
}
