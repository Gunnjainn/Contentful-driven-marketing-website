"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/types";

interface BlogPostListProps {
  posts: BlogPost[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const [query, setQuery] = useState("");

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search posts by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-8 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
      />

      {filtered.length === 0 ? (
        <p className="text-center text-slate-500">
          No posts match your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full cursor-pointer rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="font-semibold text-slate-900 hover:text-slate-600">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-xs text-slate-600"
                  >
                    {new Date(post.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
