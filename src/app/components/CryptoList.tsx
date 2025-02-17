import React from 'react';
import { useCryptoStore } from '../store/cryptoStore';
import CryptoCard from './CryptoCard';

export default function CryptoList() {
  const { cryptoData, setSelectedCrypto } = useCryptoStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cryptoData.slice(0, 20).map((crypto) => (
        <CryptoCard
          key={crypto.symbol}
          crypto={crypto}
          onClick={() => setSelectedCrypto(crypto.symbol)}
        />
      ))}
    </div>
  );
}