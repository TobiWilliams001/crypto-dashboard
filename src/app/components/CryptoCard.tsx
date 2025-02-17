import React from 'react';
import { CryptoData } from '@/lib/types';
import { formatPrice, formatPercent } from '@/app/utils/formatters';

interface CryptoCardProps {
  crypto: CryptoData;
  onClick: () => void;
  isSelected: boolean;
}

export default function CryptoCard({ crypto, onClick, isSelected }: CryptoCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold dark:text-white">{crypto.symbol}</h2>
      <p className="text-2xl dark:text-gray-200">{formatPrice(crypto.price)}</p>
      <p className={`text-sm ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {formatPercent(crypto.changePercent)} ({formatPrice(crypto.change)})
      </p>
    </div>
  );
}