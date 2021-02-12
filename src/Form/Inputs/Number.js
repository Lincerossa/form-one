import React from 'react'
import { Input } from 'antd'

export default (props) => <Input type="number" {...props} onChange={(e) => props.onChange(e.target.value)} />
