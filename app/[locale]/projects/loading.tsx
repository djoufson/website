export default function ProjectsLoading() {
  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <div className="h-9 w-28 bg-muted rounded animate-pulse mb-4" />
          <div className="h-5 w-full bg-muted rounded animate-pulse mb-2" />
          <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-48 bg-muted rounded-lg animate-pulse" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-muted rounded-md animate-pulse" />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-7 w-16 bg-muted rounded-md animate-pulse" />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border"
          >
            <div className="w-full sm:w-16 h-32 sm:h-16 bg-muted rounded-md animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-1/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                <div className="h-5 w-16 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
