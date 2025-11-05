import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { api } from "../lib/api";
import { fadeIn, formStagger, fieldFade } from "../lib/anim";
import { useAuth } from "../lib/auth";

type Reg = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  eventId: string;
  eventName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const LS_REGS = "phg_regs_cache";

export default function AdminRegistrations() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [rows, setRows] = useState<Reg[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [q, setQ] = useState("");
  // bump when we want to force the list to remount/animate
  const [version, setVersion] = useState(0);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const { data } = await api.get<Reg[]>("/registrations");
      setRows(data);
      localStorage.setItem(LS_REGS, JSON.stringify(data));
    } catch {
      const cached = localStorage.getItem(LS_REGS);
      if (cached) setRows(JSON.parse(cached));
      else setErr("Could not load registrations.");
    } finally {
      setLoading(false);
      setVersion(v => v + 1); // ensure remount after load cycles
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    fetchAll();
  }, [isAdmin, fetchAll]);

  const filtered = useMemo(() => {
    let r = rows;
    if (filter !== "all") r = r.filter(x => x.status === filter);
    if (q.trim()) {
      const t = q.toLowerCase();
      r = r.filter(x =>
        x.firstName.toLowerCase().includes(t) ||
        x.lastName.toLowerCase().includes(t) ||
        x.email.toLowerCase().includes(t) ||
        x.eventName.toLowerCase().includes(t)
      );
    }
    return r;
  }, [rows, filter, q]);

  const updateStatus = async (id: string, status: Reg["status"]) => {
    const prev = rows;
    // optimistic
    setRows(s => s.map(r => (r.id === id ? { ...r, status } : r)));
    setVersion(v => v + 1);
    try {
      await api.patch(`/registrations/${id}`, { status });
      // refresh from server for truth
      fetchAll();
    } catch {
      setRows(prev);
      setVersion(v => v + 1);
    }
  };

  const remove = async (id: string) => {
    const prev = rows;
    // optimistic
    setRows(s => s.filter(r => r.id !== id));
    setVersion(v => v + 1);
    try {
      await api.delete(`/registrations/${id}`);
      fetchAll();
    } catch {
      setRows(prev);
      setVersion(v => v + 1);
    }
  };

  if (!isAdmin) {
    return (
      <section className="container-page section">
        <div className="rounded-2xl border bg-white p-6 shadow-soft">Admins only.</div>
      </section>
    );
  }

  return (
    <section className="container-page section">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-6">
        <h1 className="h2">Registrations</h1>
        <p className="lead mt-2 text-gray-600">Review, approve, or reject competitor registrations.</p>
        {err && <p className="mt-2 rounded bg-red-50 p-2 text-sm text-red-700">{err}</p>}
      </motion.div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="inline-flex rounded-lg border bg-white p-1">
          {(["pending","approved","rejected","all"] as const).map(key => (
            <button
              key={key}
              onClick={() => { setFilter(key); setVersion(v => v + 1); }}
              className={`px-3 py-1 rounded-md text-sm ${filter === key ? "bg-highland-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {key[0].toUpperCase()+key.slice(1)}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e)=>{ setQ(e.target.value); setVersion(v => v + 1); }}
          placeholder="Search name, email or event…"
          className="w-full md:w-72 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-highland-300"
        />
      </div>

      <div className="rounded-2xl border bg-white shadow-soft overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
          <div className="col-span-3">Competitor</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-3">Event</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-gray-500">No registrations</div>
        ) : (
          // Force remount when filter/query/rows change to avoid any blank-frame glitch
          <motion.div
            key={`${filter}|${q}|${version}`}
            variants={formStagger}
            initial="hidden"
            animate="visible"
          >
            {filtered.map(r => (
              <motion.div key={r.id} variants={fieldFade} className="grid grid-cols-12 items-center border-t px-4 py-3 min-h-[64px]">
                <div className="col-span-3 font-medium">{r.firstName} {r.lastName}</div>
                <div className="col-span-3 text-gray-700">{r.email}</div>
                <div className="col-span-3 text-gray-700">{r.eventName}</div>
                <div className="col-span-2">
                  <span className={
                    r.status === "approved" ? "rounded px-2 py-1 text-xs font-semibold bg-green-100 text-green-700"
                    : r.status === "rejected" ? "rounded px-2 py-1 text-xs font-semibold bg-red-100 text-red-700"
                    : "rounded px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700"
                  }>
                    {r.status}
                  </span>
                </div>
                <div className="col-span-1 text-right space-x-1">
                  <button onClick={() => updateStatus(r.id, "approved")} className="rounded-md px-2 py-1 text-sm text-green-700 hover:bg-green-50">Approve</button>
                  <button onClick={() => updateStatus(r.id, "rejected")} className="rounded-md px-2 py-1 text-sm text-red-700 hover:bg-red-50">Reject</button>
                  <button onClick={() => remove(r.id)} className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">Delete</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
