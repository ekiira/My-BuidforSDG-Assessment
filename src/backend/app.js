const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const convert = require('xml2js');
const covid19ImpactEstimator = require('../estimator');

app.use(bodyParser.json());

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.stdout.write(`server is running at port ${port}`);
});
