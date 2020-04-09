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
  const severeCasesPerTime = Number(((15 / 100) * infectionsByRequestedTime).toFixed());
  const impactBeds = impactData.totalHospitalBeds;
  const estimateImpactBeds = ((35 / 100) * impactBeds) - severeCasesPerTime;
  const impactLoss = infectionsByRequestedTime * dailyIncome * incomeInUSD * durationPeriod;
  const estimateImpactLoss = Number(impactLoss.toFixed(2));

  return {
    currentlyInfected: reportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: severeCasesPerTime,
    hospitalBedsByRequestedTime: Math.trunc(estimateImpactBeds),
    casesForICUByRequestedTime: Math.ceil((5 / 100) * infectionsByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.ceil((2 / 100) * infectionsByRequestedTime),
    dollarsInFlight: estimateImpactLoss
  };
};

module.exports = getImpact;
