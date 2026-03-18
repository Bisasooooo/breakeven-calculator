export type ChannelId = 'search' | 'display' | 'social' | 'email';
export type Timeframe = 'weekly' | 'monthly' | 'yearly';

export interface ChannelInputs {
  cpc: number;
  ctr: number;    // decimal, e.g. 0.035 = 3.5%
  cvr: number;    // decimal, e.g. 0.028 = 2.8%
  aov: number;
  margin: number; // decimal, e.g. 0.40 = 40%
  budget: number; // monthly base
}

export interface ChannelOutputs {
  breakEvenCpc: number;
  breakEvenRoas: number;
  currentRoas: number;
  clicks: number;
  impressions: number;
  conversions: number;
  revenue: number;
  netProfit: number;
  isProfitable: boolean;
}

export interface ChannelConfig {
  id: ChannelId;
  name: string;
  color: string;
  defaultInputs: ChannelInputs;
}

export interface AggregateOutputs {
  totalSpend: number;
  totalRevenue: number;
  totalNetProfit: number;
  blendedRoas: number;
  totalOrders: number;
  totalImpressions: number;
}
