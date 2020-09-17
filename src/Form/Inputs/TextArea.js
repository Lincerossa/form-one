import React from 'react'
import { Input } from 'antd';

const { TextArea } = Input;

export default (props) => <TextArea {...props} onChange={(e) => props.onChange(e.target.value)} />

