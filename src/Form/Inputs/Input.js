import React from 'react'
import Input from 'antd/lib/input'

export default (props) => <Input {...props} onChange={(e) => props.onChange(e.target.value)} />
