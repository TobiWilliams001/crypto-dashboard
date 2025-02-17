'use client'

import React from 'react'
import { useCryptoStore } from '../store/cryptoStore'
import CryptoCard from './CryptoCard'

export default function CryptoList() {
  const { cryptoData, setSelectedCrypto, selectedCrypto, searchTerm } = useCryptoStore()

  const filteredData = cryptoData.filter(crypto => 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredData.slice(0, 20).map((crypto) => (
        <CryptoCard
          key={crypto.symbol}
          crypto={crypto}
          onClick={() => setSelectedCrypto(crypto.symbol)}
          isSelected={selectedCrypto === crypto.symbol}
        />
      ))}
    </div>
  )
}