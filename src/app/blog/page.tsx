import { getPosts } from "@/lib/contentful";
import { BlogPostList } from "@/components/BlogPostList";

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 pt-10 pb-16 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Blog</h1>
        <p className="text-lg text-slate-500">
          No posts yet — check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-16">
      <h1 className="mb-0 text-3xl font-bold tracking-tight text-slate-900">Blog</h1>
      <p className="mt-1 mb-8 text-sm text-slate-500">All posts, newest first.</p>
      <BlogPostList posts={posts} />
    </div>
  );
}
