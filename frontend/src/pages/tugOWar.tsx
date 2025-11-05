import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn } from "../lib/anim";
import EventMap from "../components/EventMap";

export default function TugOWar() {
  return (
    <section className="container-page section">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h1 className="h2">Tug o' War</h1>
        <p className="lead mt-2">
          Details about the Tug o` War event, rules and schedule.
        </p>
      </motion.div>

      <section className="container-caber section flex gap-6 items-start">
        <div className="caber-map mb-6 w-1/2 mx-auto">
          <EventMap focusId="tug" zoomLevel={18} />
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-soft dark:bg-dark-card dark:border-dark-border w-1/2">
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Tug o' War is a team event testing coordination, strength and
            strategy. Two teams pull on opposite ends of a rope; the first team
            to drag the other team across a marked center line wins. This page
            contains rules, team size information, and local schedule details.
          </p>

          <h3 className="mt-4 text-sm font-medium">When</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            See the event schedule on the main page or event map.
          </p>

          <h3 className="mt-4 text-sm font-medium">How to enter</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Use the registration form to sign up:{" "}
            <strong>
              <Link
                to="/register"
                className="text-highland-800 dark:text-dark-heading hover:text-emerald-100 dark:hover:text-emerald-300 transition-colors duration-300"
              >
                Register
              </Link>
            </strong>
            .
          </p>
        </div>
      </section>
    </section>
  );
}
