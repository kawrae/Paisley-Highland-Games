import { motion } from "framer-motion";
import { fadeIn } from "../lib/anim";

export default function About() {
  return (
    <section className="container-page section">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h1 className="h2">About the Paisley Highland Games</h1>

        <p className="lead mt-2">
          The Paisley Highland Games are an annual celebration of Scottish sport,
          music and culture held in the heart of Paisley, Renfrewshire. A
          friendly, family-orientated day out, the Games bring together traditional
          heavy events, pipe bands, Highland dancing, local clans, artisan stalls
          and community performances — all framed by Paisley’s distinctive heritage.
        </p>
      </motion.div>

      {/* Main content boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow p-6 dark:bg-dark-card dark:border-dark-border"
        >
          <h2 className="h3"><strong>What are the Paisley Highland Games?</strong></h2>
          <p className="mt-2">
            The Games combine athletic contests such as weight-for-height, hammer
            throw and tossing the caber with piping and Highland dancing
            competitions. Expect competitive displays of strength alongside colourful
            pageantry and music — a showcase of Scottish tradition adapted for a
            modern town-centre audience.
          </p>

          <h3 className="mt-4"><strong>History & local roots</strong></h3>
          <p className="mt-2">
            While steeped in the wider tradition of Highland games, Paisley’s event
            reflects the town’s own story — celebrating local clans, civic pride and
            community groups. The Games offer an opportunity to experience regional
            customs in a welcoming, accessible setting.
          </p>
        </motion.section>

        <motion.figure
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-dark-card dark:border-dark-border"
        >
          <img
            src="/images/tugowar-about.webp"
            alt="Tug of war at the Highland Games"
            className="w-full object-cover"
          />
        </motion.figure>
      </div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="grid gap-6 mb-6"
      >
        <div className="bg-white rounded-lg shadow p-6 dark:bg-dark-card dark:border-dark-border">
          <h2 className="h3"><strong>Where & when</strong></h2>
          <p className="mt-2">
            The Games take place each year in Paisley at a central greenspace close
            to local landmarks and transport links, making it easy for visitors from
            across Renfrewshire and beyond to attend. Check the Events page for the
            exact date and programme for the current year.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow p-6 dark:bg-dark-card dark:border-dark-border"
        >
          <h2 className="h3"><strong>Highlights</strong></h2>
          <ul className="list-disc pl-5 mt-3">
            <li>Heavy events: caber toss, hammer and stone put — for athletes and spectators alike.</li>
            <li>Pipe bands and solo piping competitions showcasing local and visiting musicians.</li>
            <li>Highland dancing with competitors of all ages and traditional costume displays.</li>
            <li>Family zone, artisan stalls, food and drink celebrating local producers.</li>
          </ul>

          <h3 className="mt-4">Music, dance & culture</h3>
          <p className="mt-2">
            Alongside competition, the Games are a celebration of music and movement:
            from the drone of the pipes to the rhythm of Highland reels, the day
            offers a rich programme of performances and demonstrations.
          </p>
        </motion.section>

        <motion.figure
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-dark-card dark:border-dark-border"
        >
          <img
            src="/images/highlandgames-bagpipes.jpg"
            alt="Bagpipe band at the Highland Games"
            className="w-full h-full object-cover"
          />
        </motion.figure>
      </div>

      {/* FAQ section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <div className="bg-white rounded-lg shadow p-6 dark:bg-dark-card dark:border-dark-border">
          <h2 className="h3">Frequently asked questions</h2>

          <div className="mt-4 space-y-3 ">
            <details className="bg-gray-50 rounded p-4 dark:bg-dark-card dark:border-dark-border" aria-expanded="false">
              <summary className="font-medium cursor-pointer">What time do the events start?</summary>
              <p className="mt-2 text-sm">
                The schedule varies each year. Main field events usually begin late morning with headline events in the afternoon. Check the Events page for the full timetable.
              </p>
            </details>

            <details className="bg-gray-50 rounded p-4 dark:bg-dark-card dark:border-dark-border">
              <summary className="font-medium cursor-pointer">Is there parking and public transport?</summary>
              <p className="mt-2 text-sm">
                There is limited on-site parking; plentiful pay & display and street parking nearby. Paisley is well served by rail and bus. We recommend public transport where possible.
              </p>
            </details>

            <details className="bg-gray-50 rounded p-4 dark:bg-dark-card dark:border-dark-border">
              <summary className="font-medium cursor-pointer">Are the Games suitable for children and families?</summary>
              <p className="mt-2 text-sm">
                Yes. The Family Zone includes activities for children and there are seating areas and food options suitable for all ages.
              </p>
            </details>

            <details className="bg-gray-50 rounded p-4 dark:bg-dark-card dark:border-dark-border">
              <summary className="font-medium cursor-pointer">What accessibility provisions are available?</summary>
              <p className="mt-2 text-sm">
                The event aims to be inclusive. Accessible viewing areas, designated parking and facilities are provided where possible.
              </p>
            </details>

            <details className="bg-gray-50 rounded p-4 dark:bg-dark-card dark:border-dark-border">
              <summary className="font-medium cursor-pointer">Can I enter competitions or volunteer?</summary>
              <p className="mt-2 text-sm">
                Yes — competitor entry details and volunteer information are published ahead of the Games on the website. Visit the Events pages for sign-up details.
              </p>
            </details>
          </div>
        </div>
      </motion.section>


    </section>
  );
}
