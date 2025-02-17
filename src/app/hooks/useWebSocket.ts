import { useState, useEffect, useCallback } from 'react';
import { CryptoData } from '@/lib/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://ws-api.kucoin.com/endpoint';

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
      ws.send(JSON.stringify({
        type: "subscribe",
        topic: "/market/ticker:BTC-USDT,ETH-USDT",
        privateChannel: false,
        response: true
      }));
    };

    ws.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        if (json.topic === "/market/ticker") {
          const cryptoData: CryptoData[] = json.data.map((item: any) => ({
            symbol: item.symbol,
            price: parseFloat(item.price),
            change: parseFloat(item.change),
            changePercent: parseFloat(item.changeRate),
          }));
          setData(cryptoData);
        }
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
      setTimeout(connect, 5000);
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
