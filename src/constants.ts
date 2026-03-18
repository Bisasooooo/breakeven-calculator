import type { ChannelConfig, ChannelId, Timeframe } from './types';

export const CHANNEL_IDS: ChannelId[] = ['search', 'display', 'social', 'email'];

export const CHANNELS: ChannelConfig[] = [
  {
    id: 'search',
    name: 'Paid Search',
    color: '#3B82F6',
    defaultInputs: { cpc: 1.50, ctr: 0.035, cvr: 0.028, aov: 55, margin: 0.40, budget: 3000 },
  },
  {
    id: 'display',
    name: 'Display Ads',
    color: '#8B5CF6',
    defaultInputs: { cpc: 0.60, ctr: 0.005, cvr: 0.007, aov: 55, margin: 0.40, budget: 2000 },
  },
  {
    id: 'social',
    name: 'Social Media',
    color: '#EC4899',
    defaultInputs: { cpc: 0.90, ctr: 0.012, cvr: 0.015, aov: 55, margin: 0.40, budget: 2500 },
  },
  {
    id: 'email',
    name: 'Email Marketing',
    color: '#10B981',
    defaultInputs: { cpc: 0.15, ctr: 0.025, cvr: 0.040, aov: 55, margin: 0.40, budget: 1500 },
  },
];

export const TIMEFRAME_MULTIPLIERS: Record<Timeframe, number> = {
  weekly: 1 / 4,
  monthly: 1,
  yearly: 12,
};

export const SLIDER_CONFIG = {
  cpc:    { min: 0.05, max: 5.00, step: 0.05, prefix: '$', suffix: '', decimals: 2 },
  ctr:    { min: 0.001, max: 0.10, step: 0.001, prefix: '', suffix: '%', decimals: 1, displayMultiplier: 100 },
  cvr:    { min: 0.001, max: 0.10, step: 0.001, prefix: '', suffix: '%', decimals: 1, displayMultiplier: 100 },
  aov:    { min: 10, max: 200, step: 1, prefix: '$', suffix: '', decimals: 0 },
  margin: { min: 0.05, max: 0.80, step: 0.01, prefix: '', suffix: '%', decimals: 0, displayMultiplier: 100 },
  budget: { min: 0, max: 10000, step: 50, prefix: '$', suffix: '', decimals: 0 },
} as const;

export const SLIDER_LABELS: Record<string, string> = {
  cpc: 'Cost Per Click (CPC)',
  ctr: 'Click-Through Rate (CTR)',
  cvr: 'Conversion Rate (CVR)',
  aov: 'Average Order Value (AOV)',
  margin: 'Profit Margin',
  budget: 'Monthly Budget',
};
