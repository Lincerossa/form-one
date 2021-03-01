import React from 'react'
import Input from 'antd/lib/input';

const { TextArea } = Input;

export default (props) => <TextArea {...props} onChange={(e) => props.onChange(e.target.value)} />

