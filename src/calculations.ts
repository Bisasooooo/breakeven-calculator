import type { ChannelInputs, ChannelOutputs, ChannelId, Timeframe, AggregateOutputs } from './types';
import { TIMEFRAME_MULTIPLIERS } from './constants';

export function computeOutputs(inputs: ChannelInputs, timeframe: Timeframe): ChannelOutputs {
  const multiplier = TIMEFRAME_MULTIPLIERS[timeframe];
  const scaledBudget = inputs.budget * multiplier;

  const breakEvenCpc = inputs.aov * inputs.margin * inputs.cvr;
  const breakEvenRoas = inputs.margin > 0 ? 1 / inputs.margin : 0;
  const currentRoas = inputs.cpc > 0 ? (inputs.aov * inputs.cvr) / inputs.cpc : 0;

  const clicks = inputs.cpc > 0 ? scaledBudget / inputs.cpc : 0;
  const impressions = inputs.ctr > 0 ? clicks / inputs.ctr : 0;
  const conversions = clicks * inputs.cvr;
  const revenue = conversions * inputs.aov;
  const netProfit = revenue * inputs.margin - scaledBudget;
  const isProfitable = netProfit >= 0;

  return { breakEvenCpc, breakEvenRoas, currentRoas, clicks, impressions, conversions, revenue, netProfit, isProfitable };
}

export function aggregateChannels(
  outputs: Record<ChannelId, ChannelOutputs>,
  enabled: Record<ChannelId, boolean>,
  inputs: Record<ChannelId, ChannelInputs>,
  timeframe: Timeframe
): AggregateOutputs {
  const multiplier = TIMEFRAME_MULTIPLIERS[timeframe];
  let totalSpend = 0;
  let totalRevenue = 0;
  let totalNetProfit = 0;
  let totalOrders = 0;
  let totalImpressions = 0;

  for (const id of Object.keys(outputs) as ChannelId[]) {
    if (!enabled[id]) continue;
    totalSpend += inputs[id].budget * multiplier;
    totalRevenue += outputs[id].revenue;
    totalNetProfit += outputs[id].netProfit;
    totalOrders += outputs[id].conversions;
    totalImpressions += outputs[id].impressions;
  }

  const blendedRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  return { totalSpend, totalRevenue, totalNetProfit, blendedRoas, totalOrders, totalImpressions };
}

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1000) {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
