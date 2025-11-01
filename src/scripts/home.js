import {
  loadHomeData,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatDecimal,
} from './data/home-data.js';

const homeShell = document.querySelector('.rcsa-shell--home');

if (homeShell) {
  initializeHome();
}

async function initializeHome() {
  try {
    const data = await loadHomeData();
    const locale = data.roi?.raw?.formatting?.numberLocale ?? 'en-US';
    bindHero(data, locale);
    bindHeroInsights(data, locale);
    bindRoiSection(data, locale);
    bindOutcomeSection(data, locale);
    bindAsideSummary(data, locale);
  } catch (error) {
    console.error('Home page data failed to load', error);
    const summaryEl = homeShell.querySelector('[data-home-summary]');
    if (summaryEl) {
      summaryEl.textContent = 'Unable to load performance insights. Refresh the demo or retry later.';
    }
  }
}

function bindHero(data, locale) {
  const { roi, dashboard } = data;
  const summaryEl = homeShell.querySelector('[data-home-summary]');
  if (summaryEl && roi?.computed) {
    const managers = roi.raw?.defaults?.managers ?? 0;
    const efficiency = roi.computed.efficiencyGain / 100;
    const annualHours = roi.computed.annualHoursSaved;
    const aiCycleMinutes = roi.computed.aiCycleMinutes;
    summaryEl.innerHTML = [
      `Defaults signal a <strong>${formatPercent(efficiency, locale)}</strong> efficiency lift,`,
      `unlocking <strong>${formatNumber(annualHours, locale)}</strong> hours annually`,
      `across <strong>${formatNumber(managers, locale)}</strong> managers.`,
      `Cycle time drops to <strong>${formatDecimal(aiCycleMinutes, locale, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      })}</strong> minutes per assessment.`,
    ].join(' ');
  }

  const metricElements = homeShell.querySelectorAll('[data-home-metric]');
  const heroMetrics = buildHeroMetricMap(data, locale);
  metricElements.forEach((metricEl) => {
    const key = metricEl.getAttribute('data-home-metric');
    const metric = heroMetrics[key];
    const valueEl = metricEl.querySelector('[data-home-metric-value]');
    const labelEl = metricEl.querySelector('[data-home-metric-label]');
    const detailEl = metricEl.querySelector('[data-home-metric-detail]');

    if (metric?.value && valueEl) {
      valueEl.textContent = metric.value;
    }
    if (metric?.label && labelEl) {
      labelEl.textContent = metric.label;
    }
    if (detailEl) {
      detailEl.textContent = metric?.detail ?? 'Metric detail unavailable.';
    }
  });
}

function buildHeroMetricMap(data, locale) {
  const { roi, dashboard } = data;
  const map = {};

  if (roi?.computed) {
    const labels = roi.raw?.formatting?.valueLabels ?? {};
    map.efficiencyGain = {
      value: formatPercent((roi.computed.efficiencyGain ?? 0) / 100, locale, { maximumFractionDigits: 0 }),
      label: labels.efficiencyGain ?? 'Efficiency Gain',
      detail: 'Calculated from ROI defaults in roi-calculator.mock.json.',
    };
  }

  if (dashboard?.kpis) {
    const kpis = Array.isArray(dashboard.kpis) ? dashboard.kpis : [];
    const residual = kpis.find((item) => item.id === 'residual-risk-reduction');
    if (residual) {
      map['residual-risk-reduction'] = {
        value: residual.unit === 'percent'
          ? formatPercent((residual.value ?? 0) / 100, locale, { maximumFractionDigits: 0 })
          : formatNumber(residual.value ?? 0, locale),
        label: residual.label ?? 'Residual Risk Reduction',
        detail: residual.changeNarrative ?? 'Residual risk trend details unavailable.',
      };
    }

    const controls = kpis.find((item) => item.id === 'controls-mapped');
    if (controls) {
      map['controls-mapped'] = {
        value: formatNumber(controls.value ?? 0, locale),
        label: controls.label ?? 'Controls Mapped',
        detail: controls.changeNarrative ?? 'Controls mapping narrative unavailable.',
      };
    }
  }

  return map;
}

function bindHeroInsights(data, locale) {
  const { roi } = data;
  if (!roi?.computed) {
    return;
  }

  const currency = roi.raw?.formatting?.currency ?? 'USD';
  setText('baselineHours', `${formatNumber(roi.computed.baselineMonthlyHours, locale)} hrs / month`);
  setText('aiHours', `${formatNumber(roi.computed.aiMonthlyHours, locale)} hrs / month`);
  setText(
    'platformSpend',
    `${formatCurrency(roi.computed.platformAnnualCost, currency, locale)} per year`,
  );
}

function bindRoiSection(data, locale) {
  const { roi } = data;
  if (!roi?.raw || !roi?.computed) {
    return;
  }

  const headlineEl = homeShell.querySelector('[data-roi-headline]');
  const subheaderEl = homeShell.querySelector('[data-roi-subheader]');
  const disclaimerEl = homeShell.querySelector('[data-roi-disclaimer]');
  const ctaEl = homeShell.querySelector('[data-roi-cta]');

  const copy = roi.raw.copy ?? {};
  if (headlineEl && copy.headline) {
    headlineEl.textContent = copy.headline;
  }
  if (subheaderEl && copy.subheader) {
    subheaderEl.textContent = copy.subheader;
  }
  if (disclaimerEl && copy.disclaimer) {
    disclaimerEl.textContent = copy.disclaimer;
  }
  if (ctaEl && copy.cta) {
    ctaEl.textContent = copy.cta;
    ctaEl.setAttribute('href', '/assets/data/roi-calculator.mock.json');
    ctaEl.setAttribute('download', 'roi-calculator.mock.json');
    ctaEl.setAttribute('aria-label', `${copy.cta} (downloads mock ROI defaults)`);
  }

  const labels = roi.raw.formatting?.valueLabels ?? {};
  const currency = roi.raw.formatting?.currency ?? 'USD';

  const metrics = {
    annualHoursSaved: formatNumber(roi.computed.annualHoursSaved ?? 0, locale),
    annualCostSaved: formatCurrency(roi.computed.annualCostSaved ?? 0, currency, locale),
    roiPercent:
      roi.computed.roiPercent != null
        ? formatPercent((roi.computed.roiPercent ?? 0) / 100, locale, { maximumFractionDigits: 0 })
        : 'N/A',
    efficiencyGain: formatPercent((roi.computed.efficiencyGain ?? 0) / 100, locale, { maximumFractionDigits: 0 }),
  };

  Object.entries(metrics).forEach(([key, formattedValue]) => {
    const metricEl = homeShell.querySelector(`[data-roi-metric="${key}"]`);
    if (!metricEl) {
      return;
    }
    const valueEl = metricEl.querySelector('[data-roi-metric-value]');
    const labelEl = metricEl.querySelector('.home-roi__metric-label');
    if (valueEl) {
      valueEl.textContent = formattedValue;
    }
    if (labelEl && labels[key]) {
      labelEl.textContent = labels[key];
    }
  });

  const inputs = {
    assessmentsPerMonth: roi.raw.defaults?.assessmentsPerMonth ?? 0,
    baselineHoursPerAssessment: formatDecimal(roi.raw.defaults?.baselineHoursPerAssessment ?? 0, locale, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }),
    managers: roi.raw.defaults?.managers ?? 0,
    hourlyCost: formatCurrency(roi.raw.defaults?.hourlyCost ?? 0, currency, locale),
  };

  Object.entries(inputs).forEach(([key, value]) => {
    const inputEl = homeShell.querySelector(`[data-roi-input="${key}"]`);
    if (inputEl) {
      inputEl.textContent = typeof value === 'number' ? formatNumber(value, locale) : value;
    }
  });
}

function bindOutcomeSection(data, locale) {
  const { dashboard } = data;
  if (!dashboard) {
    return;
  }

  const leadEl = homeShell.querySelector('[data-home-outcome-lead]');
  if (leadEl) {
    const reporting = dashboard.summary?.reportingWindow;
    const refresh = dashboard.summary?.refreshFrequency;
    const owner = dashboard.actionQueue?.owner;
    const pieces = [
      reporting ? `Dashboard window ${reporting}` : null,
      refresh ? `refreshes ${refresh.toLowerCase()}` : null,
      owner ? `action queue owned by ${owner}` : null,
    ].filter(Boolean);

    leadEl.textContent =
      pieces.length > 0
        ? `Signals feed the next-step workflow: ${pieces.join(', ')}.`
        : 'Signals feed the next-step workflow from the dashboard data.';
  }

  const alertsContainer = homeShell.querySelector('[data-home-alerts]');
  if (alertsContainer) {
    alertsContainer.innerHTML = '';
    const alerts = Array.isArray(dashboard.alerts) ? dashboard.alerts.slice(0, 2) : [];
    alerts.forEach((alert) => {
      const item = document.createElement('li');
      item.className = 'home-outcome__item fcb-card';

      const badge = document.createElement('span');
      badge.className = `home-outcome__badge home-outcome__badge--${alert.severity ?? 'low'}`;
      badge.textContent = (alert.severity ?? 'info').toUpperCase();
      item.appendChild(badge);

      const title = document.createElement('h3');
      title.className = 'home-outcome__item-title fcb-h5';
      title.textContent = alert.title ?? 'Alert';
      item.appendChild(title);

      if (alert.message) {
        const message = document.createElement('p');
        message.className = 'home-outcome__item-message';
        message.textContent = alert.message;
        item.appendChild(message);
      }

      if (alert.cta?.label && alert.cta?.href) {
        const cta = document.createElement('a');
        cta.className = 'home-outcome__item-link';
        cta.href = alert.cta.href;
        cta.textContent = alert.cta.label;
        cta.setAttribute('data-alert-id', alert.id ?? '');
        item.appendChild(cta);
      }

      alertsContainer.appendChild(item);
    });
  }
}

function bindAsideSummary(data, locale) {
  const { dashboard } = data;
  if (!dashboard) {
    return;
  }

  setAsideText(
    'data-home-summary-window',
    dashboard.summary?.reportingWindow ? `Reporting window: ${dashboard.summary.reportingWindow}` : null,
  );
  setAsideText(
    'data-home-summary-refresh',
    dashboard.summary?.refreshFrequency ? `Refresh cadence: ${dashboard.summary.refreshFrequency}` : null,
  );

  const completeness = dashboard.dataQuality?.completeness;
  const lagDays = dashboard.dataQuality?.lagDays;
  if (completeness != null || lagDays != null) {
    const completenessText =
      completeness != null ? `${formatPercent((completeness ?? 0) / 100, locale)} complete` : null;
    const lagText = lagDays != null ? `${formatNumber(lagDays, locale)} day data lag` : null;
    const detail = [completenessText, lagText].filter(Boolean).join(' · ');
    setAsideText(
      'data-home-summary-quality',
      detail ? `Data quality: ${detail}` : null,
    );
  } else {
    setAsideText('data-home-summary-quality', null);
  }

  const mode = dashboard.summary?.dataMode;
  const updatedAt = dashboard.updatedAt;
  const updatedDate = updatedAt ? new Date(updatedAt) : null;
  const formattedUpdate =
    updatedDate && !Number.isNaN(updatedDate.getTime()) ? updatedDate.toLocaleString(locale) : null;
  const modeText = [
    mode ? `Mode: ${mode}` : null,
    formattedUpdate ? `Updated ${formattedUpdate}` : null,
  ]
    .filter(Boolean)
    .join(' · ');
  setAsideText('data-home-summary-mode', modeText || 'Live data cadence documented in dashboard metrics.');
}

function setText(insightKey, value) {
  const el = homeShell.querySelector(`[data-home-insight="${insightKey}"]`);
  if (el && value) {
    el.textContent = value;
  }
}

function setAsideText(attribute, value) {
  const el = homeShell.querySelector(`[${attribute}]`);
  if (!el) {
    return;
  }
  el.textContent = value ?? 'Signal pending data feed.';
}
