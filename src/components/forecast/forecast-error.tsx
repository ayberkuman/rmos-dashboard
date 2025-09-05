"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ForecastErrorProps {
  error: Error;
  reset: () => void;
}

export function ForecastError({ error, reset }: ForecastErrorProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Forecast Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Hotel occupancy and revenue forecast data
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-red-800">
            Error Loading Forecast Data
          </h2>
        </div>

        <p className="text-red-600 mb-6">
          {error.message ||
            "An unexpected error occurred while loading forecast data."}
        </p>

        <div className="flex gap-3">
          <Button
            onClick={reset}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
