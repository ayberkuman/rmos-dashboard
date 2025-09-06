"use client";

import * as React from "react";
import { fetchForecastData } from "@/lib/actions/forecast";
import type { ForecastDataItem, ForecastRequest } from "@/lib/types/api";
import { ForecastDataTable } from "@/components/forecast/forecast-data-table";
import { ForecastChart } from "@/components/forecast/forecast-chart";
import { ForecastDatePicker } from "@/components/forecast/forecast-date-picker";

interface ForecastPageClientProps {
  initialData: ForecastDataItem[];
  initialRequest: ForecastRequest;
}

export function ForecastPageClient({
  initialData,
  initialRequest,
}: ForecastPageClientProps) {
  const [data, setData] = React.useState<ForecastDataItem[]>(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Initialize dates from the initial request
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date(initialRequest.xBas_Tar)
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    new Date(initialRequest.xBit_Tar)
  );

  const handleApply = async () => {
    if (!startDate || !endDate) return;

    setIsLoading(true);
    setError(null);

    try {
      const request: ForecastRequest = {
        ...initialRequest,
        xBas_Tar: startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        xBit_Tar: endDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      };

      const response = await fetchForecastData(request);

      if (response.isSucceded) {
        setData(response.value);
      } else {
        setError(response.message || "Veri alınırken hata oluştu");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Forecast data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <ForecastDatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApply={handleApply}
        isLoading={isLoading}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Forecast Data</h2>
          <ForecastDataTable data={data} />
        </div>
      </div>
      {/* Chart Section */}
      <ForecastChart data={data} />
    </div>
  );
}
