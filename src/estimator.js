const covid19ImpactEstimator = (data, durationInput) => {
  let durationPeriod = 28;
  if (durationInput) {
    if (!Number.isInteger(durationInput)) {
      throw new Error('Duration period is not a number');
    }
    durationPeriod = durationInput;
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
