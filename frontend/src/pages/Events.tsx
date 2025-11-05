import { motion } from "framer-motion";
import EventMap from "../components/EventMap";
import { fadeIn, fieldFade, formStagger } from "../lib/anim";

const items = [
  { title: "Caber Toss", desc: "Classic test of strength and control." },
  { title: "Tug o’ War", desc: "Teams compete in grit and balance." },
  { title: "Stone Put", desc: "Traditional precursor to shot put." },
];

export default function Events() {
  return (
    <section className="container-page section">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-6">
        <h1 className="h2">Events & Map</h1>
        <p className="lead mt-2 text-gray-600 dark:text-dark-text/80">
          Venues within the Paisley showground. Tap markers to see locations.
        </p>
      </motion.div>

      <EventMap />

      <motion.div
        variants={formStagger}
        initial="hidden"
        animate="visible"
        className="mt-8 grid gap-4 md:grid-cols-3"
      >
        {items.map((x) => (
          <motion.div
            key={x.title}
            variants={fieldFade}
            className="rounded-2xl border bg-white dark:bg-dark-card p-4 shadow-soft dark:shadow-softDark"
          >
            <h3 className="font-semibold text-highland-700 dark:text-dark-text">{x.title}</h3>
            <p className="text-sm text-gray-600 dark:text-dark-text/80 mt-1">{x.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
