"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ForecastDataItem } from "@/lib/types/api";

interface ForecastChartProps {
  data: ForecastDataItem[];
}

const chartConfig = {
  "toplam-kisi": {
    label: "Toplam Kişi",
    color: "var(--chart-1)",
  },
  mevcut: {
    label: "Mevcut",
    color: "var(--chart-2)",
  },
  "doluluk-yuzde": {
    label: "Doluluk%",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ForecastChart({ data }: ForecastChartProps) {
  // Transform the data for the chart
  const chartData = data.map((item) => ({
    date: item["Gun Tarih"],
    "toplam-kisi": item["Toplam Kişi"],
    mevcut: item.Mevcut,
    "doluluk-yuzde": item["Yüzde%"] * 100, // Convert to percentage
  }));

  // Calculate total occupancy percentage for the footer
  const totalPeople = data.reduce((sum, item) => sum + item["Toplam Kişi"], 0);
  const totalAvailable = data.reduce((sum, item) => sum + item.Mevcut, 0);
  const occupancyRate =
    totalPeople > 0
      ? ((totalPeople / (totalPeople + totalAvailable)) * 100).toFixed(1)
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast Overview</CardTitle>
        <CardDescription>
          Room occupancy and availability forecast for the selected period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="toplam-kisi"
              stackId="a"
              fill="var(--color-toplam-kisi)"
              radius={[0, 0, 4, 4]}
            />

            <Bar
              dataKey="mevcut"
              stackId="a"
              fill="var(--color-mevcut)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="doluluk-yuzde"
                position="top"
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Occupancy rate: {occupancyRate}% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total people vs availability for the forecast period
        </div>
      </CardFooter>
    </Card>
  );
}
