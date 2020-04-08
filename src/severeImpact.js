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
  const casesPerTime = (15 / 100) * infectionsByRequestedTime;
  const severeLoss = infectionsByRequestedTime * dailyIncome * incomeInUSD * durationPeriod;

  return {
    currentlyInfected: impactReportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: casesPerTime,
    hospitalBedsByRequestedTime: ((35 / 100) * severeData.totalHospitalBeds) - casesPerTime,
    casesForICUByRequestedTime: (5 / 100) * infectionsByRequestedTime,
    casesForVentilatorsByRequestedTime: (2 / 100) * infectionsByRequestedTime,
    dollarsInFlight: severeLoss

  };
};

module.exports = getSevereImpact;
