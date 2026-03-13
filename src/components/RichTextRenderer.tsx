import Image from "next/image";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import type { Block, Inline } from "@contentful/rich-text-types";
import type { ReactNode } from "react";

const renderOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
      <h2 className="mb-3 text-2xl font-semibold text-slate-900">
        {children}
      </h2>
    ),
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
      <p className="mb-4 leading-relaxed text-slate-600">{children}</p>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const fields = node.data?.target?.fields;
      if (!fields?.file) return null;
      const { url, details } = fields.file;
      const alt = (fields.title as string) ?? "";
      return (
        <Image
          src={`https:${url}`}
          alt={alt}
          width={details?.image?.width ?? 800}
          height={details?.image?.height ?? 600}
          className="my-6 w-full rounded-lg"
        />
      );
    },
  },
};

interface RichTextRendererProps {
  document: Document;
}

export function RichTextRenderer({ document }: RichTextRendererProps) {
  return (
    <div>{documentToReactComponents(document, renderOptions)}</div>
  );
}
