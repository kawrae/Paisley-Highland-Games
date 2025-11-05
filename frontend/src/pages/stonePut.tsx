import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn } from "../lib/anim";
import EventMap from "../components/EventMap";

export default function StonePut() {
  return (
    <section className="container-page section">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h1 className="h2">Stone Put</h1>
        <p className="lead mt-2">
          Details about the Stone Put event, rules and schedule.
        </p>
      </motion.div>

      <section className="container-caber section flex gap-6 items-start">
        <div className="caber-map mb-6 w-1/2 mx-auto">
          <EventMap focusId="stone" zoomLevel={18} />
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-soft dark:bg-dark-card dark:border-dark-border w-1/2">
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Stone Put is a traditional heavy-throw event where competitors put a
            heavy stone for distance. This event emphasizes technique and
            explosive strength; local rules determine the allowable stone size
            and throwing area. Use this page to find rules, schedules and entry
            information.
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
