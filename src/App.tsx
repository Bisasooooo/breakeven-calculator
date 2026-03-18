import { useState, useMemo } from 'react';
import type { ChannelId, ChannelInputs, Timeframe } from './types';
import { CHANNELS, CHANNEL_IDS } from './constants';
import { computeOutputs, aggregateChannels } from './calculations';
import Header from './components/Header';
import AggregateSummary from './components/AggregateSummary';
import ChannelCard from './components/ChannelCard';
import RevenueChart from './components/RevenueChart';
import Footer from './components/Footer';

function getDefaultInputs(): Record<ChannelId, ChannelInputs> {
  const result = {} as Record<ChannelId, ChannelInputs>;
  for (const ch of CHANNELS) {
    result[ch.id] = { ...ch.defaultInputs };
  }
  return result;
}

function getDefaultEnabled(): Record<ChannelId, boolean> {
  const result = {} as Record<ChannelId, boolean>;
  for (const id of CHANNEL_IDS) {
    result[id] = true;
  }
  return result;
}

export default function App() {
  const [inputs, setInputs] = useState<Record<ChannelId, ChannelInputs>>(getDefaultInputs);
  const [enabled, setEnabled] = useState<Record<ChannelId, boolean>>(getDefaultEnabled);
  const [timeframe, setTimeframe] = useState<Timeframe>('monthly');

  const outputs = useMemo(() => {
    const result = {} as Record<ChannelId, ReturnType<typeof computeOutputs>>;
    for (const id of CHANNEL_IDS) {
      result[id] = computeOutputs(inputs[id], timeframe);
    }
    return result;
  }, [inputs, timeframe]);

  const aggregate = useMemo(
    () => aggregateChannels(outputs, enabled, inputs, timeframe),
    [outputs, enabled, inputs, timeframe]
  );

  const handleInputChange = (id: ChannelId, field: keyof ChannelInputs, value: number) => {
    setInputs(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleToggle = (id: ChannelId) => {
    setEnabled(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Header timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <AggregateSummary aggregate={aggregate} timeframe={timeframe} />
        <RevenueChart channels={CHANNELS} outputs={outputs} enabled={enabled} />

        <div className="space-y-4 mb-6">
          {CHANNELS.map(config => (
            <ChannelCard
              key={config.id}
              config={config}
              inputs={inputs[config.id]}
              outputs={outputs[config.id]}
              enabled={enabled[config.id]}
              timeframe={timeframe}
              onInputChange={(field, value) => handleInputChange(config.id, field, value)}
              onToggle={() => handleToggle(config.id)}
            />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
