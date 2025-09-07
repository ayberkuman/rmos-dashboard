import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BlacklistPageClient } from "@/components/blacklist/blacklist-page-client";
import { defaultBlacklistRequest } from "@/lib/queries/blacklist";
import { blacklistKeys } from "@/lib/queries/blacklist";
import { serverFetchBlacklistData } from "@/lib/queries/server-query-functions";

export default async function BlackListPage() {
  const queryClient = new QueryClient();

  try {
    // Prefetch blacklist data on the server
    await queryClient.prefetchQuery({
      queryKey: blacklistKeys.list(defaultBlacklistRequest),
      queryFn: () => serverFetchBlacklistData(defaultBlacklistRequest),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  } catch (error) {
    // If prefetch fails (e.g., no auth token), the client will handle it
    console.log(
      "Server prefetch failed, client will handle authentication",
      error
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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlacklistPageClient />
      </HydrationBoundary>
    </div>
  );
}
