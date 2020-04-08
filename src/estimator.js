const covid19ImpactEstimator = (data) => {
  let durationPeriod = '';
  if (data.periodType === 'days') {
    durationPeriod = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    durationPeriod = Math.floor((data.timeToElapse * 7));
  } else if (data.periodType === 'months') {
    durationPeriod = Math.floor((data.timeToElapse * 30));
  }

  const duration = 2 ** (Math.floor(durationPeriod / 3));

  const impactReportedCase = data.reportedCases * 10;
  const impactInfectionsByRequestedTime = impactReportedCase * duration;
  const impactSevereCasesPerTime = (15 / 100) * impactInfectionsByRequestedTime;

  const severeImpactReportedCase = data.reportedCases * 50;
  const severeInfectionsByRequestedTime = severeImpactReportedCase * duration;
  const severeCasesPerTime = (15 / 100) * severeInfectionsByRequestedTime;

  return {
    data,
    impact: {
      currentlyInfected: impactReportedCase,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesPerTime,
      hospitalBedsByRequestedTime: ((35 / 100) * data.totalHospitalBeds) - impactSevereCasesPerTime
    },
    severeImpact: {
      currentlyInfected: severeImpactReportedCase,
      infectionsByRequestedTime: severeInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeCasesPerTime,
      hospitalBedsByRequestedTime: ((35 / 100) * data.totalHospitalBeds) - severeCasesPerTime
    }
  };
};

export default covid19ImpactEstimator;
