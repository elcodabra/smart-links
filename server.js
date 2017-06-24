const path = require('path');
const compression = require('compression');
const express = require('express');
const config = require('./config');

const app = express();

app.set('port', config.PORT);

// Gzip
app.use(compression());

// Get stats
app.get('/stats/:smartUrlId', (req, res) => {
  // TODO: get stats from service and return stats
  res.send(req.params.smartUrlId);
});

// Get smart-link /make?url=http://google.com
app.get('/make', async (req, res) => {
  let smartLink;
  if (req.query.from === 'body') {
    // TODO: add async service TEXT MINING
    smartLink = 'from url html body';
  } else {
    // TODO: async get from title
    smartLink = 'from url title';
  }
  // TODO: saveToDB(smartLink, req.query.url);
  res.send(smartLink);
});

// TODO: check exclude /make or /stats
app.get('/link/:smartUrlId', async (req, res) => {
  const redirectUrl = ''; // TODO:  = getFromDB(req.params.smartUrlId)
  res.send(redirectUrl || req.params.smartUrlId);
});

// Run the app by serving the static files
// in the dist directory
app.use('/', express.static(`${__dirname}/dist/`));

// Start the app by listening on the default port
app.listen(app.get('port'), () => {
  console.log('App is running, server is listening on port:', app.get('port'));
});
