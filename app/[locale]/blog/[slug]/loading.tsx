export default function BlogPostLoading() {
  return (
    <article className="container max-w-4xl py-16">
      <div className="mx-auto">
        <div className="h-64 md:h-96 w-full bg-muted rounded-lg animate-pulse mb-8" />

        <div className="text-center mb-8 space-y-4">
          <div className="h-10 w-3/4 mx-auto bg-muted rounded animate-pulse" />
          <div className="flex justify-center gap-6">
            <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-muted rounded animate-pulse"
              style={{ width: `${75 + (i % 4) * 6}%` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
