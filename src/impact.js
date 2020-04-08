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
  const severeCasesPerTime = (15 / 100) * infectionsByRequestedTime;
  const impactLoss = infectionsByRequestedTime * dailyIncome * incomeInUSD * durationPeriod;

  return {
    currentlyInfected: reportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: severeCasesPerTime,
    hospitalBedsByRequestedTime: ((35 / 100) * impactData.totalHospitalBeds) - severeCasesPerTime,
    casesForICUByRequestedTime: (5 / 100) * infectionsByRequestedTime,
    casesForVentilatorsByRequestedTime: (2 / 100) * infectionsByRequestedTime,
    dollarsInFlight: impactLoss
  };
};

module.exports = getImpact;
