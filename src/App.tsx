import React from 'react';

import { useSelector } from 'react-redux';
import { EuiPage } from '@elastic/eui';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { AppState } from './reducers';

import About from './pages/About';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import Login from './pages/Login';
import Logout from './pages/Logout';
import GpaCalc from './pages/GpaCalc';
import Signup from './pages/Signup';

function App(): React.ReactElement {
  const user = useSelector((state: AppState) => state.user);

  return (
    <Router>
      <div>
        <nav>
          {user.isLoggedIn ? (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/syllabus">Syllabus</Link>
              </li>
              <li>
                <Link to="/gpacalc">GPA Calculator</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </nav>
        <EuiPage>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/syllabus">
              <Syllabus />
            </Route>
            <Route path="/gpacalc">
              <GpaCalc />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/signup">
              <Signup />
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
