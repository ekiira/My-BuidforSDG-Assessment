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
  const casesPerTime = Math.floor((15 / 100) * infectionsByRequestedTime);
  const severeLoss = infectionsByRequestedTime * dailyIncome * incomeInUSD * durationPeriod;
  const estimateSevereLoss = Math.floor(severeLoss);
  const severeBeds = severeData.totalHospitalBeds;

  return {
    currentlyInfected: impactReportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: casesPerTime,
    hospitalBedsByRequestedTime: Math.floor(((35 / 100) * severeBeds) - casesPerTime),
    casesForICUByRequestedTime: Math.floor((5 / 100) * infectionsByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.floor((2 / 100) * infectionsByRequestedTime),
    dollarsInFlight: estimateSevereLoss

  };
};

module.exports = getSevereImpact;
