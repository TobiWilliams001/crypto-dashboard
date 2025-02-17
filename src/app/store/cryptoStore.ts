import { create } from 'zustand';
import { CryptoData, AIInsight } from '@/lib/types';

interface CryptoStore {
  cryptoData: CryptoData[];
  setCryptoData: (data: CryptoData[]) => void;
  selectedCrypto: string | null;
  setSelectedCrypto: (symbol: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  aiInsights: AIInsight[];
  setAIInsight: (insight: AIInsight) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  cryptoData: [],
  setCryptoData: (data) => set({ cryptoData: data }),
  selectedCrypto: null,
  setSelectedCrypto: (symbol) => set({ selectedCrypto: symbol }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  aiInsights: [],
  setAIInsight: (insight) => set((state) => ({
    aiInsights: [...state.aiInsights.filter(i => i.symbol !== insight.symbol), insight]
  })),
}));