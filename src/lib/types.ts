import type { Document } from "@contentful/rich-text-types";

export interface CoverImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  coverImage: CoverImage | null;
  publishedDate: string;
}
