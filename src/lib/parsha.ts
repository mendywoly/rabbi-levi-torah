// Parsha order and metadata for organizing Torah classes
// Maps parsha names to their book, order, and Hebrew names

export interface ParshaInfo {
  name: string;
  hebrew: string;
  book: string;
  bookHebrew: string;
  order: number; // Global order across all 5 books
}

export const PARSHA_ORDER: ParshaInfo[] = [
  // Bereishis / Genesis
  { name: "Bereishis", hebrew: "בראשית", book: "Genesis", bookHebrew: "בראשית", order: 1 },
  { name: "Noach", hebrew: "נח", book: "Genesis", bookHebrew: "בראשית", order: 2 },
  { name: "Lech Lecha", hebrew: "לך לך", book: "Genesis", bookHebrew: "בראשית", order: 3 },
  { name: "Vayeira", hebrew: "וירא", book: "Genesis", bookHebrew: "בראשית", order: 4 },
  { name: "Chaei Sara", hebrew: "חיי שרה", book: "Genesis", bookHebrew: "בראשית", order: 5 },
  { name: "Toldos", hebrew: "תולדות", book: "Genesis", bookHebrew: "בראשית", order: 6 },
  { name: "Vayeitzei", hebrew: "ויצא", book: "Genesis", bookHebrew: "בראשית", order: 7 },
  { name: "Vayishlach", hebrew: "וישלח", book: "Genesis", bookHebrew: "בראשית", order: 8 },
  { name: "Vayeishev", hebrew: "וישב", book: "Genesis", bookHebrew: "בראשית", order: 9 },
  { name: "Meikeitz", hebrew: "מקץ", book: "Genesis", bookHebrew: "בראשית", order: 10 },
  { name: "Vayigash", hebrew: "ויגש", book: "Genesis", bookHebrew: "בראשית", order: 11 },
  { name: "Vayechi", hebrew: "ויחי", book: "Genesis", bookHebrew: "בראשית", order: 12 },

  // Shemos / Exodus
  { name: "Shemos", hebrew: "שמות", book: "Exodus", bookHebrew: "שמות", order: 13 },
  { name: "Vaeira", hebrew: "וארא", book: "Exodus", bookHebrew: "שמות", order: 14 },
  { name: "Bo", hebrew: "בא", book: "Exodus", bookHebrew: "שמות", order: 15 },
  { name: "Beshalach", hebrew: "בשלח", book: "Exodus", bookHebrew: "שמות", order: 16 },
  { name: "Yisro", hebrew: "יתרו", book: "Exodus", bookHebrew: "שמות", order: 17 },
  { name: "Mishpatim", hebrew: "משפטים", book: "Exodus", bookHebrew: "שמות", order: 18 },
  { name: "Teruma", hebrew: "תרומה", book: "Exodus", bookHebrew: "שמות", order: 19 },
  { name: "Tetzave", hebrew: "תצוה", book: "Exodus", bookHebrew: "שמות", order: 20 },
  { name: "Ki Tisa", hebrew: "כי תשא", book: "Exodus", bookHebrew: "שמות", order: 21 },
  { name: "Vayakel Pekudei", hebrew: "ויקהל פקודי", book: "Exodus", bookHebrew: "שמות", order: 22 },

  // Vayikra / Leviticus
  { name: "Vayikra", hebrew: "ויקרא", book: "Leviticus", bookHebrew: "ויקרא", order: 23 },
  { name: "Tzav", hebrew: "צו", book: "Leviticus", bookHebrew: "ויקרא", order: 24 },
  { name: "Shemini", hebrew: "שמיני", book: "Leviticus", bookHebrew: "ויקרא", order: 25 },
  { name: "Tazria-Metzorah", hebrew: "תזריע מצורע", book: "Leviticus", bookHebrew: "ויקרא", order: 26 },
  { name: "Achrei Mos-Kedoshim", hebrew: "אחרי מות קדושים", book: "Leviticus", bookHebrew: "ויקרא", order: 27 },
  { name: "Emor", hebrew: "אמור", book: "Leviticus", bookHebrew: "ויקרא", order: 28 },
  { name: "Behar Bechukosai", hebrew: "בהר בחוקותי", book: "Leviticus", bookHebrew: "ויקרא", order: 29 },

  // Bamidbar / Numbers
  { name: "Bamidbar", hebrew: "במדבר", book: "Numbers", bookHebrew: "במדבר", order: 30 },
  { name: "Naso", hebrew: "נשא", book: "Numbers", bookHebrew: "במדבר", order: 31 },
  { name: "Bhaloscha", hebrew: "בהעלותך", book: "Numbers", bookHebrew: "במדבר", order: 32 },
  { name: "Shelach", hebrew: "שלח", book: "Numbers", bookHebrew: "במדבר", order: 33 },
  { name: "Korach", hebrew: "קרח", book: "Numbers", bookHebrew: "במדבר", order: 34 },
  { name: "Chukas", hebrew: "חוקת", book: "Numbers", bookHebrew: "במדבר", order: 35 },
  { name: "Balak", hebrew: "בלק", book: "Numbers", bookHebrew: "במדבר", order: 36 },
  { name: "Pinchas", hebrew: "פנחס", book: "Numbers", bookHebrew: "במדבר", order: 37 },
  { name: "Matot-Massei", hebrew: "מטות מסעי", book: "Numbers", bookHebrew: "במדבר", order: 38 },

  // Devarim / Deuteronomy
  { name: "Devarim", hebrew: "דברים", book: "Deuteronomy", bookHebrew: "דברים", order: 39 },
  { name: "Va'etchanan", hebrew: "ואתחנן", book: "Deuteronomy", bookHebrew: "דברים", order: 40 },
  { name: "Eikev", hebrew: "עקב", book: "Deuteronomy", bookHebrew: "דברים", order: 41 },
  { name: "Re'eh", hebrew: "ראה", book: "Deuteronomy", bookHebrew: "דברים", order: 42 },
  { name: "Shoftim", hebrew: "שופטים", book: "Deuteronomy", bookHebrew: "דברים", order: 43 },
];

export const BOOKS = [
  { name: "Genesis", hebrew: "בראשית", englishName: "Bereishis" },
  { name: "Exodus", hebrew: "שמות", englishName: "Shemos" },
  { name: "Leviticus", hebrew: "ויקרא", englishName: "Vayikra" },
  { name: "Numbers", hebrew: "במדבר", englishName: "Bamidbar" },
  { name: "Deuteronomy", hebrew: "דברים", englishName: "Devarim" },
];

export function getParshaByName(name: string): ParshaInfo | undefined {
  return PARSHA_ORDER.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
}

export function getParshasByBook(book: string): ParshaInfo[] {
  return PARSHA_ORDER.filter((p) => p.book === book);
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return `${hrs}:${remainMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
