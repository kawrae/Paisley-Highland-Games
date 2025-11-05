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
              desc: "A legendary display of strength where athletes flip massive wooden poles end-over-end. One of the most iconic Highland challenges.",
              img: "/images/caber-toss.jpg",
              link: "/events#caber",
            },
            {
              title: "Tug o’ War",
              desc: "Teams of eight face off in a contest of teamwork, balance, and sheer determination. A festival favourite for all ages.",
              img: "/images/tug-of-war.jpg",
              link: "/events#tug",
            },
            {
              title: "Stone Put",
              desc: "Scotland’s ancient answer to the shot put — athletes launch a heavy stone for distance using raw technique and power.",
              img: "/images/stone-put.jpg",
              link: "/events#stone",
            },
          ].map((c) => (
            <motion.div
              key={c.title}
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
              className="group overflow-hidden rounded-2xl border bg-white shadow-soft hover:shadow-lg transition dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-highland-800 dark:text-dark-heading">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {c.desc}
                </p>
                <Link
                  to={c.link}
                  className="mt-4 inline-block text-sm text-highland-700 font-medium hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
