import Link from "next/link";
import { getCategoryStats, getPlaylistsByCategory } from "@/lib/data";
import { slugify } from "@/lib/data";
import {
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  Category,
} from "@/lib/types";

export const metadata = {
  title: "All Classes | Rabbi Levi Wolosow",
  description:
    "Browse all Torah classes by Rabbi Levi Wolosow organized by category.",
};

const CATEGORY_ORDER: Category[] = [
  "parsha",
  "talmud",
  "tanya",
  "jli",
  "mishnah",
  "tanach",
  "other",
];

export default function CategoriesPage() {
  const stats = getCategoryStats();

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold text-primary">
            All Torah Classes
          </h1>
          <p className="text-muted">
            Browse the complete library of Rabbi Levi&apos;s recorded teachings
          </p>
        </div>

        <div className="space-y-6">
          {CATEGORY_ORDER.map((category) => {
            const stat = stats[category];
            if (!stat) return null;
            const playlists = getPlaylistsByCategory(category);

            return (
              <div
                key={category}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary">
                      {CATEGORY_LABELS[category]}
                    </h2>
                    <p className="text-sm text-muted">
                      {CATEGORY_DESCRIPTIONS[category]}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-accent">
                      {stat.videos}
                    </span>
                    <p className="text-xs text-muted">classes</p>
                  </div>
                </div>

                {category === "parsha" ? (
                  <Link
                    href="/parsha"
                    className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
                  >
                    Browse by Parsha →
                  </Link>
                ) : (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {playlists.map((pl) => (
                      <Link
                        key={pl.id}
                        href={`/categories/${category}/${slugify(pl.name)}`}
                        className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-all hover:border-accent/40 hover:bg-surface-hover"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">
                          {pl.name}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {pl.videos.length}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
