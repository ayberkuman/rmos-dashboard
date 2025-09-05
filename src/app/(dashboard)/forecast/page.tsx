import {
  getForecastData,
  defaultForecastRequest,
} from "@/lib/services/forecast";
import { ForecastDataTable } from "@/components/forecast/forecast-data-table";

export default async function ForecastPage() {
  // Fetch forecast data using our API client
  const forecastResponse = await getForecastData(defaultForecastRequest);

  if (!forecastResponse.isSucceded) {
    throw new Error(
      forecastResponse.message || "Failed to fetch forecast data"
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Forecast Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Hotel occupancy and revenue forecast data
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Forecast Data</h2>
          <ForecastDataTable data={forecastResponse.value} />
        </div>
      </div>
    </div>
  );
}
