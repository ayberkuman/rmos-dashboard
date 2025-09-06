import { BlacklistPageClient } from "@/components/blacklist/blacklist-page-client";
import {
  defaultBlacklistRequest,
  getBlacklistData,
} from "@/lib/services/blacklist";

export default async function BlackListPage() {
  // Fetch initial blacklist data using our API client
  const blacklistResponse = await getBlacklistData(defaultBlacklistRequest);

  if (!blacklistResponse.isSucceded) {
    throw new Error(
      blacklistResponse.message || "Failed to fetch blacklist data"
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Kara Liste Yönetimi</h1>
        <p className="text-muted-foreground mt-2">
          Kara liste kayıtlarını görüntüleyin, ekleyin ve düzenleyin
        </p>
      </div>

      <BlacklistPageClient
        initialData={blacklistResponse.value}
        initialRequest={defaultBlacklistRequest}
      />
    </div>
  );
}
