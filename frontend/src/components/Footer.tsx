import { motion } from "framer-motion";
import { FaGithub, FaGlobe, FaEnvelope } from "react-icons/fa";
import { useCookieModal } from "../context/CookieModalContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { open } = useCookieModal();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mt-20 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-gray-100 py-10 before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">
            Paisley Highland Games
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            © {year} All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://github.com/kawrae"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-300 transition transform hover:-translate-y-0.3 hover:scale-105 duration-200"
            >
              <FaGithub className="text-lg" /> Corey Black
            </a>

            <a
              href="https://github.com/Abs3601"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-300 transition transform hover:-translate-y-0.3 hover:scale-105 duration-200"
            >
              <FaGithub className="text-lg" /> Abdullah Barkaji
            </a>

            <a
              href="mailto:B01651145@studentmail.uws.ac.uk"
              className="flex items-center gap-2 hover:text-emerald-300 transition transform hover:-translate-y-0.3 hover:scale-105 duration-200"
            >
              <FaEnvelope className="text-lg" /> Contact Us
            </a>
          </div>

          <button
            type="button"
            onClick={open}
            className="text-xs text-gray-300 hover:text-white hover:underline underline-offset-2 transition duration-200"
          >
            Privacy &amp; Cookies Policy
          </button>
        </div>

        <div className="text-center md:text-right text-sm text-gray-300">
          <p>
            Built with <span className="font-semibold text-white">React</span>,{" "}
            <span className="font-semibold text-white">Vite</span>, &{" "}
            <span className="font-semibold text-white">Tailwind</span>
          </p>
          <a
            href="https://www.uws.ac.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mt-1"
          >
            <FaGlobe /> University of the West of Scotland
          </a>
        </div>
      </div>

      <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
    </motion.footer>
  );
}
