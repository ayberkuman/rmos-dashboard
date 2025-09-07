import { getAuthenticatedFrontApiClient } from '@/lib/api-client';
import type {
  ForecastRequest,
  ForecastResponse,
  BlacklistGetRequest,
  BlacklistGetResponse,
} from '@/lib/types/api';

// These use httpOnly cookies for server-side prefetching
export async function serverFetchForecastData(request: ForecastRequest): Promise<ForecastResponse> {
  const client = await getAuthenticatedFrontApiClient();
  return client.post<ForecastResponse>('/Procedure/StpRmforKlasik_2', request);
}

export async function serverFetchBlacklistData(request: BlacklistGetRequest): Promise<BlacklistGetResponse> {
  const client = await getAuthenticatedFrontApiClient();
  return client.post<BlacklistGetResponse>('/Kara/Getir_Kod', request);
}
