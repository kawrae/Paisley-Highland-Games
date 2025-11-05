import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { useTheme } from "../lib/theme";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm transition-colors duration-200 ${
    isActive
      ? "text-highland-800 dark:text-emerald-200 font-semibold"
      : "text-gray-600 hover:text-highland-800 dark:text-gray-300 dark:hover:text-white"
  }`;

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur dark:bg-neutral-900/60 dark:border-neutral-800 transition-colors duration-300">
      {/* Row */}
      <div className="container-page h-14 relative flex items-center justify-between">
        {/* LEFT: Brand */}
        <Link
          to="/"
          className="text-highland-800 dark:text-emerald-100 font-[Fraunces] font-bold tracking-tight"
        >
          <span className="sm:hidden text-lg leading-none">PHG</span>
          <span className="hidden sm:inline text-xl leading-none">
            Paisley Highland Games
          </span>
        </Link>

        {/* CENTER: Desktop nav (absolutely centered) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/register" className={linkClass}>
            Register
          </NavLink>
          <NavLink to="/leaderboard" className={linkClass}>
            Leaderboard
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          {user ? (
            <div className="flex items-center gap-2 pl-2">
              {user.role === "admin" && (
                <Link
                  to="/admin/registrations"
                  className="rounded-full bg-highland-100 text-highland-800 text-xs px-2 py-1 hover:bg-highland-200
                             dark:bg-emerald-900/30 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  nav("/");
                }}
                className="px-3 py-2 text-sm text-gray-600 hover:text-highland-800 dark:text-gray-300 dark:hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </nav>

        {/* RIGHT: actions (hamburger then theme; theme is far right) */}
        <div className="flex items-center gap-1">
          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6h18M3 12h18M3 18h18"
                />
              )}
            </svg>
          </button>

          {/* Theme at FAR RIGHT */}
          <ThemeToggle />
        </div>
      </div>

      {/* MOBILE SHEET */}
      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur dark:bg-neutral-900/90 dark:border-neutral-800">
          <div className="container-page py-2">
            <div className="flex flex-col">
              {["events", "register", "leaderboard", "about"].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-highland-800 dark:text-emerald-200 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </NavLink>
              ))}

              {/* Removed the duplicate ThemeToggle from the sheet */}

              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/registrations"
                      onClick={() => setOpen(false)}
                      className="py-3 text-sm text-highland-800 dark:text-emerald-200"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                      nav("/");
                    }}
                    className="py-3 text-left text-sm text-gray-700 dark:text-gray-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 text-sm ${
                      isActive
                        ? "text-highland-800 dark:text-emerald-200 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
