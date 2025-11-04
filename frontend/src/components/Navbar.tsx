import { NavLink, Link } from "react-router-dom"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm ${isActive ? "text-highland-800 font-semibold" : "text-gray-600 hover:text-highland-800"}`

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="container-page h-14 flex items-center justify-between">
        <Link to="/" className="text-highland-800 font-display font-extrabold text-lg tracking-tight">Paisley Highland Games</Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/events" className={linkClass}>Events</NavLink>
          <NavLink to="/register" className={linkClass}>Register</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>
      </div>
    </header>
  )
}
