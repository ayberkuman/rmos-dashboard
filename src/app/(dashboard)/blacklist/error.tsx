"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function BlacklistError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    console.error("Blacklist page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Kara Liste Yönetimi</h1>
        <p className="text-muted-foreground mt-2">
          Kara liste kayıtlarını görüntüleyin, ekleyin ve düzenleyin
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Veri Yükleme Hatası
        </h2>
        <p className="text-red-600 mb-4">
          {error.message || "Beklenmeyen bir hata oluştu"}
        </p>
        <Button
          onClick={reset}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          Tekrar Dene
        </Button>
      </div>
    </div>
  );
}
