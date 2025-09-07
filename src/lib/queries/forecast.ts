import { useQuery } from '@tanstack/react-query';
import { fetchForecastData } from './query-functions';
import type { ForecastRequest, ForecastResponse } from '@/lib/types/api';

export const forecastKeys = {
  all: ['forecast'] as const,
  lists: () => [...forecastKeys.all, 'list'] as const,
  list: (filters: ForecastRequest) => [...forecastKeys.lists(), filters] as const,
} as const;

// Sample request with some default values
export const defaultForecastRequest: ForecastRequest = {
  db_Id: 9,
  xRez_Sirket: 9,
  xBas_Tar: "2024-06-01",
  xBit_Tar: "2024-06-10",
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

export function useForecastData(request: ForecastRequest = defaultForecastRequest) {
  return useQuery<ForecastResponse, Error>({
    queryKey: forecastKeys.list(request),
    queryFn: () => fetchForecastData(request),
    enabled: !!request,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Skip retry for auth errors
      if (error.message.includes('401') || error.message.includes('No authentication token')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
