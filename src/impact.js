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
  const dailyIncome = impactData.region.avgDailyIncomePopulation;
  const incomeInUSD = impactData.region.avgDailyIncomeInUSD;

  const reportedCase = impactData.reportedCases * 10;
  const infectionsByRequestedTime = reportedCase * duration;
  const severeCasesPerTime = Math.floor((15 / 100) * infectionsByRequestedTime);
  const impactLoss = infectionsByRequestedTime * dailyIncome * incomeInUSD * durationPeriod;
  const impactBeds = impactData.totalHospitalBeds;

  return {
    currentlyInfected: reportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: severeCasesPerTime,
    hospitalBedsByRequestedTime: Math.floor(((35 / 100) * impactBeds) - severeCasesPerTime),
    casesForICUByRequestedTime: Math.floor((5 / 100) * infectionsByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.floor((2 / 100) * infectionsByRequestedTime),
    dollarsInFlight: impactLoss
  };
};

module.exports = getImpact;
