import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm ${
    isActive
      ? "text-highland-800 font-semibold"
      : "text-gray-600 hover:text-highland-800"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="container-page h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-highland-800 font-display font-extrabold text-lg tracking-tight"
        >
          Paisley Highland Games
        </Link>

        <nav className="flex items-center gap-1">
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

          {/* Admin link (only visible for admin users) */}
          {user?.role === "admin" && (
            <NavLink to="/admin/registrations" className={linkClass}>
              Admin Panel
            </NavLink>
          )}

          {/* Auth area */}
          {user ? (
            <div className="flex items-center gap-2 pl-2">
              <span className="rounded-full bg-highland-100 text-highland-800 text-xs px-2 py-1">
                {user.role === "admin" ? "Admin" : "User"}
              </span>
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
    </header>
  );
}
