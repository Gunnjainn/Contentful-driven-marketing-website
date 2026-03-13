import Link from "next/link";
import { getPosts } from "@/lib/contentful";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

const subheading = "Insights, stories, and ideas to help your business grow in the digital age.";
const words = subheading.split(" ");

export default async function HomePage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 pt-0 pb-16">
      {/* Hero section */}
      <section className="rounded-xl border border-slate-100 bg-slate-50 px-6 py-10 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Welcome to Our Blog
        </h1>

        {/* Word-by-word animated subheading */}
        <p className="mb-8 text-lg text-slate-500">
          {words.map((word, index) => (
            <span
              key={index}
              className="word-animate inline-block"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {word}{index < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </p>

        <Link href="/blog">
          <Button
            size="lg"
            className="rounded-lg bg-slate-900 px-6 py-2 text-white transition-colors duration-200 hover:bg-slate-700"
          >
            View All Posts
          </Button>
        </Link>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-4xl border-t border-slate-200 mt-8" />

      {/* Latest posts */}
      <section className="mt-6 pb-12">
        <h2 className="mb-2 text-2xl font-semibold">Latest Posts</h2>
        <p className="mt-1 mb-6 text-sm text-slate-400">
          Showing the 3 most recent articles
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full min-h-[160px] cursor-pointer rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="font-semibold text-slate-900">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm text-slate-500">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">
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
      </section>
    </div>
  );
}