import { ForecastTableSkeleton } from "@/components/forecast/forecast-table-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Forecast Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Hotel occupancy and revenue forecast data
        </p>
      </div>

      <ForecastTableSkeleton />
    </div>
  );
}
