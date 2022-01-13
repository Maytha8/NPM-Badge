const express = require('express');
const app = express();
const axios = require('axios');

const badge = require('./src/badge.js');

const api = 'https://registry.npmjs.org/';
const dlApi = 'https://api.npmjs.org/downloads/point/last-week/';

const host = '0.0.0.0';
const port = process.env.PORT | 3000;

app.get('/:package(*)', async (req, res) => {

  console.log('GET', req.path);

  try {

    console.log('Querying registry for package', req.params.package);
    const xres = await axios.get(api+encodeURIComponent(req.params.package));

    if (xres.status === 200) {
      try {
        console.log('Querying api for package', req.params.package, '(for download statistics)');
        const dlres = await axios.get(dlApi+encodeURIComponent(req.params.package));

        console.log('Generating SVG and sending response');
        res.status(200)
           .header('Content-Type', 'image/svg+xml')
           .send(badge.generateBadge(
             xres.data.name,
             Object.keys(xres.data.versions[xres.data['dist-tags'].latest].dependencies).length,
             xres.data['dist-tags'].latest,
             dlres.data.downloads
           ));
      } catch (e) {res.status(500); console.error(e.toString());}
    } else if (xres.status === 404) {
      console.log('Package', req.params.package, 'was not found in registry');
      res.status(404);
    }

  } catch (e) {

    if (e.response && e.response.status && e.response.status === 404) {
      res.status(404);
    } else {
      res.status(500);
      console.error(e.toString());
    }

  }

});

app.listen(port, host, () => {
  console.log('Server listening on', host, 'port', port);
});
