import Link from "next/link";
import { getParshaPlaylists, slugify } from "@/lib/data";
import { PARSHA_ORDER, BOOKS, getParshasByBook, ParshaInfo } from "@/lib/parsha";
import { getCurrentParshaNames } from "@/lib/currentParsha";
import { Playlist } from "@/lib/types";

export const metadata = {
  title: "Weekly Parsha Classes | Rabbi Levi Wolosow",
  description:
    "Browse all weekly Torah portion classes by Rabbi Levi Wolosow, organized by book and parsha.",
};

// Re-render hourly so the current parsha rolls over without a redeploy.
export const revalidate = 3600;

export default function ParshaIndex() {
  const parshaPlaylists = getParshaPlaylists();
  const currentParshaNames = getCurrentParshaNames();

  // Build a map of playlist name -> playlist for quick lookup
  const playlistMap = new Map<string, Playlist>();
  for (const pl of parshaPlaylists) {
    playlistMap.set(pl.name, pl);
  }

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold text-primary">
            Weekly Parsha Classes
          </h1>
          <p className="text-muted">
            Verse-by-verse Torah classes organized by weekly portion
          </p>
        </div>

        {BOOKS.map((book) => {
          const parshas = getParshasByBook(book.name);
          return (
            <div key={book.name} className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 border-b border-border pb-2 text-xl font-bold text-primary">
                <span className="text-accent">{book.hebrew}</span>
                <span>
                  {book.englishName} / {book.name}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {parshas.map((parsha: ParshaInfo) => {
                  const playlist = playlistMap.get(parsha.name);
                  const videoCount = playlist?.videos.length ?? 0;
                  const isCurrent = currentParshaNames.includes(parsha.name);

                  return (
                    <Link
                      key={parsha.name}
                      href={`/parsha/${slugify(parsha.name)}`}
                      className={`group relative rounded-lg border bg-surface p-4 transition-all hover:shadow-md ${
                        isCurrent
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border hover:border-accent/40"
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute -top-2 right-3 rounded bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          This Week
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary">
                            {parsha.name}
                          </h3>
                          <p className="text-sm text-muted">
                            {parsha.hebrew}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary">
                            {videoCount}
                          </span>
                          <p className="text-xs text-muted">classes</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Extra playlists not in standard parsha order */}
        {(() => {
          const extraPlaylists = parshaPlaylists.filter(
            (pl) =>
              pl.name === "Tuesday night Parsha class" ||
              pl.name === "Torah on the Turnpike"
          );
          if (extraPlaylists.length === 0) return null;
          return (
            <div className="mb-10">
              <h2 className="mb-4 border-b border-border pb-2 text-xl font-bold text-primary">
                Special Parsha Series
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {extraPlaylists.map((pl) => (
                  <Link
                    key={pl.id}
                    href={`/parsha/${slugify(pl.name)}`}
                    className="group rounded-lg border border-border bg-surface p-4 transition-all hover:border-accent/40 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground group-hover:text-primary">
                        {pl.name}
                      </h3>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">
                          {pl.videos.length}
                        </span>
                        <p className="text-xs text-muted">classes</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
