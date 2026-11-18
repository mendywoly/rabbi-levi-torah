import { HDate, getSedra } from "@hebcal/core";
import { PARSHA_ORDER, ParshaInfo } from "./parsha";

// The community this site serves is in New Jersey, so "today" is evaluated
// there rather than in the server's time zone (UTC on Vercel).
const TIME_ZONE = "America/New_York";

// Site playlist name for each standard parsha number (1 = Bereishis ... 54).
// Parshas that share a playlist (e.g. Vayakel Pekudei) map to the same name,
// whether or not they are read together in a given year. Parshas after
// Shoftim have no playlist and are absent.
const PLAYLIST_BY_PARSHA_NUM: Record<number, string> = {
  1: "Bereishis",
  2: "Noach",
  3: "Lech Lecha",
  4: "Vayeira",
  5: "Chaei Sara",
  6: "Toldos",
  7: "Vayeitzei",
  8: "Vayishlach",
  9: "Vayeishev",
  10: "Meikeitz",
  11: "Vayigash",
  12: "Vayechi",
  13: "Shemos",
  14: "Vaeira",
  15: "Bo",
  16: "Beshalach",
  17: "Yisro",
  18: "Mishpatim",
  19: "Teruma",
  20: "Tetzave",
  21: "Ki Tisa",
  22: "Vayakel Pekudei",
  23: "Vayakel Pekudei",
  24: "Vayikra",
  25: "Tzav",
  26: "Shemini",
  27: "Tazria-Metzorah",
  28: "Tazria-Metzorah",
  29: "Achrei Mos-Kedoshim",
  30: "Achrei Mos-Kedoshim",
  31: "Emor",
  32: "Behar Bechukosai",
  33: "Behar Bechukosai",
  34: "Bamidbar",
  35: "Naso",
  36: "Bhaloscha",
  37: "Shelach",
  38: "Korach",
  39: "Chukas",
  40: "Balak",
  41: "Pinchas",
  42: "Matot-Massei",
  43: "Matot-Massei",
  44: "Devarim",
  45: "Va'etchanan",
  46: "Eikev",
  47: "Re'eh",
  48: "Shoftim",
};

// The Shabbat on or after `now`, as a calendar date in TIME_ZONE.
function upcomingShabbat(now: Date): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)!.value);
  const date = new Date(get("year"), get("month") - 1, get("day"));
  date.setDate(date.getDate() + ((6 - date.getDay() + 7) % 7));
  return date;
}

export function getCurrentParsha(now: Date = new Date()): ParshaInfo | null {
  const shabbat = upcomingShabbat(now);

  // Use this Shabbat's reading (diaspora). If it is a holiday reading or a
  // parsha with no playlist, move ahead to the next Shabbat that has one.
  for (let week = 0; week < 16; week++) {
    const hdate = new HDate(shabbat);
    const reading = getSedra(hdate.getFullYear(), false).lookup(hdate);
    if (!reading.chag) {
      const num = Array.isArray(reading.num) ? reading.num[0] : reading.num;
      const name = num ? PLAYLIST_BY_PARSHA_NUM[num] : undefined;
      if (name) return PARSHA_ORDER.find((p) => p.name === name) || null;
    }
    shabbat.setDate(shabbat.getDate() + 7);
  }

  return null;
}

export function getCurrentParshaName(): string | null {
  const parsha = getCurrentParsha();
  return parsha?.name || null;
}
