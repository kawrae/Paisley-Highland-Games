import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../lib/anim";
import { useCookieModal } from "../context/CookieModalContext";

const COOKIE_KEY = "phg_cookie_consent";
const COOKIE_ANALYTICS = "phg_analytics";
const COOKIE_MARKETING = "phg_marketing";
const COOKIE_PERSONAL = "phg_personalisation";
const COOKIE_PERF = "phg_performance";

const Toggle = ({
  enabled,
  setEnabled,
  disabled = false,
  label,
}: {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {label}
    </span>

    <button
      disabled={disabled}
      onClick={() => !disabled && setEnabled(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors 
      ${enabled ? "bg-highland-600" : "bg-gray-300 dark:bg-gray-700"}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform 
        ${enabled ? "translate-x-6" : ""}`}
      />
    </button>
  </div>
);

const CookieModal: React.FC = () => {
  const { isOpen, close } = useCookieModal();

  const [analytics, setAnalytics] = useState(localStorage.getItem(COOKIE_ANALYTICS) === "on");
  const [marketing, setMarketing] = useState(localStorage.getItem(COOKIE_MARKETING) === "on");
  const [personal, setPersonal] = useState(localStorage.getItem(COOKIE_PERSONAL) === "on");
  const [performance, setPerformance] = useState(localStorage.getItem(COOKIE_PERF) === "on");

  const savePreferences = () => {
    localStorage.setItem(COOKIE_KEY, "custom");

    localStorage.setItem(COOKIE_ANALYTICS, analytics ? "on" : "off");
    localStorage.setItem(COOKIE_MARKETING, marketing ? "on" : "off");
    localStorage.setItem(COOKIE_PERSONAL, personal ? "on" : "off");
    localStorage.setItem(COOKIE_PERF, performance ? "on" : "off");

    close();
  };

  const acceptAll = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");

    localStorage.setItem(COOKIE_ANALYTICS, "on");
    localStorage.setItem(COOKIE_MARKETING, "on");
    localStorage.setItem(COOKIE_PERSONAL, "on");
    localStorage.setItem(COOKIE_PERF, "on");

    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            className="relative z-10 w-full max-w-3xl max-h-[80vh] overflow-y-auto card p-6 md:p-8 bg-white dark:bg-dark-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
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
                  Privacy & Cookies
                </motion.p>
                <motion.h1 variants={fadeUp} className="h1 text-2xl md:text-3xl">
                  Cookie Preferences
                </motion.h1>
                <motion.p variants={fadeUp} className="text-sm text-gray-600 dark:text-gray-300">
                  Choose which optional cookies you'd like to enable. Essential cookies are always active.
                </motion.p>
              </header>

              {/* cookies sliders */}
              <section className="space-y-2">
                <h2 className="h2 text-xl md:text-2xl">Cookie Settings</h2>

                <div className="border rounded-lg p-4 dark:border-gray-700 space-y-4">

                  <Toggle
                    label="Essential Cookies (required)"
                    enabled={true}
                    setEnabled={() => {}}
                    disabled={true}
                  />

                  <Toggle
                    label="Analytics Cookies"
                    enabled={analytics}
                    setEnabled={setAnalytics}
                  />

                  <Toggle
                    label="Marketing Cookies"
                    enabled={marketing}
                    setEnabled={setMarketing}
                  />

                  <Toggle
                    label="Personalisation Cookies"
                    enabled={personal}
                    setEnabled={setPersonal}
                  />

                  <Toggle
                    label="Performance Cookies"
                    enabled={performance}
                    setEnabled={setPerformance}
                  />

                  <Toggle
                    label="Security Cookies (required)"
                    enabled={true}
                    setEnabled={() => {}}
                    disabled={true}
                  />
                </div>
              </section>

              <motion.p
                variants={fadeUp}
                className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-[#3a4742]"
              >
                This is a university coursework project. This website does not actually store or track real cookies.
              </motion.p>
            </motion.div>

            {/* buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={acceptAll}
                className="btn-primary rounded-full px-5 py-2 text-sm"
              >
                Accept All
              </button>

              <button
                type="button"
                onClick={savePreferences}
                className="btn-ghost rounded-full px-5 py-2 text-sm border border-gray-300 dark:border-gray-600"
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieModal;
