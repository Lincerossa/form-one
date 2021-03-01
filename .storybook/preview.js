import React from 'react';

import { ThemeProvider   } from 'styled-components';
import theme from '../styles/theme'
import GlobalStyle from '../styles/global'


export const decorators = [
  (Story) => (
    <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
    </>
  ),
];