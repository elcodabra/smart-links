import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import HomeComponent from './home';

require('normalize.css/normalize.css');
require('../styles/app.css');
require('../styles/fonts.css');

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.urlName}</h3>
  </div>
);

ReactDOM.render(
  <div>
    <div className="logo" />
    <Router>
      <div>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/view/:urlName" component={Topic} />
      </div>
    </Router>
  </div>,
  document.getElementById('root'),
);
