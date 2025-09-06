import {
  getBlacklistData,
  defaultBlacklistRequest,
} from "@/lib/services/blacklist";
import { BlacklistPageClient } from "@/components/blacklist/blacklist-page-client";

export default async function BlackListPage() {
  try {
    // Fetch initial blacklist data using our API client
    const blacklistResponse = await getBlacklistData(defaultBlacklistRequest);

    if (!blacklistResponse.isSucceded) {
      throw new Error(
        blacklistResponse.message || "Failed to fetch blacklist data"
      );
    }

    return (
      <div className="container mx-auto p-6">
        <BlacklistPageClient
          initialData={blacklistResponse.value}
          initialRequest={defaultBlacklistRequest}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blacklist data:", error);

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Kara Liste Yönetimi</h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Veri Yükleme Hatası
          </h2>
          <p className="text-red-600">
            {error instanceof Error
              ? error.message
              : "Beklenmeyen bir hata oluştu"}
          </p>
        </div>
      </div>
    );
  }
}
