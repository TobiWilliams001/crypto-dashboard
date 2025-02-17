import { useState, useEffect, useCallback } from 'react';
import { CryptoData } from '@/lib/types';

const WS_URL = 'wss://stream.binance.com:9443/ws/!ticker@arr';

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<CryptoData[]>([]);

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
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

    ws.onclose = () => {
      console.log('WebSocket disconnected');
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

  return data;
}