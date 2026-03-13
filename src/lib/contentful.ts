import {
  createClient,
  type EntryFieldTypes,
  type Entry,
  type AssetFields,
  type AssetFile,
} from "contentful";
import type { Document } from "@contentful/rich-text-types";
import type { BlogPost, CoverImage } from "./types";

interface BlogPostFields {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  excerpt: EntryFieldTypes.Text;
  content: EntryFieldTypes.RichText;
  coverImage?: EntryFieldTypes.AssetLink;
  publishDate: EntryFieldTypes.Date;
}

type BlogPostSkeleton = {
  contentTypeId: "blogpost";
  fields: BlogPostFields;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

function parseAssetFields(
  fields: AssetFields | undefined
): CoverImage | null {
  if (!fields || !fields.file) return null;
  const file = fields.file as AssetFile;
  return {
    url: `https:${file.url}`,
    alt: (fields.title as string) ?? "",
    width: file.details.image?.width ?? 800,
    height: file.details.image?.height ?? 600,
  };
}

function mapEntry(entry: Entry<BlogPostSkeleton, undefined, string>): BlogPost {
  const coverImageAsset = entry.fields.coverImage;
  const assetFields =
    coverImageAsset && "fields" in coverImageAsset
      ? (coverImageAsset.fields as AssetFields)
      : undefined;

  return {
    title: entry.fields.title as string,
    slug: entry.fields.slug as string,
    excerpt: entry.fields.excerpt as string,
    content: entry.fields.content as Document,
    coverImage: parseAssetFields(assetFields),
    publishedDate: entry.fields.publishDate as string,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogpost",
    order: ["-fields.publishDate"],
    include: 1,
  });
  return response.items.map(mapEntry);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogpost",
    "fields.slug": slug,
    include: 1,
    limit: 1,
  });
  if (response.items.length === 0) return null;
  return mapEntry(response.items[0]);
}
