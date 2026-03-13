"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <div className="h-[3px] bg-slate-700" />
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
          <Link
            href="/"
            className={`relative text-xl font-bold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-slate-700 after:transition-all hover:after:w-full ${
              pathname === "/"
                ? "text-slate-900"
                : "text-slate-400 hover:text-slate-900"
            }`}
          >
            Home
          </Link>

          <Link
            href="/blog"
            className={`relative text-base font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-slate-700 after:transition-all hover:after:w-full ${
              pathname === "/blog" || pathname.startsWith("/blog/")
                ? "text-slate-900"
                : "text-slate-400 hover:text-slate-900"
            }`}
          >
            My Blogs
          </Link>
        </div>
      </nav>
    </>
  );
}
