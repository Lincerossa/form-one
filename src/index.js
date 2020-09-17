import React from 'react'
import ReactDOM from 'react-dom'

import { StyleProvider} from './providers'
import Routes from './Routes'

const App = () => (
  <StyleProvider>
    <Routes />
  </StyleProvider>
);

ReactDOM.render(<App />, document.getElementById('root'))
