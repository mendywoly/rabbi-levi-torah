import videoData from "@/data/videos.json";
import { VideoData, Playlist, Category } from "./types";

const data = videoData as VideoData;

export function getAllPlaylists(): Playlist[] {
  return data.playlists;
}

export function getPlaylistsByCategory(category: Category): Playlist[] {
  return data.playlists.filter((p) => p.category === category);
}

export function getParshaPlaylists(): Playlist[] {
  return data.playlists.filter((p) => p.category === "parsha");
}

export function getPlaylistByName(name: string): Playlist | undefined {
  return data.playlists.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
}

export function getPlaylistBySlug(slug: string): Playlist | undefined {
  return data.playlists.find(
    (p) => slugify(p.name) === slug
  );
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getTotalVideoCount(): number {
  return data.playlists.reduce((sum, p) => sum + p.videos.length, 0);
}

export function getTotalPlaylistCount(): number {
  return data.playlists.length;
}

export function getCategoryStats(): Record<Category, { playlists: number; videos: number }> {
  const stats: Record<string, { playlists: number; videos: number }> = {};
  for (const p of data.playlists) {
    if (!stats[p.category]) {
      stats[p.category] = { playlists: 0, videos: 0 };
    }
    stats[p.category].playlists++;
    stats[p.category].videos += p.videos.length;
  }
  return stats as Record<Category, { playlists: number; videos: number }>;
}
