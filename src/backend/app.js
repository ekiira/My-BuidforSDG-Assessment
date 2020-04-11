const express = require('express');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
const convert = require('xml2js');
const covid19ImpactEstimator = require('../estimator');

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the server-side for the Covid-19 impact estimator');
});

app.post('/api/v1/on-covid-19', (req, res) => {
  const datum = req.body;
  res.send(covid19ImpactEstimator(datum));
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const datum = req.body;
  res.send(covid19ImpactEstimator(datum));
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const datum = req.body;
  res.type('application/xml');
  const builder = new convert.Builder();
  const xml = builder.buildObject(covid19ImpactEstimator(datum));
  res.send(xml);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  process.stdout.write(`server is running at port ${port}`);
});
