import React, { useState } from 'react';
import AutoComplete from 'antd/lib/auto-complete';

const { Option } = AutoComplete;

export default ({ onSearch, style, ...props }) => {
  const [results, setResults] = useState(null)

  async function handleSearch(value) {
    const data = await onSearch(value)
    setResults(data)
  }

  return (
    <AutoComplete style={style} onSearch={handleSearch} placeholder="input here" {...props}>
      {results && results.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </AutoComplete>
  )
}
