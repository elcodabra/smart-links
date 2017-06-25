const compression = require('compression');
const express = require('express');
const config = require('./config');
const rp = require('request-promise');
const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const getEmoji = require('./src/emojis');

const app = express();

app.set('port', config.PORT);

const getLinkFromText = text => text.split('-').map(word => getEmoji(word) || word).join('-');

const getTextFromTitle = html => getLinkFromText(html.match(/<title.*>(.*)<\/title>/)[1].replace(/\s/g, '-').toLowerCase());

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj415qy57a9cd0185cjd43tk6'),
});

function getAllLinks() {
  return client.query(`
      {
      allLinks {
        id,
        url,
        redirectUrl,
        createdAt
      }
    }
  `);
}

function getLink(url) {
  return client.query(`
      {
      Link (url: "${url}" ) {
        id,
        url,
        redirectUrl,
        createdAt
      }
    }
  `);
}

function setLink(link, url) {
  return client.mutate(`
    {
      createLink(
        url: "${link}"
        redirectUrl: "${url}"
      ) {
        id,
        url
      }
    }
  `);
}

function updateLink(id, link) {
  return client.mutate(`
    {
      updateLink(
        id: "${id}"
        url: "${link}"
      ) {
        id
      }
    }
  `);
}

// Gzip
app.use(compression());

// Get stats
app.get('/stats/:smartUrlId', async (req, res) => {
  // TODO: get stats from service and return stats
  const smartLink = await getLink(req.params.smartUrlId);
  res.send(smartLink || req.params.smartUrlId);
});

// Get all
app.get('/all', async (req, res) => {
  const results = await getAllLinks();
  res.send(results);
});

app.get('/save', async (req, res) => {
  try {
    const results = await updateLink(req.query.id, req.query.url);
    res.send(results);
  } catch (err) {
    res.send(null);
  }
});

// Get smart-link /make?url=http://google.com
app.get('/make', async (req, res) => {
  try {
    let smartLink;
    if (req.query.from === 'body') {
      // TODO: add async service TEXT MINING
      smartLink = 'from url html body';
    } else {
      smartLink = await rp(req.query.url).then(getTextFromTitle);
    }
    const response = await setLink(smartLink, req.query.url);
    res.send(response);
  } catch (err) {
    res.send(null);
  }
});

// TODO: check exclude /make or /stats
app.get('/link/:smartUrlId', async (req, res) => {
  const smartLink = await getLink(req.params.smartUrlId);
  if (smartLink && smartLink.Link && smartLink.Link.redirectUrl) {
    res.redirect(smartLink.Link.redirectUrl);
  } else {
    res.send(`Not found redirect url with this smart link: ${req.params.smartUrlId}`);
  }
});

// Run the app by serving the static files
// in the dist directory
app.use('/', express.static(`${__dirname}/dist/`));

// Start the app by listening on the default port
app.listen(app.get('port'), () => {
  console.log('App is running, server is listening on port:', app.get('port'));
});
