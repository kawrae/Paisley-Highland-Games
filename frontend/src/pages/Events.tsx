import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventMap from "../components/EventMap";
import { fadeIn, fieldFade, formStagger } from "../lib/anim";

const items = [
  { title: "Caber Toss", desc: "Classic test of strength and control." },
  { title: "Tug o’ War", desc: "Teams compete in grit and balance." },
  { title: "Stone Put", desc: "Traditional precursor to shot put." },
];

const eventLinks: Record<string, string> = {
  "Caber Toss": "/events/caber",
  "Tug o’ War": "/events/tugowar",
  "Stone Put": "/events/stone",
};

export default function Events() {
  return (
    <section className="container-page section">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h1 className="h2">Events & Map</h1>
        <p className="lead mt-2">
          Venues within the Paisley showground. Tap markers to see locations.
        </p>
      </motion.div>

      <EventMap />

      <motion.div
        variants={formStagger}
        initial="hidden"
        animate="visible"
        className="mt-8 grid gap-6 md:grid-cols-3"
      >
        {items.map((x) => (
          <motion.div
            key={x.title}
            variants={fieldFade}
            className="rounded-2xl border bg-white p-6 shadow-soft transition
                 dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
          >
            <h3 className="text-lg font-semibold">
              <Link
                to={eventLinks[x.title] || "#"}
                className="text-highland-800 dark:text-dark-heading hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200"
              >
                {x.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {x.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
