import getImpact from './impact';
import getSevereImpact from './severeImpact';

const covid19ImpactEstimator = (data) => ({
  data,
  impact: getImpact(data),
  severeImpact: getSevereImpact(data)

});

module.exports = covid19ImpactEstimator;
