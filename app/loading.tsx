import { Skeleton } from "@/components/ui/skeleton";

/**
 * Displays the route-level loading shell while the home page resolves.
 */
const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-20 sm:px-6 lg:px-8">
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-72 w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    </div>
  );
};

export default Loading;
