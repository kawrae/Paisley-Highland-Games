import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm ${isActive ? "text-highland-800 font-semibold" : "text-gray-600 hover:text-highland-800"}`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="container-page h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-highland-800 font-[Fraunces] font-bold tracking-tight"
        >
          <span className="sm:hidden text-lg">PHG</span>
          <span className="hidden sm:inline text-xl">
            Paisley Highland Games
          </span>
        </Link>

        <button
          aria-label="Toggle menu"
          className="md:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5"
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

        <nav className="hidden md:flex items-center gap-1">
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
                  className="rounded-full bg-highland-100 text-highland-800 text-xs px-2 py-1 hover:bg-highland-200"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  nav("/");
                }}
                className="px-3 py-2 text-sm text-gray-600 hover:text-highland-800"
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
      </div>

      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <div className="container-page py-2">
            <div className="flex flex-col">
              <NavLink
                to="/events"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm ${isActive ? "text-highland-800 font-semibold" : "text-gray-700"}`
                }
              >
                Events
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm ${isActive ? "text-highland-800 font-semibold" : "text-gray-700"}`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/leaderboard"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm ${isActive ? "text-highland-800 font-semibold" : "text-gray-700"}`
                }
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm ${isActive ? "text-highland-800 font-semibold" : "text-gray-700"}`
                }
              >
                About
              </NavLink>

              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/registrations"
                      onClick={() => setOpen(false)}
                      className="py-3 text-sm text-highland-800"
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
                    className="py-3 text-left text-sm text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 text-sm ${isActive ? "text-highland-800 font-semibold" : "text-gray-700"}`
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
