import type { AggregateOutputs, Timeframe } from '../types';
import { formatCurrency, formatNumber } from '../calculations';

interface AggregateSummaryProps {
  aggregate: AggregateOutputs;
  timeframe: Timeframe;
}

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

export default function AggregateSummary({ aggregate, timeframe }: AggregateSummaryProps) {
  const label = TIMEFRAME_LABELS[timeframe];

  const cards = [
    { title: `${label} Spend`, value: formatCurrency(aggregate.totalSpend), color: 'text-gray-900' },
    { title: `${label} Revenue`, value: formatCurrency(aggregate.totalRevenue), color: 'text-gray-900' },
    {
      title: `${label} Net Profit`,
      value: (aggregate.totalNetProfit >= 0 ? '+' : '') + formatCurrency(aggregate.totalNetProfit),
      color: aggregate.totalNetProfit >= 0 ? 'text-emerald-600' : 'text-red-500',
    },
    { title: 'Blended ROAS', value: formatNumber(aggregate.blendedRoas, 2) + 'x', color: 'text-gray-900' },
    { title: `${label} Orders`, value: formatNumber(Math.round(aggregate.totalOrders)), color: 'text-gray-900' },
    { title: `${label} Impressions`, value: formatNumber(Math.round(aggregate.totalImpressions)), color: 'text-gray-900' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      {cards.map(card => (
        <div key={card.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{card.title}</p>
          <p className={`font-[family-name:var(--font-heading)] text-xl font-bold ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
