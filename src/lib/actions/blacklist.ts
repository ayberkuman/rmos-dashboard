'use server';

import { revalidatePath } from 'next/cache';
import { getBlacklistData, createBlacklistItem, updateBlacklistItem } from '@/lib/services/blacklist';
import type {
  BlacklistGetRequest,
  BlacklistGetResponse,
  BlacklistCreateUpdateRequest,
  BlacklistCreateUpdateResponse
} from '@/lib/types/api';

export async function fetchBlacklistData(request: BlacklistGetRequest): Promise<BlacklistGetResponse> {
  try {
    const response = await getBlacklistData(request);
    return response;
  } catch (error) {
    console.error('Blacklist data fetch error:', error);
    throw new Error('Failed to fetch blacklist data');
  }
}

export async function createBlacklistEntry(formData: FormData): Promise<BlacklistCreateUpdateResponse> {
  try {
    const request: BlacklistCreateUpdateRequest = {
      db_Id: 9,
      Id: 0, // 0 for new record
      Adi: formData.get('adi') as string,
      Soy: formData.get('soy') as string,
      Aciklama: formData.get('aciklama') as string,
      Tcno: formData.get('tcno') as string || null,
      Kimlik_no: formData.get('kimlik_no') as string || null,
      Dogum_tarihi: formData.get('dogum_tarihi') as string || null,
      Sistem_grubu: formData.get('sistem_grubu') as string || null,
      Otel_kodu: formData.get('otel_kodu') as string || null,
      Ulke_xml: formData.get('ulke_xml') as string || null,
      Kulanici: formData.get('kulanici') as string || null,
      Acenta: formData.get('acenta') as string || null,
      "Xml Kodu": formData.get('xml_kodu') as string || null,
      "ULke Adı": formData.get('ulke_adi') as string || null,
    };

    const response = await createBlacklistItem(request);

    // Revalidate the blacklist page to refresh data
    revalidatePath('/blacklist');

    return response;
  } catch (error) {
    console.error('Create blacklist entry error:', error);
    throw new Error('Failed to create blacklist entry');
  }
}

export async function updateBlacklistEntry(formData: FormData): Promise<BlacklistCreateUpdateResponse> {
  try {
    const request: BlacklistCreateUpdateRequest = {
      db_Id: 9,
      Id: parseInt(formData.get('id') as string),
      Adi: formData.get('adi') as string,
      Soy: formData.get('soy') as string,
      Aciklama: formData.get('aciklama') as string,
      Tcno: formData.get('tcno') as string || null,
      Kimlik_no: formData.get('kimlik_no') as string || null,
      Dogum_tarihi: formData.get('dogum_tarihi') as string || null,
      Sistem_grubu: formData.get('sistem_grubu') as string || null,
      Otel_kodu: formData.get('otel_kodu') as string || null,
      Ulke_xml: formData.get('ulke_xml') as string || null,
      Kulanici: formData.get('kulanici') as string || null,
      Acenta: formData.get('acenta') as string || null,
      "Xml Kodu": formData.get('xml_kodu') as string || null,
      "ULke Adı": formData.get('ulke_adi') as string || null,
    };

    const response = await updateBlacklistItem(request);

    // Revalidate the blacklist page to refresh data
    revalidatePath('/blacklist');

    return response;
  } catch (error) {
    console.error('Update blacklist entry error:', error);
    throw new Error('Failed to update blacklist entry');
  }
}
