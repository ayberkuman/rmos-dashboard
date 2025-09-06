"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ForecastDatePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onApply: () => void;
  isLoading?: boolean;
}

export function ForecastDatePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
  isLoading = false,
}: ForecastDatePickerProps) {
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);

  return (
    <div className="flex items-end gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col gap-2">
        <Label htmlFor="start-date" className="text-sm font-medium">
          Başlangıç Tarihi
        </Label>
        <Popover open={startOpen} onOpenChange={setStartOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "dd/MM/yyyy") : "Tarih seçin"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                onStartDateChange(date);
                setStartOpen(false);
              }}
              disabled={(date) => {
                if (endDate) {
                  return date > endDate;
                }
                return date > new Date();
              }}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="end-date" className="text-sm font-medium">
          Bitiş Tarihi
        </Label>
        <Popover open={endOpen} onOpenChange={setEndOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd/MM/yyyy") : "Tarih seçin"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                onEndDateChange(date);
                setEndOpen(false);
              }}
              disabled={(date) => {
                if (startDate) {
                  return date < startDate;
                }
                return date > new Date();
              }}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-end">
        <Button
          onClick={onApply}
          disabled={!startDate || !endDate || isLoading}
          className="h-10"
        >
          {isLoading ? "Yükleniyor..." : "Uygula"}
        </Button>
      </div>
    </div>
  );
}
