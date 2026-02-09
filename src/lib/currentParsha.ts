import { PARSHA_ORDER, ParshaInfo } from "./parsha";

// Pre-computed Shabbat parsha readings for 5785-5787 (2024-2027) diaspora
// Each entry: [startDate (ISO), parshaName]
// This covers the site's expected lifespan; can be extended.
const PARSHA_CALENDAR: [string, string][] = [
  // 5785 - Starting from Bereishis
  ["2024-10-26", "Bereishis"],
  ["2024-11-02", "Noach"],
  ["2024-11-09", "Lech Lecha"],
  ["2024-11-16", "Vayeira"],
  ["2024-11-23", "Chaei Sara"],
  ["2024-11-30", "Toldos"],
  ["2024-12-07", "Vayeitzei"],
  ["2024-12-14", "Vayishlach"],
  ["2024-12-21", "Vayeishev"],
  ["2024-12-28", "Meikeitz"],
  ["2025-01-04", "Vayigash"],
  ["2025-01-11", "Vayechi"],
  ["2025-01-18", "Shemos"],
  ["2025-01-25", "Vaeira"],
  ["2025-02-01", "Bo"],
  ["2025-02-08", "Beshalach"],
  ["2025-02-15", "Yisro"],
  ["2025-02-22", "Mishpatim"],
  ["2025-03-01", "Teruma"],
  ["2025-03-08", "Tetzave"],
  ["2025-03-15", "Ki Tisa"],
  ["2025-03-22", "Vayakel Pekudei"],
  ["2025-03-29", "Vayikra"],
  ["2025-04-05", "Tzav"],
  ["2025-04-19", "Shemini"],
  ["2025-04-26", "Tazria-Metzorah"],
  ["2025-05-03", "Achrei Mos-Kedoshim"],
  ["2025-05-10", "Emor"],
  ["2025-05-17", "Behar Bechukosai"],
  ["2025-05-24", "Bamidbar"],
  ["2025-05-31", "Naso"],
  ["2025-06-07", "Bhaloscha"],
  ["2025-06-14", "Shelach"],
  ["2025-06-21", "Korach"],
  ["2025-06-28", "Chukas"],
  ["2025-07-05", "Balak"],
  ["2025-07-12", "Pinchas"],
  ["2025-07-19", "Matot-Massei"],
  ["2025-07-26", "Devarim"],
  ["2025-08-02", "Va'etchanan"],
  ["2025-08-09", "Eikev"],
  ["2025-08-16", "Re'eh"],
  ["2025-08-23", "Shoftim"],
  // Ki Teitzei through V'zot Habracha not in playlist set, cycle back
  // 5786
  ["2025-10-18", "Bereishis"],
  ["2025-10-25", "Noach"],
  ["2025-11-01", "Lech Lecha"],
  ["2025-11-08", "Vayeira"],
  ["2025-11-15", "Chaei Sara"],
  ["2025-11-22", "Toldos"],
  ["2025-11-29", "Vayeitzei"],
  ["2025-12-06", "Vayishlach"],
  ["2025-12-13", "Vayeishev"],
  ["2025-12-20", "Meikeitz"],
  ["2025-12-27", "Vayigash"],
  ["2026-01-03", "Vayechi"],
  ["2026-01-10", "Shemos"],
  ["2026-01-17", "Vaeira"],
  ["2026-01-24", "Bo"],
  ["2026-01-31", "Beshalach"],
  ["2026-02-07", "Yisro"],
  ["2026-02-14", "Mishpatim"],
  ["2026-02-21", "Teruma"],
  ["2026-02-28", "Tetzave"],
  ["2026-03-07", "Ki Tisa"],
  ["2026-03-14", "Vayakel Pekudei"],
  ["2026-03-21", "Vayikra"],
  ["2026-03-28", "Tzav"],
  ["2026-04-11", "Shemini"],
  ["2026-04-18", "Tazria-Metzorah"],
  ["2026-04-25", "Achrei Mos-Kedoshim"],
  ["2026-05-02", "Emor"],
  ["2026-05-09", "Behar Bechukosai"],
  ["2026-05-16", "Bamidbar"],
  ["2026-05-23", "Naso"],
  ["2026-05-30", "Bhaloscha"],
  ["2026-06-06", "Shelach"],
  ["2026-06-13", "Korach"],
  ["2026-06-20", "Chukas"],
  ["2026-06-27", "Balak"],
  ["2026-07-04", "Pinchas"],
  ["2026-07-11", "Matot-Massei"],
  ["2026-07-18", "Devarim"],
  ["2026-07-25", "Va'etchanan"],
  ["2026-08-01", "Eikev"],
  ["2026-08-08", "Re'eh"],
  ["2026-08-15", "Shoftim"],
  // 5787
  ["2026-10-03", "Bereishis"],
  ["2026-10-10", "Noach"],
  ["2026-10-17", "Lech Lecha"],
  ["2026-10-24", "Vayeira"],
  ["2026-10-31", "Chaei Sara"],
  ["2026-11-07", "Toldos"],
  ["2026-11-14", "Vayeitzei"],
  ["2026-11-21", "Vayishlach"],
  ["2026-11-28", "Vayeishev"],
  ["2026-12-05", "Meikeitz"],
  ["2026-12-12", "Vayigash"],
  ["2026-12-19", "Vayechi"],
  ["2026-12-26", "Shemos"],
  ["2027-01-02", "Vaeira"],
  ["2027-01-09", "Bo"],
  ["2027-01-16", "Beshalach"],
  ["2027-01-23", "Yisro"],
  ["2027-01-30", "Mishpatim"],
  ["2027-02-06", "Teruma"],
  ["2027-02-13", "Tetzave"],
  ["2027-02-20", "Ki Tisa"],
  ["2027-02-27", "Vayakel Pekudei"],
  ["2027-03-06", "Vayikra"],
  ["2027-03-13", "Tzav"],
  ["2027-03-27", "Shemini"],
  ["2027-04-03", "Tazria-Metzorah"],
  ["2027-04-10", "Achrei Mos-Kedoshim"],
  ["2027-04-17", "Emor"],
  ["2027-04-24", "Behar Bechukosai"],
  ["2027-05-01", "Bamidbar"],
  ["2027-05-08", "Naso"],
  ["2027-05-15", "Bhaloscha"],
  ["2027-05-22", "Shelach"],
  ["2027-05-29", "Korach"],
  ["2027-06-05", "Chukas"],
  ["2027-06-12", "Balak"],
  ["2027-06-19", "Pinchas"],
  ["2027-06-26", "Matot-Massei"],
  ["2027-07-03", "Devarim"],
  ["2027-07-10", "Va'etchanan"],
  ["2027-07-17", "Eikev"],
  ["2027-07-24", "Re'eh"],
  ["2027-07-31", "Shoftim"],
];

export function getCurrentParsha(): ParshaInfo | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the current or most recent Shabbat parsha
  let currentParshaName: string | null = null;

  for (let i = PARSHA_CALENDAR.length - 1; i >= 0; i--) {
    const shabbatDate = new Date(PARSHA_CALENDAR[i][0] + "T00:00:00");
    // The parsha is "current" from the Sunday before through the Shabbat
    const sundayBefore = new Date(shabbatDate);
    sundayBefore.setDate(sundayBefore.getDate() - 6);

    if (today >= sundayBefore && today <= shabbatDate) {
      currentParshaName = PARSHA_CALENDAR[i][1];
      break;
    }
  }

  // Fallback: find the next upcoming Shabbat
  if (!currentParshaName) {
    for (const [dateStr, name] of PARSHA_CALENDAR) {
      const shabbatDate = new Date(dateStr + "T00:00:00");
      if (shabbatDate >= today) {
        currentParshaName = name;
        break;
      }
    }
  }

  if (!currentParshaName) return null;
  return PARSHA_ORDER.find((p) => p.name === currentParshaName) || null;
}

export function getCurrentParshaName(): string | null {
  const parsha = getCurrentParsha();
  return parsha?.name || null;
}
