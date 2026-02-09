import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPlaylists, getPlaylistBySlug, slugify } from "@/lib/data";
import { CATEGORY_LABELS, Category } from "@/lib/types";
import { VideoListItem } from "@/components/VideoCard";

export function generateStaticParams() {
  const playlists = getAllPlaylists().filter((p) => p.category !== "parsha");
  return playlists.map((p) => ({
    category: p.category,
    slug: slugify(p.name),
  }));
}

export default async function CategoryPlaylistPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const playlist = getPlaylistBySlug(slug);
  if (!playlist || playlist.category !== category) notFound();

  const categoryLabel = CATEGORY_LABELS[category as Category] || category;

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
          <span className="text-foreground">{categoryLabel}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{playlist.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">{playlist.name}</h1>
          <p className="mt-1 text-muted">
            {categoryLabel} &middot; {playlist.videos.length} classes
          </p>
        </div>

        {/* Video List */}
        <div className="space-y-2">
          {playlist.videos.map((video, i) => (
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

        {/* Back link */}
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
