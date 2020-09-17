import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
      box-sizing: border-box;
  }
`

export default ({children}) => <>
  <GlobalStyle />
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
</>