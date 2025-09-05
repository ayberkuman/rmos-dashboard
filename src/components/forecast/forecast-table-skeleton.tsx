import { Skeleton } from "@/components/ui/skeleton";

export function ForecastTableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="ml-auto h-10 w-[100px]" />
      </div>
      <div className="overflow-hidden rounded-md border">
        <div className="border-b">
          <div className="flex h-12 items-center px-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20 mx-2" />
            ))}
          </div>
        </div>
        <div className="divide-y">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex h-12 items-center px-4">
              {Array.from({ length: 12 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-16 mx-2" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-8 w-[200px]" />
      </div>
    </div>
  );
}
