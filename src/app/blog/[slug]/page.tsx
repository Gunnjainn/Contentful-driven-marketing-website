import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts, getPostBySlug } from "@/lib/contentful";
import { RichTextRenderer } from "@/components/RichTextRenderer";

export const revalidate = 60;

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition-colors duration-150 hover:text-slate-900"
      >
        ← Back to Blog
      </Link>

      <article>
        <header className="mb-6 border-b border-slate-100 pb-4">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
            {post.title}
          </h1>
          <p className="text-sm text-slate-400">
            {new Date(post.publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        {post.coverImage && (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            width={post.coverImage.width}
            height={post.coverImage.height}
            className="mb-10 w-full max-h-[420px] rounded-xl object-cover shadow-sm"
            priority
          />
        )}

        <div className="prose prose-slate prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
          <RichTextRenderer document={post.content} />
        </div>
      </article>
    </main>
  );
}
