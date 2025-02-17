import React from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold dark:text-white">Real-Time Crypto Dashboard</h1>
      <DarkModeToggle />
    </header>
  );
}