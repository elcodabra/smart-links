import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to Smart-Links!</h1>
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
