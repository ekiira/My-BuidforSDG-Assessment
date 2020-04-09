const getImpact = (impactData) => {
  let durationPeriod = '';
  if (impactData.periodType === 'days') {
    durationPeriod = impactData.timeToElapse;
  } else if (impactData.periodType === 'weeks') {
    durationPeriod = Math.floor((impactData.timeToElapse * 7));
  } else if (impactData.periodType === 'months') {
    durationPeriod = Math.floor((impactData.timeToElapse * 30));
  }

  const duration = 2 ** (Math.floor(durationPeriod / 3));

  const reportedCase = impactData.reportedCases * 10;
  const infectionsByRequestedTime = reportedCase * duration;
  const severeCasesPerTime = Number(((15 / 100) * infectionsByRequestedTime).toFixed());
  const impactBeds = impactData.totalHospitalBeds;

  return {
    currentlyInfected: reportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: severeCasesPerTime,
    hospitalBedsByRequestedTime: Number((((35 / 100) * impactBeds) - severeCasesPerTime).toFixed()),
    casesForICUByRequestedTime: Number(((5 / 100) * infectionsByRequestedTime).toFixed()),
    casesForVentilatorsByRequestedTime: Number(((2 / 100) * infectionsByRequestedTime).toFixed())
  };
};

module.exports = getImpact;
