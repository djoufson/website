export default function BlogListingLoading() {
  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <div className="h-9 w-24 bg-muted rounded animate-pulse mb-4" />
          <div className="h-5 w-full bg-muted rounded animate-pulse mb-2" />
          <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-48 bg-muted rounded-lg animate-pulse" />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-muted rounded-md animate-pulse" />
        ))}
      </div>

      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6 space-y-3">
            <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-muted rounded animate-pulse" />
              <div className="h-5 w-16 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
