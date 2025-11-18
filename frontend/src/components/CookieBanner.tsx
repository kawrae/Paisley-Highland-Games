import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ConsentValue = "accepted" | "rejected" | null;

const COOKIE_KEY = "phg_cookie_consent";

const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentValue;
    if (!stored) {
      setIsOpen(true);
    }
  }, []);

  const handleConsent = (value: ConsentValue) => {
    if (!value) return;
    localStorage.setItem(COOKIE_KEY, value);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:pb-6">
      <div className="pointer-events-auto w-full max-w-4xl card shadow-softDark bg-white/95 dark:bg-dark-card/95 backdrop-blur">
        <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-highland-800 dark:text-dark-heading">
              We use cookies
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-muted">
              We use essential cookies to make this site work. With your
              consent, we&apos;d also like to use optional analytics cookies to
              help us improve it. You can change your choice at any time.
            </p>
            <Link
              to="/privacy"
              className="text-xs font-medium text-highland-700 underline underline-offset-2 hover:text-highland-800 dark:text-dark-accent dark:hover:text-dark-accentHover"
            >
              Read our Privacy &amp; Cookie Policy
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <button
              type="button"
              onClick={() => handleConsent("rejected")}
              className="btn-ghost rounded-full border border-transparent hover:border-highland-200 dark:hover:border-dark-border"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => handleConsent("accepted")}
              className="btn-primary rounded-full px-5 py-2 text-xs sm:text-sm"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
