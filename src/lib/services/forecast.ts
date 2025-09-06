import { getAuthenticatedFrontApiClient } from '@/lib/api-client';
import type { ForecastRequest, ForecastResponse } from '@/lib/types/api';

export async function getForecastData(request: ForecastRequest): Promise<ForecastResponse> {
  const client = await getAuthenticatedFrontApiClient();

  return client.post<ForecastResponse>('/Procedure/StpRmforKlasik_2', request);
}

// Default forecast request for testing
export const defaultForecastRequest: ForecastRequest = {
  db_Id: 9,
  xRez_Sirket: 9,
  xBas_Tar: "2024-06-01",
  xBit_Tar: "2024-06-30",
  xtip: 1,
  kon1: "ALL",
  kon2: "BB",
  xchkFis_Fazla_otel_10: 0,
  bas_Yil: 2022,
  bit_Yil: 2022,
  fisrci_Kapalioda_10: 0,
  xRez_C_W: "C",
  xSistem_Tarihi: "2024-01-01",
  xAlis_Tarihi: "2024-01-01",
  sistem_Bas1: "2020-01-01",
  sistem_Bit1: "2029-01-01",
  pmdahil_10: 0,
  tip_1: "001",
  xFis_Bela_tutar_10: 0,
  trace_Dus_10: 0,
  cev_01: null,
};
