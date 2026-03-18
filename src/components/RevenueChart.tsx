import type { ChannelConfig, ChannelId, ChannelOutputs } from '../types';
import { formatCurrency } from '../calculations';

interface RevenueChartProps {
  channels: ChannelConfig[];
  outputs: Record<ChannelId, ChannelOutputs>;
  enabled: Record<ChannelId, boolean>;
}

export default function RevenueChart({ channels, outputs, enabled }: RevenueChartProps) {
  const active = channels.filter(c => enabled[c.id]);
  if (active.length === 0) return null;

  const maxRevenue = Math.max(...active.map(c => outputs[c.id].revenue), 1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-gray-900 mb-4">
        Revenue by Channel
      </h3>
      <div className="space-y-3">
        {active.map(channel => {
          const revenue = outputs[channel.id].revenue;
          const width = (revenue / maxRevenue) * 100;
          return (
            <div key={channel.id} className="flex items-center gap-3">
              <span className="w-28 text-sm text-gray-600 text-right shrink-0">{channel.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-7 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(width, 1)}%`, backgroundColor: channel.color }}
                />
              </div>
              <span className="w-24 text-right text-sm font-[family-name:var(--font-heading)] font-semibold text-gray-900 shrink-0">
                {formatCurrency(revenue)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
