import { create } from 'zustand';
import { CryptoData } from '@/lib/types';

interface CryptoStore {
  cryptoData: CryptoData[];
  setCryptoData: (data: CryptoData[]) => void;
  selectedCrypto: string | null;
  setSelectedCrypto: (symbol: string | null) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  cryptoData: [],
  setCryptoData: (data) => set({ cryptoData: data }),
  selectedCrypto: null,
  setSelectedCrypto: (symbol) => set({ selectedCrypto: symbol }),
}));