import Link from "next/link";
import { getCategoryStats, getTotalVideoCount } from "@/lib/data";
import { CATEGORY_LABELS, Category } from "@/lib/types";
import { getCurrentParsha, getCurrentParshaName } from "@/lib/currentParsha";
import { getPlaylistByName } from "@/lib/data";
import { formatDuration } from "@/lib/parsha";

const DAILY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Shabbat",
];

const CATEGORY_ICONS: Record<Category, string> = {
  parsha: "📖",
  talmud: "📜",
  tanya: "✡",
  jli: "🎓",
  mishnah: "⚖",
  tanach: "📕",
  other: "💡",
};

// Re-render hourly so the current parsha rolls over without a redeploy.
export const revalidate = 3600;

export default function Home() {
  const totalVideos = getTotalVideoCount();
  const stats = getCategoryStats();
  const currentParshaName = getCurrentParshaName();
  const currentParshaPlaylist = currentParshaName
    ? getPlaylistByName(currentParshaName)
    : null;
  const currentParshaInfo = getCurrentParsha();

  return (
    <div>
      {/* Hero / Tribute Section */}
      <section className="bg-primary px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent-light">
            Continuing His Torah Legacy
          </p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Rabbi Levi Yitzchok Wolosow{" "}
            <span className="text-accent">z&quot;l</span>
          </h1>
          <p className="mb-2 text-lg text-white/70">
            1981 — 5 Shevat 5785 (February 3, 2025)
          </p>
          <div className="mx-auto mb-8 max-w-2xl">
            <p className="text-lg leading-relaxed text-white/90">
              Director of Adult Education at Chabad of Western Monmouth County,
              Manalapan, NJ. A beloved teacher, father of eight, and
              quintessential Chabad Rabbi who completed the entire Talmud by age
              40 and left behind over {totalVideos} recorded Torah classes for
              the world.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="text-accent">▶</span> {totalVideos}+ Classes
              Recorded
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">📚</span> 18 Years of Teaching
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">🏠</span> Manalapan, New Jersey
            </span>
          </div>
        </div>
      </section>

      {/* Current Parsha Highlight */}
      {currentParshaPlaylist && currentParshaInfo && (
        <section className="border-b border-border bg-accent/10 px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  This Week&apos;s Parsha
                </p>
                <h2 className="text-2xl font-bold text-primary">
                  Parshat {currentParshaInfo.name}{" "}
                  <span className="text-lg font-normal text-muted">
                    {currentParshaInfo.hebrew}
                  </span>
                </h2>
                <p className="text-sm text-muted">
                  {currentParshaInfo.book} &middot;{" "}
                  {currentParshaPlaylist.videos.length} classes available
                </p>
              </div>
              <Link
                href={`/parsha/${encodeURIComponent(currentParshaInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))}`}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-2">
              {currentParshaPlaylist.videos.map((video, i) => {
                const dayLabel = i < DAILY_LABELS.length ? DAILY_LABELS[i] : `Class ${i + 1}`;
                return (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-all hover:border-accent/40 hover:bg-surface-hover"
                  >
                    <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wide text-accent">
                      {dayLabel}
                    </span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                        {video.title}
                      </h3>
                    </div>
                    {video.duration > 0 && (
                      <span className="shrink-0 text-xs text-muted">
                        {formatDuration(video.duration)}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Browse by Category */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-primary">
            Browse Torah Classes
          </h2>
          <p className="mb-10 text-center text-muted">
            Explore Rabbi Levi&apos;s extensive library of recorded classes
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => {
              const stat = stats[category];
              if (!stat) return null;
              return (
                <Link
                  key={category}
                  href={
                    category === "parsha"
                      ? "/parsha"
                      : `/categories/${category}`
                  }
                  className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-lg"
                >
                  <div className="mb-3 text-3xl">
                    {CATEGORY_ICONS[category]}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <p className="text-sm text-muted">
                    {stat.videos} classes across {stat.playlists}{" "}
                    {stat.playlists === 1 ? "series" : "series"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            About Rabbi Levi
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
            <p>
              The second of twelve children, Levi Yitzchak Wolosow was raised in
              Sharon, Massachusetts, where his parents Rabbi Chaim and Sara
              Wolosow have served as Chabad-Lubavitch emissaries since 1980. He
              studied at Oholei Torah in Crown Heights and received smicha from
              Central Yeshiva Tomchei Tmimim Lubavitch.
            </p>
            <p>
              After marrying Chanale Chazanow in 2006, the couple settled in
              Manalapan, NJ. Rabbi Levi served as Director of Adult Education at
              Chabad of Western Monmouth County, teaching classes on Torah,
              Halacha, and Chassidus. He was known for Project Rosh — an
              innovative High Holiday service that attracted nearly 1,000
              participants.
            </p>
            <p>
              Members of the community he served for 18 years recall that he was
              kind, learned, patient, outgoing, sincere, and humble. When two
              children in the community were orphaned, the Wolosows adopted them
              as their own, raising them alongside their six biological children.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-medium text-primary hover:text-primary-light"
          >
            Read more →
          </Link>
        </div>
      </section>
    </div>
  );
}
