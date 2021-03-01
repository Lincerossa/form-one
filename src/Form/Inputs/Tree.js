import React from 'react'
import styled from 'styled-components'
import Tree from 'antd/lib/tree';

export default (props) => {
  const { items, value } = props
  return (
    <TreeWrapper>
      <Tree
        {...props}
        treeData={items}
        defaultCheckedKeys={value}
        checkable
      />
    </TreeWrapper>
  )
};


const TreeWrapper = styled.div`
  .site-tree-search-value {
    color: #f50;
  }
`
