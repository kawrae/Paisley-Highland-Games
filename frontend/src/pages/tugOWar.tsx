import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fadeIn, fadeUp, stagger, fieldFade } from "../lib/anim";
import EventMap from "../components/EventMap";
import { api } from "../lib/api";

export default function TugOWar() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section className="w-full mb-8 relative z-[1]">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative w-full overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/tug-of-war.jpg')" }}
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

          <div className="absolute left-0 right-0 bottom-0 h-48 pointer-events-none bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0a]" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className="relative z-10 h-80 md:h-96 flex items-center justify-center px-6"
          >
            <div className="text-center text-highland-800 dark:text-white">
              <h1 className="h2 md:text-5xl font-bold">{`Tug o' War`}</h1>
              <p className="lead mt-2 text-sm md:text-base opacity-90 text-highland-800 dark:text-white">
                Rules, schedule and results for the Tug o&apos; War event.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="container-page section relative z-[1]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div
            variants={fadeUp}
            className="card p-6 lg:p-7 lg:flex lg:items-stretch lg:gap-8 dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
          >
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Overview</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Tug o&apos; War is a team event testing coordination, strength
                  and strategy. Two teams pull on opposite ends of a rope; the
                  first team to drag the other team across a marked center line
                  wins. This page contains rules, team size information, and
                  local schedule details.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    When
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    See the event schedule on the main page or event map.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Format
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    8-person teams, straight pull matches, finals in the
                    afternoon session.
                  </p>
                </div>
              </div>

              <div>
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Register to compete
                </Link>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:w-[320px] xl:w-[360px] shrink-0 relative z-[1]">
              <div className="h-[240px] md:h-[260px] rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border relative z-[1]">
                <EventMap focusId="tug" zoomLevel={18} />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Exact field location on the games ground.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-6 items-start">
            <motion.div
              variants={fadeUp}
              className="card p-6 space-y-6 dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
            >
              <div>
                <h3 className="text-sm font-semibold">Entry requirements</h3>
                <ul className="mt-2 ml-4 list-disc text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Team size: 8 per side (check local rules).</li>
                  <li>All competitors must sign the event waiver.</li>
                  <li>
                    Closed footwear required; no metal studs near the rope.
                  </li>
                  <li>Arrive 30 minutes before start for check-in.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Sample schedule</h3>
                <ul className="mt-2 ml-4 list-disc text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>09:30 — Team check-in & briefing</li>
                  <li>10:00 — Heats</li>
                  <li>12:30 — Lunch break</li>
                  <li>14:00 — Finals & medal ceremony</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold">FAQ</h3>
                <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <details className="p-3 rounded-md bg-gray-50 dark:bg-[#111]">
                    <summary className="font-medium">
                      Can we bring a substitute?
                    </summary>
                    <div className="mt-2">
                      Substitutions are permitted up to 30 minutes before your
                      first match, subject to marshal approval.
                    </div>
                  </details>

                  <details className="p-3 rounded-md bg-gray-50 dark:bg-[#111]">
                    <summary className="font-medium">
                      Are spectators allowed near the field?
                    </summary>
                    <div className="mt-2">
                      Yes, spectators can watch from the roped-off viewing areas
                      around the arena.
                    </div>
                  </details>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <LeaderboardCard />

              <motion.div
                variants={fadeUp}
                className="card p-4 dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
              >
                <h3 className="text-sm font-semibold">Watch Tug o&apos; War</h3>
                <div
                  className="mt-3 relative rounded-lg overflow-hidden"
                  style={{ paddingBottom: "56.25%", height: 0 }}
                >
                  <iframe
                    title="Tug o' War example"
                    src="https://www.youtube.com/embed/DvAHD_egGPw?si=7qbT1KPE3n8edv6"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="card p-4 dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
              >
                <h3 className="text-sm font-semibold">Gallery</h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    "/images/tug-of-war.jpg",
                    "/images/competitor.jpg",
                    "/images/competitor-2.jpg",
                  ].map((src) => (
                    <button
                      key={src}
                      type="button"
                      className="relative block w-full h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-highland-500"
                      onClick={() => setLightbox(src)}
                    >
                      <img
                        src={src}
                        alt="Tug o' War"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setLightbox(null)}
        >
          <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 rounded bg-black/40 text-white px-2 py-1 text-xs"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
            <img
              src={lightbox}
              alt="Tug o' War"
              className="max-w-[90vw] max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}
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
        const tug = all.filter((x) => x.eventId === "tug");
        setTotalCount(tug.length);
        const top = tug.sort((a, b) => a.position - b.position).slice(0, 5);
        setItems(top);
      })
      .catch(() => mounted && setErr("Could not load results"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const Medal = ({ pos }: { pos: number }) => {
    if (pos === 1) return <span>🥇</span>;
    if (pos === 2) return <span>🥈</span>;
    if (pos === 3) return <span>🥉</span>;
    return <span className="text-gray-400 dark:text-gray-500">#{pos}</span>;
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="card p-4 dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{`Tug o' War — Top results`}</h3>
        <Link
          to="/leaderboard"
          className="text-xs text-highland-800 dark:text-highland-300 hover:underline"
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
              className="flex items-center justify-between text-sm"
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
                <div className="text-[11px] text-gray-500">#{it.position}</div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      )}
      {totalCount > items.length && (
        <div className="mt-2 text-[11px] text-gray-500">
          Showing top {items.length} of {totalCount} results
        </div>
      )}
    </motion.div>
  );
}
