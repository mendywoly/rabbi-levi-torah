import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlaylistsByCategory, slugify } from "@/lib/data";
import {
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  Category,
} from "@/lib/types";
import { VideoListItem } from "@/components/VideoCard";

const VALID_CATEGORIES: Category[] = [
  "talmud",
  "tanya",
  "jli",
  "mishnah",
  "tanach",
  "other",
];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((c) => ({ category: c }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const playlists = getPlaylistsByCategory(category as Category);
  const label = CATEGORY_LABELS[category as Category];
  const description = CATEGORY_DESCRIPTIONS[category as Category];

  // If only one playlist in this category, show videos directly
  const singlePlaylist = playlists.length === 1;

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-primary">
            Classes
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{label}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">{label}</h1>
          <p className="mt-1 text-muted">{description}</p>
          <p className="mt-1 text-sm text-muted">
            {playlists.reduce((sum, p) => sum + p.videos.length, 0)} total
            classes
          </p>
        </div>

        {singlePlaylist ? (
          /* Show videos directly for single-playlist categories */
          <div className="space-y-2">
            {playlists[0].videos.map((video, i) => (
              <div key={video.id} className="flex items-center gap-3">
                <span className="w-6 shrink-0 text-right text-xs text-muted">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <VideoListItem video={video} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Show playlist cards for multi-playlist categories */
          <div className="space-y-4">
            {playlists.map((pl) => (
              <Link
                key={pl.id}
                href={`/categories/${category}/${slugify(pl.name)}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-md"
              >
                <div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
                    {pl.name}
                  </h2>
                  <p className="text-sm text-muted">
                    {pl.videos.length} classes
                  </p>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {pl.videos.length}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/categories"
            className="text-sm font-medium text-primary hover:text-primary-light"
          >
            ← Back to all categories
          </Link>
        </div>
      </div>
    </div>
  );
}
