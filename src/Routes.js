import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Root from './views/Root'

export default () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={Root} />
    </Switch>
  </HashRouter>
);