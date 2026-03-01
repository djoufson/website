export default function ProjectDetailLoading() {
  return (
    <div className="container max-w-4xl py-16">
      <div className="h-4 w-32 bg-muted rounded animate-pulse mb-8" />

      <div className="mb-6 space-y-3">
        <div className="h-9 w-2/3 bg-muted rounded animate-pulse" />
        <div className="h-5 w-full bg-muted rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="flex gap-6 py-4 mb-8 border-y">
        <div className="h-4 w-28 bg-muted rounded animate-pulse" />
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      </div>

      <div className="w-full aspect-video bg-muted rounded-lg animate-pulse mb-10" />

      <div className="space-y-4 mb-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-muted rounded animate-pulse"
            style={{ width: `${70 + (i % 4) * 8}%` }}
          />
        ))}
      </div>
    </div>
  );
}
