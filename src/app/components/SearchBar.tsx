'use client'

import React from 'react'
import { useCryptoStore } from '../store/cryptoStore'

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useCryptoStore()

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search cryptocurrencies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  )
}