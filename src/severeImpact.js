const getSevereImpact = (severeData) => {
  let durationPeriod = '';
  if (severeData.periodType === 'days') {
    durationPeriod = severeData.timeToElapse;
  } else if (severeData.periodType === 'weeks') {
    durationPeriod = Math.floor((severeData.timeToElapse * 7));
  } else if (severeData.periodType === 'months') {
    durationPeriod = Math.floor((severeData.timeToElapse * 30));
  }

  const duration = 2 ** (Math.floor(durationPeriod / 3));
  const dailyIncome = severeData.region.avgDailyIncomePopulation;
  const incomeInUSD = severeData.region.avgDailyIncomeInUSD;

  const impactReportedCase = severeData.reportedCases * 50;
  const infectionsByRequestedTime = impactReportedCase * duration;
  const casesPerTime = Number(((15 / 100) * infectionsByRequestedTime).toFixed());
  const severeLoss = infectionsByRequestedTime * dailyIncome * incomeInUSD * durationPeriod;
  const estimateSevereLoss = Number(severeLoss.toFixed(2));
  const severeBeds = severeData.totalHospitalBeds;

  return {
    currentlyInfected: impactReportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: casesPerTime,
    hospitalBedsByRequestedTime: Number((((35 / 100) * severeBeds) - casesPerTime).toFixed()),
    casesForICUByRequestedTime: Number(((5 / 100) * infectionsByRequestedTime).toFixed()),
    casesForVentilatorsByRequestedTime: Number(((2 / 100) * infectionsByRequestedTime).toFixed()),
    dollarsInFlight: estimateSevereLoss

  };
};

module.exports = getSevereImpact;
