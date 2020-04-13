const getImpact = require('./impact');
const getSevereImpact = require('./severeImpact');

const covid19ImpactEstimator = (data) => ({
  data,
  impact: getImpact(data),
  severeImpact: getSevereImpact(data)

});

module.exports = covid19ImpactEstimator;
