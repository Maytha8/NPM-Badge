const express = require('express');
const app = express();
const axios = require('axios');

const badge = require('./src/badge.js');

const api = 'https://registry.npmjs.org/';
const dlApi = 'https://api.npmjs.org/downloads/point/last-week/';

app.get('/:package(*)', async (req, res) => {

  try {

    const xres = await axios.get(api+encodeURIComponent(req.params.package));

    if (xres.status === 200) {
      try {
        const dlres = await axios.get(dlApi+encodeURIComponent(req.params.package));
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

app.listen(3000);
console.log('Server listening');
