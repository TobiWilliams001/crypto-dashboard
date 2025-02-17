import React, { useState, useEffect } from 'react';
import { useCryptoStore } from '../store/cryptoStore';

export default function AIInsights() {
  const { selectedCrypto, cryptoData, aiInsights, setAIInsight } = useCryptoStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCrypto) {
      fetchInsights();
    }
  }, [selectedCrypto]);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol: selectedCrypto, data: cryptoData }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch AI insights');
      }
      const data = await response.json();
      setAIInsight({ symbol: selectedCrypto!, insight: data.insights });
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      setError('Failed to generate insights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedCrypto) {
    return null;
  }

  const currentInsight = aiInsights.find(i => i.symbol === selectedCrypto);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold mb-2 dark:text-white">AI Insights</h2>
      {loading && <p className="text-gray-500 dark:text-gray-400">Generating insights...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && currentInsight && (
        <p className="dark:text-gray-200">{currentInsight.insight}</p>
      )}
    </div>
  );
}