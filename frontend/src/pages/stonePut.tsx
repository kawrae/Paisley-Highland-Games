import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fadeIn, fadeUp, stagger, fieldFade } from "../lib/anim";
import EventMap from "../components/EventMap";
import { api } from "../lib/api";

export default function StonePut() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Full-bleed hero */}
      <section className="w-full mb-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative w-full overflow-hidden"
          aria-label="Stone Put hero"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/stone-put.jpg')" }}
          />

          <div className="absolute inset-0 pointer-events-none bg-white/60 dark:bg-transparent" />

          <motion.div
            initial={{ opacity: 0.96 }}
            animate={{ opacity: [0.96, 0.65, 0.96] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="h-full w-full bg-gradient-to-b from-white/70 via-transparent to-transparent dark:from-black/60" />
          </motion.div>

          <div className=" absolute left-0 right-0 bottom-0 h-48 pointer-events-none bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0a]" />

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className="relative z-10 h-96 flex items-center justify-center px-6"
          >
            <div className="text-center text-highland-800 dark:text-white">
              <h1 className="h2 md:text-5xl font-bold dark:drop-shadow-lg">
                Stone Put
              </h1>
              <p className="lead mt-2 text-sm md:text-base opacity-90 text-highland-800 dark:text-white">
                Details about the Stone Put event, rules and schedule.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="container-page section">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          <div>
            <div className="rounded-2xl border bg-white p-6 shadow-soft dark:bg-dark-card dark:border-dark-border h-full flex flex-col justify-center">
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Stone Put is a traditional heavy-throw event where competitors
                put a heavy stone for distance. This event emphasizes technique
                and explosive strength; local rules determine the allowable
                stone size and throwing area. Use this page to find rules,
                schedules and entry information.
              </p>

              <h3 className="mt-4 text-sm font-medium">When</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                See the event schedule on the main page or event map.
              </p>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.18 }}
                className="mt-4"
              >
                <Link
                  to="/register"
                  aria-label="Register for Stone Put"
                  className="btn-primary inline-flex items-center gap-3"
                >
                  Register
                </Link>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Limited spots! Sign up now
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-0">
            <EventMap focusId="stone" zoomLevel={18} />
          </div>
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.28 }}
          className="mt-6 rounded-2xl border bg-white p-6 shadow-soft dark:bg-dark-card dark:border-dark-border"
        >
          {/* Stone Put leaderboard (top 5) */}
          <LeaderboardCard />

          <h3 className="text-sm font-semibold">Entry requirements</h3>
          <ul className="mt-2 ml-4 list-disc text-sm text-gray-600 dark:text-gray-300">
            <li>Competitor age and weight categories may apply</li>
            <li>Signed waiver required</li>
            <li>Competitors should warm up and follow marshal instructions</li>
            <li>Arrive 30 minutes before your scheduled time</li>
          </ul>

          <h3 className="mt-4 text-sm font-semibold">Watch Stone Put</h3>
          <div
            className="mt-3 relative"
            style={{ paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              title="Stone Put example"
              src="https://www.youtube.com/embed/DDLwMYy_UZs?si=EMj9uqlXyYEdTgq9"
              className="absolute inset-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <h3 className="mt-4 text-sm font-semibold">Sample schedule</h3>
          <ul className="mt-2 ml-4 list-disc text-sm text-gray-600 dark:text-gray-300">
            <li>09:00 — Competitor check-in</li>
            <li>10:00 — Qualifying rounds</li>
            <li>12:30 — Break</li>
            <li>13:30 — Finals</li>
          </ul>

          <h3 className="mt-4 text-sm font-semibold">Gallery</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["/images/stone-put.jpg", "/images/competitor.jpg"].map((src) => (
              <img
                key={src}
                src={src}
                alt="stone"
                className="w-full h-24 object-cover rounded-md cursor-pointer"
                onClick={() => setLightbox(src)}
              />
            ))}
          </div>

          <h3 className="mt-4 text-sm font-semibold">FAQ</h3>
          <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <details className="p-3 rounded-md bg-gray-50 dark:bg-[#111]">
              <summary className="font-medium">
                What stone sizes are allowed?
              </summary>
              <div className="mt-2">
                Stone specifications will be listed in the event rules; please
                check before competing.
              </div>
            </details>
            <details className="p-3 rounded-md bg-gray-50 dark:bg-[#111]">
              <summary className="font-medium">
                Can I practice with my own stone?
              </summary>
              <div className="mt-2">
                Practice stones are allowed in the warm-up area subject to
                marshal approval.
              </div>
            </details>
          </div>
        </motion.div>
      </section>

      {/* Lightbox modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setLightbox(null)}
        >
          <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 rounded bg-black/40 text-white p-2"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
            <img
              src={lightbox}
              alt="lightbox"
              className="max-w-[90vw] max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}

      {/* Floating CTA */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.35 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link
          to="/register"
          aria-label="Register for Stone Put"
          className="btn-primary inline-flex items-center gap-3 px-5 py-3"
        >
          Register for Stone Put
        </Link>
      </motion.div>
    </>
  );
}

function LeaderboardCard() {
  type Item = {
    _id: string;
    athlete: string;
    club?: string;
    position: number;
    score: number;
    eventId?: string;
  };
  const [items, setItems] = useState<Item[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr(null);
    api
      .get("/results")
      .then((r) => {
        if (!mounted) return;
        const all: Item[] = r.data || [];
        const stone = all.filter((x) => x.eventId === "stone");
        setTotalCount(stone.length);
        const top = stone.sort((a, b) => a.position - b.position).slice(0, 5);
        setItems(top);
      })
      .catch(() => mounted && setErr("Could not load results"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const Medal = ({ pos }: { pos: number }) => {
    if (pos === 1) return <span title="1st">🥇</span>;
    if (pos === 2) return <span title="2nd">🥈</span>;
    if (pos === 3) return <span title="3rd">🥉</span>;
    return <span className="text-gray-400 dark:text-gray-500">#{pos}</span>;
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mb-4 rounded-lg border p-4 bg-gray-50 dark:bg-[#0f1412] dark:border-dark-border"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Stone Put — Top results</h3>
        <Link
          to="/leaderboard"
          className="text-sm text-highland-800 dark:text-highland-300 hover:underline"
        >
          View full leaderboard
        </Link>
      </div>

      {loading ? (
        <div className="mt-3 text-sm text-gray-500">Loading…</div>
      ) : err ? (
        <div className="mt-3 text-sm text-red-600">{err}</div>
      ) : items.length === 0 ? (
        <div className="mt-3 text-sm text-gray-600">No results yet</div>
      ) : (
        <motion.ol
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-3 space-y-2"
        >
          {items.map((it) => (
            <motion.li
              key={it._id}
              variants={fieldFade}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">
                  <Medal pos={it.position} />
                </div>
                <div>
                  <div className="font-medium dark:text-dark-text">
                    {it.athlete}
                  </div>
                  {it.club && (
                    <div className="text-xs text-gray-500">{it.club}</div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-highland-800 dark:text-dark-heading">
                  {it.score}
                </div>
                <div className="text-xs text-gray-500">#{it.position}</div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      )}
      {totalCount > items.length && (
        <div className="mt-2 text-xs text-gray-500">
          Showing top {items.length} of {totalCount} results
        </div>
      )}
    </motion.div>
  );
}
