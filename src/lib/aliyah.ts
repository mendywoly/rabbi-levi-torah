import { getLeyningForParsha } from "@hebcal/leyning";
import { Video } from "./types";

const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Shabbat",
];

type Verse = [chapter: number, verse: number];

// First and last verse of a class, read from its title. Handles
// "Genesis 28_10-28_22", "Genesis 31:17-32:3" and
// "Breishis Chapter 7 verse 16 - Chapter 8 verse 14".
function parseRange(title: string): { start: Verse; end: Verse } | null {
  const long = [
    ...title.matchAll(/chapter\s+(\d+),?\s+verses?\s+(\d+)(?:\s*-\s*(\d+))?/gi),
  ];
  if (long.length > 0) {
    const first = long[0];
    const last = long[long.length - 1];
    return {
      start: [Number(first[1]), Number(first[2])],
      end: [Number(last[1]), Number(last[3] ?? last[2])],
    };
  }
  const short = [...title.matchAll(/(\d+)\s*[_:-]\s*(\d+)/g)];
  if (short.length === 0) return null;
  const start: Verse = [Number(short[0][1]), Number(short[0][2])];
  const end: Verse = short[1] ? [Number(short[1][1]), Number(short[1][2])] : start;
  return { start, end };
}

export function parseStartVerse(title: string): Verse | null {
  return parseRange(title)?.start ?? null;
}

function compare(a: Verse, b: Verse): number {
  return a[0] - b[0] || a[1] - b[1];
}

// Classes in the order of the text; ones with no verse in the title go last.
export function sortByVerse(videos: Video[]): Video[] {
  return videos
    .map((video, i) => ({ video, i, start: parseStartVerse(video.title) }))
    .sort((a, b) => {
      if (a.start && b.start) return compare(a.start, b.start) || a.i - b.i;
      if (a.start || b.start) return a.start ? -1 : 1;
      return a.i - b.i;
    })
    .map((x) => x.video);
}

// The classes that belong to a week's reading, each labelled with a day of
// the week. `parshiyot` are hebcal parsha names (two when a double parsha is
// read together). A class gets the day whose aliyah its first verse falls in;
// if the previous class already has that day and this one runs on into a later
// aliyah, it gets the following day. Classes entirely outside the reading
// are left out; classes with no verse in the title are kept unlabelled.
export function classesForReading(
  videos: Video[],
  parshiyot: string[]
): { video: Video; day: string | null }[] {
  const aliyot = getLeyningForParsha(parshiyot).fullkriyah;
  const toVerse = (s: string): Verse => {
    const [c, v] = s.split(":").map(Number);
    return [c, v];
  };
  // 1-7, or 0 if the verse is not part of this reading
  const aliyahOf = (verse: Verse): number => {
    for (let n = 1; n <= 7; n++) {
      const aliyah = aliyot[String(n)];
      if (
        aliyah &&
        compare(verse, toVerse(aliyah.b)) >= 0 &&
        compare(verse, toVerse(aliyah.e)) <= 0
      ) {
        return n;
      }
    }
    return 0;
  };

  const result: { video: Video; day: string | null }[] = [];
  let previous = 0;
  for (const video of sortByVerse(videos)) {
    const range = parseRange(video.title);
    if (!range) {
      result.push({ video, day: null });
      continue;
    }
    // A class that starts just before this reading but ends inside it
    // (e.g. Genesis 6:8-22 for Noach) still belongs to it.
    let n = aliyahOf(range.start) || aliyahOf(range.end);
    if (!n) continue;
    const runsOn = aliyahOf(range.end) !== n;
    if (n === previous && runsOn && n < 7) n++;
    previous = n;
    result.push({ video, day: DAY_LABELS[n - 1] });
  }
  return result;
}
