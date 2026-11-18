import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPlaylists, getPlaylistBySlug, slugify } from "@/lib/data";
import { getParshaByName } from "@/lib/parsha";
import { getCurrentParshaNames } from "@/lib/currentParsha";
import { VideoListItem } from "@/components/VideoCard";

// Re-render hourly so the current parsha rolls over without a redeploy.
export const revalidate = 3600;

export function generateStaticParams() {
  const playlists = getAllPlaylists().filter((p) => p.category === "parsha");
  return playlists.map((p) => ({ slug: slugify(p.name) }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // For static generation we just return a generic title
  return {
    title: "Parsha Class | Rabbi Levi Wolosow",
  };
}

export default async function ParshaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playlist = getPlaylistBySlug(slug);
  if (!playlist) notFound();

  const parshaInfo = getParshaByName(playlist.name);
    const isCurrent = getCurrentParshaNames().includes(playlist.name);

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/parsha" className="hover:text-primary">
            Parsha
          </Link>
          {parshaInfo && (
            <>
              <span className="mx-2">/</span>
              <span className="text-foreground">{parshaInfo.book}</span>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground">{playlist.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              {isCurrent && (
                <span className="mb-2 inline-block rounded bg-accent px-2 py-0.5 text-xs font-bold uppercase text-white">
                  This Week&apos;s Parsha
                </span>
              )}
              <h1 className="text-3xl font-bold text-primary">
                Parshat {playlist.name}
                {parshaInfo && (
                  <span className="ml-3 text-2xl font-normal text-accent">
                    {parshaInfo.hebrew}
                  </span>
                )}
              </h1>
              <p className="mt-1 text-muted">
                {parshaInfo ? `${parshaInfo.book} — ` : ""}
                {playlist.videos.length} classes
              </p>
            </div>
          </div>
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
            href="/parsha"
            className="text-sm font-medium text-primary hover:text-primary-light"
          >
            ← Back to all parshiyot
          </Link>
        </div>
      </div>
    </div>
  );
}
