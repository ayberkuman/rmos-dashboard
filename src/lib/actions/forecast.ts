'use server';

import { getForecastData } from '@/lib/services/forecast';
import type { ForecastRequest, ForecastResponse } from '@/lib/types/api';

export async function fetchForecastData(request: ForecastRequest): Promise<ForecastResponse> {
  try {
    const response = await getForecastData(request);
    return response;
  } catch (error) {
    console.error('Forecast data fetch error:', error);
    throw new Error('Failed to fetch forecast data');
  }
}
