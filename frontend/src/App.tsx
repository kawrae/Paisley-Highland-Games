import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminRegistrations from "./pages/AdminRegistrations";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import "leaflet/dist/leaflet.css";
import Events from "./pages/Events";
import CaberToss from "./pages/CaberToss";
import TugOWar from "./pages/tugoWar";
import StonePut from "./pages/stonePut";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/registrations" element={<AdminRegistrations />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/caber" element={<CaberToss />} />
          <Route path="/events/tugowar" element={<TugOWar />} />
          <Route path="/events/stone" element={<StonePut />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
