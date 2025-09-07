import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ForecastPageClient } from "@/components/forecast/forecast-page-client";
import { defaultForecastRequest } from "@/lib/queries/forecast";
import { forecastKeys } from "@/lib/queries/forecast";
import { serverFetchForecastData } from "@/lib/queries/server-query-functions";

export default async function ForecastPage() {
  const queryClient = new QueryClient();

  try {
    // Prefetch forecast data on the server
    await queryClient.prefetchQuery({
      queryKey: forecastKeys.list(defaultForecastRequest),
      queryFn: () => serverFetchForecastData(defaultForecastRequest),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  } catch (error) {
    // If prefetch fails (e.g., no auth token), the client will handle it
    console.log(
      "Server prefetch failed, client will handle authentication",
      error
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Forecast Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Hotel occupancy and revenue forecast data
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ForecastPageClient />
      </HydrationBoundary>
    </div>
  );
}
