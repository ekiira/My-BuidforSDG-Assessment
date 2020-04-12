import getImpact from './impact';
import getSevereImpact from './severeImpact';

// const getSevereImpact = './severeImpact.js';
// const getImpact = require('./impact');
// const getSevereImpact = require('./severeImpact');

const covid19ImpactEstimator = (data) => ({
  data,
  impact: getImpact(data),
  severeImpact: getSevereImpact(data)

});

// const datum = {

//        "periodType": "days",
//          "population": 7253232,
//          "region": {
//            "avgAge": 19.7,
//            "avgDailyIncomeInUSD": 3,
//            "avgDailyIncomePopulation": 0.69,
//            "name": "Africa",
//          },
//          "reportedCases": 1973,
//          "timeToElapse": 53,
//          "totalHospitalBeds": 200978,
//        }

//  console.log(covid19ImpactEstimator(datum))
// module.exports = covid19ImpactEstimator;
export default covid19ImpactEstimator;
