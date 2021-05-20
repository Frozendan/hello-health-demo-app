import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.scss';

import Table from './components/table'
import Counter from './components/counter'


function App() {
  return (
    <div className="App">
       <Router>
        <nav>
            <ul>
              <li>
                <Link to="/">Table</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/" component={Table} />
              <Route exact path="/counter" component={Counter} />
            </Switch>
         </Router>
    </div>
  );
}

export default App;
