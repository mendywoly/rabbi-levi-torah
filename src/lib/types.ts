export interface Video {
  id: string;
  title: string;
  duration: number;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  category: "parsha" | "talmud" | "tanya" | "jli" | "mishnah" | "tanach" | "other";
  book: string | null;
  videos: Video[];
}

export interface VideoData {
  playlists: Playlist[];
}

export type Category = Playlist["category"];

export const CATEGORY_LABELS: Record<Category, string> = {
  parsha: "Weekly Parsha",
  talmud: "Talmud",
  tanya: "Tanya",
  jli: "JLI Courses",
  mishnah: "Mishnah & Halacha",
  tanach: "Tanach",
  other: "Special Series",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  parsha: "Classes on the weekly Torah portion, verse by verse",
  talmud: "In-depth study of the Talmud, Tractate Sotah",
  tanya: "The foundational text of Chabad Chassidic philosophy",
  jli: "Jewish Learning Institute courses on contemporary Jewish topics",
  mishnah: "Laws of Mikvah based on the Rambam",
  tanach: "Study of the books of the Prophets and Writings",
  other: "Special topic series and lectures",
};
