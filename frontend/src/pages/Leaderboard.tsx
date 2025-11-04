import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeIn, stagger, fieldFade, formStagger } from "../lib/anim";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";

const LS_RESULTS = "phg_results";
const LS_EVENTS = "phg_events";

type Result = {
  _id: string;
  athlete: string;
  club?: string;
  eventId: string;
  eventName: string;
  position: number;
  score: number;
  date: string;
};

type Event = { _id: string; name: string };

const Medal = ({ pos }: { pos: number }) => {
  if (pos === 1) return <span title="1st">🥇</span>;
  if (pos === 2) return <span title="2nd">🥈</span>;
  if (pos === 3) return <span title="3rd">🥉</span>;
  return <span className="text-gray-400">#{pos}</span>;
};

function deriveEventsFrom(results: Result[]): Event[] {
  const m = new Map<string, string>();
  for (const r of results) if (!m.has(r.eventId)) m.set(r.eventId, r.eventName || r.eventId);
  return Array.from(m, ([id, name]) => ({ _id: id, name }));
}

export default function Leaderboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [events, setEvents] = useState<Event[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [eventId, setEventId] = useState<string>("all");
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<"position" | "athlete" | "score">("position");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    athlete: "",
    club: "",
    eventId: "",
    position: 1,
    score: 0,
  });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [evRes, resRes] = await Promise.all([api.get<Event[]>("/events"), api.get<Result[]>("/results")]);
      const ev = evRes.data || [];
      const rs = resRes.data || [];
      setEvents(ev);
      setResults(rs);
      localStorage.setItem(LS_EVENTS, JSON.stringify(ev));
      localStorage.setItem(LS_RESULTS, JSON.stringify(rs));
    } catch {
      const rs = localStorage.getItem(LS_RESULTS);
      const ev = localStorage.getItem(LS_EVENTS);
      if (ev) setEvents(JSON.parse(ev));
      if (rs) setResults(JSON.parse(rs));
      if (!ev && !rs) {
        setEvents([]);
        setResults([]);
      }
      setErr("Could not load latest results. Showing whatever is available.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    setQ("");
  }, [eventId]);

  const filtered = useMemo(() => {
    let r = results;
    if (eventId !== "all") r = r.filter((x) => x.eventId === eventId);
    if (q.trim()) {
      const t = q.toLowerCase();
      r = r.filter((x) => x.athlete.toLowerCase().includes(t) || x.eventName.toLowerCase().includes(t));
    }
    const dir = sortDir === "asc" ? 1 : -1;
    return [...r].sort((a, b) => {
      if (sortKey === "athlete") return a.athlete.localeCompare(b.athlete) * dir;
      if (sortKey === "score") return (a.score - b.score) * dir;
      return (a.position - b.position) * dir;
    });
  }, [results, eventId, q, sortKey, sortDir]);

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const deleteResult = async (id: string) => {
    const record = results.find((r) => r._id === id);
    const label = record ? `${record.athlete} – ${record.eventName}` : "this result";
    if (!confirm(`Delete ${label}? This cannot be undone.`)) return;
    setResults((prev) => {
      const next = prev.filter((r) => r._id !== id);
      localStorage.setItem(LS_RESULTS, JSON.stringify(next));
      return next;
    });
    try {
      await api.delete(`/results/${id}`);
      fetchAll();
    } catch {}
  };

  const submitResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.eventId || !form.athlete) return;
    setSaving(true);
    try {
      const payload = {
        athlete: form.athlete.trim(),
        club: form.club.trim() || undefined,
        eventId: form.eventId,
        eventName: events.find((x) => x._id === form.eventId)?.name || "",
        position: Number(form.position),
        score: Number(form.score),
        date: new Date().toISOString(),
      };
      let created: Result;
      try {
        const { data } = await api.post<Result>("/results", payload);
        created = data;
      } catch {
        created = { _id: crypto.randomUUID(), ...payload };
      }
      setResults((prev) => {
        const next = [...prev, created].sort((a, b) => a.position - b.position);
        localStorage.setItem(LS_RESULTS, JSON.stringify(next));
        return next;
      });
      if (!events.find((e) => e._id === created.eventId)) {
        const updatedEvents = [...events, { _id: created.eventId, name: created.eventName }];
        setEvents(updatedEvents);
        localStorage.setItem(LS_EVENTS, JSON.stringify(updatedEvents));
      }
      if (eventId !== "all" && eventId !== created.eventId) setEventId(created.eventId);
      setOpen(false);
      setForm({ athlete: "", club: "", eventId: "", position: 1, score: 0 });
      fetchAll();
    } finally {
      setSaving(false);
    }
  };

  const effectiveEvents = events.length === 0 && results.length > 0 ? deriveEventsFrom(results) : events;

  return (
    <section className="container-page section">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="h2">Leaderboard</h1>
          <p className="lead mt-2 text-gray-600">Live results across events. Filter, search and sort.</p>
          {err && <p className="mt-2 rounded bg-yellow-50 p-2 text-sm text-yellow-800">{err}</p>}
        </div>
        {isAdmin && (
          <button onClick={() => setOpen(true)} className="btn-primary">
            Add result
          </button>
        )}
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <select
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="w-full md:w-60 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-highland-300"
        >
          <option value="all">All events</option>
          {effectiveEvents.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.name}
            </option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search athlete or event…"
          className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-highland-300"
        />
      </motion.div>

      <div className="rounded-2xl border bg-white shadow-soft overflow-hidden">
        <div className="hidden md:block">
          <div className="grid grid-cols-12 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
            <button onClick={() => toggleSort("position")} className="text-left col-span-2">Place</button>
            <button onClick={() => toggleSort("athlete")} className="text-left col-span-5">Athlete</button>
            <div className="col-span-3">Event</div>
            <button onClick={() => toggleSort("score")} className={`text-left ${isAdmin ? "col-span-1" : "col-span-2"}`}>Score</button>
            {isAdmin && <div className="col-span-1 text-right">Actions</div>}
          </div>

          {loading ? (
            <div className="p-6 text-gray-500">Loading…</div>
          ) : (
            <motion.div
              key={`${eventId}|${q}|${sortKey}|${sortDir}|${results.length}`}
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((r) => (
                <motion.div
                  key={r._id}
                  variants={fieldFade}
                  className="grid grid-cols-12 items-center border-t px-4 py-3 hover:bg-gray-50 min-h-[64px]"
                >
                  <div className="col-span-2 font-medium"><Medal pos={r.position} /></div>
                  <div className="col-span-5">
                    <div className="font-medium text-gray-900">{r.athlete}</div>
                    {r.club && <div className="text-sm text-gray-500">{r.club}</div>}
                  </div>
                  <div className="col-span-3 text-gray-700">{r.eventName}</div>
                  <div className={`${isAdmin ? "col-span-1" : "col-span-2"} font-semibold text-highland-800`}>{r.score}</div>
                  {isAdmin && (
                    <div className="col-span-1 text-right">
                      <button
                        onClick={() => deleteResult(r._id)}
                        className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                        title="Delete result"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
              {filtered.length === 0 && <div className="border-t px-4 py-8 text-center text-gray-500">No results</div>}
            </motion.div>
          )}
        </div>

        <div className="md:hidden divide-y">
          {loading ? (
            <div className="p-4 text-gray-500">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No results</div>
          ) : (
            <motion.div
              key={`${eventId}|${q}|m|${results.length}`}
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((r) => (
                <motion.div key={r._id} variants={fieldFade} className="p-4 relative">
                  {isAdmin && (
                    <button
                      onClick={() => deleteResult(r._id)}
                      className="absolute right-2 top-2 rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                      title="Delete result"
                    >
                      🗑️
                    </button>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="text-xl"><Medal pos={r.position} /></div>
                    <div className="flex-1">
                      <div className="font-semibold">{r.athlete}</div>
                      <div className="text-sm text-gray-500">{r.eventName}</div>
                    </div>
                    <div className="font-semibold text-highland-800">{r.score}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {open && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="w-full max-w-lg rounded-2xl border bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h2 className="h2 text-lg">Add Result</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <motion.form variants={formStagger} onSubmit={submitResult} className="space-y-3">
              <motion.div variants={fieldFade}>
                <label className="mb-1 block text-sm font-medium">Event</label>
                <select
                  value={form.eventId}
                  onChange={(e) => setForm((f) => ({ ...f, eventId: e.target.value }))}
                  className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
                  required
                >
                  <option value="">Select event</option>
                  {(events.length ? events : effectiveEvents).map((ev) => (
                    <option key={ev._id} value={ev._id}>
                      {ev.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={fieldFade}>
                <label className="mb-1 block text-sm font-medium">Athlete</label>
                <input
                  value={form.athlete}
                  onChange={(e) => setForm((f) => ({ ...f, athlete: e.target.value }))}
                  className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
                  required
                />
              </motion.div>

              <motion.div variants={fieldFade}>
                <label className="mb-1 block text-sm font-medium">Club (optional)</label>
                <input
                  value={form.club}
                  onChange={(e) => setForm((f) => ({ ...f, club: e.target.value }))}
                  className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
                />
              </motion.div>

              <motion.div variants={fieldFade} className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">Position</label>
                  <input
                    type="number"
                    min={1}
                    value={form.position}
                    onChange={(e) => setForm((f) => ({ ...f, position: Number(e.target.value) }))}
                    className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Score</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.score}
                    onChange={(e) => setForm((f) => ({ ...f, score: Number(e.target.value) }))}
                    className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={fieldFade} className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                  Cancel
                </button>
                <button disabled={saving} className="btn-primary">
                  {saving ? "Saving…" : "Save result"}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
