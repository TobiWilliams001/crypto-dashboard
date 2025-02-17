import { useState, useEffect, useCallback } from 'react';
import { CryptoData } from '@/lib/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://stream.binance.com:9443/ws/!ticker@arr';

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<CryptoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    console.log('Connecting to WebSocket at:', WS_URL);
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        const cryptoData: CryptoData[] = json.map((item: any) => ({
          symbol: item.s,
          price: parseFloat(item.c),
          change: parseFloat(item.p),
          changePercent: parseFloat(item.P),
        }));
        setData(cryptoData);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError(event instanceof ErrorEvent ? event.message : 'WebSocket connection failed');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting in 5s...');
      setTimeout(() => connect(), 5000);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      socket?.close();
    };
  }, []);

  return { data, error };
}
