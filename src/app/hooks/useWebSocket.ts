import { useState, useEffect, useCallback } from 'react';
import { CryptoData } from '@/lib/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://stream.binance.com:9443/ws/!ticker@arr';

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<CryptoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setError(null);
    };

    ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      const cryptoData: CryptoData[] = json.map((item: any) => ({
        symbol: item.s,
        price: parseFloat(item.c),
        change: parseFloat(item.p),
        changePercent: parseFloat(item.P),
      }));
      setData(cryptoData);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Failed to connect to WebSocket');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setError('WebSocket disconnected. Attempting to reconnect...');
      setTimeout(connect, 5000);
    };

    setSocket(ws);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  return { data, error };
}