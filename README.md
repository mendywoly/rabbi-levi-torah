# Rabbi Levi Wolosow Torah Center

A memorial website preserving and sharing the Torah teachings of **Rabbi Levi Yitzchok Wolosow z"l** (1981-2025), Director of Adult Education at Chabad of Western Monmouth County, Manalapan, NJ.

## About

Rabbi Levi left behind over **525 recorded Torah classes** spanning 18 years of teaching. This site organizes and presents his full video library so his teachings can continue to inspire and educate.

### Content includes:
- **Weekly Parsha** - Verse-by-verse classes on all Torah portions (Genesis through Deuteronomy)
- **Talmud** - Tractate Sotah
- **Tanya** - All 4 books (Lekutei Amarim, Shaar HaYichud, Igeres HaTeshuva, Kuntres Acharon)
- **JLI Courses** - Meditation from Sinai, Outsmarting Antisemitism, Journey of the Soul
- **Mishnah** - Laws of Mikvah by the Rambam
- **Tanach** - Yehoshua and more

### Features:
- Auto-detects the current week's parsha based on the Hebrew calendar
- Day-of-week labels (Sunday-Shabbat) for daily Torah reading classes
- All video data stored in a static JSON file (no database needed)
- Fully statically generated for fast performance

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Updating Video Data

Video data is stored in `src/data/videos.json`. To refresh from YouTube:

```bash
python3 scripts/build_video_data.py
```

## Deploy

Deploy to [Vercel](https://vercel.com) or any static hosting provider:

```bash
npx vercel
```

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

---

Dedicated to the memory of Rabbi Levi Yitzchok Wolosow z"l - 5 Shevat 5785
