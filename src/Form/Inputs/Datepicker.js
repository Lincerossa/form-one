import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

export default (props) => {
  const { value, style, defaultValue } = props
  return (
    <DatePicker
      {...props}
      value={value && moment(value)}
      defaultValue={defaultValue && moment(defaultValue)}
      style={style || { width: '100%' }}
    />
  )
}
