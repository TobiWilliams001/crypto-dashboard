'use client';

import React, { useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { useCryptoStore } from './store/cryptoStore';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CryptoList from './components/CryptoList';
import PriceChart from './components/PriceChart';
import AIInsights from './components/AIInsights';

export default function Home() {
  const { data: websocketData, error } = useWebSocket();
  const { setCryptoData } = useCryptoStore();

  useEffect(() => {
    if (websocketData) {
      setCryptoData(websocketData);
    }
  }, [websocketData, setCryptoData]);

  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <SearchBar />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <CryptoList />
      <div className="mt-8">
        <PriceChart />
      </div>
      <AIInsights />
    </main>
  );
}