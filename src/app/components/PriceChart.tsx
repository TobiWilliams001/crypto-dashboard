import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCryptoStore } from '../store/cryptoStore';

export default function PriceChart() {
  const { selectedCrypto, cryptoData } = useCryptoStore();
  const selectedData = cryptoData.find((crypto) => crypto.symbol === selectedCrypto);

  if (!selectedData) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Select a cryptocurrency to view its chart</div>;
  }

  // Generate mock historical data for demonstration
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: selectedData.price * (1 + (Math.random() - 0.5) * 0.1),
  }));

  return (
    <div className="h-96 w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">{selectedCrypto} Price Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}