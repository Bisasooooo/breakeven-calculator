import type { Timeframe } from '../types';

const TIMEFRAMES: { value: Timeframe; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

interface HeaderProps {
  timeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
}

export default function Header({ timeframe, onTimeframeChange }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
        Break-Even Calculator
      </h1>
      <p className="text-gray-500 text-lg mb-6">
        Please! Beverage Co. — Digital Marketing Analysis
      </p>
      <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
        {TIMEFRAMES.map(tf => (
          <button
            key={tf.value}
            onClick={() => onTimeframeChange(tf.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              timeframe === tf.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>
    </header>
  );
}
