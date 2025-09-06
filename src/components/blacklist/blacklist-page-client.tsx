"use client";

import * as React from "react";
import {
  fetchBlacklistData,
  createBlacklistEntry,
  updateBlacklistEntry,
} from "@/lib/server-actions/blacklist";
import type { BlacklistItem, BlacklistGetRequest } from "@/lib/types/api";
import { BlacklistDataTable } from "@/components/blacklist/blacklist-data-table";
import { BlacklistFormDialog } from "@/components/blacklist/blacklist-form-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BlacklistPageClientProps {
  initialData: BlacklistItem[];
  initialRequest: BlacklistGetRequest;
}

export function BlacklistPageClient({
  initialData,
  initialRequest,
}: BlacklistPageClientProps) {
  const [data, setData] = React.useState<BlacklistItem[]>(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [editingItem, setEditingItem] = React.useState<
    BlacklistItem | undefined
  >(undefined);

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchBlacklistData(initialRequest);

      if (response.isSucceded) {
        setData(response.value);
      } else {
        setError(response.message || "Veri alınırken hata oluştu");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Blacklist data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData: {
    adi: string;
    soy: string;
    aciklama: string;
    tcno?: string;
    kimlik_no?: string;
    dogum_tarihi?: string;
    sistem_grubu?: string;
    otel_kodu?: string;
    ulke_xml?: string;
    kulanici?: string;
    acenta?: string;
    xml_kodu?: string;
    ulke_adi?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("adi", formData.adi);
      form.append("soy", formData.soy);
      form.append("aciklama", formData.aciklama);
      form.append("tcno", formData.tcno || "");
      form.append("kimlik_no", formData.kimlik_no || "");
      form.append("dogum_tarihi", formData.dogum_tarihi || "");
      form.append("sistem_grubu", formData.sistem_grubu || "");
      form.append("otel_kodu", formData.otel_kodu || "");
      form.append("ulke_xml", formData.ulke_xml || "");
      form.append("kulanici", formData.kulanici || "");
      form.append("acenta", formData.acenta || "");
      form.append("xml_kodu", formData.xml_kodu || "");
      form.append("ulke_adi", formData.ulke_adi || "");

      const response = await createBlacklistEntry(form);

      if (response.isSucceded) {
        // Refresh the data
        await handleRefresh();
      } else {
        setError(response.message || "Kayıt oluşturulurken hata oluştu");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Create blacklist entry error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (formData: {
    adi: string;
    soy: string;
    aciklama: string;
    tcno?: string;
    kimlik_no?: string;
    dogum_tarihi?: string;
    sistem_grubu?: string;
    otel_kodu?: string;
    ulke_xml?: string;
    kulanici?: string;
    acenta?: string;
    xml_kodu?: string;
    ulke_adi?: string;
  }) => {
    if (!editingItem) return;

    setIsLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("id", editingItem.Id.toString());
      form.append("adi", formData.adi);
      form.append("soy", formData.soy);
      form.append("aciklama", formData.aciklama);
      form.append("tcno", formData.tcno || "");
      form.append("kimlik_no", formData.kimlik_no || "");
      form.append("dogum_tarihi", formData.dogum_tarihi || "");
      form.append("sistem_grubu", formData.sistem_grubu || "");
      form.append("otel_kodu", formData.otel_kodu || "");
      form.append("ulke_xml", formData.ulke_xml || "");
      form.append("kulanici", formData.kulanici || "");
      form.append("acenta", formData.acenta || "");
      form.append("xml_kodu", formData.xml_kodu || "");
      form.append("ulke_adi", formData.ulke_adi || "");

      const response = await updateBlacklistEntry(form);

      if (response.isSucceded) {
        // Refresh the data
        await handleRefresh();
        setEditingItem(undefined);
      } else {
        setError(response.message || "Kayıt güncellenirken hata oluştu");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Update blacklist entry error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: BlacklistItem) => {
    setEditingItem(item);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? "Yükleniyor..." : "Yenile"}
        </Button>
        <BlacklistFormDialog
          mode="create"
          onSubmit={handleCreate}
          isLoading={isLoading}
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Kayıt
          </Button>
        </BlacklistFormDialog>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Kara Liste Kayıtları</h2>
          <BlacklistDataTable data={data} onEdit={handleEdit} />
        </div>
      </div>

      {/* Edit Dialog */}
      {editingItem && (
        <BlacklistFormDialog
          mode="edit"
          item={editingItem}
          onSubmit={handleUpdate}
          isLoading={isLoading}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setEditingItem(undefined);
            }
          }}
        />
      )}
    </div>
  );
}
