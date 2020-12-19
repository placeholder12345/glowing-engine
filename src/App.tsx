import React from 'react';
import { EuiPage } from '@elastic/eui';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';

function App(): React.ReactElement {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <EuiPage>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </EuiPage>
      </div>
    </Router>
  );
}

export default App;
