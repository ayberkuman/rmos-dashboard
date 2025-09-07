"use client";

import * as React from "react";
import {
  useBlacklistData,
  useCreateBlacklistItem,
  useUpdateBlacklistItem,
  defaultBlacklistRequest,
} from "@/lib/queries/blacklist";
import type { BlacklistItem } from "@/lib/types/api";
import { BlacklistDataTable } from "@/components/blacklist/blacklist-data-table";
import { BlacklistFormDialog } from "@/components/blacklist/blacklist-form-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function BlacklistPageClient() {
  const [editingItem, setEditingItem] = React.useState<
    BlacklistItem | undefined
  >(undefined);

  // Use TanStack Query to fetch blacklist data
  const {
    data: blacklistResponse,
    isLoading,
    error,
    refetch,
  } = useBlacklistData(defaultBlacklistRequest);
  const createMutation = useCreateBlacklistItem();
  const updateMutation = useUpdateBlacklistItem();

  // Extract data from the response
  const data = blacklistResponse?.value || [];

  const handleRefresh = () => {
    refetch();
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
    const request = {
      db_Id: 9,
      Id: 0, // 0 for new record
      Adi: formData.adi,
      Soy: formData.soy,
      Aciklama: formData.aciklama,
      Tcno: formData.tcno || null,
      Kimlik_no: formData.kimlik_no || null,
      Dogum_tarihi: formData.dogum_tarihi || null,
      Sistem_grubu: formData.sistem_grubu || null,
      Otel_kodu: formData.otel_kodu || null,
      Ulke_xml: formData.ulke_xml || null,
      Kulanici: formData.kulanici || null,
      Acenta: formData.acenta || null,
      "Xml Kodu": formData.xml_kodu || null,
      "ULke Adı": formData.ulke_adi || null,
    };

    createMutation.mutate(request, {
      onSuccess: () => {
        // Success is handled by the mutation's onSuccess callback
        console.log("Item created successfully");
      },
      onError: (error) => {
        console.error("Create blacklist entry error:", error);
      },
    });
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

    const request = {
      db_Id: 9,
      Id: editingItem.Id,
      Adi: formData.adi,
      Soy: formData.soy,
      Aciklama: formData.aciklama,
      Tcno: formData.tcno || null,
      Kimlik_no: formData.kimlik_no || null,
      Dogum_tarihi: formData.dogum_tarihi || null,
      Sistem_grubu: formData.sistem_grubu || null,
      Otel_kodu: formData.otel_kodu || null,
      Ulke_xml: formData.ulke_xml || null,
      Kulanici: formData.kulanici || null,
      Acenta: formData.acenta || null,
      "Xml Kodu": formData.xml_kodu || null,
      "ULke Adı": formData.ulke_adi || null,
    };

    updateMutation.mutate(request, {
      onSuccess: () => {
        setEditingItem(undefined);
        console.log("Item updated successfully");
      },
      onError: (error) => {
        console.error("Update blacklist entry error:", error);
      },
    });
  };

  const handleEdit = (item: BlacklistItem) => {
    setEditingItem(item);
  };

  // Combined loading state for all operations (available if needed)
  // const isAnyLoading = isLoading || createMutation.isPending || updateMutation.isPending;

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
          isLoading={createMutation.isPending}
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Kayıt
          </Button>
        </BlacklistFormDialog>
      </div>

      {/* Error Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            {error.message || "Veri alınırken hata oluştu"}
          </p>
        </div>
      )}

      {createMutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            {createMutation.error?.message ||
              "Kayıt oluşturulurken hata oluştu"}
          </p>
        </div>
      )}

      {updateMutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            {updateMutation.error?.message ||
              "Kayıt güncellenirken hata oluştu"}
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">Veriler yükleniyor...</p>
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
          isLoading={updateMutation.isPending}
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
