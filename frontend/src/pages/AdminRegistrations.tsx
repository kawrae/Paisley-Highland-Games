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
      setVersion((v) => v + 1);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    fetchAll();
  }, [isAdmin, fetchAll]);

  const filtered = useMemo(() => {
    let r = rows;
    if (filter !== "all") r = r.filter((x) => x.status === filter);
    if (q.trim()) {
      const t = q.toLowerCase();
      r = r.filter(
        (x) =>
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
    setRows((s) => s.map((r) => (r.id === id ? { ...r, status } : r)));
    setVersion((v) => v + 1);
    try {
      await api.patch(`/registrations/${id}`, { status });
      fetchAll();
    } catch {
      setRows(prev);
      setVersion((v) => v + 1);
    }
  };

  const remove = async (id: string) => {
    const prev = rows;
    setRows((s) => s.filter((r) => r.id !== id));
    setVersion((v) => v + 1);
    try {
      await api.delete(`/registrations/${id}`);
      fetchAll();
    } catch {
      setRows(prev);
      setVersion((v) => v + 1);
    }
  };

  if (!isAdmin) {
    return (
      <section className="container-page section">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft
                        dark:border-dark-border dark:bg-dark-card dark:shadow-softDark">
          Admins only.
        </div>
      </section>
    );
  }

  return (
    <section className="container-page section">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-6">
        <h1 className="h2">Registrations</h1>
        <p className="lead mt-2">Review, approve, or reject competitor registrations.</p>
        {err && (
          <p className="mt-2 rounded bg-red-50 p-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {err}
          </p>
        )}
      </motion.div>

      {/* controls */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        {/* filter groups */}
        <div className="inline-flex rounded-lg border p-1 bg-white dark:bg-dark-card dark:border-dark-border">
          {(["pending", "approved", "rejected", "all"] as const).map((key) => {
            const active =
              filter === key
                ? "bg-highland-600 text-white dark:bg-dark-accent dark:text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#202823]";
            return (
              <button
                key={key}
                onClick={() => {
                  setFilter(key);
                  setVersion((v) => v + 1);
                }}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${active}`}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </button>
            );
          })}
        </div>

        {/* search bar */}
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setVersion((v) => v + 1);
          }}
          placeholder="Search name, email or event…"
          className="input w-full md:w-72"
        />
      </div>

      {/* table card */}
      <div
        className="
          overflow-hidden
          rounded-2xl border border-gray-200 bg-white shadow-soft
          dark:border-dark-border dark:bg-dark-card dark:shadow-softDark
        "
      >
        {/*  card header  */}
        <div
          className="
            hidden md:grid grid-cols-12 px-4 py-3 text-sm font-semibold
            bg-gray-50 border-b border-gray-200
            dark:bg-[#141916] dark:border-dark-border
          "
        >
          <div className="col-span-3">Competitor</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-3">Event</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500 dark:text-gray-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-gray-500 dark:text-gray-400">No registrations</div>
        ) : (
          <motion.div
            key={`${filter}|${q}|${version}`}
            variants={formStagger}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((r) => {
              const StatusPill = (
                <span
                  className={
                    r.status === "approved"
                      ? "badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : r.status === "rejected"
                      ? "badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      : "badge bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }
                >
                  {r.status}
                </span>
              );

              return (
                <motion.div
                  key={r.id}
                  variants={fieldFade}
                  className="
                    border-t border-gray-200 px-4 py-3
                    md:grid md:grid-cols-12 md:items-center
                    flex flex-col gap-2 min-w-0 row-hover
                    dark:border-dark-border
                  "
                >
                  <div className="md:col-span-3 w-full md:w-auto flex items-start justify-between gap-3">
                    <div className="font-medium truncate">
                      {r.firstName} {r.lastName}
                    </div>
                    <div className="md:hidden">{StatusPill}</div>
                  </div>

                  <div className="md:col-span-3 w-full md:w-auto min-w-0">
                    <div className="text-gray-700 dark:text-gray-200 whitespace-nowrap truncate">
                      {r.email}
                    </div>
                  </div>

                  <div className="md:col-span-3 w-full md:w-auto min-w-0">
                    <div className="text-gray-700 dark:text-gray-200 whitespace-nowrap truncate">
                      {r.eventName}
                    </div>
                  </div>

                  <div className="md:col-span-2 hidden md:block">{StatusPill}</div>

                  <div className="md:col-span-1 w-full md:w-auto md:text-right flex md:justify-end gap-2">
                    {r.status !== "approved" && (
                      <button
                        onClick={() => updateStatus(r.id, "approved")}
                        className="rounded-md px-2 py-1 text-sm text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-900/20"
                      >
                        Approve
                      </button>
                    )}
                    {r.status !== "rejected" && (
                      <button
                        onClick={() => updateStatus(r.id, "rejected")}
                        className="rounded-md px-2 py-1 text-sm text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => remove(r.id)}
                      className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#202823]"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
