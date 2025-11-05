import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { api } from "../lib/api";
import { registrationSchema } from "../lib/schemas";
import type { RegistrationForm } from "../lib/schemas";
import type { Event } from "../types";
import {
  slideL,
  slideR,
  formStagger,
  fieldFade,
  kenBurns,
  fadeIn,
} from "../lib/anim";
import FieldError from "../components/FieldError";

export default function Register() {
  const [events, setEvents] = useState<Event[]>([]);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationForm>({ resolver: zodResolver(registrationSchema) });

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Event[]>("/events");
        setEvents(res.data);
      } catch {
        setEvents([
          {
            _id: "caber",
            name: "Caber Toss",
            date: new Date().toISOString(),
            location: "Paisley",
          },
          {
            _id: "tug",
            name: "Tug o’ War",
            date: new Date().toISOString(),
            location: "Paisley",
          },
          {
            _id: "stone",
            name: "Stone Put",
            date: new Date().toISOString(),
            location: "Paisley",
          },
        ]);
      }
    })();
  }, []);

  const onSubmit = async (data: RegistrationForm) => {
    setErr(null);
    try {
      const res = await api.post("/registrations", data);
      if (res.status === 201) {
        setOk(true);
        reset();
      }
    } catch (e: any) {
      const msg =
        e?.response?.data?.error ||
        (e?.response?.status === 400
          ? "Please check your details and try again."
          : null);
      setErr(msg || "Could not submit registration.");
    }
  };

  if (ok) {
    return (
      <section className="container-page section">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-xl mx-auto rounded-2xl border bg-white p-6 shadow-soft text-center
                     dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
        >
          <h2 className="h2 mb-2">Registration received</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We’ll email you with details.
          </p>
          <button onClick={() => setOk(false)} className="btn-primary mt-6">
            Register another competitor
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="container-page section">
      <motion.div
        key={ok ? "ok" : "form"}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-white shadow-soft
                   dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
      >
        <div className="grid md:grid-cols-2">
          <motion.div variants={slideL} className="p-6 md:p-8">
            <h1 className="h2 mb-6">Competitor Registration</h1>
            {err && (
              <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200">
                {err}
              </p>
            )}

            <motion.form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              variants={formStagger}
              className="space-y-4"
            >
              <motion.div variants={fieldFade}>
                <label className="mb-1 block text-sm font-medium">
                  First name
                </label>
                <input
                  {...register("firstName")}
                  className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300
                             dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
                />
                <FieldError msg={errors.firstName ? "Required" : undefined} />
              </motion.div>

              <motion.div variants={fieldFade}>
                <label className="mb-1 block text-sm font-medium">
                  Last name
                </label>
                <input
                  {...register("lastName")}
                  className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300
                             dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
                />
                <FieldError msg={errors.lastName ? "Required" : undefined} />
              </motion.div>

              <motion.div variants={fieldFade}>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300
                             dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
                />
                <FieldError msg={errors.email ? "Invalid email" : undefined} />
              </motion.div>

              <motion.div variants={fieldFade}>
                <label className="mb-1 block text-sm font-medium">Event</label>
                <select
                  {...register("eventId")}
                  className="w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 focus:ring-highland-300
                             dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
                >
                  <option value="">Select an event</option>
                  {events.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.name}
                    </option>
                  ))}
                </select>
                <FieldError
                  msg={errors.eventId ? "Choose an event" : undefined}
                />
              </motion.div>

              <motion.div variants={fieldFade}>
                <button
                  disabled={isSubmitting}
                  className="btn-primary active:scale-[0.98]"
                >
                  {isSubmitting ? "Submitting..." : "Submit registration"}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>

          <motion.div
            variants={slideR}
            className="relative hidden md:block overflow-hidden"
          >
            <motion.img
              variants={kenBurns}
              src="/images/competitor.jpg"
              alt="Competitor at Highland Games"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/0" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
