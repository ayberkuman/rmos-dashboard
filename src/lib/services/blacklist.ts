import { getAuthenticatedFrontApiClient } from '@/lib/api-client';
import type {
  BlacklistGetRequest,
  BlacklistGetResponse,
  BlacklistCreateUpdateRequest,
  BlacklistCreateUpdateResponse
} from '@/lib/types/api';

export async function getBlacklistData(request: BlacklistGetRequest): Promise<BlacklistGetResponse> {
  const client = await getAuthenticatedFrontApiClient();

  return client.post<BlacklistGetResponse>('/Kara/Getir_Kod', request);
}

export async function createBlacklistItem(request: BlacklistCreateUpdateRequest): Promise<BlacklistCreateUpdateResponse> {
  const client = await getAuthenticatedFrontApiClient();

  return client.post<BlacklistCreateUpdateResponse>('/Kara/Ekle', request);
}

export async function updateBlacklistItem(request: BlacklistCreateUpdateRequest): Promise<BlacklistCreateUpdateResponse> {
  const client = await getAuthenticatedFrontApiClient();

  return client.post<BlacklistCreateUpdateResponse>('/Kara/Ekle', request);
}

// Default blacklist request for testing
export const defaultBlacklistRequest: BlacklistGetRequest = {
  db_Id: 9,
  Adi: "ALL?",
  Tip: 9,
};
