import {
  getForecastData,
  defaultForecastRequest,
} from "@/lib/services/forecast";
import { ForecastPageClient } from "@/components/forecast/forecast-page-client";

export default async function ForecastPage() {
  // Fetch initial forecast data using our API client
  const forecastResponse = await getForecastData(defaultForecastRequest);

  if (!forecastResponse.isSucceded) {
    throw new Error(
      forecastResponse.message || "Failed to fetch forecast data"
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

      <ForecastPageClient
        initialData={forecastResponse.value}
        initialRequest={defaultForecastRequest}
      />
    </div>
  );
}
