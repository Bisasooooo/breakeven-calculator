import { useState } from 'react';
import type { ChannelConfig, ChannelInputs, ChannelOutputs, Timeframe } from '../types';
import { formatCurrency, formatNumber } from '../calculations';
import { SLIDER_CONFIG, SLIDER_LABELS } from '../constants';

interface ChannelCardProps {
  config: ChannelConfig;
  inputs: ChannelInputs;
  outputs: ChannelOutputs;
  enabled: boolean;
  timeframe: Timeframe;
  onInputChange: (field: keyof ChannelInputs, value: number) => void;
  onToggle: () => void;
}

function SliderRow({
  field,
  value,
  color,
  onChange,
}: {
  field: keyof typeof SLIDER_CONFIG;
  value: number;
  color: string;
  onChange: (v: number) => void;
}) {
  const cfg = SLIDER_CONFIG[field];
  const displayVal = 'displayMultiplier' in cfg ? value * (cfg.displayMultiplier ?? 1) : value;
  const formatted = cfg.prefix + formatNumber(displayVal, cfg.decimals) + cfg.suffix;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm text-gray-600">{SLIDER_LABELS[field]}</label>
        <span className="text-sm font-[family-name:var(--font-heading)] font-semibold text-gray-900">
          {formatted}
        </span>
      </div>
      <input
        type="range"
        min={cfg.min}
        max={cfg.max}
        step={cfg.step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ '--thumb-color': color } as React.CSSProperties}
      />
    </div>
  );
}

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

export default function ChannelCard({
  config,
  inputs,
  outputs,
  enabled,
  timeframe,
  onInputChange,
  onToggle,
}: ChannelCardProps) {
  const [expanded, setExpanded] = useState(true);
  const label = TIMEFRAME_LABELS[timeframe];

  const metrics = [
    { label: 'Break-Even CPC', value: formatCurrency(outputs.breakEvenCpc) },
    { label: 'Break-Even ROAS', value: formatNumber(outputs.breakEvenRoas, 2) + 'x' },
    { label: 'Current ROAS', value: formatNumber(outputs.currentRoas, 2) + 'x' },
    { label: `${label} Impressions`, value: formatNumber(Math.round(outputs.impressions)) },
    { label: `${label} Clicks`, value: formatNumber(Math.round(outputs.clicks)) },
    { label: `${label} Conversions`, value: formatNumber(Math.round(outputs.conversions)) },
    { label: `${label} Revenue`, value: formatCurrency(outputs.revenue) },
    { label: `${label} Net Profit`, value: (outputs.netProfit >= 0 ? '+' : '') + formatCurrency(outputs.netProfit) },
  ];

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border transition-all ${
        enabled ? 'border-gray-200' : 'border-gray-100 opacity-60'
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-gray-900">
            {config.name}
          </h3>
          {enabled && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                outputs.isProfitable
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {outputs.isProfitable ? 'PROFITABLE' : 'BELOW BREAK-EVEN'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <label
            className="toggle-switch"
            style={{ '--toggle-color': config.color } as React.CSSProperties}
            onClick={e => e.stopPropagation()}
          >
            <input type="checkbox" checked={enabled} onChange={onToggle} />
            <span className="toggle-slider" />
          </label>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expandable content */}
      {expanded && enabled && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            {/* Sliders */}
            <div>
              {(Object.keys(SLIDER_CONFIG) as (keyof ChannelInputs)[]).map(field => (
                <SliderRow
                  key={field}
                  field={field}
                  value={inputs[field]}
                  color={config.color}
                  onChange={v => onInputChange(field, v)}
                />
              ))}
            </div>

            {/* Outputs */}
            <div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {metrics.map(m => (
                  <div key={m.label} className="py-1.5">
                    <p className="text-xs text-gray-500">{m.label}</p>
                    <p className="font-[family-name:var(--font-heading)] font-semibold text-gray-900 text-sm">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
