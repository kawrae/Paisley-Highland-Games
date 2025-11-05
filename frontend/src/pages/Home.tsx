import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, stagger, fadeIn } from "../lib/anim";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="bg-hero-gradient dark:bg-hero-gradient-dark border-b transition-colors duration-300">
        <div className="container-page section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 variants={fadeUp} className="h1">
              Welcome to the Paisley Highland Games
            </motion.h1>

            <motion.p variants={fadeUp} className="lead mt-4">
              Experience Scotland’s iconic athletic traditions — from caber
              tossing to tug o’ war — right here in Paisley. Browse events,
              register as a competitor, or check out results.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <Link to="/register" className="btn-primary">
                Register to Compete
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* TARTAN STRIP (unchanged in dark mode) */}
      <div className="bg-tartan">
        <div className="container-page py-3" />
      </div>

      {/* FEATURE CARDS */}
      <section className="container-page section">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "Caber Toss",
              desc: "The classic test of strength and control.",
            },
            { title: "Tug o’ War", desc: "Teams compete in a battle of grit." },
            { title: "Stone Put", desc: "Traditional precursor to shot put." },
          ].map((c) => (
            <motion.div
              key={c.title}
              variants={fadeIn}
              className="rounded-2xl border bg-white p-6 shadow-soft
                         hover:-translate-y-0.5 hover:shadow-lg transition
                         dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
            >
              <h3 className="text-lg font-semibold text-highland-800 dark:text-dark-heading">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
