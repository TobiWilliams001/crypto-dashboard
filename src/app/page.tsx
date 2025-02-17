'use client';

import React, { useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { useCryptoStore } from './store/cryptoStore';
import CryptoList from './components/CryptoList';
import PriceChart from './components/PriceChart';
import AIInsights from './components/AIInsights';


import dynamic from 'next/dynamic';

const PriceChart = dynamic(() => import('./components/PriceChart'), {
  loading: () => <p>Loading chart...</p>,
});

const AIInsights = dynamic(() => import('./components/AIInsights'), {
  loading: () => <p>Loading AI insights...</p>,
});

export default function Home() {
  const websocketData = useWebSocket();
  const { setCryptoData } = useCryptoStore();

  useEffect(() => {
    setCryptoData(websocketData);
  }, [websocketData, setCryptoData]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Real-Time Crypto Dashboard</h1>
      <CryptoList />
      <div className="mt-8">
        <PriceChart />
      </div>
      <AIInsights />
    </main>
  );
}