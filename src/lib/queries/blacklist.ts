import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchBlacklistData,
  createBlacklistItem,
  updateBlacklistItem
} from './query-functions';
import type {
  BlacklistGetRequest,
  BlacklistGetResponse,
  BlacklistCreateUpdateRequest,
  BlacklistCreateUpdateResponse,
  BlacklistItem
} from '@/lib/types/api';

export const blacklistKeys = {
  all: ['blacklist'] as const,
  lists: () => [...blacklistKeys.all, 'list'] as const,
  list: (filters: BlacklistGetRequest) => [...blacklistKeys.lists(), filters] as const,
  details: () => [...blacklistKeys.all, 'detail'] as const,
  detail: (id: number) => [...blacklistKeys.details(), id] as const,
} as const;

// Default request params
export const defaultBlacklistRequest: BlacklistGetRequest = {
  db_Id: 9,
  Adi: "ALL?",
  Tip: 9,
};

export function useBlacklistData(request: BlacklistGetRequest = defaultBlacklistRequest) {
  return useQuery<BlacklistGetResponse, Error>({
    queryKey: blacklistKeys.list(request),
    queryFn: () => fetchBlacklistData(request),
    enabled: !!request,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
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
export function useCreateBlacklistItem() {
  const queryClient = useQueryClient();

  return useMutation<BlacklistCreateUpdateResponse, Error, BlacklistCreateUpdateRequest>({
    mutationFn: createBlacklistItem,
    onSuccess: (data, variables) => {
      // Refresh the blacklist data
      queryClient.invalidateQueries({ queryKey: blacklistKeys.all });

      // Add the new item to cache for instant UI update
      if (data.isSucceded && data.value) {
        const newItem: BlacklistItem = {
          Id: parseInt(data.value), // API returns the new ID
          Adi: variables.Adi,
          Soy: variables.Soy,
          Aciklama: variables.Aciklama,
          Tcno: variables.Tcno || null,
          Kimlik_no: variables.Kimlik_no || null,
          Dogum_tarihi: variables.Dogum_tarihi || null,
          Sistem_tarihi: new Date().toISOString(),
          Sistem_grubu: variables.Sistem_grubu || null,
          Otel_kodu: variables.Otel_kodu || null,
          Ulke_xml: variables.Ulke_xml || null,
          Kulanici: variables.Kulanici || null,
          Acenta: variables.Acenta || null,
          "Xml Kodu": variables["Xml Kodu"] || null,
          "ULke Adı": variables["ULke Adı"] || null,
        };

        // Update cache with the new item
        queryClient.setQueryData<BlacklistGetResponse>(
          blacklistKeys.list(defaultBlacklistRequest),
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              value: [...oldData.value, newItem],
            };
          }
        );
      }
    },
    onError: (error) => {
      console.error('Failed to create blacklist item:', error);
    },
  });
}
export function useUpdateBlacklistItem() {
  const queryClient = useQueryClient();

  return useMutation<BlacklistCreateUpdateResponse, Error, BlacklistCreateUpdateRequest>({
    mutationFn: updateBlacklistItem,
    onSuccess: (data, variables) => {
      // Refresh the blacklist data
      queryClient.invalidateQueries({ queryKey: blacklistKeys.all });

      // Update the item in cache for instant UI update
      if (data.isSucceded) {
        queryClient.setQueryData<BlacklistGetResponse>(
          blacklistKeys.list(defaultBlacklistRequest),
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              value: oldData.value.map(item =>
                item.Id === variables.Id
                  ? {
                    ...item,
                    Adi: variables.Adi,
                    Soy: variables.Soy,
                    Aciklama: variables.Aciklama,
                    Tcno: variables.Tcno || item.Tcno,
                    Kimlik_no: variables.Kimlik_no || item.Kimlik_no,
                    Dogum_tarihi: variables.Dogum_tarihi || item.Dogum_tarihi,
                    Sistem_grubu: variables.Sistem_grubu || item.Sistem_grubu,
                    Otel_kodu: variables.Otel_kodu || item.Otel_kodu,
                    Ulke_xml: variables.Ulke_xml || item.Ulke_xml,
                    Kulanici: variables.Kulanici || item.Kulanici,
                    Acenta: variables.Acenta || item.Acenta,
                    "Xml Kodu": variables["Xml Kodu"] || item["Xml Kodu"],
                    "ULke Adı": variables["ULke Adı"] || item["ULke Adı"],
                  }
                  : item
              ),
            };
          }
        );
      }
    },
    onError: (error) => {
      console.error('Failed to update blacklist item:', error);
    },
  });
}
