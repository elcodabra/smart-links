import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import config from '../config';

const Home = () => (
  <div>
    <h1>Welcome to {config.NAME}! Go to <a href={`http://t.me/${config.NAME}`}>Bot</a></h1>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.urlName}</h3>
  </div>
);

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/view/:urlName" component={Topic} />
    </div>
  </Router>,
  document.getElementById('root'),
);
