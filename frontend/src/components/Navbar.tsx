import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-700">
          Paisley Highland Games
        </Link>
        <nav className="flex gap-6">
          <Link to="/events" className="hover:text-green-700">Events</Link>
          <Link to="/register" className="hover:text-green-700">Register</Link>
          <Link to="/about" className="hover:text-green-700">About</Link>
        </nav>
      </div>
    </header>
  )
}
