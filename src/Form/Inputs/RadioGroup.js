import React from 'react'
import { Radio } from 'antd'

export default (props) => {
  const { items, onChange } = props
  if (!items || !items.length) return null

  return (
    <Radio.Group
      {...props}
      onChange={(e) => onChange(e.target.value)}
    >
      {items.map((item) => <Radio key={item.value} {...item}>{item.label}</Radio>)}
    </Radio.Group>
  )
}
