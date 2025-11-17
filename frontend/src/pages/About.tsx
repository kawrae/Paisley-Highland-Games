import { motion } from "framer-motion";
import { fadeIn, stagger } from "../lib/anim";

export default function About() {
  return (
    <section className="container-page section">
      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-6 overflow-hidden rounded-2xl border bg-white p-6 shadow-soft dark:bg-dark-card dark:border-dark-border dark:shadow-softDark md:p-8"
      >
        <h1 className="h2">
          About the Paisley Highland Games
        </h1>

        <p className="lead mt-3 text-gray-700 dark:text-gray-200">
          The Paisley Highland Games are an annual celebration of Scottish sport,
          music and culture held in the heart of Paisley, Renfrewshire. A
          friendly, family-orientated day out, the Games bring together
          traditional heavy events, pipe bands, Highland dancing, local clans,
          artisan stalls and community performances — all framed by Paisley’s
          distinctive heritage.
        </p>
      </motion.header>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-6"
      >
        <motion.article
          variants={fadeIn}
          className="group overflow-hidden rounded-2xl border bg-white shadow-soft transition hover:shadow-lg dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
        >
          <div className="md:grid md:grid-cols-2 md:items-stretch">
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="h3">
                <strong>What are the Paisley Highland Games?</strong>
              </h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                The Games combine athletic contests such as weight-for-height,
                hammer throw and tossing the caber with piping and Highland
                dancing competitions. Expect competitive displays of strength
                alongside colourful pageantry and music — a showcase of Scottish
                tradition adapted for a modern town-centre audience.
              </p>

              <h3 className="mt-5 font-semibold text-gray-900 dark:text-dark-heading">
                History &amp; local roots
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                While steeped in the wider tradition of Highland games,
                Paisley’s event reflects the town’s own story — celebrating
                local clans, civic pride and community groups. The Games offer
                an opportunity to experience regional customs in a welcoming,
                accessible setting.
              </p>
            </div>

            <div className="relative h-64 md:h-full">
              <img
                src="/images/tugowar-about.webp"
                alt="Tug of war at the Highland Games"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.article>

        <motion.section
          variants={fadeIn}
          className="overflow-hidden rounded-2xl border bg-white p-6 shadow-soft dark:bg-dark-card dark:border-dark-border dark:shadow-softDark md:p-8"
        >
          <h2 className="h3">
            <strong>Where &amp; when</strong>
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            The Games take place each year in Paisley at a central greenspace
            close to local landmarks and transport links, making it easy for
            visitors from across Renfrewshire and beyond to attend. Check the{" "}
            <span className="font-medium text-highland-700 dark:text-highland-300">
              Events
            </span>{" "}
            page for the exact date and programme for the current year.
          </p>
        </motion.section>

        <motion.article
          variants={fadeIn}
          className="group overflow-hidden rounded-2xl border bg-white shadow-soft transition hover:shadow-lg dark:bg-dark-card dark:border-dark-border dark:shadow-softDark"
        >
          <div className="md:grid md:grid-cols-2 md:items-stretch">
            <div className="relative h-64 md:h-full">
              <img
                src="/images/highlandgames-bagpipes.jpg"
                alt="Bagpipe band at the Highland Games"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="h3">
                <strong>Highlights</strong>
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-200">
                <li>
                  Heavy events: caber toss, hammer and stone put — for athletes
                  and spectators alike.
                </li>
                <li>
                  Pipe bands and solo piping competitions showcasing local and
                  visiting musicians.
                </li>
                <li>
                  Highland dancing with competitors of all ages and traditional
                  costume displays.
                </li>
                <li>
                  Family zone, artisan stalls, food and drink celebrating local
                  producers.
                </li>
              </ul>

              <h3 className="mt-5 font-semibold text-gray-900 dark:text-dark-heading">
                Music, dance &amp; culture
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                Alongside competition, the Games are a celebration of music and
                movement: from the drone of the pipes to the rhythm of Highland
                reels, the day offers a rich programme of performances and
                demonstrations.
              </p>
            </div>
          </div>
        </motion.article>

        <motion.section variants={fadeIn} className="mb-2">
          <div className="overflow-hidden rounded-2xl border bg-white p-6 shadow-soft dark:bg-dark-card dark:border-dark-border dark:shadow-softDark md:p-8">
            <h2 className="h3"><strong>FAQ</strong> - Frequently asked questions</h2>

            <div className="mt-4 space-y-3">
              <details className="rounded-xl border bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card/70">
                <summary className="cursor-pointer font-medium">
                  What time do the events start?
                </summary>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  The schedule varies each year. Main field events usually begin
                  late morning with headline events in the afternoon. Check the
                  Events page for the full timetable.
                </p>
              </details>

              <details className="rounded-xl border bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card/70">
                <summary className="cursor-pointer font-medium">
                  Is there parking and public transport?
                </summary>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  There is limited on-site parking; plentiful pay &amp; display
                  and street parking nearby. Paisley is well served by rail and
                  bus. We recommend public transport where possible.
                </p>
              </details>

              <details className="rounded-xl border bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card/70">
                <summary className="cursor-pointer font-medium">
                  Are the Games suitable for children and families?
                </summary>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  Yes. The Family Zone includes activities for children and
                  there are seating areas and food options suitable for all
                  ages.
                </p>
              </details>

              <details className="rounded-xl border bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card/70">
                <summary className="cursor-pointer font-medium">
                  What accessibility provisions are available?
                </summary>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  The event aims to be inclusive. Accessible viewing areas,
                  designated parking and facilities are provided where possible.
                </p>
              </details>

              <details className="rounded-xl border bg-gray-50 p-4 dark:border-dark-border dark:bg-dark-card/70">
                <summary className="cursor-pointer font-medium">
                  Can I enter competitions or volunteer?
                </summary>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  Yes — competitor entry details and volunteer information are
                  published ahead of the Games on the website. Visit the Events
                  pages for sign-up details.
                </p>
              </details>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </section>
  );
}
