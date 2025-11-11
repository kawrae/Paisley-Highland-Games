import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventMap from "../components/EventMap";
import { fadeIn, fieldFade, formStagger } from "../lib/anim";

const items = [
  {
    title: "Caber Toss",
    desc: "Classic test of strength and control.",
    img: "/images/caber-toss.jpg",
    link: "/events/caber",
  },
  {
    title: "Tug o’ War",
    desc: "Teams compete in grit and balance.",
    img: "/images/tug-of-war.jpg",
    link: "/events/tugowar",
  },
  {
    title: "Stone Put",
    desc: "Traditional precursor to shot put.",
    img: "/images/stone-put.jpg",
    link: "/events/stone",
  },
];

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
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Link
              to={x.link}
              className="block overflow-hidden rounded-2xl border bg-white shadow-soft hover:shadow-lg transition dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={x.img}
                  alt={x.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-highland-800 dark:text-dark-heading">
                  {x.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {x.desc}
                </p>
                <div className="mt-4 text-sm text-highland-700 dark:text-highland-300 font-medium">
                  Learn more →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
