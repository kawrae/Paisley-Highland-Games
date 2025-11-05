import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "../lib/theme";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const center: [number, number] = [55.8466, -4.4237];
const spots = [
  { id: "caber", name: "Caber Toss Arena", pos: [55.8466, -4.4237] as [number, number] },
  { id: "tug", name: "Tug o’ War Field", pos: [55.8459, -4.4218] as [number, number] },
  { id: "stone", name: "Stone Put Circle", pos: [55.8472, -4.4252] as [number, number] },
];

export default function EventMap() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const url = dark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution = dark
    ? '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <div
      className="
        rounded-2xl border bg-white shadow-soft overflow-hidden
        dark:bg-dark-card dark:border-dark-border dark:shadow-softDark
      "
    >
      <MapContainer
        center={center}
        zoom={15}
        className="leaflet-map"
        style={{
          height: 420,
          width: "100%",
          border: "none",
          background: "transparent",
        }}
      >
        <TileLayer url={url} attribution={attribution} />
        {spots.map((s) => (
          <Marker key={s.id} position={s.pos} icon={icon}>
            <Popup>{s.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>
        {`
          /* Force Leaflet container to blend with dark theme */
          .leaflet-map,
          .leaflet-container {
            background: transparent !important;
            border: none !important;
          }

          /* Optional: make the zoom buttons darker in dark mode */
          .dark .leaflet-control-container .leaflet-bar a {
            background: #0f1917;
            color: #cde9de;
            border-color: #2a3733;
          }
          .dark .leaflet-control-container .leaflet-bar a:hover {
            background: #14211e;
          }
        `}
      </style>
    </div>
  );
}
