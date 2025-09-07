"use client";

import * as React from "react";
import {
  useForecastData,
  defaultForecastRequest,
} from "@/lib/queries/forecast";
import type { ForecastRequest } from "@/lib/types/api";
import { ForecastDataTable } from "@/components/forecast/forecast-data-table";
import { ForecastChart } from "@/components/forecast/forecast-chart";
import { ForecastDatePicker } from "@/components/forecast/forecast-date-picker";

export function ForecastPageClient() {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date(defaultForecastRequest.xBas_Tar)
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    new Date(defaultForecastRequest.xBit_Tar)
  );

  const currentRequest: ForecastRequest = React.useMemo(
    () => ({
      ...defaultForecastRequest,
      xBas_Tar:
        startDate?.toISOString().split("T")[0] ||
        defaultForecastRequest.xBas_Tar,
      xBit_Tar:
        endDate?.toISOString().split("T")[0] || defaultForecastRequest.xBit_Tar,
    }),
    [startDate, endDate]
  );

  const {
    data: forecastResponse,
    isLoading,
    error,
    refetch,
  } = useForecastData(currentRequest);

  const handleApply = () => {
    // Trigger a refetch when date range is applied
    refetch();
  };

  const data = forecastResponse?.value || [];

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
          <p className="text-red-800 text-sm">
            {error.message || "Veri alınırken hata oluştu"}
          </p>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Forecast Data</h2>
          <ForecastDataTable data={data} isLoading={isLoading} />
        </div>
      </div>

      {/* Chart Section */}
      <ForecastChart data={data} isLoading={isLoading} />
    </div>
  );
}
