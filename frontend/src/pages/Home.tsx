import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, stagger, fadeIn } from "../lib/anim";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover scale-105"
          style={{
            backgroundImage: "url('/images/tartan-hero.webp')",
            filter: "brightness(0.8) contrast(1.1) saturate(1.1)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 dark:from-[#0a0a0a]/60 dark:via-[#0a0a0a]/40 dark:to-[#0a0a0a]/80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-black/15 to-black/30 dark:via-black/25 dark:to-black/40"
          aria-hidden="true"
        />

        <div className="container-page section relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              variants={fadeUp}
              className="h1 !text-emerald-100 drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] dark:!text-emerald-200"
            >
              Welcome to the{" "}
              <span className="!text-highland-200 dark:!text-emerald-200">
                Paisley Highland Games
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="lead mt-4 !text-white/90 dark:!text-gray-300"
            >
              Experience Scotland’s iconic athletic traditions — from caber
              tossing to tug o’ war — right here in Paisley. Browse events,
              register as a competitor, or check out results.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <Link
                to="/register"
                className="btn-primary shadow-md hover:shadow-lg transition-transform hover:scale-[1.03]"
              >
                Register to Compete
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="bg-tartan h-2 w-full" />
      </section>

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
              link: "/events/caber",
            },
            {
              title: "Tug o’ War",
              desc: "Teams of eight face off in a contest of teamwork, balance, and sheer determination. A festival favourite for all ages.",
              img: "/images/tug-of-war.jpg",
              link: "/events/tugowar",
            },
            {
              title: "Stone Put",
              desc: "Scotland’s ancient answer to the shot put — athletes launch a heavy stone for distance using raw technique and power.",
              img: "/images/stone-put.jpg",
              link: "/events/stone",
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
                  className="mt-4 inline-block text-sm text-highland-700 dark:text-highland-300 font-medium hover:underline"
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
