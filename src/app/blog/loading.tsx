export default function BlogListLoading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8 h-9 w-24 animate-pulse rounded bg-muted" />

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
          >
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </main>
  );
}
