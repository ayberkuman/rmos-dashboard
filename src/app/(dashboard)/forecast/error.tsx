"use client";

import { ForecastError } from "@/components/forecast/forecast-error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ForecastError error={error} reset={reset} />;
}
