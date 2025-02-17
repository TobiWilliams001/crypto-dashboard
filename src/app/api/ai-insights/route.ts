import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { CryptoData } from '@/lib/types';

export async function POST(req: Request) {
  const { symbol, data } = await req.json();
  const cryptoData = data.find((c: CryptoData) => c.symbol === symbol);

  if (!cryptoData) {
    return NextResponse.json({ error: 'Cryptocurrency not found' }, { status: 404 });
  }

  const prompt = `Analyze the following cryptocurrency data for ${symbol}:
    Price: $${cryptoData.price}
    24h Change: ${cryptoData.changePercent}%

    Provide a brief market analysis and trading insight based on this data. 
    Include potential support and resistance levels, and a short-term price prediction.`;

  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
      apiKey: process.env.OPENAI_API_KEY,
    });

    return NextResponse.json({ insights: text });
  } catch (error) {
    console.error('Error generating AI insights:', error);
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
  }
}