const ROI_DATA_PATH = '/assets/data/roi-calculator.mock.json';
const DASHBOARD_DATA_PATH = '/assets/data/dashboard-metrics.mock.json';

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function computeRoiMetrics(roiData) {
  const defaults = roiData?.defaults ?? {};
  const multipliers = roiData?.multipliers ?? {};

  const assessmentsPerMonth = Number(defaults.assessmentsPerMonth ?? 0);
  const baselineHoursPerAssessment = Number(defaults.baselineHoursPerAssessment ?? 0);
  const managers = Number(defaults.managers ?? 0);
  const hourlyCost = Number(defaults.hourlyCost ?? 0);

  const timeReduction = Number(multipliers.timeReduction ?? 0);
  const platformCostPerManager = Number(multipliers.platformCostPerManager ?? 0);
  const annualMultiplier = Number(multipliers.assessmentToYearMultiplier ?? 12);

  const baselineMonthlyHours = assessmentsPerMonth * baselineHoursPerAssessment * managers;
  const monthlyHoursSaved = baselineMonthlyHours * timeReduction;
  const annualHoursSaved = monthlyHoursSaved * annualMultiplier;
  const annualCostSaved = annualHoursSaved * hourlyCost;
  const platformAnnualCost = platformCostPerManager * managers;
  const roiPercent =
    platformAnnualCost > 0 ? ((annualCostSaved - platformAnnualCost) / platformAnnualCost) * 100 : null;
  const efficiencyGain = timeReduction * 100;
  const aiMonthlyHours = baselineMonthlyHours - monthlyHoursSaved;
  const baselineCycleMinutes = baselineHoursPerAssessment * 60;
  const aiCycleMinutes = baselineCycleMinutes * (1 - timeReduction);

  return {
    baselineMonthlyHours,
    monthlyHoursSaved,
    annualHoursSaved,
    annualCostSaved,
    platformAnnualCost,
    roiPercent,
    efficiencyGain,
    aiMonthlyHours,
    baselineCycleMinutes,
    aiCycleMinutes,
  };
}

export async function loadHomeData() {
  const [roiData, dashboardData] = await Promise.all([
    loadJson(ROI_DATA_PATH),
    loadJson(DASHBOARD_DATA_PATH),
  ]);

  return {
    roi: {
      raw: roiData,
      computed: computeRoiMetrics(roiData),
    },
    dashboard: dashboardData,
  };
}

export function formatNumber(value, locale = 'en-US', options = {}) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0, ...options }).format(value);
}

export function formatCurrency(value, currency = 'USD', locale = 'en-US', options = {}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatPercent(value, locale = 'en-US', options = {}) {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatDecimal(value, locale = 'en-US', options = {}) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  }).format(value);
}
