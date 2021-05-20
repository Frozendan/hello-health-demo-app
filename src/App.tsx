import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import './App.scss';

import CounterPage from './pages/counter-page'
import TablePage from './pages/table-page'


function App() {
  return (
    <div className="App">
       <Router>
        
        <nav>
          <div className='container'>
              <ul className='nav-links'>
                <li>
                  <NavLink exact  activeClassName='is-active' to="/">Table</NavLink>
                </li>
                <li>
                  <NavLink exact  activeClassName='is-active' to="/counter">Counter</NavLink>
                </li>
              </ul>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={TablePage} />
          <Route exact path="/counter" component={CounterPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
