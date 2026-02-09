import { Video } from "@/lib/types";
import { formatDuration } from "@/lib/parsha";

export function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-accent/40 hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-foreground/5">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        {video.duration > 0 && (
          <span className="absolute bottom-2 right-2 rounded bg-foreground/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary">
          {video.title}
        </h3>
      </div>
    </a>
  );
}

export function VideoListItem({ video }: { video: Video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-all hover:border-accent/40 hover:bg-surface-hover"
    >
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
}
