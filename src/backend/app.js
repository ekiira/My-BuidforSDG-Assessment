const express = require('express');

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const convert = require('xml2js');
const covid19ImpactEstimator = require('../estimator');

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const responseTime = duration < 10 ? `${0}${duration}${'ms'}` : `${Math.trunc(duration)}ms`;
    const { method } = req;
    const { url } = req;
    const status = res.statusCode;

    const logs = [method, url, status, responseTime];
    logs.forEach((log) => log);
    const log = logs.join('\t\t');
    fs.appendFile('logs.txt', `${log}\n`, 'utf8', (err) => {
      if (err) throw err;
      process.stdout.write('The data has been saved');
    });
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the server-side for the Covid-19 impact-estimator');
});
app.post('/api/v1/on-covid-19', (req, res) => {
  const datum = req.body;
  const receive = (covid19ImpactEstimator(datum));
  res.set('Cache-Control', 'max-age=31536000');
  res.send(receive);
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const datum = req.body;
  res.set('Cache-Control', 'max-age=31536000');
  res.send(covid19ImpactEstimator(datum));
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const datum = req.body;
  res.type('application/xml');
  const builder = new convert.Builder();
  const xml = builder.buildObject(covid19ImpactEstimator(datum));
  res.set('Cache-Control', 'max-age=31536000');
  res.send(xml);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  fs.readFile('logs.txt', 'utf8', (err, data) => {
    if (err) throw err;
    res.header('Content-type', 'text/plain; charset=utf-8');
    res.send(data);
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  process.stdout.write(`server is running at port ${port}`);
});
