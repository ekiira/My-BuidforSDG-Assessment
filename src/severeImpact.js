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
  const severeBeds = severeData.totalHospitalBeds;
  const estimateSevereBeds = ((35 / 100) * severeBeds) - casesPerTime;
  const severeLoss = (infectionsByRequestedTime * dailyIncome * incomeInUSD) / durationPeriod;
  const estimateSevereLoss = Math.trunc(severeLoss);

  return {
    currentlyInfected: impactReportedCase,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: casesPerTime,
    hospitalBedsByRequestedTime: Math.trunc(estimateSevereBeds),
    casesForICUByRequestedTime: Math.trunc((5 / 100) * infectionsByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc((2 / 100) * infectionsByRequestedTime),
    dollarsInFlight: estimateSevereLoss
  };
};

module.exports = getSevereImpact;
