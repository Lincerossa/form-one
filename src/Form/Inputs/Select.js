import React from 'react'
import Select from 'antd/lib/select';

export default (props) => {
  const { items, style } = props
  if (!items || !items.length) return null

  return (
    <Select
      style={style || { width: '100%' }}
      {...props}
    >
      {
        // eslint-disable-next-line no-shadow
        items.map(({ label, items, value }) => {
          if (items && items.length) {
            return (
              <Select.OptGroup label={label} key={items.length}>
                {
                  // eslint-disable-next-line no-shadow
                  items.map(({ value, label }) => <Select.Option key={value} value={value}>{label}</Select.Option>)
                }
              </Select.OptGroup>
            )
          }
          return <Select.Option key={value} value={value}>{label}</Select.Option>
        })
      }
    </Select>
  )
}
