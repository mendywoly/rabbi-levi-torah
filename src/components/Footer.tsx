import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted">
            Dedicated to the memory of{" "}
            <span className="font-semibold text-primary">
              Rabbi Levi Yitzchok Wolosow
            </span>{" "}
            <span className="text-accent">z&quot;l</span>
          </p>
          <p className="text-xs text-muted">
            5 Shevat 5785 &middot; February 3, 2025
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link href="/parsha" className="hover:text-primary">
              Parsha Classes
            </Link>
            <Link href="/categories" className="hover:text-primary">
              All Categories
            </Link>
            <a
              href="https://www.youtube.com/@rabbileviwolosow9285"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              YouTube Channel
            </a>
          </div>
          <p className="text-xs text-muted/60">
            &quot;When you spoke with him, you felt that he placed you at the
            center of the universe.&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
