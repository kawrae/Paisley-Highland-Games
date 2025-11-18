import React from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, fadeIn } from "../lib/anim";

const Privacy: React.FC = () => {
  return (
    <main className="container-page section">
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <header className="max-w-3xl space-y-3">
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-highland-700 dark:text-emerald-300"
          >
            Privacy &amp; Cookies
          </motion.p>
          <motion.h1 variants={fadeUp} className="h1">
            Privacy Policy
          </motion.h1>
          <motion.p variants={fadeUp} className="lead">
            This Privacy Policy explains how we collect, use and protect your
            personal data when you use the Paisley Highland Games website.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            Last updated: {new Date().getFullYear()}
          </motion.p>
        </header>

        <motion.div
          className="card p-6 space-y-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">1. Who we are</h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              References to &quot;we&quot;, &quot;us&quot; or &quot;our&quot; in
              this policy refer to the organisers of the Paisley Highland Games
              and the team responsible for operating this website. For any
              questions about this policy, you can contact us using the details
              in section 10 below.
            </p>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              2. Personal data we collect
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              We may collect and process the following categories of personal
              data when you use our website:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>
                <span className="font-medium">Account information:</span> name,
                email address and password when you create an account or log in.
              </li>
              <li>
                <span className="font-medium">Event registration details:</span>{" "}
                information you provide when registering for events or
                competitions (for example, age category, club, contact details).
              </li>
              <li>
                <span className="font-medium">Leaderboard / results data:</span>{" "}
                scores, times or rankings associated with your participation.
              </li>
              <li>
                <span className="font-medium">Contact details:</span> any
                information you include when you contact us (for example via a
                contact form or email).
              </li>
              <li>
                <span className="font-medium">Usage data:</span> technical
                information such as IP address, browser type, pages viewed and
                time spent on the site. This is typically collected using
                cookies or similar technologies (see section 5).
              </li>
            </ul>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              3. How and why we use your data
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>To create and manage your account on the website.</li>
              <li>
                To process event or competition registrations and manage your
                participation.
              </li>
              <li>
                To publish and maintain leaderboards or results (where
                applicable).
              </li>
              <li>
                To respond to your enquiries and communicate information about
                events or services you have requested.
              </li>
              <li>
                To operate, secure and improve the website, including
                understanding how visitors use it.
              </li>
              <li>
                To comply with any legal or regulatory obligations we may have.
              </li>
            </ul>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              4. Legal bases for processing
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Under UK and EU data protection law (including the UK GDPR), we
              must have a lawful basis to process your personal data. Depending
              on the context, we rely on:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>
                <span className="font-medium">Contract:</span> where processing
                is necessary to provide services you have requested, such as
                managing your event registration.
              </li>
              <li>
                <span className="font-medium">Legitimate interests:</span> to
                operate and improve our website, communicate with participants
                and ensure the security of our systems, provided these interests
                are not overridden by your rights and freedoms.
              </li>
              <li>
                <span className="font-medium">Consent:</span> for optional
                analytics cookies or certain types of communication where
                consent is required by law. You can withdraw consent at any time
                (see sections 5 and 8).
              </li>
              <li>
                <span className="font-medium">Legal obligation:</span> where we
                are required to keep certain records or share information with
                public authorities.
              </li>
            </ul>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">5. Cookies and tracking</h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Cookies are small text files placed on your device when you visit
              a website. We use cookies to:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>Keep you logged in and secure your session.</li>
              <li>
                Remember your preferences (for example, cookie consent choices).
              </li>
              <li>
                With your consent, collect anonymous statistics about how the
                site is used so we can improve it.
              </li>
            </ul>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              When you first visit the site, you will see a cookie banner
              allowing you to accept or reject optional cookies. Essential
              cookies, which are required for the site to function, will always
              be set, but we will only use optional analytics cookies if you
              consent to them.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              You can change your cookie preferences at any time by adjusting
              your browser settings or revisiting our cookie banner (if
              available), though this may affect how the website functions.
            </p>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              6. How long we keep your data
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              We keep your personal data only for as long as necessary for the
              purposes described in this policy, including any legal or
              reporting requirements. In general:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>
                Account information is retained while your account remains
                active.
              </li>
              <li>
                Event registration information may be kept for a period after
                the event to manage results, respond to queries and comply with
                legal obligations.
              </li>
              <li>
                Technical logs and analytics data are kept for a limited period
                to help us operate and secure the website.
              </li>
            </ul>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              7. Sharing your personal data
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              We do not sell your personal data. We may share your data with:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>
                <span className="font-medium">Service providers</span> who help
                us host the website, send emails or provide analytics, under
                appropriate data protection agreements.
              </li>
              <li>
                <span className="font-medium">
                  Event partners or governing bodies
                </span>{" "}
                where necessary to manage competitions or comply with relevant
                rules.
              </li>
              <li>
                <span className="font-medium">Public authorities</span> if we
                are required to do so by law or to protect our rights or the
                rights of others.
              </li>
            </ul>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              If we transfer personal data outside the UK or European Economic
              Area, we will take steps to ensure an adequate level of
              protection, for example by using standard contractual clauses
              where appropriate.
            </p>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">8. Your rights</h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Under data protection law, you have certain rights in relation to
              your personal data. These include the right to:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>Access a copy of the personal data we hold about you.</li>
              <li>Request that we correct inaccurate or incomplete data.</li>
              <li>
                Request deletion of your data in certain circumstances
                (&quot;right to be forgotten&quot;).
              </li>
              <li>
                Object to our processing of your data where we rely on
                legitimate interests.
              </li>
              <li>
                Restrict our processing of your data in certain situations.
              </li>
              <li>
                Withdraw your consent where we rely on consent (for example,
                optional cookies or certain marketing).
              </li>
              <li>
                Request a copy of your data in a structured, commonly used and
                machine-readable format where applicable (data portability).
              </li>
            </ul>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              If you would like to exercise any of these rights, please contact
              us using the details in section 10. We may need to verify your
              identity before we can respond.
            </p>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              9. Children and young participants
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Our events may involve participants under 18. Where we process
              personal data relating to children (for example, for event
              registrations), we do so in line with applicable safeguarding and
              data protection requirements. Parents or guardians may contact us
              at any time to ask how their child&apos;s data is used.
            </p>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              10. How to contact us or make a complaint
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us via the contact details
              provided on the website or through our contact form.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              You also have the right to raise a concern with your local data
              protection authority. In the UK, this is the Information
              Commissioner&apos;s Office (ICO).
            </p>
          </motion.section>

          <motion.section className="space-y-2" variants={fadeUp}>
            <h2 className="h2 text-xl md:text-2xl">
              11. Changes to this policy
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. The updated
              version will always be available on this page, and the &quot;Last
              updated&quot; date at the top will indicate when the latest
              changes took effect.
            </p>
          </motion.section>

          <motion.p
            variants={fadeUp}
            className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-[#3a4742]"
          >
            This page is provided as a general template and does not constitute
            legal advice, as this is only a demo application for our university project. This site does not actually use or store cookie data.
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Privacy;
