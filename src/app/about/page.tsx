import Link from "next/link";
import { getTotalVideoCount, getTotalPlaylistCount } from "@/lib/data";

export const metadata = {
  title: "About Rabbi Levi Wolosow",
  description:
    "Learn about Rabbi Levi Yitzchok Wolosow z\"l, his life, legacy, and ongoing Torah teachings.",
};

export default function AboutPage() {
  const totalVideos = getTotalVideoCount();
  const totalPlaylists = getTotalPlaylistCount();

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          About Rabbi Levi Yitzchok Wolosow{" "}
          <span className="text-accent">z&quot;l</span>
        </h1>
        <p className="mb-8 text-sm text-muted">
          1981 — 5 Shevat 5785 (February 3, 2025)
        </p>

        <div className="prose-sm space-y-6 leading-relaxed text-foreground/85">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <blockquote className="text-center italic text-primary">
              &quot;When you spoke with him, you felt that he placed you at the
              center of the universe.&quot;
            </blockquote>
          </div>

          <h2 className="text-xl font-bold text-primary">Early Life</h2>
          <p>
            The second of twelve children, Levi Yitzchak Wolosow was raised in
            Sharon, Massachusetts, where his parents, Rabbi Chaim and Sara
            Wolosow, have served as Chabad-Lubavitch emissaries since 1980. He
            studied at Oholei Torah in Crown Heights and received his smicha
            (rabbinical ordination) from Central Yeshiva Tomchei Tmimim
            Lubavitch.
          </p>

          <h2 className="text-xl font-bold text-primary">Family</h2>
          <p>
            After his marriage to Chanale Chazanow in 2006, the couple settled
            in Manalapan, New Jersey, where her parents, Rabbi Boruch and Tova
            Chazanow, direct Chabad of Western Monmouth County. Together they
            had six children — Nochum, Dov, Mendel, Tzipa, Miriam, and Uziel.
            When two children in the community were orphaned from both parents,
            the Wolosows adopted them as their own — Naomi and Tani — raising
            them alongside their biological children.
          </p>

          <h2 className="text-xl font-bold text-primary">
            Teaching & Community
          </h2>
          <p>
            As Director of Adult Education at Chabad of Western Monmouth County,
            Rabbi Levi taught classes on Torah, Halacha, and Chassidus for 18
            years. His responsibilities extended beyond the classroom — he
            prepared boys for Bar Mitzvah, organized holiday events, visited
            homes to hang mezuzahs, and helped families establish kosher
            kitchens.
          </p>
          <p>
            He is perhaps best known for{" "}
            <strong>Project Rosh</strong> — an innovative High Holiday service
            that attracted nearly 1,000 participants who were, for whatever
            reason, not inclined to attend traditional synagogue services.
          </p>
          <p>
            A remarkable scholar, Rabbi Levi completed the study of the entire
            Talmud by age 40. He left behind over{" "}
            <strong>{totalVideos} recorded classes</strong> across{" "}
            {totalPlaylists} series, covering the weekly Torah portion (Chumash
            verse-by-verse), Talmud Sotah, all five books of Tanya, JLI courses,
            Mishnah, and Tanach.
          </p>

          <h2 className="text-xl font-bold text-primary">Character</h2>
          <p>
            Members of the community describe Rabbi Levi as kind, learned,
            patient, outgoing, sincere, and humble. He was known for his
            &quot;lichtige ponim&quot; (bright countenance) and for making every
            person he spoke with feel like the most important person in the room.
            He was a lifelong learner, genuinely interested in others&apos;
            wellbeing, and always open to new ideas.
          </p>

          <h2 className="text-xl font-bold text-primary">Legacy</h2>
          <p>
            Rabbi Levi collapsed suddenly during a family outing in the Pocono
            Mountains on February 3, 2025 (5 Shevat 5785). Just hours before, he
            had sung &quot;Tzama Nafshi&quot; alongside musician Avraham Fried at
            the Poconos Midwinter Concert. Over 1,000 mourners attended his
            funeral, and thousands more visited during the shiva. More than
            11,000 people contributed to a family support campaign.
          </p>
          <p>
            This website is dedicated to preserving and sharing his Torah
            teachings, ensuring that his classes continue to inspire and educate
            for generations to come.
          </p>

          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 text-center sm:flex-row sm:justify-center sm:gap-6">
            <a
              href="https://www.youtube.com/@rabbileviwolosow9285"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:text-primary-light"
            >
              YouTube Channel →
            </a>
            <a
              href="https://www.chabadwmc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:text-primary-light"
            >
              Chabad of Western Monmouth County →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
