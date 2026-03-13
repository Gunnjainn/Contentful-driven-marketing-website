# My Blog — Next.js + Contentful Mini Marketing Site

> **Live URL:** [paste your Vercel URL here]
>
> **GitHub Repo:** [(https://github.com/Gunnjainn/Contentful-driven-marketing-website)]

## Tech Stack

| Technology | Version |
|---|---|
| Next.js (App Router) | 16.1.6 |
| TypeScript | 5.x (strict mode) |
| Tailwind CSS | 4.x |
| Contentful CMS | 11.x |
| shadcn/ui | Card, Button, Badge |
| Vercel | Hosting & deployment |

## Pages

| Route | Description |
|---|---|
| `/` | Home page — hero section + latest 3 post preview cards |
| `/blog` | Blog list — responsive 2-column grid of all posts with badges |
| `/blog/[slug]` | Blog detail — full post with cover image, rich text, and SEO metadata |

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd my-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### 4. Contentful content model

Create a content type called **blogpost** with these fields:

| Field | Type |
|---|---|
| `title` | Short text |
| `slug` | Short text |
| `excerpt` | Long text |
| `content` | Rich text |
| `coverImage` | Media (single image) |
| `publishDate` | Date & time |

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
my-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with sticky navbar
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Tailwind + shadcn/ui + typography
│   │   └── blog/
│   │       ├── page.tsx            # Blog list page
│   │       ├── loading.tsx         # Skeleton loading state
│   │       └── [slug]/
│   │           └── page.tsx        # Blog detail page (SSG + ISR)
│   ├── components/
│   │   ├── RichTextRenderer.tsx    # Contentful rich text renderer
│   │   └── ui/                     # shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   └── lib/
│       ├── contentful.ts           # Contentful client + data fetching
│       ├── types.ts                # Domain types (BlogPost, CoverImage)
│       └── utils.ts                # shadcn/ui utility (cn)
├── .env.local                      # Environment variables (not committed)
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Deploying to Vercel

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Set the **Root Directory** to `my-site` (if the repo root is the parent folder).
4. Add environment variables in the Vercel dashboard:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
5. Click **Deploy**.

All pages use `revalidate = 60` (ISR), so content updates in Contentful appear within 60 seconds without redeploying.

## Features Checklist

- [x] Next.js App Router with TypeScript strict mode
- [x] Contentful CMS integration (all fetching in `lib/contentful.ts`)
- [x] Domain types mapped from Contentful responses
- [x] Home page with hero section and latest 3 post cards
- [x] Blog list page with responsive grid and empty state
- [x] Blog detail page with rich text rendering and cover image
- [x] `generateStaticParams()` for static generation of blog posts
- [x] `generateMetadata()` for SEO on blog detail
- [x] `notFound()` for missing slugs
- [x] ISR with `revalidate = 60` on all data-fetching pages
- [x] shadcn/ui components (Card, Button, Badge)
- [x] `next/image` for optimized images
- [x] Tailwind CSS typography plugin for prose styling
- [x] Skeleton loading state for blog list
- [x] Sticky navbar with site navigation
- [x] Deployed on Vercel
