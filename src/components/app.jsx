import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import HomeComponent from './home';

require('../styles/app.css');

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.urlName}</h3>
  </div>
);

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/view/:urlName" component={Topic} />
    </div>
  </Router>,
  document.getElementById('root'),
);
