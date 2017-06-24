const express = require('express');
const config = require('./config');

const app = express();

app.set('port', config.PORT);

app.use('/', express.static(`${__dirname}/dist/`));

app.get('/backend', (req, res) => {
  res.send('works');
});

app.listen(app.get('port'), () => {
  console.log('App is running, server is listening on port:', app.get('port'));
});
