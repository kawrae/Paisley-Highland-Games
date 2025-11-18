import React, { useEffect, useState } from "react";
import { useCookieModal } from "../context/CookieModalContext";

type ConsentValue = "accepted" | "rejected" | "custom" | null;

const COOKIE_KEY = "phg_cookie_consent";

const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useCookieModal();

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
              We use essential cookies to make this site work. Optional
              analytics cookies help us improve our services.
            </p>
          </div>

          {/* buttons */}
          <div className="flex flex-wrap items-center gap-2 md:justify-end">

            <button
              type="button"
              onClick={() => {
                open();
                setIsOpen(false);
              }}
              className="btn-ghost rounded-full border border-transparent hover:border-highland-200 dark:hover:border-dark-border"
            >
              Edit preferences
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
