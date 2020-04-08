const covid19ImpactEstimator = (data) => {
  let durationPeriod = '';
  if (data.periodType === 'days') {
    durationPeriod = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    durationPeriod = Math.floor((data.timeToElapse * 7));
  } else if (data.periodType === 'months') {
    durationPeriod = Math.floor((data.timeToElapse * 30));
  }

  const impactReportedCase = data.reportedCases * 10;
  const severeImpactReportedCase = data.reportedCases * 50;
  const duration = 2 ** (Math.floor(durationPeriod / 3));

  return {
    data,
    impact: {
      currentlyInfected: impactReportedCase,
      infectionsByRequestedTime: impactReportedCase * duration
    },
    severeImpact: {
      currentlyInfected: severeImpactReportedCase,
      infectionsByRequestedTime: severeImpactReportedCase * duration
    }
  };
};

export default covid19ImpactEstimator;
